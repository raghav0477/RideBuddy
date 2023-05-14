
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Dimensions,
//   Button,
//   TouchableOpacity,
//   DrawerLayoutAndroid,
// } from "react-native";
// import tw from "tailwind-react-native-classnames";
// import NavOptions from '../components/NavOptions'
// import MapScreen from "./MapScreen";
// import React, {useState, useEffect, useRef} from 'react'
// import firebase from 'firebase/compat';
// import Logo2 from "../components/Logo2";
// import { GOOGLE_MAPS_APIKEY } from "@env";
// import Fetch from "../components/Fetch";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from 'expo-location';
// // import {firebase } from '../config'

// const HomeScreen = () => {
//   const [name, setName] = useState("");
//     useEffect(()=>{
//       firebase.firestore().collection('users')
//       .doc(firebase.auth().currentUser.uid).get()
//       .then((snapshot ) =>{
//         if(snapshot.exists){
//           setName(snapshot.data())
//         }
//         else{
//           console.log('user does not exist')
//         }
//       })
//     },[]);
//     const [mapRegion, setMapRegion] = useState({
//       latitude: 32.7266,
//       longitude: 74.8570,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     });
//     const usersLocation = async () =>{
//       let {status} = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted'){
//         setErrorMsg('Permission to access Location Denied')
//       }
//       let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
//       setMapRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.922,
//         longitudeDelta: 0.0421,
//       });
//       console.log(location.coords.latitude, location.coords.longitude)
//     }
//     useEffect(()=>{
//       usersLocation();
//     },[])
//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         {/* <TouchableOpacity onPress={openDrawer}>
//           <Image source={require(".")} />
//           <Text style={styles.icon}>Open Drawer</Text>
//         </TouchableOpacity> */}
//         <Logo2 />
//         <View style={styles.elements}>
//           <Text style={tw`p-5 mt-5 text-xl font-bold`}>
//             Hello , {name.firstName}
//           </Text>
//           <Text style={tw`pb-2 text-lg font-semibold`}>
//             What are You Today??
//           </Text>
//           <NavOptions style={styles.abb} />
//           <Fetch />
//         </View>
//         {/* <View>
//             <MapView style={styles.map} region={mapRegion}>
//               <Marker coordinate={mapRegion} />
//             </MapView>
//             <Button title="get" onPress={usersLocation} />
//           </View> */}
//       </View>
//     </SafeAreaView>
//   );
// }

// export default HomeScreen

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Button,
  TouchableOpacity,
  DrawerLayoutAndroid,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions'
import MapScreen from "./MapScreen";
import React, {useState, useEffect, useRef} from 'react'
import firebase from 'firebase/compat';
import Logo2 from "../components/Logo2";
import { GOOGLE_MAPS_APIKEY } from "@env";
import Fetch from "../components/Fetch";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
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
    },[]);
    const [mapRegion, setMapRegion] = useState({
      latitude: 32.7266,
      longitude: 74.8570,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    const usersLocation = async () =>{
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted'){
        setErrorMsg('Permission to access Location Denied')
      }
      let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.922,
        longitudeDelta: 0.0421,
      });
      console.log(location.coords.latitude, location.coords.longitude)
    }
    useEffect(()=>{
      usersLocation();
    },[])
  return (
    <SafeAreaView style={styles.container}>
      <Logo2 />
      <View style={styles.elements}>
        <Text style={tw`p-5 mt-5 text-xl font-bold`}>
          Hello , {name.firstName}
        </Text>
        <Text style={tw`pb-2 text-lg font-semibold`}>What are You Today??</Text>
        <NavOptions />
        {/* <Fetch /> */}
      </View>
      <View>
        <MapView style={styles.map} region={mapRegion}>
          <Marker coordinate={mapRegion} />
        </MapView>
        <Button title="get" onPress={usersLocation} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
   map:{
    width:80,
    height: 80,
  },
});