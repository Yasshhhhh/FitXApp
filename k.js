import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback,Text, View,Image, ScrollView} from 'react-native';
import {React,useState} from 'react';
export default function App() 
{
  const handlePress =()=>
  {
    console.log("Image Pressed");
  }
  let exercises = [
    {
        name: "Bench Press",
        workouts: [
            { 
             date: new Date("2024-03-10"), 
             sets: [
                { weight: 55, reps: 15 },
                { weight: 55, reps: 12 },
                { weight: 55, reps: 10 },
            ]},
        ],
    },
    {
        name: "Deadlift",
        workouts: [
            { date: new Date("2024-03-11"), 
            sets: [
                { weight: 135, reps: 10 },
                { weight: 185, reps: 8 },
                { weight: 225, reps: 6 },
            ]},
        ],
    },
    {
        name: "Squat",
        workouts: [
            { date: new Date("2024-03-12"), sets: [
                { weight: 135, reps: 12 },
                { weight: 185, reps: 10 },
                { weight: 225, reps: 8 },
            ]},
        ],
    },
    {
        name: "Pull-ups",
        workouts: [
            { date: new Date("2024-03-13"), sets: [
                { weight: 0, reps: 10 },
                { weight: 0, reps: 8 },
                { weight: 0, reps: 6 },
            ]},
        ],
    },
    {
        name: "Push-ups",
        workouts: [
            { date: new Date("2024-03-14"), sets: [
                { weight: 0, reps: 20 },
                { weight: 0, reps: 15 },
                { weight: 0, reps: 12 },
            ]},
        ],
    },
    {
        name: "Barbell Row",
        workouts: [
            { date: new Date("2024-03-15"), sets: [
                { weight: 95, reps: 12 },
                { weight: 115, reps: 10 },
                { weight: 135, reps: 8 },
            ]},
        ],
    },
    {
        name: "Dumbbell Shoulder Press",
        workouts: [
            { date: new Date("2024-03-16"), sets: [
                { weight: 30, reps: 12 },
                { weight: 35, reps: 10 },
                { weight: 40, reps: 8 },
            ]},
        ],
    },
    {
        name: "Leg Press",
        workouts: [
            { date: new Date("2024-03-17"), sets: [
                { weight: 180, reps: 15 },
                { weight: 270, reps: 12 },
                { weight: 360, reps: 10 },
            ]},
        ],
    },
    {
        name: "Lunges",
        workouts: [
            { date: new Date("2024-03-18"), sets: [
                { weight: 0, reps: 20 },
                { weight: 0, reps: 16 },
                { weight: 0, reps: 12 },
            ]},
        ],
    },
    {
        name: "Plank",
        workouts: [
            { date: new Date("2024-03-19"), sets: [
                { weight: 0, reps: 60 },
                { weight: 0, reps: 45 },
                { weight: 0, reps: 30 },
            ]},
        ],
    },
];

console.log(exercises);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    {exercises.map((e)=>(
      e.workouts.map((w)=>(
      w.sets.map((s)=>(
        <View>
      <Text className="text-red-500">{e.name} on {w.date.toLocaleDateString()}</Text>
      <Text >{w.sets[0].weight}kg:{w.sets[0].reps}reps</Text>   
      <Text> </Text>   
      </View>
      )
      )
      )
      )
    ))
    }
    </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
