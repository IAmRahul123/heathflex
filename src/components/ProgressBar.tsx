import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../utils/getTheme'

const ProgressBar = ({ progress }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={[styles.filledContainer, { width: `${progress * 100}%` }]}></View>
        </View>
    )
}

export default ProgressBar

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: 8,
        borderRadius: 20,
        backgroundColor: Colors.GREY,
    },
    filledContainer: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: Colors.BLUE,
    }
})