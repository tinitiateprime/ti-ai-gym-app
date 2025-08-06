// /components/TimerComponent.js
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TimerComponent({ duration, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const toggleTimer = () => setRunning(!running);

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{timeLeft}s</Text>
      <Button title={running ? 'Pause' : 'Start'} onPress={toggleTimer} />
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
