export const ROLES = [
  { pickerValue: "Member",        roleId: "MEMBER",  roleLabel: "Member",             homeRoute: "DailyTips" },
  { pickerValue: "Trainer",       roleId: "TRAINER", roleLabel: "Trainer",            homeRoute: "TrainerScreen" },
  { pickerValue: "Market Seller", roleId: "SELLER",  roleLabel: "Marketplace Seller", homeRoute: "MarketplaceSeller" },
  { pickerValue: "Owner",         roleId: "OWNER",   roleLabel: "Gym Owner",          homeRoute: "GymOwner" }
];

export function roleFromPickerValue(value) {
  return ROLES.find((r) => r.pickerValue === value) || null;
}
