import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SelectDropdown from 'react-native-select-dropdown';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';

export default function Exercises({ navigation, route }) {
  const currentUser = route.params;
  const exercises = currentUser.exercises.map(e => e.name);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(-1);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (selectedExerciseIndex !== -1) {
      const markedDatesObj = {};
      currentUser.exercises[selectedExerciseIndex].workouts.forEach(workout => {
        const dateString = moment(workout.date).format('YYYY-MM-DD');
        markedDatesObj[dateString] = { marked: true };
      });
      setMarkedDates(markedDatesObj);
    }
  }, [selectedExerciseIndex]);

  const renderWorkoutsForDate = date => {
    setSelectedDate(date.dateString);
  };

  const renderWorkouts = () => {
    if (!selectedDate) return null;

    const selectedWorkouts = currentUser.exercises[selectedExerciseIndex].workouts.filter(
      workout => moment(workout.date).format('YYYY-MM-DD') === selectedDate
    );

    return selectedWorkouts.map((workout, index) => (
      <View key={index} style={styles.workoutContainer}>
        <Text style={styles.dateText}>Date: {moment(workout.date).format('MMMM Do YYYY')}</Text>
        {workout.sets.map((set, setIndex) => (
          <Text key={setIndex} style={styles.setText}>Set {setIndex + 1}: {set.weight} kgs x {set.reps} reps</Text>
        ))}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.selectContainer}>
          <SelectDropdown
            data={exercises}
            onSelect={(selectedItem, index) => {
              setSelectedExercise(selectedItem);
              setSelectedExerciseIndex(index);
            }}
            defaultButtonText="Select Exercise"
            buttonTextAfterSelection={(selectedItem) => {
              return "Select Exercise";
            }}
            buttonStyle={[styles.selectButton, { color: '#C8E6CB' }]}
            dropdownStyle={styles.dropdown}
            rowTextStyle={[styles.dropdownText, { color: '#C8E6CB' }]}
          />
        </View>
        {selectedExerciseIndex !== -1 && (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{selectedExercise}</Text>
            <Calendar
              markingType={'custom'}
              markedDates={markedDates}
              onDayPress={renderWorkoutsForDate}
              style={styles.calendar}
            />
            {renderWorkouts()}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  selectContainer: {
    backgroundColor: '#101010',
    paddingHorizontal: 20,
    marginTop: 20,
    width: '80%',
    borderRadius: 10,
  },
  selectButton: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#C8E6CB',
    color:"#C8E6CB"
  },
  dropdown: {
    backgroundColor: '#1C1C1C',
    color:"#C8E6CB"
  },
  dropdownText: {
    color: 'white',
  },
  exerciseContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  calendar: {
    marginBottom: 20,
    backgroundColor: '#1C1C1C',
  },
  workoutContainer: {
    backgroundColor: '#1C1C1C',
    padding: 10,
    marginTop: 10,
    width: '80%',
    borderRadius: 10,
  },
  dateText: {
    color: '#C8E6CB',
    marginBottom: 5,
  },
  setText: {
    color: '#C8E6CB',
  },
});
