import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, ActivityIndicator } from "react-native";
import FontLoader from "./src/components/FontLoader";
import { AuthProvider, useAuth } from "./src/context/AuthContext";

// Auth Screens
import OnboardingScreen from "./src/screens/auth/OnboardingScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import SignUpScreen from "./src/screens/auth/SignupScreen";
import { ForgotPasswordEmailScreen } from "./src/screens/auth/ForgotPasswordScreen";
import { ForgotPasswordResetScreen } from "./src/screens/auth/PasswordResetScreen";
import { ForgotPasswordOTPScreen } from "./src/screens/auth/OTPVerificationScreen";
import EmailVerificationScreen from "./src/screens/auth/EmailVerificationScreen";

// Main Screens
import Home from "./src/screens/main/DashboardScreen";
import ChatList from "./src/screens/main/ChatList";
import Chat from "./src/screens/main/ChatPage";
import Find from "./src/screens/main/Find";
import Notifications from "./src/screens/main/Notification";
import Settings from "./src/screens/main/Settings";
import ProfileDetails from "./src/screens/main/Profile";
import Reels from "./src/screens/main/Reels";

// Custom MenuBar
import MenuBar from "./src/components/MenuBar";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tab Navigator with custom MenuBar
function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MenuBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: "heart" }}
      />
      <Tab.Screen
        name="Find"
        component={Find}
        options={{ tabBarIcon: "map-marker" }}
      />
      <Tab.Screen
        name="Reels"
        component={Reels}
        options={{ tabBarIcon: "play-circle" }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatList}
        options={{ tabBarIcon: "message-text" }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator that handles both auth and main flows
const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading screen while checking authentication status
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#473BF0" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <>
          {/* Main Flow */}
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Settings" component={Settings} />
        </>
      ) : (
        <>
          {/* Auth Flow */}
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordEmailScreen} />
          <Stack.Screen name="ForgotPasswordOTP" component={ForgotPasswordOTPScreen} />
          <Stack.Screen name="ForgotPasswordReset" component={ForgotPasswordResetScreen} />
          <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <FontLoader>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </FontLoader>
    </AuthProvider>
  );
};

export default App;