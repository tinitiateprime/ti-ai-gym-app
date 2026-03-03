const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!connectionString) {
  throw new Error("AZURE_STORAGE_CONNECTION_STRING is not set");
}

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

const CONTAINER_NAME = process.env.AZURE_LOG_CONTAINER || "usage-logs";

async function getContainer() {
  const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
  await containerClient.createIfNotExists();
  return containerClient;
}

async function readBlobAsString(blobPath) {
  const container = await getContainer();
  const blobClient = container.getBlockBlobClient(blobPath);

  const exists = await blobClient.exists();
  if (!exists) return "";

  const download = await blobClient.download();
  const stream = download.readableStreamBody;
  if (!stream) return "";

  return new Promise((resolve, reject) => {
    const chunks = [];

    stream.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });

    stream.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });

    stream.on("error", reject);
  });
}

async function writeBlobFromString(blobPath, content) {
  const container = await getContainer();
  const blobClient = container.getBlockBlobClient(blobPath);

  await blobClient.uploadData(Buffer.from(content, "utf8"), {
    blobHTTPHeaders: {
      blobContentType: "text/csv; charset=utf-8",
    },
  });
}

function escapeCsvValue(value) {
  if (value === null || value === undefined) return "";
  const str = String(value).replace(/"/g, '""');
  return /[",\n]/.test(str) ? `"${str}"` : str;
}

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    const next = line[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
      continue;
    }

    current += ch;
  }

  result.push(current);
  return result;
}

function parseCsv(csv) {
  if (!csv.trim()) return [];
  return csv
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map(parseCsvLine);
}

async function appendCsvLine(blobPath, headerColumns, row) {
  const headerLine = headerColumns.join(",") + "\n";
  const rowLine = row.map(escapeCsvValue).join(",") + "\n";

  const existing = await readBlobAsString(blobPath);

  if (!existing) {
    await writeBlobFromString(blobPath, headerLine + rowLine);
  } else {
    await writeBlobFromString(blobPath, existing + rowLine);
  }
}

async function readCsvRows(blobPath) {
  const csv = await readBlobAsString(blobPath);
  return parseCsv(csv);
}

async function readCsvObjects(blobPath) {
  const rows = await readCsvRows(blobPath);
  if (rows.length === 0) return [];

  const [header, ...dataRows] = rows;

  return dataRows.map((row) => {
    const item = {};
    header.forEach((key, index) => {
      item[key] = row[index] ?? "";
    });
    return item;
  });
}

async function csvHasRow(blobPath, matchFn) {
  const rows = await readCsvRows(blobPath);
  if (rows.length <= 1) return false;

  for (let i = 1; i < rows.length; i++) {
    if (matchFn(rows[i])) return true;
  }

  return false;
}

module.exports = {
  appendCsvLine,
  readCsvRows,
  readCsvObjects,
  csvHasRow,
};