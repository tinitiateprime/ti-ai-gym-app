import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import userActivity from '../../data/useractivity.json';

const MemberActivityDetailScreen = () => {
  const route = useRoute();
  const params = route && route.params ? route.params : {};
  const { email, name } = params;

  const [period, setPeriod] = useState('6M');      // '6M' | '3M' | '1M'
  const [selectedMonth, setSelectedMonth] = useState('ALL'); // 'ALL' or month string
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const lowerEmail = email ? String(email).toLowerCase() : null;

  // Find the profile for this email
  const profile = useMemo(() => {
    if (!lowerEmail) return null;
    return (
      userActivity.find(
        (p) => String(p.email).toLowerCase() === lowerEmail
      ) || null
    );
  }, [lowerEmail]);

  const isPaid = profile?.isPaid === true;
  const joinedDate = profile?.membershipStart || 'Not set';
  const membershipEnd = profile?.membershipEnd || 'Not set';

  // All month entries for this member (from profile.months)
  const memberMonths = Array.isArray(profile?.months) ? profile.months : [];

  // Days left calculation
  let daysLeft = '-';
  if (profile && profile.membershipEnd) {
    const today = new Date();
    const end = new Date(profile.membershipEnd);
    const diff = end.getTime() - today.getTime();
    daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  const displayName =
    name ||
    profile?.fullName ||
    profile?.name ||
    'Member';

  // UNIQUE list of months in the order they appear in JSON
  const allMonthsOrdered = useMemo(() => {
    const seen = new Set();
    const ordered = [];
    memberMonths.forEach((m) => {
      if (m.month && !seen.has(m.month)) {
        seen.add(m.month);
        ordered.push(m.month);
      }
    });
    return ordered;
  }, [memberMonths]);

  // Months included in the selected period (6M / 3M / 1M)
  const monthsForPeriod = useMemo(() => {
    if (!allMonthsOrdered.length) return [];
    let take = 6;
    if (period === '3M') take = 3;
    else if (period === '1M') take = 1;
    return allMonthsOrdered.slice(-take);
  }, [allMonthsOrdered, period]);

  // Base rows = only months inside the selected period
  const baseRows = useMemo(() => {
    if (!memberMonths.length) return [];
    if (!monthsForPeriod.length) return memberMonths;
    return memberMonths.filter((m) => monthsForPeriod.includes(m.month));
  }, [memberMonths, monthsForPeriod]);


  // Months to show in the dropdown: always last 12 available months

const monthsToShow = useMemo(() => {
  if (!allMonthsOrdered.length) return [];
  return allMonthsOrdered.slice(-12);
}, [allMonthsOrdered]);


  // Reset selected month when period changes
  useEffect(() => {
    setSelectedMonth('ALL');
  }, [period]);

  // TOTALS for the selected period (Last 6M / 3M / 1M)
  const {
    totalDays,
    totalHours,
    totalCalories,
    avgCaloriesPerDay,
    avgCaloriesPerMonth,
  } = useMemo(() => {
    let d = 0;
    let h = 0;
    let c = 0;
    const monthSet = new Set();

    baseRows.forEach((r) => {
      if (!r) return;
      if (r.month) monthSet.add(r.month);
      d += r.days || 0;
      h += r.hours || 0;
      c += r.calories || 0;
    });

    const monthsCount = monthSet.size || 1;

    return {
      totalDays: d,
      totalHours: h,
      totalCalories: c,
      avgCaloriesPerDay: d > 0 ? c / d : 0,
      avgCaloriesPerMonth: c / monthsCount,
    };
  }, [baseRows]);

  // Rows for the Monthly breakdown section
  // - If ALL: all period months (baseRows)
  // - If specific month: only that month
 const monthRows = useMemo(() => {
  if (selectedMonth === 'ALL') {
    return baseRows;
  }

  // Specific month = look in ALL months for that member
  return memberMonths.filter((r) => r.month === selectedMonth);
}, [baseRows, memberMonths, selectedMonth]);


  // Summary for selected month (or all period months)
  const monthlySummary = useMemo(() => {
    let d = 0;
    let h = 0;
    let c = 0;
    monthRows.forEach((r) => {
      d += r.days || 0;
      h += r.hours || 0;
      c += r.calories || 0;
    });
    return { d, h, c };
  }, [monthRows]);

  const periodLabel =
    period === '6M'
      ? 'Last 6 months'
      : period === '3M'
      ? 'Last 3 months'
      : 'Last 1 month';

  return (
    <ScrollView style={styles.container}>
      {!profile ? (
        <View style={{ padding: 16 }}>
          <Text>Member not found.</Text>
        </View>
      ) : (
        <>
          {/* STATUS */}
          <View style={styles.headerRow}>
            <View style={styles.statusBlock}>
              <View
                style={[
                  styles.statusDot,
                  isPaid ? styles.statusPaid : styles.statusUnpaid,
                ]}
              />
              <Text style={styles.statusText}>
                {isPaid ? 'PAID MEMBER' : 'NOT PAID'}
              </Text>
            </View>

            {isPaid && (
              <View style={styles.tenureBlock}>
                <Text style={styles.tenureLabel}>Joined</Text>
                <Text style={styles.tenureValue}>{joinedDate}</Text>

                <Text style={styles.tenureLabel}>Membership till</Text>
                <Text style={styles.tenureValue}>{membershipEnd}</Text>

                <Text style={styles.tenureLabel}>Days left</Text>
                <Text style={styles.tenureHighlight}>
                  {typeof daysLeft === 'number' ? `${daysLeft} days` : '-'}
                </Text>
              </View>
            )}
          </View>

          {/* NAME + PERIOD */}
          <View style={styles.nameRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.memberName}>{displayName}</Text>
              <Text style={styles.memberEmail}>{email}</Text>
            </View>

            {isPaid && (
              <View style={styles.periodSelector}>
                {['6M', '3M', '1M'].map((p) => (
                  <TouchableOpacity
                    key={p}
                    style={[
                      styles.periodChip,
                      period === p && styles.periodChipActive,
                    ]}
                    onPress={() => setPeriod(p)}
                  >
                    <Text
                      style={[
                        styles.periodChipText,
                        period === p && styles.periodChipTextActive,
                      ]}
                    >
                      {p === '6M' && 'Last 6M'}
                      {p === '3M' && 'Last 3M'}
                      {p === '1M' && 'Last 1M'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* SUMMARY – TOTAL DAYS / HOURS / CALORIES FOR PERIOD */}
          {isPaid && (
            <>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>
                  Total days, hours & calories
                </Text>
                <Text style={styles.summarySubTitle}>
                  Period: {periodLabel}
                </Text>

                <View style={styles.summaryRow}>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Total Days</Text>
                    <Text style={styles.summaryValue}>{totalDays}</Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Total Hours</Text>
                    <Text style={styles.summaryValue}>
                      {totalHours.toFixed(1)}
                    </Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Total Calories</Text>
                    <Text style={styles.summaryValue}>{totalCalories}</Text>
                  </View>
                </View>

                <View style={styles.summaryRow}>
                  <View style={styles.summaryItemWide}>
                    <Text style={styles.summaryLabel}>Avg Calories / Day</Text>
                    <Text style={styles.summaryBigValue}>
                      {avgCaloriesPerDay.toFixed(0)}
                    </Text>
                  </View>
                  <View style={styles.summaryItemWide}>
                    <Text style={styles.summaryLabel}>Avg Calories / Month</Text>
                    <Text style={styles.summaryBigValue}>
                      {avgCaloriesPerMonth.toFixed(0)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* MONTH DROPDOWN */}
              <View style={styles.breakdownHeaderRow}>
                <Text style={styles.breakdownTitle}>Monthly breakdown</Text>

                <View style={styles.dropdownWrapper}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setShowMonthDropdown(!showMonthDropdown)}
                  >
                    <Text style={styles.dropdownButtonText}>
                      {selectedMonth === 'ALL' ? 'All months' : selectedMonth}
                    </Text>
                    <Text style={styles.dropdownArrow}>
                      {showMonthDropdown ? '▲' : '▼'}
                    </Text>
                  </TouchableOpacity>

                  {showMonthDropdown && (
                    <View style={styles.dropdownList}>
                      {/* ALL MONTHS OPTION */}
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          setSelectedMonth('ALL');
                          setShowMonthDropdown(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            selectedMonth === 'ALL' &&
                              styles.dropdownItemTextActive,
                          ]}
                        >
                          All months
                        </Text>
                      </TouchableOpacity>

                      {/* INDIVIDUAL MONTHS (only the period months) */}
                      {monthsToShow.map((m) => (
                        <TouchableOpacity
                          key={m}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setSelectedMonth(m);
                            setShowMonthDropdown(false);
                          }}
                        >
                          <Text
                            style={[
                              styles.dropdownItemText,
                              selectedMonth === m &&
                                styles.dropdownItemTextActive,
                            ]}
                          >
                            {m}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              {/* PER-MONTH (OR ALL-PERIOD) SUMMARY */}
              <View style={styles.monthSummaryCard}>
                <Text style={styles.monthSummaryTitle}>
                  {selectedMonth === 'ALL'
                    ? 'All months (selected period)'
                    : selectedMonth}
                </Text>

                <Text style={styles.monthSummaryLine}>
                  Days attended:{' '}
                  <Text style={styles.monthSummaryValue}>
                    {monthlySummary.d}
                  </Text>
                </Text>
                <Text style={styles.monthSummaryLine}>
                  Total workout hours:{' '}
                  <Text style={styles.monthSummaryValue}>
                    {monthlySummary.h.toFixed(1)}
                  </Text>
                </Text>
                <Text style={styles.monthSummaryLine}>
                  Calories burned:{' '}
                  <Text style={styles.monthSummaryValue}>
                    {monthlySummary.c}
                  </Text>
                </Text>

                <Text style={styles.monthSummaryNote}>
                  Later: you can list individual workouts here.
                </Text>
              </View>
            </>
          )}
        </>
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 16 },
  headerRow: { flexDirection: 'row', marginBottom: 16 },

  statusBlock: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#0f172a',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statusDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  statusPaid: { backgroundColor: '#22c55e' },
  statusUnpaid: { backgroundColor: '#ef4444' },
  statusText: { color: '#e5e7eb', fontWeight: '700', fontSize: 12 },

  tenureBlock: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  tenureLabel: { color: '#9ca3af', fontSize: 11 },
  tenureValue: { color: '#e5e7eb', fontSize: 13, marginBottom: 2 },
  tenureHighlight: {
    color: '#f97316',
    fontSize: 16,
    fontWeight: '700',
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  memberName: { color: '#f9fafb', fontSize: 20, fontWeight: '700' },
  memberEmail: { color: '#9ca3af', fontSize: 12, marginTop: 2 },

  periodSelector: { flexDirection: 'row' },
  periodChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4b5563',
    marginLeft: 4,
  }, 
  periodChipActive: {
    backgroundColor: '#22c55e22',
    borderColor: '#22c55e',
  },
  periodChipText: {
    color: '#9ca3af',
    fontSize: 11,
    fontWeight: '600',
  },
  periodChipTextActive: { color: '#bbf7d0' },

  summaryCard: {
    backgroundColor: '#020617',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 16,
  },
  summaryTitle: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  summarySubTitle: {
    color: '#9ca3af',
    fontSize: 11,
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryItem: { flex: 1, marginRight: 8 },
  summaryItemWide: { flex: 1, marginRight: 8 },
  summaryLabel: { color: '#9ca3af', fontSize: 11 },
  summaryValue: { color: '#e5e7eb', fontSize: 18, fontWeight: '700' },
  summaryBigValue: { color: '#f97316', fontSize: 18, fontWeight: '700' },

  breakdownHeaderRow: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  breakdownTitle: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '700',
  },

  dropdownWrapper: {
    alignSelf: 'flex-start',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4b5563',
    backgroundColor: '#020617',
  },
  dropdownButtonText: {
    color: '#e5e7eb',
    fontSize: 12,
    marginRight: 6,
  },
  dropdownArrow: {
    color: '#9ca3af',
    fontSize: 10,
  },
  dropdownList: {
    marginTop: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1f2937',
    backgroundColor: '#020617',
    paddingVertical: 4,
    minWidth: 140,
    elevation: 4,
  },
  dropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  dropdownItemText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  dropdownItemTextActive: {
    color: '#e0f2fe',
    fontWeight: '600',
  },

  monthSummaryCard: {
    backgroundColor: '#020617',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginTop: 8,
    marginBottom: 40,
  },
  monthSummaryTitle: {
    color: '#e5e7eb',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  monthSummaryLine: { color: '#9ca3af', fontSize: 13, marginTop: 2 },
  monthSummaryValue: { color: '#f9fafb', fontWeight: '700' },
  monthSummaryNote: { color: '#6b7280', fontSize: 11, marginTop: 10 },
});

export default MemberActivityDetailScreen;
