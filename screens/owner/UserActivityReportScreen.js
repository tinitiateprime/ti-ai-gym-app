import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import userActivity from '../../data/useractivity.json';


const UseractivityReportScreen = () => {
  const navigation = useNavigation();

  // you can later group by email, month etc.
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Members Activity</Text>

      {userActivity.map((row, index) => (
        <TouchableOpacity
          key={`${row.email}-${index}`}
          style={styles.row}
          onPress={() =>
            navigation.navigate('MemberActivityDetail', {
              email: row.email,
              name: row.name || row.fullName,
            })
          }
        >
          <Text style={styles.name}>
            {row.name || row.fullName || row.email}
          </Text>
          <Text style={styles.sub}>
            Month: {row.month || 'N/A'} | Days: {row.days} | Calories: {row.calories}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 16 },
  title: {
    color: '#e5e7eb',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#1f2937',
  },
  name: { color: '#f9fafb', fontSize: 16, fontWeight: '600' },
  sub: { color: '#9ca3af', fontSize: 12, marginTop: 2 },
});

export default UseractivityReportScreen;
