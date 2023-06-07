import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";

const DriverInfo = () => {
  const navigation = useNavigation();

  const handleSubmit = async (values, resetForm) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const driverRef = firebase
        .database()
        .ref("driver")
        .child(currentUser.uid);
      try {
        await driverRef.set(values);
        resetForm();
        navigation.navigate("MapScreen");
      } catch (error) {
        console.error("Error updating driver information:", error);
      }
    }
  };
  const [userName, setUserName] = useState("")
  const [addData, setAddData] = useState("");
  const [num, setNum] = useState("");
  const [userDestination, setUserDestination] = useState("")
  const handleAddField = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const driverRef = firebase
        .database()
        .ref("driver")
        .child(currentUser.uid);
      try {
        await driverRef.child("updatedData").push().set({
          vehicleType: addData,
          number: num,
          destination: userDestination,
          userName: userName
        });
        setAddData("");
        setNum("");
        Keyboard.dismiss();
        navigation.navigate("MapScreen");
      } catch (error) {
        console.error("Error updating driver information:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={setUserName}
        value={userName}
      />
      <TextInput
        style={styles.input}
        placeholder="Vehicle Type"
        onChangeText={setAddData}
        value={addData}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        onChangeText={setUserDestination}
        value={userDestination}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Seats Available"
        onChangeText={setNum}
        value={num}
        keyboardType="numeric"
      />

      <Pressable
        style={[styles.btn]}
        onPress={() =>
          handleAddField(
            {
              vehicleType: addData,
              numSeats: num,
              destination: userDestination,
              userName: userName
            },
            () => {}
          )
        }
      >
        <Text style={{ color: "#fff" }}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 220,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  },
  btn: {
    backgroundColor: "#026efd",
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
  },
});

export default DriverInfo;
