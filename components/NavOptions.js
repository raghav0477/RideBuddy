import React, { useState } from "react";
import {  FlatList,  Image,Modal,  StyleSheet,  Text,  TouchableOpacity,  View,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import Driverinfo from "./Driverinfo";

const data = [
  {
    id: "123",
    title: "Driver",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Rider",
    image: "https://links.papareact.com/3pn",
    screen: "RiderScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.navigate("MapScreen");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (item.screen === "MapScreen") {
                setModalVisible(true);
              } else {
                navigation.navigate(item.screen);
              }
            }}
            style={tw`p-2 pl-6 pb-5 pt-4 h-40 bg-gray-200 m-2 w-40`}
          >
            <View>
              <Image
                style={{ width: 120, height: 120, resizeMode: "contain" }}
                source={{ uri: item.image }}
              />
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter your information</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleModalClose}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Driverinfo/>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 40,
    width: 350,
    height: 350,
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
  modalText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
  },
});

export default NavOptions;
