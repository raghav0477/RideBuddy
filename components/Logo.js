import { StyleSheet, Image, Text, View } from 'react-native'
import React from 'react'
import logo from '../assets/OG.png'
const Logo = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({
    container:{
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width:100,
        height:100
    }
})