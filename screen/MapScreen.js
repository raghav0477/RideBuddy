import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, {useState, useEffect} from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import PassengerOptions from "../components/PassengerOptions";
import * as Location from "expo-location";
const MapScreen = () => {
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
        {/* <MapView
          style={tw`h-80 w-80`}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        /> */}
      </View>
      <View style={tw`w-80`}>
        <PassengerOptions />
        <Text>Location:{JSON.stringify(mapRegion)}</Text>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
