import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Colors } from '../utils/getTheme';

const History = () => {
  const { params } = useRoute();
  
  const timerListCopy = JSON.parse(JSON.stringify(params?.timerList || []));
  const completedTimers = timerListCopy.flatMap(section =>
    section.data.filter(timer => timer.time === 0)
  );

  return (
    <View style={styles.container}>
      {completedTimers?.length > 0 ? completedTimers?.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>{item?.name}</Text>
          <Text style={styles.duration}>{item?.duration} sec</Text>
        </View>
      )) : <Text style={styles.name}>No History</Text>}
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREY,
    padding: 16,
  },
  card: {
    backgroundColor: Colors.WHITE,
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  duration: {
    fontSize: 14,
    color: Colors.GREY,
    marginTop: 4,
  },
});
