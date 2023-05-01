
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions'
import MapScreen from "./MapScreen";
import React, {useState, useEffect} from 'react'
import firebase from 'firebase/compat';
import Logo2 from "../components/Logo2";
import { GOOGLE_MAPS_APIKEY } from "@env";
import Fetch from "../components/Fetch";
// import {firebase } from '../config'

const HomeScreen = () => {
  const [name, setName] = useState("");
    useEffect(()=>{
      firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot ) =>{
        if(snapshot.exists){
          setName(snapshot.data())
        }
        else{
          console.log('user does not exist')
        }
      })
    },[])
  return (
    <SafeAreaView style={styles.container}>
     <Logo2/>
      <View style={styles.elements}>
        <Text style={tw`p-5 mt-5 text-xl font-bold`}>
          Hello , {name.firstName}
        </Text>
        <Text style={tw`pb-2 text-lg font-semibold`}>What are You Today??</Text>
        <NavOptions />
        {/* <Fetch/> */}
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  elements: {
    alignItems: "center",
    justifyContent: "center",
  },
});