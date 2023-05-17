import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from 'react'
import tw from "tailwind-react-native-classnames";
import MapView, { Marker } from "react-native-maps";
import RideOptions from "./RideOptions";
import * as Location from "expo-location";

const RiderScreen = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 32.7266,
    longitude: 74.857,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const usersLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access Location Denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };
  useEffect(() => {
    usersLocation();
  }, []);
  return (
    <SafeAreaView style={tw`items-center flex-1 mt-20`}>
      <View>
        <MapView style={tw`h-80 w-80`} region={mapRegion}>
          <Marker coordinate={mapRegion} />
        </MapView>
      </View>
      <View style={tw`w-80`}>
        <RideOptions />
      </View>
    </SafeAreaView>
  );
}

export default RiderScreen

const styles = StyleSheet.create({})