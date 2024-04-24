import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet,View, TouchableWithoutFeedback, Text, Image, ScrollView ,LogBox,AppRegistry} from 'react-native';
import React from 'react';
import { TamaguiProvider } from '@tamagui/core'
import 'react-native-gesture-handler';
import Navigation from './navigation';
import tamaguiConfig from './tamagui.config'
export default function App() 
{
  LogBox.ignoreAllLogs();
  console.disableYellowBox = true;
  return (
   <TamaguiProvider config={tamaguiConfig}>

    <View style={styles.container}>
      <Navigation />
    </View>
     </TamaguiProvider> 
  );
}
console.disableYellowBox = true;
AppRegistry.registerComponent('main',() => App);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
