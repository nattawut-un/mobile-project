import { StyleSheet, View, Image } from 'react-native'
import { Portal, PaperProvider, Text, Appbar, MD3Colors, Chip, Button } from 'react-native-paper';
import React from 'react'

import ItemImage from 'assets/1f4f7.jpg'

const AdminRedeem = () => {
    return (
        <View>
            <Image style={styles.ItemImages} source={ItemImage} />
            <View>
                <Text style={styles.header}>
                    PENPINEAPPLEAPPLEPEN
                </Text>
            </View>
            <View style={styles.infomation}>
                <Text>
                    99 $, Remaining: 2
                </Text>
                <Text>
                    Make you fun everyday
                </Text>
                <Text>
                    --------------------------------------------
                </Text>
            </View>
            <View style={styles.infomation}>
                <Text style={styles.detailuser}>
                    User: Firstname Lastname
                </Text>
                <Text style={styles.detailuser}>
                    Redeem ID: asdf123456
                </Text>
            </View>
            <View style={styles.infomation}>
                <Text style={styles.pointinfo}>
                    Points to use: 99 $
                </Text>
            </View>
            <View style={styles.buttonredeem}>
                <Button mode="contained" onPress={() => console.log('Pressed')}>
                    Redeem
                </Button>
            </View>
            <View style={styles.buttoncancle}>
                <Button mode="outlined" labelStyle={{ color: "purple" }} onPress={() => console.log('Pressed')}>
                    Cancle
                </Button>
            </View>
        </View>

    )
}

export default AdminRedeem

const styles = StyleSheet.create({
    ItemImages: {
        width: "100%",
        height: "40%",
    },
    header: {
        paddingLeft: 10,
        fontSize: 25,
    },
    infomation: {
        paddingLeft: 10
    },
    detailuser: {
        fontWeight: "bold"
    },
    pointinfo: {
        fontSize: 20,
        fontWeight: "bold"
    },
    buttonredeem: {
        marginTop: 130,
    },
    buttoncancle: {
        marginTop: 5
    }
})
