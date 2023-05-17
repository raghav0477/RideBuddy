  import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
  import React,{useState} from 'react';
  import { useNavigation } from '@react-navigation/native';
  import {firebase} from '../config'
  import { useFonts } from "expo-font";
  import Logo from '../components/Logo';

  const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    loginUser = async(email, password) =>{
      try{
        await firebase.auth().signInWithEmailAndPassword(email, password)
      }catch(error){
        alert(error.message)
      }
    }
    const [fontsLoaded] = useFonts({
      Gilroybold: require("../assets/fonts/Gilroy-Bold.ttf"),
      Gilroymid: require("../assets/fonts/Gilroy-Medium.ttf"),
    });
    if (!fontsLoaded) {
      return null;
    }

    //Forget Password
    const forgetPassword = () =>{
      firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent")
      }).catch((error) =>{
        alert(error)
      })
    }

    return (
      <View style={styles.container}>
        <Logo />
        <Text
          style={{
            fontSize: 24,
            marginBottom: 10,
            fontFamily: "Gilroybold",
          }}
        >
          Welcome back!
        </Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            // textAlign="left"
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            // textAlign="right"
          />
        </View>
        <TouchableOpacity
          onPress={() => loginUser(email, password)}
          style={styles.button}
        >
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Gilroybold",
              color: "#fff",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Registration")}
          style={{ marginTop: 20 }}
        >
          <Text style={{ fontWeight: "normal", fontSize: 18 }}>
            Don't have an account?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            forgetPassword();
          }}
          style={{ marginTop: 20 }}
        >
          <Text style={{ fontWeight: "normal", fontSize: 18 }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  export default Login

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
    },
    // inputBox: {
    //   borderColor: "#000",
    //   width: 40,
    //   alignItems: "center",
    // },
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
      color: '#fff'
    },
  });