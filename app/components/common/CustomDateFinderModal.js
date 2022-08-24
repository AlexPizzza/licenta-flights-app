import React, { useState } from 'react';
import { Modal, StyleSheet, Text } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import colors from '../../../global/colors';

const CustomDateFinderModal = ({
  dateModalVisible,
  setDateModalVisible,
  setModalVisible,
  date
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setSelectedDate(currentDate);
  };

  return (
    <Modal
      animationType='slide'
      transparent={false}
      style={styles.container}
      visible={dateModalVisible}
      onRequestClose={() => {
        setDateModalVisible(false);
        setModalVisible(true);
      }}
    >
      <DateTimePicker
        value={date}
        mode='date'
        is24Hour={true}
        display='calendar'
        onChange={onChange}
      />
      <Text>CustomDateFinderModal: {selectedDate}</Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BG_COLOR,
    paddingBottom: 8
  }
});

export default CustomDateFinderModal;
