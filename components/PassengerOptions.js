import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity,Button } from "react-native";
import React from 'react'
import tw from "tailwind-react-native-classnames";
const data = [
  {
    id: "123",
    name: "Arun",
    location: 'Ban Talab'
  },
  {
    id: "456",
    name: "Varun",
    location: 'Janipur'
  },
];
const PassengerOptions = (usersLocation) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={tw`items-center text-xl font-bold`}>
          Passengers around you..
        </Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={tw`mt-2 mb-2 p-2 bg-gray-200`}>
              <View>
                <Text style={tw`text-lg font-semibold`}>{item.name}</Text>
                <Text>Location: {item.location}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        {/* <View>
          <MapView style={styles.map} region={mapRegion}>
            <Marker coordinate={mapRegion} />
          </MapView>
          <Button title="get" onPress={usersLocation} />
        </View> */}
      </View>
    </SafeAreaView>
  );
}

export default PassengerOptions

const styles = StyleSheet.create({})