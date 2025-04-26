import React  from "react";
import { useFonts } from "expo-font";
import AppLoading from '../components/Loader';

import { Livvic_400Regular, Livvic_700Bold, Livvic_500Medium, Livvic_900Black, Livvic_600SemiBold } from "@expo-google-fonts/livvic";


export default function FontLoader({ children }) {
  let [fontsLoaded] = useFonts({
    Livvic_400Regular,
    Livvic_700Bold,
    Livvic_500Medium,
    Livvic_900Black,
    Livvic_600SemiBold
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return <>{children}</>;
}