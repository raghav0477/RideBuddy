// import React,{useState} from "react";
// import { Button, StyleSheet, TextInput, View } from "react-native";
// import { Formik } from "formik";
// import { firebase } from "../config";
// import tw from "tailwind-react-native-classnames";
// import { useNavigation } from "@react-navigation/native";
// import { Keyboard } from "react-native";


// const Driverinfo = () => {
//     const [modalVisible, setModalVisible] = useState(false);
//       const navigation = useNavigation();

//   const handleSubmit = (values, { resetForm }) => {
//     // firebase.database().ref("users").push(values);
//     firebase.firestore().collection("users").add(values);
//     resetForm();
//     setModalVisible(false);
//     navigation.navigate("MapScreen");
//   };
//   const todoRef = firebase.firestore().collection('users');
//   const [addData, setAddData] = useState('');
//   const [num, setNum] = useState('')
//   // const addField =(addData, num)=>{
//   //   if(addData && addData.length>0){
//   //     const data= {
//   //       vehicleType:addData,
//   //     };
//   //     const numData = {
//   //       number: num,
//   //     };
//   //     todoRef
//   //     .add(data)
//   //     .then(()=>{
//   //       setAddData('');
//   //       Keyboard.dismiss();
//   //     })
//   //     .catch((error)=>{
//   //       alert(error);
//   //     })
//   //   navigation.navigate("MapScreen");

//   //   }
//   // }
//   const addField = (addData, num) => {
//     if (addData && addData.length > 0 && num && num.length > 0) {
//       const data = {
//         vehicleType: addData,
//         number: num,
//       };
//       todoRef
//         .add(data)
//         .then(() => {
//           setAddData("");
//           setNum("");
//           Keyboard.dismiss();
//         })
//         .catch((error) => {
//           alert(error);
//         });
//         navigation.navigate("MapScreen");
//       }
//   };

//   return (
//     <View style={styles.container}>
//       <Formik
//         initialValues={{ vehicleType: "", numPassengers: "" }}
//         onSubmit={handleSubmit}
//       >
//         {({ handleChange, handleSubmit, values }) => (
//           <>
//             <TextInput
//               style={styles.input}
//               placeholder="Vehicle Type"
//               onChangeText={(vehicleType) => setAddData(vehicleType)}
//               value={addData}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Number of Passengers"
//               onChangeText={(number) => setNum(number)}
//               value={num}
//               keyboardType="numeric"
//             />
//             <Button
//               style={styles.btn}
//               title="Submit"
//               onPress={() => addField(addData, num)}
//             />
//           </>
//         )}
//       </Formik>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   input: {
//     width: 220,
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 5,
//   },
//   btn:{
//     backgroundColor:"#000"
//   }
// });

// export default Driverinfo;

import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Formik } from "formik";
import { firebase } from "../config";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";

const Driverinfo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async (values, { resetForm }) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userDocRef = firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid);
      try {
        await userDocRef.update(values);
        resetForm();
        setModalVisible(false);
        navigation.navigate("MapScreen");
      } catch (error) {
        console.error("Error updating user document:", error);
      }
    }
  };

  const addField = async (addData, num) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userDocRef = firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid);
      try {
        await userDocRef.update({
          additionalData: firebase.firestore.FieldValue.arrayUnion({
            vehicleType: addData,
            number: num,
          }),
        });
        setAddData("");
        setNum("");
        Keyboard.dismiss();
        navigation.navigate("MapScreen");
      } catch (error) {
        console.error("Error updating user document:", error);
      }
    }
  };

  const [addData, setAddData] = useState("");
  const [num, setNum] = useState("");

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
              placeholder="Vehicle Type"
              onChangeText={(vehicleType) => setAddData(vehicleType)}
              value={addData}
            />
            <TextInput
              style={styles.input}
              placeholder="Number of Seats available"
              onChangeText={(number) => setNum(number)}
              value={num}
              keyboardType="numeric"
            />
            {/* <Button style={styles.btn} title="Submit" onPress={handleSubmit} /> */}
            <Button
              style={styles.btn}
              title="Add Field"
              onPress={() => addField(addData, num)}
            />
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
    padding: 10,
    marginBottom: 5,
  },
  btn: {
    backgroundColor: "#000",
  },
});

export default Driverinfo;
