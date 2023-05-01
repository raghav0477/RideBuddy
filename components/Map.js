import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import MapView from "react-native-maps";

const Map = () => {
  return (
    // <Text>Hwllo</Text>
    <SafeAreaView style={tw`items-center flex-1 mt-20`}>
      <View>
        <MapView
          style={tw`h-1/2 w-80`}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({});
