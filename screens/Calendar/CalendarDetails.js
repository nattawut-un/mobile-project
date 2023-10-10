import { View, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import ListCard from 'components/ListCard'
import TestImage from '../../assets/JastKherZ.png'

const CalendarDetails = () => {
    return (
        <ScrollView style={styles.container}> 
                <View style={{ width: '100%', paddingVertical: 16 }}>
                    <Text variant='headlineLarge'>
                        Monday, August 7
                    </Text>
                    <Text variant='labelLarge'>
                        1 homework(s)
                    </Text>
                </View>
                <View>
                    {[...Array(10000000).keys()].map((n, i) => (
                        <ListCard
                            key={i}
                            title={'Homework Title ' + n + "\n" + "Mobile Device Programming"}
                            description={
                                'Nisi ea est veniam adipisicing aliqua est aliqua dolore laboris. ' +
                                n
                            }
                            image={TestImage}
                        />
                    ))}
                </View>
        </ScrollView>
    )
}

export default CalendarDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16
    },
    header_text: {
        fontSize: 20
    },
    imagesize: {
        height: 300,
        width: 300,
        objectFit: "contain"
    }
});