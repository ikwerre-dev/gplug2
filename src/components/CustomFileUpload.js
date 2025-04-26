import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

export default function CustomFile({
  label,
  type, // 'file' or 'picture'
  onFileSelect,
  onImageSelect,
}) {
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const handleFileSelect = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });
      if (file.type === "success") {
        setSelectedFileName(file.name);
        if (onFileSelect) onFileSelect(file);
      }
    } catch (error) {
      console.error("File selection error: ", error);
    }
  };

  const handleImageSelect = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setSelectedImageUri(result.assets[0].uri);
        if (onImageSelect) onImageSelect(result.assets[0]);
      }
    } catch (error) {
      console.error("Image selection error: ", error);
    }
  };

  const handlePress = () => {
    if (type === "file") handleFileSelect();
    else if (type === "picture") handleImageSelect();
  };

  return (
    <View className="mb-6">
      <Text
        className="text-[#1A1C1E] mb-2 text-base"
        style={{
          fontFamily: "Livvic_600SemiBold",
        }}
      >
        {label}
      </Text>
      <TouchableOpacity
        onPress={handlePress}
        className="flex-row gap-5  items-center border-b border-gray-300 rounded-lg p-4"
      >
        {type === "file" && <FontAwesome name="file" size={20} color="#6B7280" />}
        {type === "picture" && <FontAwesome name="image" size={20} color="#6B7280" />}
        <Text
          className="flex-1 ml-4 text-base text-gray-600"
          style={{
            fontFamily: "Livvic_400Regular",
          }}
        >
          {type === "file"
            ? selectedFileName || "Choose a file"
            : selectedImageUri
            ? "Image selected"
            : "Choose a picture"}
        </Text>
      </TouchableOpacity>
      {type === "picture" && selectedImageUri && (
        <Image
          source={{ uri: selectedImageUri }}
          className="mt-4 w-full h-48 rounded-lg"
        />
      )}
    </View>
  );
}
