import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Alert
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { useFonts } from "expo-font";
import Fetch from "./Fetch";

const data = [
  {
    id: "123",
    name: "Arun",
    location: "Ban Talab",
    image: require("../assets/person1.jpg"),
  },
  {
    id: "456",
    name: "Muskan",
    location: "Janipur",
    image: require("../assets/person3.jpg"),
  },
];

const PassengerOptions = () => {
  const [showOptions, setShowOptions] = useState(null);
  const [modalVisible, setModalVisible] = useState(false)
  const toggleOptions = (itemId) => {
    setShowOptions(itemId === showOptions ? null : itemId);
  };

  const [fontsLoaded] = useFonts({
    Gilroybold: require("../assets/fonts/Gilroy-Bold.ttf"),
    Gilroymid: require("../assets/fonts/Gilroy-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const animated = new Animated.Value(1);

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };
const openPopup = () => {
  Alert.alert("Opps!!", "This feature is not yet available.");
};
  const renderListItem = ({ item }) => (
    <View>
      <TouchableOpacity
        onPress={() => toggleOptions(item.id)}
        style={[tw`mt-2 mb-2 p-4 bg-gray-200`]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image source={item.image} style={styles.image} />
          <View style={{ marginLeft: 10 }}>
            <Text style={[tw`text-lg`, { fontFamily: "Gilroybold" }]}>
              {item.name}
            </Text>
            <Text style={{ fontFamily: "Gilroymid" }}>
              Location: {item.location}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "black",
            marginTop: 15,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        {showOptions === item.id && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Pressable
              onPressIn={fadeIn}
              onPress={() => setModalVisible(true)}
              onPressOut={fadeOut}
            >
              <Animated.View
                style={[
                  styles.btn,
                  { backgroundColor: "#026efd", opacity: animated },
                ]}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Offer</Text>
              </Animated.View>
            </Pressable>
            <Pressable onPress={openPopup }>
              <Animated.View
                style={[
                  styles.btn,
                  {
                    backgroundColor: "#fff",
                  },
                ]}
              >
                <Text style={{ color: "#026efd", fontSize: 16 }}>Chat</Text>
              </Animated.View>
            </Pressable>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
      />
      <Modal
        animationType="fade"
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
            <View style={{ display: "flex", alignItems: "center" }}>
              <Text style={styles.modalText}>Ride Offered!</Text>
              <Image
                style={{ width: 100, height: 100, margin: 10 }}
                source={require("../assets/tick.png")}
              />
              <Text style={[styles.modalText, { fontFamily: "Gilroymid" }]}>
                Waiting for the confirmation{" "}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PassengerOptions;

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  container: {
    width: "100%",
    marginLeft: 1,
  },
  btn: {
    width: 110,
    borderRadius: 10,
    alignItems: "center",
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginTop: 8,
    borderColor: "#026efd",
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  modalView: {
    margin: 20,
    width: 280,
    height: 260,
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
    alignSelf: "center",
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Gilroybold",
  },
});
