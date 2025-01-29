import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
export interface TimerItem {
    id: string;
    name: string;
    duration: number;
    time: number;
    isRunning: boolean;
}

export interface TimerSection {
    title: string;
    data: TimerItem[];
}

export const useTimers = () => {
    const [timerList, setTimerList] = useState<TimerSection[]>([]);
    const intervals = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

    const updateTimer = (id: string, updateFn: (timer: TimerItem) => TimerItem) => {
        setTimerList(prevSections =>
            prevSections.map(section => ({
                ...section,
                data: section.data.map(timer => (timer.id === id ? updateFn(timer) : timer)),
            }))
        );
    };

    const startTimer = (id: string) => {
        if (intervals.current[id]) return;
        intervals.current[id] = setInterval(() => {
            updateTimer(id, timer => {
                if (timer.time > 0) return { ...timer, time: timer.time - 1 };
                Alert.alert("Congratulations", timer.name)
                clearInterval(intervals.current[id] as NodeJS.Timeout);
                intervals.current[id] = null;
                return { ...timer, isRunning: false };
            });
        }, 1000);
        updateTimer(id, timer => ({ ...timer, isRunning: true }));
    };

    const pauseTimer = (id: string) => {
        clearInterval(intervals.current[id] as NodeJS.Timeout);
        intervals.current[id] = null;
        updateTimer(id, timer => ({ ...timer, isRunning: false }));
    };

    const resetTimer = (id: string, initialTime: number) => {
        clearInterval(intervals.current[id] as NodeJS.Timeout);
        intervals.current[id] = null;
        updateTimer(id, timer => ({
            ...timer,
            time: initialTime,
            isRunning: false,
        }));
    };

    return { timerList, setTimerList, startTimer, pauseTimer, resetTimer };
};
