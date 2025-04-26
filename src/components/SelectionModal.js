import React from "react"
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native"

const SelectionModal = ({ visible, onClose, options, onSelect, title }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl p-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-lg text-gray-600">Close</Text>
            </TouchableOpacity>
          </View>
          <ScrollView className="max-h-80">
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  onSelect(option)
                  onClose()
                }}
                className="py-3 border-b border-gray-200"
              >
                <Text className="text-lg text-gray-800">{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default SelectionModal

