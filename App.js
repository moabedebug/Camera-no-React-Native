import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

import { Camera } from 'expo-camera';
import { CameraType } from "expo-camera/build/Camera.types"

import { FontAwesome } from "@expo/vector-icons"

export default function App() {

  const [type, setType] = useState(Camera.Constants.Type.back)
  const [hasPermission , setHasPermission] = useState(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  if(hasPermission == null){
    return <View/>
  }

  if(hasPermission === false){
    return <Text>Acesso negado</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
      style={styles.camera}
        type={type}
      >
        <View styles={styles.contentButtons}>
          <TouchableOpacity 
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
              )
            }}
            >
              <FontAwesome name="exchange" size={23} color="red"></FontAwesome>
          </TouchableOpacity>
        </View>
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  contentButtons: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  buttonFlip: {
    position: "absolute",
    top: 725,
    left: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    height: 55,
    width: 55,
    borderRadius: 50,
  },
});
