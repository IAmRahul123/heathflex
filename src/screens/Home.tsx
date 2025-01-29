import React, { useCallback, useState } from 'react';
import { SectionList, Text, View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TimerNew from '../components/TimerNew';
import Button from '../components/Button';
import { useTimers } from '../hooks/useTimer';
import { Colors } from '../utils/getTheme';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const { timerList, setTimerList, startTimer, pauseTimer, resetTimer } = useTimers();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = useCallback((title: string) => {
    setExpandedSections(prev => ({ ...prev, [title]: !prev[title] }));
  }, []);

  const addToList = useCallback((item: { category: string; id: string; name: string; duration: number }) => {
    setTimerList(prevList => {
      const existingIndex = prevList.findIndex(timer => timer.title === item.category);
      if (existingIndex >= 0) {
        prevList[existingIndex].data.push({ ...item, time: item.duration, isRunning: false });
      } else {
        prevList.push({ title: item.category, data: [{ ...item, time: item.duration, isRunning: false }] });
      }
      return [...prevList];
    });
  }, []);

  const addTimer = () => {
    navigation.navigate('Add', { addToList });
  };

  const goToHistory = () => {
    navigation.navigate('History', { timerList });
  };

  return (
    <View style={styles.container}>
       <Button btnText="History" onPress={goToHistory} style={styles.addBtnStyle}/>
       {timerList?.length ==0 && <Text style={styles.headerText}>No Timers</Text>}
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={timerList}
        keyExtractor={(item, index) => item.name + index}
        renderSectionHeader={({ section: { title, data } }) => (
          <Pressable style={styles.header} onPress={() => toggleSection(title)}>
            <Text style={styles.headerText} numberOfLines={1}>{title}</Text>
            <View style={styles.bulkActions}>
              <Button btnText="Start All" onPress={() => data.forEach(timer => startTimer(timer.id))} />
              <Button btnText="Pause All" onPress={() => data.forEach(timer => pauseTimer(timer.id))} />
              <Button btnText="Reset All" onPress={() => data.forEach(timer => resetTimer(timer.id, timer.duration))} />
            </View>
          </Pressable>
        )}
        renderItem={({ item, section }) => {
          if (!expandedSections[section.title]) return null;
          return (
            <View style={styles.timerItem}>
              <TimerNew
                name={item.name}
                duration={item.duration}
                isRunning={item.isRunning}
                resetTimer={() => resetTimer(item.id, item.duration)}
                timeLeft={item.time}
                startTimer={() => startTimer(item.id)}
                pauseTimer={() => pauseTimer(item.id)}
              />
            </View>
          );
        }}
      />
      <View style={{ position: 'absolute', bottom: 60, right: 20 }}>
        <Button btnText="Add a Timer" onPress={addTimer} style={styles.addBtnStyle} textStyle={styles.btntext} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.GREY,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.BLACK,
    maxWidth: "30%"
  },
  timerItem: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
  },
  addBtnStyle: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.RED,
    borderRadius: 8,
    elevation: 10,
    padding: 10,
    alignSelf: 'center',
  },
  btntext: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  bulkActions: {
    flexDirection: 'row',
    gap: 8,
  }
});
