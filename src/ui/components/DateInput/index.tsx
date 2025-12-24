import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { theme } from '@ui/styles/theme';
import { CalendarIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Platform, TouchableOpacity, View } from 'react-native';
import { AppText } from '../AppText';
import { Button } from '../Button';
import { inputStyles } from '../Input/styles';
import { styles } from './styles';

export interface IDateInputProps {
  value: Date;
  onChange: (date: Date) => void;
  error?: boolean;
  disabled?: boolean;
}

export function DateInput({ value, onChange, error, disabled }: IDateInputProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [tempDate, setTempDate] = useState(value);

  function handleOpenPicker() {
    if (disabled) {
      return;
    }
    setTempDate(value);
    setIsPickerVisible(true);
  }

  function handleDateChange(_event: DateTimePickerEvent, newDate?: Date) {
    if (Platform.OS === 'android') {
      setIsPickerVisible(false);
      if (newDate) {
        onChange(newDate);
      }
    } else {
      if (newDate) {
        setTempDate(newDate);
      }
    }
  }

  function handleConfirm() {
    onChange(tempDate);
    setIsPickerVisible(false);
  }

  function handleCancel() {
    setIsPickerVisible(false);
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  }

  return (
    <>
      <TouchableOpacity
        style={[
          inputStyles({
            status: error ? 'error' : 'default',
            disabled: disabled ? 'true' : 'false',
          }),
          styles.container,
        ]}
        onPress={handleOpenPicker}
        disabled={disabled}
      >
        <AppText color={theme.colors.black[700]}>{formatDate(value)}</AppText>
        <CalendarIcon size={20} color={theme.colors.black[700]} />
      </TouchableOpacity>

      {Platform.OS === 'android' && isPickerVisible && (
        <DateTimePicker
          mode="date"
          display="default"
          value={tempDate}
          onChange={handleDateChange}
        />
      )}

      {Platform.OS === 'ios' && (
        <Modal
          visible={isPickerVisible}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.pickerHeader}>
                <Button variant="ghost" onPress={handleCancel}>
                  Cancelar
                </Button>
                <Button variant="ghost" onPress={handleConfirm}>
                  Confirmar
                </Button>
              </View>

              <DateTimePicker
                mode="date"
                display="spinner"
                value={tempDate}
                onChange={handleDateChange}
                style={styles.picker}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}
