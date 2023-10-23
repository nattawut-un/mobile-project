import { StyleSheet, View, Text, Image } from 'react-native'
import { Button } from 'react-native-paper';
import React from 'react'

import Icon from "assets/icon.png"
const AdminSuccess = () => {
    return (
        <View style={styles.container}>
            <Image source={Icon} style={styles.icon} />
            <Text style={styles.font}>Success!</Text>
            <Button style={styles.button} icon="home" mode="contained" onPress={() => console.log('Pressed')}>Back to home</Button>
        </View>
    )
}

export default AdminSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        height: 200,
        width: 200,
        marginTop: 170
    },
    font: {
        fontSize: 50,
        fontWeight: "bold"
    },
    button: {
        marginTop: 130
    }
})