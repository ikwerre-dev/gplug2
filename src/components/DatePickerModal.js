import React from "react";
import { Modal, View, Text, TouchableOpacity, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DatePickerModal = ({ visible, onClose, value, onChange, title }) => {
  const today = new Date();
  const years = Array.from({ length: 10 }, (_, i) => today.getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from(
    { length: 31 },
    (_, i) => i + 1
  );

  const selectedDate = value ? new Date(value) : new Date();
  const [tempYear, setTempYear] = React.useState(selectedDate.getFullYear());
  const [tempMonth, setTempMonth] = React.useState(selectedDate.getMonth() + 1);
  const [tempDay, setTempDay] = React.useState(selectedDate.getDate());

  const handleConfirm = () => {
    const newDate = new Date(tempYear, tempMonth - 1, tempDay);
    onChange(newDate);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-xl font-bold text-gray-900">{title}</Text>
            <View className="flex-row">
              <TouchableOpacity onPress={onClose} className="mr-4">
                <Text className="text-gray-600">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirm}>
                <Text className="text-[#473BF0] font-semibold">Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row justify-between px-4" style={{ height: Platform.OS === 'ios' ? 200 : 150 }}>
            <Picker
              selectedValue={tempYear}
              onValueChange={setTempYear}
              style={{ flex: 1 }}
            >
              {years.map(year => (
                <Picker.Item key={year} label={year.toString()} value={year} />
              ))}
            </Picker>
            <Picker
              selectedValue={tempMonth}
              onValueChange={setTempMonth}
              style={{ flex: 1 }}
            >
              {months.map(month => (
                <Picker.Item
                  key={month}
                  label={month.toString().padStart(2, '0')}
                  value={month}
                />
              ))}
            </Picker>
            <Picker
              selectedValue={tempDay}
              onValueChange={setTempDay}
              style={{ flex: 1 }}
            >
              {days.map(day => (
                <Picker.Item
                  key={day}
                  label={day.toString().padStart(2, '0')}
                  value={day}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DatePickerModal;