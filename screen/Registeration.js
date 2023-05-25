import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../config";
import Logo from "../components/Logo";

const Registeration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");

  registerUser = async (email, password, firstName) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://ridebuddy-6.firebaseapp.com/",
          })
          .then(() => {
            alert("Verification email sent");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                // lastName,
                email,
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={{ fontWeight: "bold", fontSize: 23 }}>
        Create a New Account..
      </Text>
      <View style={{ marginTop: 25 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Your Name"
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCorrect={false}
        />
        {/* <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCorrect={false}
        /> */}
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => registerUser(email, password, firstName)}
        style={styles.button}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: "Gilroybold",
            color: "#fff",
          }}
        >
          Register Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registeration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  textInput: {
    paddingTop: 10,
    paddingBottom: 10,
    width: 300,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#808080",
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    marginTop: 30,
    height: 55,
    width: 180,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    color: "#fff",
  },
});
