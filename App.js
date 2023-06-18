import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";
import { store } from "./store";
import Login from "./screen/Login";
import Registeration from "./screen/Registeration";
import HomeScreen from "./screen/HomeScreen";
import MapScreen from "./screen/MapScreen";
import Fetch from './components/Fetch'

import { Provider } from "react-redux";
import RiderScreen from "./components/RiderScreen";
import Logo2 from "./components/Logo2";

const Stack = createStackNavigator();
function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={Registeration}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  function LogoTitle() {
    return (
      <Image
        style={{ width: 80, height: 18 }}
        source={require("./assets/OG_copy.png")}
      />
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerTitle: "Driver Screen" }}
      />
      <Stack.Screen
        name="RiderScreen"
        component={RiderScreen}
        // options={{ }}
      />
      {/* <Stack.Screen
        name="Fetch"
        component={Fetch}
        // options={{ }}
      >
        {props => <Fetch {...props} user = {user} />}
      </Stack.Screen> */}
      <Stack.Screen name="Fetch"
      component={Fetch}/>
    </Stack.Navigator>
  );
}
export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  );
};
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
