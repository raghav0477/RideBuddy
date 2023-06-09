import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import PassengerOptions from "../components/PassengerOptions";
import * as Location from "expo-location";
import Driverinfo from "../components/Driverinfo";
import { useFonts } from "expo-font";

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
    // console.log(location.coords.latitude, location.coords.longitude);
  };
  useEffect(() => {
    usersLocation();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    Gilroybold: require("../assets/fonts/Gilroy-Bold.ttf"),
    Gilroymid: require("../assets/fonts/Gilroy-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={tw`items-center flex-1 mt-10`}>
      <View>
        <MapView style={tw`h-80 w-80`} region={mapRegion}>
          <Marker coordinate={mapRegion} />
        </MapView>
      </View>
      <View style={tw`w-80`}>
        {/* <Text style={tw`items-center text-xl font-bold`}>Select a Rider</Text> */}

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Update Information</Text>
        </Pressable>
        <Text style={tw`items-center text-xl font-bold`}>Select a Rider</Text>

        <PassengerOptions />
        {/* <Text>Location:{JSON.stringify(mapRegion)}</Text> */}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={{ color: "#000" }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text
                style={[
                  {
                    color: "#000",
                    fontSize: 20,
                    position: "absolute",
                    top: -20,
                    right: -130,
                    padding: 5,
                  },
                ]}
              >
                X
              </Text>
            </Pressable>
            <Text style={styles.modalText}>Update Your Information</Text>
            <Text
              style={{
                display: "flex",
                justifyContent: "center",
                fontFamily: "Gilroymid",
                fontSize: 16,
              }}
            >
              Drivers{" "}
            </Text>

            <Driverinfo />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    height: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 8,
    width: 220,
    alignSelf: "center"
  },
  buttonOpen: {
    backgroundColor: "#026efd",
  },
  buttonClose: {
    backgroundColor: "#026efd",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
  },
  modalText: {
    // marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Gilroybold",
  },
});
