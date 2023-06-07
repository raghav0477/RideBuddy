import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";

const PassengerInfo = () => {
  const navigation = useNavigation();

  const handleSubmit = async (values, { resetForm }) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      try {
        await firebase.database().ref(`passengers/${userId}`).set(values);
        resetForm();
        navigation.navigate("MapScreen");
      } catch (error) {
        console.error("Error updating user document:", error);
      }
    }
  };

  const addField = async (addData, num) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      try {
        await firebase
          .database()
          .ref(`passengers/${userId}/additionalData`)
          .push({ location: addData, number: num, destination: userDestination, userName: userName });
        setAddData("");
        setNum("");
        Keyboard.dismiss();
        navigation.navigate("RiderScreen");
      } catch (error) {
        console.error("Error updating user document:", error);
      }
    }
  };
  const [userName, setUserName] = useState("")
  const [addData, setAddData] = useState("");
  const [num, setNum] = useState("");
  const [userDestination, setUserDestination] = useState("")

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ vehicleType: "", numPassengers: "" }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter Your name"
              onChangeText={setUserName}
              value={userName}
            />
            <TextInput
              style={styles.input}
              placeholder="Pick up Location"
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
              placeholder="Number of Passengers"
              onChangeText={(number) => setNum(number)}
              value={num}
              keyboardType="numeric"
            />

            <Pressable
              style={[styles.btn]}
              onPress={() => addField(addData, num, userDestination, userName)}
            >
              <Text style={{ color: "#fff" }}>Update</Text>
            </Pressable>
          </>
        )}
      </Formik>
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

export default PassengerInfo;
