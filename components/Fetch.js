// import { StyleSheet, Text, View } from 'react-native'
// import React,{useState, useEffect} from 'react';
// import { firebase } from "../config";
// import { FlatList } from 'react-native-gesture-handler';
// import { Pressable } from 'react-native';

// const Fetch = () => {
//     const [users, setUsers] = useState([])
//     const fetchData = firebase.firestore().collection("passengers");
//     useEffect(() => {
//      fetchData
//      .onSnapshot(
//         querySnapshot =>{
//             const users = []
//             querySnapshot.forEach((doc) => {
//                 const {firstName,location} = doc.data()
//                 users.push({
//                     id: doc.id,
//                     firstName,
//                     location                 
//                 })
//             });
//             setUsers(users)
//         }
//      )
//     }, [])
    

//   return (
//     <View>
//       <FlatList
//         style={{ height: 100 }}
//         data={users}
//         numColumns={1}
//         renderItem={({ item }) => (
//           <Pressable>
//             <View>
//               <Text>Hello {item.firstName}</Text>
//               <Text>{item.location}</Text>
//             </View>
//           </Pressable>
//         )}
//       />
//     </View>
//   );
// }

// export default Fetch

// const styles = StyleSheet.create({})

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { firebase } from "../config";
import { FlatList } from "react-native-gesture-handler";
import { Pressable } from "react-native";

const Fetch = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("driver/JSuLTh1p9CZZeHCOvKlu4iewgdH2/additionalData")
          .once("value");
        const data = snapshot.val();
        if (data) {
          const users = Object.keys(data).map((key) => ({
            id: key,
            vehicleType: data[key].vehicleType,
            number: data[key].number,
          }));
          setUsers(users);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        style={{ height: 50 }}
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable>
            <View>
              <Text>{item.vehicleType}</Text>
              <Text>{item.number}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Fetch;

const styles = StyleSheet.create({});
