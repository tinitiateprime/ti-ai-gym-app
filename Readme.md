
# Workout Flow - Expected Behavior

## Overview

The workout feature should work as a **daily workout session tracker**.

A user can:

- open a workout
- select the number of sets for that day
- complete each set
- enter or use the reps count for each set
- save all completed workout data into `userExercises.json`

Once the user finishes all selected sets for that workout **on that day**, that workout should be considered **closed for the day**.

The same workout should **not continue again on the same day**.

On the **next day**, the same workout should start again from the beginning as a fresh session.

---

# Step-by-Step Flow

## 1. User opens a workout

Example workout:

- Workout Type: `dumbbells`
- Exercise Type: `shoulders`

The user enters the workout screen.

The screen should show:

- workout name
- workout type
- exercise type
- selectable set count
- selectable timer
- selectable reps for each set

---

## 2. User selects sets for today

Before starting, the user selects how many sets they want to do **for that day**.

Example:

- Sets: `3`
- Reps per set: `10`
- Timer per set: `60 sec`

This selection becomes the **planned workout for today**.

---

## 3. User starts the workout

When the first set starts:

- the workout session start time should be captured
- today’s date should be associated with this workout
- the session should begin saving progress into `userExercises.json`

The stored workout session should be tied to:

- user
- workout
- date

---

## 4. User completes each set

For each set:

- timer runs
- reps are tracked
- set is marked as completed
- set duration is stored
- workout progress is updated in JSON

Example:

- Set 1 completed with 10 reps
- Set 2 completed with 10 reps
- Set 3 completed with 10 reps

Each completed set should be stored under the workout metrics.

---

## 5. JSON should store workout progress

The `userExercises.json` file should save:

- workout start date/time
- workout type
- exercise type
- total sets planned
- completed sets
- total reps completed
- total duration
- set-wise metrics

---

## 6. When all sets are completed, workout closes for that day

If the user selected `3` sets and all `3` sets are completed:

- workout status becomes `completed`
- session should be marked as closed for that day

Example flag:

```json
"session_closed_for_day": true