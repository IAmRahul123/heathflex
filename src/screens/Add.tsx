import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../utils/getTheme'
import { useNavigation, useRoute } from '@react-navigation/native'

type InputType = "name" | "duration" | "category"

const Add = () => {
    const navigation = useNavigation()
    const { params } = useRoute()

    const [formData, setFormData] = useState({
        name: "",
        duration: "",
        category: "",
    })

    const onChangeType = (type: InputType, value: string) => {
        setFormData(prev => {
            return { ...prev, [type]: value }
        })
    }

    const onSave = () => {
        params?.addToList({ ...formData, id: new Date(), isRunning: false, time: formData?.duration })
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <TextInput
                value={formData.name}
                onChangeText={(text) => onChangeType("name", text)}
                style={styles.input}
                placeholder='Enter Name Of Timer'
            />
            <TextInput
                value={formData.duration}
                onChangeText={(text) => onChangeType("duration", text)}
                style={styles.input}
                placeholder='Enter Duration For Timer'
                keyboardType='numeric'
            />
            <TextInput
                value={formData.category}
                onChangeText={(text) => onChangeType("category", text)}
                style={styles.input}
                placeholder='Enter Category For Timer'
            />

            <Button title='Save' onPress={onSave} />
        </View>
    )
}

export default Add

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        gap: 8,
        paddingTop: 24,
        paddingHorizontal: 12
    },
    input: {
        borderWidth: 0.5,
        borderColor: Colors.GREY,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4
    }
})