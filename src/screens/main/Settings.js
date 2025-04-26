import React from "react"
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Platform,
} from "react-native"
import { Feather, Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons"

// Setting Item Component
const SettingItem = ({ icon, title, subtitle, rightElement, onPress }) => (
  <TouchableOpacity 
    className="flex-row items-center py-4 px-6 border-b border-gray-100"
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View className="w-10 items-center">
      {icon}
    </View>
    
    <View className="flex-1 ml-4">
      <Text className="text-gray-800 font-medium" style={{ fontFamily: "Livvic_600SemiBold" }}>
        {title}
      </Text>
      {subtitle && (
        <Text className="text-gray-500 text-sm mt-1" style={{ fontFamily: "Livvic_400Regular" }}>
          {subtitle}
        </Text>
      )}
    </View>
    
    {rightElement}
  </TouchableOpacity>
)

export default function Settings({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false)
  const [locationEnabled, setLocationEnabled] = React.useState(true)

  return (
    <SafeAreaView className={`flex-1 bg-white ${Platform.OS === "android" ? "pt-[2rem]" : ""}`}>
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#473BF0" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800" style={{ fontFamily: "Livvic_700Bold" }}>
          Settings
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        {/* Profile Section */}
        <View className="py-6 px-6 border-b border-gray-100">
          <View className="flex-row items-center">
            <Image 
              source={require("../../assets/users/1.png")} 
              className="w-20 h-20 rounded-full"
            />
            <View className="ml-4">
              <Text className="text-xl font-bold text-gray-800" style={{ fontFamily: "Livvic_700Bold" }}>
                Robinson Cooper
              </Text>
              <TouchableOpacity className="mt-1">
                <Text className="text-[#473BF0] font-medium" style={{ fontFamily: "Livvic_600SemiBold" }}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View className="pt-4 pb-2">
          <Text className="px-6 text-gray-500 font-medium mb-2" style={{ fontFamily: "Livvic_600SemiBold" }}>
            ACCOUNT
          </Text>
          
          <SettingItem
            icon={<Feather name="user" size={20} color="#473BF0" />}
            title="Personal Information"
            onPress={() => {}}
            rightElement={<Feather name="chevron-right" size={20} color="#6B7280" />}
          />
          
          <SettingItem
            icon={<Feather name="lock" size={20} color="#473BF0" />}
            title="Privacy & Security"
            onPress={() => {}}
            rightElement={<Feather name="chevron-right" size={20} color="#6B7280" />}
          />
          
          <SettingItem
            icon={<Ionicons name="notifications-outline" size={20} color="#473BF0" />}
            title="Notifications"
            onPress={() => {}}
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#E5E7EB", true: "#473BF0" }}
                thumbColor="#FFFFFF"
              />
            }
          />
          
          <SettingItem
            icon={<Ionicons name="location-outline" size={20} color="#473BF0" />}
            title="Location Services"
            subtitle="Allow the app to access your location"
            onPress={() => {}}
            rightElement={
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: "#E5E7EB", true: "#473BF0" }}
                thumbColor="#FFFFFF"
              />
            }
          />
        </View>

        {/* Preferences */}
        <View className="pt-4 pb-2">
          <Text className="px-6 text-gray-500 font-medium mb-2" style={{ fontFamily: "Livvic_600SemiBold" }}>
            PREFERENCES
          </Text>
          
          <SettingItem
            icon={<Feather name="moon" size={20} color="#473BF0" />}
            title="Dark Mode"
            onPress={() => {}}
            rightElement={
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: "#E5E7EB", true: "#473BF0" }}
                thumbColor="#FFFFFF"
              />
            }
          />
          
          <SettingItem
            icon={<Feather name="globe" size={20} color="#473BF0" />}
            title="Language"
            subtitle="English (US)"
            onPress={() => {}}
            rightElement={<Feather name="chevron-right" size={20} color="#6B7280" />}
          />
          
          <SettingItem
            icon={<MaterialIcons name="payment" size={20} color="#473BF0" />}
            title="Payment Methods"
            onPress={() => {}}
            rightElement={<Feather name="chevron-right" size={20} color="#6B7280" />}
          />
        </View>

        {/* Support */}
        <View className="pt-4 pb-2">
          <Text className="px-6 text-gray-500 font-medium mb-2" style={{ fontFamily: "Livvic_600SemiBold" }}>
            SUPPORT
          </Text>
          
          <SettingItem
            icon={<Feather name="help-circle" size={20} color="#473BF0" />}
            title="Help Center"
            onPress={() => {}}
            rightElement={<Feather name="chevron-right" size={20} color="#6B7280" />}
          />
          
          <SettingItem
            icon={<Feather name="info" size={20} color="#473BF0" />}
            title="About"
            subtitle="Version 1.0.0"
            onPress={() => {}}
            rightElement={<Feather name="chevron-right" size={20} color="#6B7280" />}
          />
        </View>

        {/* Logout */}
        <View className="pt-4 pb-8">
          <SettingItem
            icon={<Feather name="log-out" size={20} color="#F43F5E" />}
            title="Log Out"
            onPress={() => {}}
            rightElement={null}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}