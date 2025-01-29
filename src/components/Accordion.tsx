import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../utils/getTheme'

const Accordion = ({ title, children,defaultValue=false }) => {
    const [display, setDisplay] = useState(defaultValue)

    const toggleDisplay = () => {
        setDisplay(prev => !prev)
    }
    return (
        <View style={styles.container}>
            <Pressable style={styles.header} onPress={toggleDisplay}>
                <Text style={styles.headerText}>{title}</Text>
                <Text style={[styles.icon, { transform: [{ rotate: display ? "0deg" : "180deg" }] }]}>^</Text>
            </Pressable>
            {display && children}
        </View>
    )
}

export default Accordion

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        color: Colors.BLACK,
        fontSize: 16,
        fontWeight: 'bold'
    },
    icon: {
        fontSize: 20,
        color: Colors.BLACK,
        fontWeight: 'bold'
    }
})