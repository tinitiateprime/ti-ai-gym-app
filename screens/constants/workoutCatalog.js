// src/constants/workoutCatalog.js

export const WORKOUT_CATALOG = [
  {
    id: "dumbbells",
    name: "Dumbbells",
    icon: "barbell-outline",
    items: [
      {
        id: "dumbbells-shoulders-back",
        name: "Shoulders Back",
        category: "Shoulders",
        mode: "timer",
        defaultSets: 6,
        defaultTimerSec: 20,
        defaultReps: 12,
        videoKey: "pushups", // replace later with your actual video key
        timerOptions: [10, 15, 20, 30, 45, 60],
      },
      
      {
        id: "dumbbells-shoulders-front",
        name: "Shoulders Front",
        category: "Shoulders",
        mode: "timer",
        defaultSets: 6,
        defaultTimerSec: 20,
        defaultReps: 12,
        videoKey: "pushups", // replace later
        timerOptions: [10, 15, 20, 30, 45, 60],
      },
    ],
  },

  {
    id: "barbell",
    name: "Barbell",
    icon: "barbell-outline",
    items: [
      {
        id: "barbell-main",
        name: "Barbell",
        category: "Strength",
        mode: "timer",
        defaultSets: 6,
        defaultTimerSec: 20,
        defaultReps: 10,
        videoKey: "squats", // replace later
        timerOptions: [10, 15, 20, 30, 45, 60],
      },
    ],
  },

  {
    id: "pushups",
    name: "Pushups",
    icon: "fitness-outline",
    items: [
      {
        id: "pushups-main",
        name: "Pushups",
        category: "Strength",
        mode: "timer",
        defaultSets: 6,
        defaultTimerSec: 20,
        defaultReps: 15,
        videoKey: "pushups",
        timerOptions: [10, 15, 20, 30, 45, 60],
      },
    ],
  },

  {
    id: "cardio",
    name: "Cardio",
    icon: "walk-outline",
    items: [
      {
        id: "running-main",
        name: "Running",
        category: "Cardio",
        mode: "timer",
        defaultSets: 3,
        defaultTimerSec: 60,
        defaultReps: null,
        videoKey: "running",
        timerOptions: [20, 30, 45, 60, 90, 120],
      },
      {
        id: "cycling-main",
        name: "Cycling",
        category: "Cardio",
        mode: "timer",
        defaultSets: 3,
        defaultTimerSec: 60,
        defaultReps: null,
        videoKey: "cycling",
        timerOptions: [20, 30, 45, 60, 90, 120],
      },
    ],
  },
];

export function flattenWorkouts() {
  return WORKOUT_CATALOG.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      workoutTypeId: group.id,
      workoutTypeName: group.name,
      workoutTypeIcon: group.icon,
    }))
  );
}

export function findWorkoutById(workoutId) {
  return flattenWorkouts().find((item) => item.id === workoutId) || null;
}