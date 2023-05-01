import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import logo2 from '../assets/OGFull.png'

const Logo2 = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo2}/>
    </View>
  )
}

export default Logo2

const styles = StyleSheet.create({
    container:{
        marginTop:50,
        alignItems:'center'
    },
    logo:{
        width:120,
        height:18,
    }
})