import React, { useState } from "react";
import {  FlatList,  Image,Modal,  StyleSheet,  Text,  TouchableOpacity,  View,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

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
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`p-2 pl-6 pb-5 pt-4 h-40 bg-gray-200 m-2 w-40`}
            onPress={() => navigation.navigate(item.screen)

            }
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
});

export default NavOptions;
