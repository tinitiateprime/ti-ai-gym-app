import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// 🔹 read-only users.json
import usersData from '../../data/users.json';

const MemberManagementScreen = ({ navigation }) => {
  const [showTrainers, setShowTrainers] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showSellers, setShowSellers] = useState(false);

  // 🧮 filter by roleId from users.json
  const trainerUsers = useMemo(
    () => usersData.filter((u) => u.roleId === 'TRAINER'),
    []
  );
  const memberUsers = useMemo(
    () => usersData.filter((u) => u.roleId === 'MEMBER'),
    []
  );
  const sellerUsers = useMemo(
    () => usersData.filter((u) => u.roleId === 'SELLER'),
    []
  );

  const trainersCount = trainerUsers.length;
  const membersCount = memberUsers.length;
  const sellersCount = sellerUsers.length;

  // 🔥 row clickable → go to UserActivityReport
  const renderUserRow = (u) => {
    const name = u.fullName || u.email;
    const paid = !!u.isPaid;
    return (
      <TouchableOpacity
        key={u.email}
        style={styles.memberRow}
        onPress={() =>
          navigation.navigate('UserActivityReport', {
            email: u.email,
            fullName: name,
            roleId: u.roleId,
          })
        }
      >
        <Text style={styles.memberName}>{name}</Text>
        <Text
          style={[
            styles.memberStatus,
            !paid && styles.memberStatusUnpaid,
          ]}
        >
          {paid ? 'Paid' : 'Not Paid'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Member Management</Text>
      <Text style={styles.subtitle}>
        Manage trainers, members and sellers in your gym.
      </Text>

      {/* Trainer actions */}
      <Text style={styles.section}>
        Trainer ({trainersCount})
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddTrainer')}
      >
        <Text style={styles.buttonText}>Add Trainer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditUpgradeTrainer')}
      >
        <Text style={styles.buttonText}>Edit / Upgrade Trainer</Text>
      </TouchableOpacity>

      {/* View Trainers from users.json */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowTrainers((prev) => !prev)}
      >
        <Text style={styles.buttonText}>
          {showTrainers ? 'Hide Trainers' : 'View Trainers'}
        </Text>
      </TouchableOpacity>

      {showTrainers && (
        <View style={styles.membersContainer}>
          <Text style={styles.membersTitle}>
            Trainers in users.json – {trainersCount}{' '}
            user{trainersCount === 1 ? '' : 's'}
          </Text>

          {trainersCount === 0 ? (
            <Text style={styles.noMembersText}>
              No trainers with roleId = "TRAINER" in users.json
            </Text>
          ) : (
            trainerUsers.map(renderUserRow)
          )}
        </View>
      )}

      {/* Member actions */}
      <Text style={styles.section}>
        Member ({membersCount})
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddMember')}
      >
        <Text style={styles.buttonText}>Add Member</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditUpgradeMember')}
      >
        <Text style={styles.buttonText}>Edit / Upgrade Member</Text>
      </TouchableOpacity>

      {/* View Members from users.json */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowMembers((prev) => !prev)}
      >
        <Text style={styles.buttonText}>
          {showMembers ? 'Hide Members' : 'View Members'}
        </Text>
      </TouchableOpacity>

      {showMembers && (
        <View style={styles.membersContainer}>
          <Text style={styles.membersTitle}>
            Members in users.json – {membersCount}{' '}
            user{membersCount === 1 ? '' : 's'}
          </Text>

          {membersCount === 0 ? (
            <Text style={styles.noMembersText}>
              No members with roleId = "MEMBER" in users.json
            </Text>
          ) : (
            memberUsers.map(renderUserRow)
          )}
        </View>
      )}

      {/* Seller section */}
      <Text style={styles.section}>
        Seller ({sellersCount})
      </Text>

      {/* View Sellers from users.json */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowSellers((prev) => !prev)}
      >
        <Text style={styles.buttonText}>
          {showSellers ? 'Hide Sellers' : 'View Sellers'}
        </Text>
      </TouchableOpacity>

      {showSellers && (
        <View style={styles.membersContainer}>
          <Text style={styles.membersTitle}>
            Sellers in users.json – {sellersCount}{' '}
            user{sellersCount === 1 ? '' : 's'}
          </Text>

          {sellersCount === 0 ? (
            <Text style={styles.noMembersText}>
              No sellers with roleId = "SELLER" in users.json
            </Text>
          ) : (
            sellerUsers.map(renderUserRow)
          )}
        </View>
      )}

      {/* Remove Member */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RemoveMember')}
      >
        <Text style={styles.buttonText}>Remove Member</Text>
      </TouchableOpacity>

      {/* Send reminders */}
      <TouchableOpacity
        style={[styles.button, styles.reminderButton]}
        onPress={() => navigation.navigate('SendReminder')}
      >
        <Text style={styles.buttonText}>Send Reminders</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MemberManagementScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  title: {
    fontSize: 22,
    color: '#e5e7eb',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: { fontSize: 13, color: '#9ca3af', marginBottom: 16 },
  section: {
    marginTop: 12,
    marginBottom: 4,
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '600',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#1f2937',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  reminderButton: { backgroundColor: '#22c55e', marginTop: 16 },
  buttonText: { color: '#e5e7eb', fontSize: 15, fontWeight: '600' },

  membersContainer: {
    marginTop: 16,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#1f2937',
  },
  membersTitle: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  noMembersText: {
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#111827',
  },
  memberName: {
    color: '#e5e7eb',
    fontSize: 14,
  },
  memberStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22c55e', // Paid
  },
  memberStatusUnpaid: {
    color: '#f97316', // Not Paid
  },
});
