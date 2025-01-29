import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import ProgressBar from "./ProgressBar";
import { formatTime } from "../utils/formatter";
import { Colors } from "../utils/getTheme";

// Define props type for TimerNew
interface TimerProps {
    name: string;
    duration: number;
    isRunning: boolean;
    timeLeft: number;
    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
}

const TimerNew: React.FC<TimerProps> = ({
    name,
    duration,
    isRunning,
    timeLeft,
    startTimer,
    pauseTimer,
    resetTimer,
}) => {

    const progress = duration > 0 ? 1 - timeLeft / duration : 0;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.time}>{formatTime(timeLeft)}</Text>
            <Text style={styles.title}>
                Status: {isRunning ? "Running" : timeLeft === 0 ? "Completed" : "Paused"}
            </Text>
            <ProgressBar progress={progress} />
            <View style={styles.buttonContainer}>
                <Button title="Start" onPress={startTimer} disabled={isRunning || timeLeft === 0} />
                <Button title="Pause" onPress={pauseTimer} disabled={!isRunning} />
                <Button title="Reset" onPress={resetTimer} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    time: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
});

export default TimerNew;
