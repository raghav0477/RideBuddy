import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import RideOptions from "../components/RideOptions";
import tw from "tailwind-react-native-classnames";
// import MapView from "react-native-maps";
const MapScreen = () => {
  return (
    <SafeAreaView style={tw`items-center flex-1 mt-20`}>
      <View>
        <MapView
          style={tw`h-80 w-80`}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
      <View style={tw`w-80`}>
        <RideOptions />
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
