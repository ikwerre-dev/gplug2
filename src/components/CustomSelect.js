import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import FontLoader from "./FontLoader";
import { Platform } from 'react-native';

export default function CustomSelect({
  label,
  options,
  selectedValue,
  onValueChange,
  placeholder,
}) {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const togglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  const handleValueChange = (itemValue) => {
    onValueChange(itemValue);
  };

  return (
    <View className="mb-4">
      <Text
        className="text-[#1A1C1E] mb-2 text-base"
        style={{
          fontFamily: "Livvic_600SemiBold",
        }}
      >
        {label}
      </Text>
      <TouchableOpacity
        onPress={togglePicker}
        className="border-b border-gray-300 rounded-lg p-4"
      >
        <Text
          className="text-[#000]"
          style={{
            fontFamily: "Livvic_400Regular",
          }}
        >
          {selectedValue === "none" || !selectedValue ? `Select ${label}` : selectedValue}
        </Text>
      </TouchableOpacity>

      <Modal visible={isPickerVisible} transparent={true} animationType="slide">
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
        >
          <SafeAreaView className="flex-1 justify-end relative">
            <View className={`bg-black absolute w-full bottom-0 rounded-t-3xl ${Platform.OS === 'android' ? 'pb-60' : ''}`}>
              <View className="flex-row justify-between items-center p-4 border-b border-gray-800">
                <Text className="text-white font-semibold text-lg">
                  Select {label}s
                </Text>
                <TouchableOpacity onPress={togglePicker}>
                  <Text className="text-[#473BF0] font-semibold">Done</Text>
                </TouchableOpacity>
              </View>
              <Picker
                selectedValue={selectedValue}
                onValueChange={handleValueChange}
                style={{ 
                  width: "100%",
                  backgroundColor: 'white',
                }}
                dropdownIconColor="black"
                itemStyle={{ 
                  color: 'black',
                  backgroundColor: 'white'
                }}
              >
                <Picker.Item label={placeholder} value="" color="black" />
                {options.map((option) => (
                  <Picker.Item
                    key={option}
                    label={option}
                    value={option}
                    color="black"
                   />
                ))}
              </Picker>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
