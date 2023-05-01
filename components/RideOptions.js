import { StyleSheet, Text, View, FlatList,TouchableOpacity,SafeAreaView  } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';

const data = [
  {
    id: "123",
    name: "Rohan",
    type: "Car",
    seats: "3",
  },
  {
    id: "456",
    name: "Mohit",
    type: "Bike",
    seats: "1",
  },
];

const RideOptions = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={tw`items-center text-xl font-bold`}>Select a Rider</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={tw`mt-2 mb-2 p-2 bg-gray-200`}>
              <View>
                <Text style={tw`text-lg font-semibold`}>{item.name}</Text>
                <Text>Vehicle Type: {item.type}</Text>
                <Text>Seats Available: {item.seats}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default RideOptions

const styles = StyleSheet.create({
  container:{
    width:'100%',
    marginLeft:1,
  }
})