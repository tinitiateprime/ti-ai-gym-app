import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WORKOUT_CATALOG } from "../../constants/workoutCatalog";

export default function ExerciseLoggerHomeScreen({ navigation, route }) {
  const userEmail = (route?.params?.userEmail || route?.params?.email || "").toLowerCase();
  const userName = route?.params?.fullName || route?.params?.userName || "";

  const scrollRef = useRef(null);
  const sectionOffsetsRef = useRef({});

  const [searchText, setSearchText] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("all");
  const [expandedGroupId, setExpandedGroupId] = useState(null);
  const [expandedCategoryKey, setExpandedCategoryKey] = useState(null);
  const [myExercises, setMyExercises] = useState([]);

  const totalWorkouts = useMemo(() => {
    return WORKOUT_CATALOG.reduce((sum, group) => sum + group.items.length, 0);
  }, []);

  const openWorkout = (group, item) => {
    setMyExercises((prev) => {
      const nextItem = {
        ...item,
        workoutTypeId: group.id,
        workoutTypeName: group.name,
        workoutTypeIcon: group.icon,
      };

      const withoutDupes = prev.filter((x) => x.id !== item.id);
      return [nextItem, ...withoutDupes].slice(0, 8);
    });

    navigation.navigate("ExerciseSession", {
      email: userEmail,
      userEmail,
      fullName: userName,
      userName,
      workoutId: item.id,
      workoutTypeId: group.id,
      workoutTypeName: group.name,
      category: item.category,
      exerciseName: item.name,
      workoutConfig: {
        ...item,
        workoutTypeId: group.id,
        workoutTypeName: group.name,
        workoutTypeIcon: group.icon,
      },
    });
  };

  const baseCatalog = useMemo(() => {
    return WORKOUT_CATALOG;
  }, []);

  const filteredCatalog = useMemo(() => {
    const q = searchText.trim().toLowerCase();

    return baseCatalog
      .filter((group) => selectedGroupId === "all" || group.id === selectedGroupId)
      .map((group) => {
        const items = group.items.filter((item) => {
          if (!q) return true;

          const fullText = [
            item.name,
            item.category,
            group.name,
            String(item.defaultSets || ""),
            String(item.defaultTimerSec || ""),
            String(item.defaultReps || ""),
          ]
            .join(" ")
            .toLowerCase();

          return fullText.includes(q);
        });

        return { ...group, items };
      })
      .filter((group) => group.items.length > 0);
  }, [baseCatalog, searchText, selectedGroupId]);

  const groupDropdownData = useMemo(() => {
    return WORKOUT_CATALOG.map((group) => {
      const categoryMap = {};

      group.items.forEach((item) => {
        const categoryName = item.category || "General";
        if (!categoryMap[categoryName]) {
          categoryMap[categoryName] = [];
        }
        categoryMap[categoryName].push(item);
      });

      return {
        ...group,
        categories: Object.entries(categoryMap).map(([categoryName, exercises]) => ({
          id: `${group.id}_${categoryName}`,
          name: categoryName,
          exercises,
        })),
      };
    });
  }, []);

  const selectedDropdownGroup = useMemo(() => {
    if (!expandedGroupId) return null;
    return groupDropdownData.find((g) => g.id === expandedGroupId) || null;
  }, [expandedGroupId, groupDropdownData]);

  const scrollToGroup = (groupId) => {
    const y = sectionOffsetsRef.current[groupId];
    if (typeof y === "number" && scrollRef.current) {
      scrollRef.current.scrollTo({
        y: Math.max(0, y - 10),
        animated: true,
      });
    }
  };

  const handleGroupPillPress = (group) => {
    const isOpen = expandedGroupId === group.id;

    if (isOpen) {
      setExpandedGroupId(null);
      setExpandedCategoryKey(null);
      setSelectedGroupId("all");
      return;
    }

    setExpandedGroupId(group.id);
    setExpandedCategoryKey(null);
    setSelectedGroupId(group.id);
    setSearchText("");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToGroup(group.id);
      });
    });
  };

  const handleDropdownCategoryPress = (groupId, categoryId) => {
    setSelectedGroupId(groupId);
    setExpandedCategoryKey((prev) => (prev === categoryId ? null : categoryId));
  };

  const renderWorkoutCard = (group, item, idx, total) => (
    <TouchableOpacity
      key={`${group.id}_${item.id}`}
      activeOpacity={0.92}
      style={[styles.itemCard, idx === total - 1 && { marginBottom: 0 }]}
      onPress={() => openWorkout(group, item)}
    >
      <View style={styles.itemLeft}>
        <View style={styles.itemIcon}>
          <Ionicons
            name={group.icon || "barbell-outline"}
            size={18}
            color="#60a5fa"
          />
        </View>

        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.name}</Text>

          <View style={styles.itemTagsRow}>
            <View style={styles.itemTag}>
              <Text style={styles.itemTagText}>{item.category}</Text>
            </View>

            <View style={styles.itemTag}>
              <Text style={styles.itemTagText}>{item.defaultSets} sets</Text>
            </View>

            <View style={styles.itemTag}>
              <Text style={styles.itemTagText}>{item.defaultTimerSec}s</Text>
            </View>

            {item.defaultReps ? (
              <View style={styles.itemTag}>
                <Text style={styles.itemTagText}>{item.defaultReps} reps</Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>

      <View style={styles.itemAction}>
        <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topShell}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerEyebrow}>Fitness Dashboard</Text>
            <Text style={styles.headerTitle}>Workout Logger</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.reportBtn}
            onPress={() =>
              navigation.navigate("ExerciseReports", {
                email: userEmail,
                userEmail,
                fullName: userName,
                userName,
              })
            }
          >
            <Ionicons name="stats-chart" size={18} color="#08111d" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#94a3b8" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search exercise, category, reps..."
            placeholderTextColor="#64748b"
            style={styles.searchInput}
          />
          {searchText ? (
            <TouchableOpacity onPress={() => setSearchText("")} style={styles.clearBtn}>
              <Ionicons name="close" size={16} color="#cbd5e1" />
            </TouchableOpacity>
          ) : null}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsRow}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setSelectedGroupId("all");
              setExpandedGroupId(null);
              setExpandedCategoryKey(null);
            }}
            style={[
              styles.pill,
              selectedGroupId === "all" && !expandedGroupId && styles.pillActive,
            ]}
          >
            <Text
              style={[
                styles.pillText,
                selectedGroupId === "all" && !expandedGroupId && styles.pillTextActive,
              ]}
            >
              All Categories
            </Text>
          </TouchableOpacity>

          {baseCatalog.map((group) => {
            const isExpanded = expandedGroupId === group.id;
            const isActive = selectedGroupId === group.id;

            return (
              <TouchableOpacity
                key={group.id}
                activeOpacity={0.9}
                onPress={() => handleGroupPillPress(group)}
                style={[styles.pill, (isExpanded || isActive) && styles.pillActive]}
              >
                <Ionicons
                  name={group.icon || "barbell-outline"}
                  size={14}
                  color={isExpanded || isActive ? "#08111d" : "#7dd3fc"}
                />
                <Text
                  style={[
                    styles.pillText,
                    (isExpanded || isActive) && styles.pillTextActive,
                  ]}
                >
                  {group.name}
                </Text>
                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={14}
                  color={isExpanded || isActive ? "#08111d" : "#7dd3fc"}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {selectedDropdownGroup ? (
          <View style={styles.inlineCategoryMenu}>
            <View style={styles.jumpMenuHeader}>
              <Text style={styles.jumpMenuTitle}>{selectedDropdownGroup.name}</Text>
              <Text style={styles.jumpMenuSub}>
                Tap a subcategory, then tap an exercise
              </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 260 }}>
              {selectedDropdownGroup.categories.map((category) => {
                const isExpanded = expandedCategoryKey === category.id;

                return (
                  <View key={category.id} style={styles.jumpCategoryBlock}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={styles.jumpCategoryRow}
                      onPress={() =>
                        handleDropdownCategoryPress(selectedDropdownGroup.id, category.id)
                      }
                    >
                      <View style={styles.jumpCategoryLeft}>
                        <View style={styles.jumpCategoryIcon}>
                          <Ionicons name="fitness-outline" size={14} color="#7dd3fc" />
                        </View>
                        <View>
                          <Text style={styles.jumpCategoryTitle}>{category.name}</Text>
                          <Text style={styles.jumpCategoryMeta}>
                            {category.exercises.length} exercises
                          </Text>
                        </View>
                      </View>

                      <Ionicons
                        name={isExpanded ? "chevron-up" : "chevron-down"}
                        size={15}
                        color="#94a3b8"
                      />
                    </TouchableOpacity>

                    {isExpanded ? (
                      <View style={styles.jumpExercisesWrap}>
                        {category.exercises.map((exercise) => (
                          <TouchableOpacity
                            key={`${selectedDropdownGroup.id}_${category.id}_${exercise.id}`}
                            activeOpacity={0.9}
                            style={styles.jumpExerciseRow}
                            onPress={() => openWorkout(selectedDropdownGroup, exercise)}
                          >
                            <View style={styles.jumpExerciseLeft}>
                              <View style={styles.jumpExerciseDot} />
                              <Text style={styles.jumpExerciseTitle}>{exercise.name}</Text>
                            </View>

                            <Ionicons
                              name="arrow-forward"
                              size={14}
                              color="#94a3b8"
                            />
                          </TouchableOpacity>
                        ))}
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        ) : null}
      </View>

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroWrap}>
          <View style={styles.heroGlowOne} />
          <View style={styles.heroGlowTwo} />

          <View style={styles.heroBadge}>
            <Ionicons name="flash-outline" size={14} color="#7dd3fc" />
            <Text style={styles.heroBadgeText}>Train smarter</Text>
          </View>

          <Text style={styles.heroTitle}>Cleaner workout navigation</Text>
          <Text style={styles.heroSub}>
            Jump by category, search instantly, and keep your recently used exercises close.
          </Text>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>{WORKOUT_CATALOG.length}</Text>
              <Text style={styles.heroStatLabel}>Categories</Text>
            </View>

            <View style={styles.heroStatDivider} />

            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>{totalWorkouts}</Text>
              <Text style={styles.heroStatLabel}>Exercises</Text>
            </View>

            <View style={styles.heroStatDivider} />

            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>{myExercises.length}</Text>
              <Text style={styles.heroStatLabel}>My Exercises</Text>
            </View>
          </View>
        </View>

        {myExercises.length > 0 ? (
          <View style={styles.mySection}>
            <View style={styles.sectionRow}>
              <View>
                <Text style={styles.sectionTitle}>My Exercises</Text>
                <Text style={styles.sectionSub}>Recently opened workouts for quick access</Text>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.myExercisesRow}
            >
              {myExercises.map((item) => (
                <TouchableOpacity
                  key={`my_${item.id}`}
                  activeOpacity={0.92}
                  style={styles.myExerciseCard}
                  onPress={() =>
                    openWorkout(
                      {
                        id: item.workoutTypeId,
                        name: item.workoutTypeName,
                        icon: item.workoutTypeIcon,
                      },
                      item
                    )
                  }
                >
                  <View style={styles.myExerciseIcon}>
                    <Ionicons
                      name={item.workoutTypeIcon || "barbell-outline"}
                      size={18}
                      color="#08111d"
                    />
                  </View>
                  <Text style={styles.myExerciseTitle} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.myExerciseSub} numberOfLines={1}>
                    {item.workoutTypeName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : null}

        <View style={styles.sectionRow}>
          <View>
            <Text style={styles.sectionTitle}>Available Workouts</Text>
            <Text style={styles.sectionSub}>
              {filteredCatalog.length
                ? "Tap any workout to start logging"
                : "No workouts found for your search"}
            </Text>
          </View>
        </View>

        {filteredCatalog.map((group, groupIndex) => (
          <View
            key={group.id}
            style={styles.groupShell}
            onLayout={(e) => {
              sectionOffsetsRef.current[group.id] = e.nativeEvent.layout.y;
            }}
          >
            <View style={styles.groupHeader}>
              <View style={styles.groupHeaderLeft}>
                <View
                  style={[
                    styles.groupIconWrap,
                    groupIndex % 3 === 0
                      ? styles.groupIconBlue
                      : groupIndex % 3 === 1
                      ? styles.groupIconPurple
                      : styles.groupIconTeal,
                  ]}
                >
                  <Ionicons
                    name={group.icon || "barbell-outline"}
                    size={20}
                    color="#eaf6ff"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.groupTitle}>{group.name}</Text>
                  <Text style={styles.groupMeta}>
                    {group.items.length} exercises available
                  </Text>
                </View>
              </View>

              <View style={styles.groupChip}>
                <Text style={styles.groupChipText}>Live</Text>
              </View>
            </View>

            <View style={styles.itemsContainer}>
              {group.items.map((item, idx) =>
                renderWorkoutCard(group, item, idx, group.items.length)
              )}
            </View>
          </View>
        ))}

        {!filteredCatalog.length ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={26} color="#64748b" />
            <Text style={styles.emptyTitle}>No matching workouts</Text>
            <Text style={styles.emptySub}>
              Try a different keyword or choose another category.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020617",
  },

  topShell: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: "#020617",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148,163,184,0.08)",
    zIndex: 50,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  headerEyebrow: {
    color: "#7dd3fc",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.4,
  },

  headerTitle: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 2,
  },

  reportBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7dd3fc",
  },

  searchWrap: {
    minHeight: 52,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0b1220",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  searchInput: {
    flex: 1,
    color: "#f8fafc",
    fontSize: 14,
    marginLeft: 10,
    paddingVertical: 12,
  },

  clearBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(148,163,184,0.10)",
  },

  pillsRow: {
    gap: 10,
    paddingTop: 12,
    paddingRight: 10,
  },

  pill: {
    height: 38,
    borderRadius: 999,
    paddingHorizontal: 14,
    backgroundColor: "#0b1220",
    borderWidth: 1,
    borderColor: "#1e293b",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  pillActive: {
    backgroundColor: "#1d4ed8",
    borderColor: "#2563eb",
  },

  pillText: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "800",
  },

  pillTextActive: {
    color: "#eff6ff",
  },

  inlineCategoryMenu: {
    marginTop: 12,
    borderRadius: 22,
    backgroundColor: "#071120",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.12)",
    padding: 12,
  },

  jumpMenuHeader: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148,163,184,0.10)",
  },

  jumpMenuTitle: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: "900",
  },

  jumpMenuSub: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
  },

  jumpCategoryBlock: {
    marginBottom: 8,
  },

  jumpCategoryRow: {
    minHeight: 44,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#0b1728",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.10)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  jumpCategoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    paddingRight: 12,
  },

  jumpCategoryIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(125,211,252,0.08)",
  },

  jumpCategoryTitle: {
    color: "#e2e8f0",
    fontSize: 12,
    fontWeight: "800",
  },

  jumpCategoryMeta: {
    color: "#94a3b8",
    fontSize: 10,
    marginTop: 3,
  },

  jumpExercisesWrap: {
    marginTop: 8,
    paddingLeft: 8,
    gap: 6,
  },

  jumpExerciseRow: {
    minHeight: 40,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#081120",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  jumpExerciseLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10,
  },

  jumpExerciseDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#7dd3fc",
    marginRight: 10,
  },

  jumpExerciseTitle: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "700",
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 34,
  },

  heroWrap: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 28,
    padding: 18,
    marginBottom: 18,
    backgroundColor: "#071120",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.14)",
  },

  heroGlowOne: {
    position: "absolute",
    top: -20,
    right: -10,
    width: 150,
    height: 150,
    borderRadius: 999,
    backgroundColor: "rgba(56,189,248,0.12)",
  },

  heroGlowTwo: {
    position: "absolute",
    bottom: -30,
    left: -20,
    width: 120,
    height: 120,
    borderRadius: 999,
    backgroundColor: "rgba(139,92,246,0.10)",
  },

  heroBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.78)",
    borderWidth: 1,
    borderColor: "rgba(125,211,252,0.20)",
  },

  heroBadgeText: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "800",
  },

  heroTitle: {
    color: "#f8fafc",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 14,
  },

  heroSub: {
    color: "#94a3b8",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },

  heroStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "rgba(15,23,42,0.72)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.10)",
  },

  heroStatCard: {
    flex: 1,
    alignItems: "center",
  },

  heroStatValue: {
    color: "#f8fafc",
    fontSize: 17,
    fontWeight: "900",
  },

  heroStatLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },

  heroStatDivider: {
    width: 1,
    height: 26,
    backgroundColor: "rgba(148,163,184,0.18)",
  },

  mySection: {
    marginBottom: 18,
  },

  myExercisesRow: {
    paddingRight: 10,
    gap: 12,
  },

  myExerciseCard: {
    width: 150,
    borderRadius: 22,
    padding: 14,
    backgroundColor: "#0b1220",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  myExerciseIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7dd3fc",
    marginBottom: 12,
  },

  myExerciseTitle: {
    color: "#f8fafc",
    fontSize: 14,
    fontWeight: "900",
  },

  myExerciseSub: {
    color: "#94a3b8",
    fontSize: 11,
    marginTop: 5,
  },

  sectionRow: {
    marginBottom: 12,
    paddingHorizontal: 2,
  },

  sectionTitle: {
    color: "#f8fafc",
    fontSize: 17,
    fontWeight: "900",
  },

  sectionSub: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
  },

  groupShell: {
    marginBottom: 16,
    borderRadius: 26,
    padding: 14,
    backgroundColor: "#0a1220",
    borderWidth: 1,
    borderColor: "rgba(30,41,59,0.95)",
  },

  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  groupHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10,
  },

  groupIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  groupIconBlue: {
    backgroundColor: "#2563eb",
  },

  groupIconPurple: {
    backgroundColor: "#7c3aed",
  },

  groupIconTeal: {
    backgroundColor: "#0f766e",
  },

  groupTitle: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "900",
  },

  groupMeta: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "700",
  },

  groupChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(34,197,94,0.10)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.22)",
  },

  groupChipText: {
    color: "#4ade80",
    fontSize: 11,
    fontWeight: "900",
  },

  itemsContainer: {
    gap: 10,
  },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0f172a",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(30,41,59,0.95)",
    padding: 13,
    marginBottom: 2,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },

  itemIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#081120",
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.20)",
  },

  itemContent: {
    flex: 1,
    marginLeft: 12,
  },

  itemTitle: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: "900",
  },

  itemTagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },

  itemTag: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "#0b1324",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.12)",
  },

  itemTagText: {
    color: "#cbd5e1",
    fontSize: 11,
    fontWeight: "800",
  },

  itemAction: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(148,163,184,0.08)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.10)",
  },

  emptyState: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 22,
    backgroundColor: "#0b1220",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  emptyTitle: {
    color: "#e2e8f0",
    fontSize: 15,
    fontWeight: "900",
    marginTop: 10,
  },

  emptySub: {
    color: "#94a3b8",
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
  },
});
