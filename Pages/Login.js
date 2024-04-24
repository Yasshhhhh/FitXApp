import React, { useState } from 'react';
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";


    export default function Login({navigation}) 
    {
   const [email,setEmail]=useState("john@gmail.com")
   const [password,setPassword]=useState("123")


   async function handleSubmit() 
   {
    // console.log(email);
    // console.log(password);
    try {
      const response = await fetch('http://192.168.1.6:8000/login', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify content type
        },
        body: JSON.stringify({ email, password }), // Convert data to JSON string
      });
  
      // console.log(response);
      if (response.status==404) 
      {
        alert("Incorrect Credentials");
        throw new Error('User not found');
      }
      const user=await response.json();
      // console.log("HEREE");
      // console.log(user)
      navigation.navigate('TabNavigator',user)
      console.log("Request successful");
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://192.168.1.6:8000/login');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }
  //     const data = await response.text();
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     // Handle error
  //   }
  // };
  
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
            <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray" _dark={{
        color: "warmGray"
      }}>
          Welcome
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">

      {/* Email Form */}
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input value={email} onChangeText={setEmail} />
          </FormControl>

          {/* Passwor Form */}
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" value={password} onChangeText={setPassword}/>
            <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
              Forgot Password?
            </Link>
          </FormControl>

          {/* Submit Button */}
          <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
            Sign in
          </Button>

          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              I'm a new user.{" "}
            </Text>
            <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} href="#">
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
            </Center>
          </NativeBaseProvider>
        );
    };