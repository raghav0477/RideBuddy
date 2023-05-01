import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react';
import { firebase } from "../config";
import { FlatList } from 'react-native-gesture-handler';
import { Pressable } from 'react-native';

const Fetch = () => {
    const [users, setUsers] = useState([])
    const fetchData = firebase.firestore().collection('users');
    useEffect(() => {
     fetchData
     .onSnapshot(
        querySnapshot =>{
            const users = []
            querySnapshot.forEach((doc) => {
                const {firstName} = doc.data()
                users.push({
                    id: doc.id,
                    firstName
                })
            });
            setUsers(users)
        }
     )
    }, [])
    

  return (
    <View>
      <FlatList
        style={{ height: 100 }}
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable>
            <View>
              <Text>{item.firstName}</Text>
              <Text>{item.firstName}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

export default Fetch

const styles = StyleSheet.create({})