import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TextInput ,LogBox} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Spinner, Accordion, Paragraph, Square } from 'tamagui';


LogBox.ignoreAllLogs();
const HomeScreen = ({ navigation, route }) => {
  const currentUser = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.airtable.com/v0/appidD0yFo5gGZ3jt/tbltilUz7Nqmr817k", 
        {
          headers: {
            Authorization: "Bearer patxJisjLrPXSayT6.8b931c7c05bc4cdad24ef9507dcc09377c43209e5b52dbf83658b5d659fe6664",
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const responseData = await response.json();
        setData(responseData.records);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []); 

  const filteredData = data.filter(exercise => 
    {
    return exercise.fields.Exercise.toLowerCase().includes(searchQuery.toLowerCase()) ;
  });

  if (loading) {
    return (
      <View style={[styles.ContainerDiv, styles.loadingContainer]}>
        <Spinner size="large" color="$green10" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.ContainerDiv}>
      <StatusBar barStyle={'light-content'} />
  
      <ScrollView style={{flex: 1}}>
        <View style={styles.UserDiv}>
          <Avatar circular size="$6">
            <Avatar.Image src="http://picsum.photos/200/300" />
            <Avatar.Fallback bc="red" />
          </Avatar>
          <Text style={styles.TitleText}>Welcome {currentUser.name}</Text>
        </View>

        <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for exercises..."
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <View style={styles.AccordionContainer}>
        <Accordion overflow="hidden" width="$20" type="multiple"  style={styles.accordionItem}>
        {filteredData.map((exercise, index) => {
  if (exercise.fields.Example && exercise.fields.Notes) 
  {
    return (
      <Accordion.Item key={index} value={`a${index}`} style={styles.accordionItem}>
        <Accordion.Trigger style={styles.accordionItem} flexDirection="row" justifyContent="space-between">
          {({ open }) => (
            <>
              <Paragraph style={styles.text}>{exercise.fields.Exercise}</Paragraph>
              <Square animation="quick" rotate={open ? '180deg' : '0deg'} />
            </>
          )}
        </Accordion.Trigger>
        <Accordion.Content style={styles.accordionContent}>
          <Paragraph style={styles.text}>{exercise.fields.Notes}</Paragraph>
          <Avatar circular size="$10">
            <Avatar.Image src={exercise.fields.Example[0].url} />
            <Avatar.Fallback bc="red" />
          </Avatar>
        </Accordion.Content>
      </Accordion.Item>
    );
  } else {
    return null; 
  }
})}
        </Accordion>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#C8E6CB',
    paddingTop: 15,
  },
  text: {
    color: '#C8E6CB',
  },
  ContainerDiv: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#101010',
  },
  loadingContainer: {
    justifyContent: 'center',
  },
  UserDiv: {
    padding: 20,
    paddingTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AccordionContainer:
  {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  accordionItem: {
    backgroundColor: '#1C1C1C',
  },
  accordionContent:
  {
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#101010',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
