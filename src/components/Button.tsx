import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../utils/getTheme'

const Button = ({ onPress, style={}, btnText, textStyle={} }): React.JSX.Element => {
    return (
        <TouchableOpacity style={[styles.btnStyle, style]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{btnText}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btnStyle: {
        backgroundColor: Colors.WHITE,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:8,
        paddingHorizontal:12
    },
    text: {
        color: Colors.BLACK,
        fontSize: 14
    }
})