import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const TabButton = ({ title, active, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    className={`py-3 px-8 ${active ? 'border-b-2 border-black' : ''}`}
  >
    <Text 
      className={`text-base ${active ? 'font-semibold' : 'text-gray-500'}`}
      style={{ fontFamily: active ? "Livvic_600SemiBold" : "Livvic_400Regular" }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const BetTypeButton = ({ title, active, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    className={`py-2 px-4 mr-2 rounded-md ${active ? 'bg-gray-200' : ''}`}
  >
    <Text 
      className={`${active ? 'font-semibold' : 'text-gray-600'}`}
      style={{ fontFamily: active ? "Livvic_600SemiBold" : "Livvic_400Regular" }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const BetOption = ({ label, odds, selected, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    className={`py-3 px-4 rounded-md flex-1 mx-1 items-center justify-center ${selected ? 'bg-[#473BF0]' : 'bg-[#F3DEE0]'}`}
  >
    <Text 
      className={`font-semibold text-base ${selected ? 'text-white' : 'text-black'}`}
      style={{ fontFamily: "Livvic_600SemiBold" }}
    >
      {label}
    </Text>
    <Text 
      className={`font-bold text-lg ${selected ? 'text-white' : 'text-black'}`}
      style={{ fontFamily: "Livvic_700Bold" }}
    >
      {odds}
    </Text>
  </TouchableOpacity>
);

const FavoriteButton = ({ active, onPress }) => (
  <TouchableOpacity onPress={onPress} className="p-2">
    <Feather name={active ? "star" : "star"} size={22} color={active ? "#473BF0" : "#D1D5DB"} />
  </TouchableOpacity>
);

export default function MatchDetails({ navigation, route }) {
  const [activeTab, setActiveTab] = useState("Market");
  const [activeBetType, setActiveBetType] = useState("Main");
  const [selectedBets, setSelectedBets] = useState({});
  const [showBookingSlip, setShowBookingSlip] = useState(false);
  const [stake, setStake] = useState(1000);
  
  // Sample match data - in real app, this would come from route.params
  const match = {
    homeTeam: "Chelsea",
    awayTeam: "Leicester C",
    homeScore: "2",
    awayScore: "1",
    league: "Premier League",
    time: "49:30",
    homeImage: require("../../assets/icons/club.png"),
    awayImage: require("../../assets/icons/club.png"),
  };

  // Sample bet markets
  const betMarkets = [
    {
      id: "1x2",
      name: "1×2",
      options: [
        { label: "Home", odds: "4.55" },
        { label: "Draw", odds: "2.95" },
        { label: "Away", odds: "1.77" },
      ]
    },
    {
      id: "1x2-2up",
      name: "1*2 - 2UP",
      options: [
        { label: "Home", odds: "4.15" },
        { label: "Draw", odds: "2.45" },
        { label: "Away", odds: "1.72" },
      ]
    },
    {
      id: "over-under",
      name: "Over/Under",
      options: [
        { label: "Over", odds: "1.01" },
        { label: "Under", odds: "14.00" },
      ],
      subOptions: [
        { value: "0.5" },
        { value: "1.11", overOdds: "1.11", underOdds: "6.00" },
        { value: "1.26", overOdds: "1.26", underOdds: "4.00" },
        { value: "1.81", overOdds: "1.81", underOdds: "2.00" },
        { value: "4.00", overOdds: "4.00", underOdds: "1.00" },
      ]
    }
  ];

  const toggleBet = (marketId, optionLabel, odds) => {
    const key = `${marketId}-${optionLabel}`;
    if (selectedBets[key]) {
      const newSelectedBets = {...selectedBets};
      delete newSelectedBets[key];
      setSelectedBets(newSelectedBets);
    } else {
      setSelectedBets({
        ...selectedBets,
        [key]: { marketId, option: optionLabel, odds }
      });
      
      // Show booking slip after selection in this demo
      if (Object.keys(selectedBets).length === 0) {
        setShowBookingSlip(true);
      }
    }
  };

  const renderBetMarket = (market) => {
    if (market.id === "over-under") {
      return (
        <View key={market.id} className="px-2 mb-6">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Feather name="chevron-down" size={20} color="#6B7280" />
              <Text className="ml-2 font-semibold" style={{ fontFamily: "Livvic_600SemiBold" }}>
                {market.name}
              </Text>
            </View>
            <FavoriteButton />
          </View>
          
          <View className="flex-row justify-between mb-2">
            <View className="w-16 items-center">
              <Text className="text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
                
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
                Over
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
                Under
              </Text>
            </View>
          </View>
          
          {market.subOptions.map((subOption, index) => (
            <View key={index} className="flex-row justify-between mb-2">
              <View className="w-16 bg-gray-100 py-3 rounded-md items-center justify-center">
                <Text className="font-medium" style={{ fontFamily: "Livvic_500Medium" }}>
                  {subOption.value}
                </Text>
              </View>
              <TouchableOpacity 
                className={`flex-1 mx-1 bg-[#F3DEE0] py-3 rounded-md items-center justify-center ${selectedBets[`${market.id}-over-${subOption.value}`] ? 'bg-[#473BF0]' : ''}`}
                onPress={() => toggleBet(market.id, `over-${subOption.value}`, subOption.overOdds || "1.01")}
              >
                <Text 
                  className={`font-bold ${selectedBets[`${market.id}-over-${subOption.value}`] ? 'text-white' : 'text-black'}`}
                  style={{ fontFamily: "Livvic_700Bold" }}
                >
                  {subOption.overOdds || "1.01"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`flex-1 mx-1 bg-[#F3DEE0] py-3 rounded-md items-center justify-center ${selectedBets[`${market.id}-under-${subOption.value}`] ? 'bg-[#473BF0]' : ''}`}
                onPress={() => toggleBet(market.id, `under-${subOption.value}`, subOption.underOdds || "14.00")}
              >
                <Text 
                  className={`font-bold ${selectedBets[`${market.id}-under-${subOption.value}`] ? 'text-white' : 'text-black'}`}
                  style={{ fontFamily: "Livvic_700Bold" }}
                >
                  {subOption.underOdds || "14.00"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      );
    }
    
    return (
      <View key={market.id} className="px-2  mb-6">
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            <Feather name="chevron-down" size={20} color="#6B7280" />
            <Text className="ml-2 font-semibold" style={{ fontFamily: "Livvic_600SemiBold" }}>
              {market.name}
            </Text>
          </View>
          <FavoriteButton />
        </View>
        <View className="flex-row">
          {market.options.map((option, index) => (
            <BetOption 
              key={index}
              label={option.label} 
              odds={option.odds}
              selected={selectedBets[`${market.id}-${option.label}`]}
              onPress={() => toggleBet(market.id, option.label, option.odds)}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderBookingSlip = () => {
    if (!showBookingSlip) return null;
    
    // Get the first selected bet for demo
    const firstBet = Object.values(selectedBets)[0];
    const selectedOdds = firstBet?.odds || "4.55";
    const potentialWin = (stake * parseFloat(selectedOdds)).toFixed(0);
    
    return (
      <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg pb-16 ">
      <View className=" bg-[#1B1813] py-6 px-6 rounded-t-3xl text-white">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-white" style={{ fontFamily: "Livvic_700Bold" }}>
            NGN {stake.toLocaleString()}
          </Text>
          {/* <View className="flex-row">
            <TouchableOpacity className="bg-[#473BF0] rounded-full px-3 py-1 mr-2">
              <Text className="text-white" style={{ fontFamily: "Livvic_600SemiBold" }}>
                Apply
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-200 rounded-full px-3 py-1">
              <Text style={{ fontFamily: "Livvic_600SemiBold" }}>
                Sim
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
        
        <View className="mb-2 flex-row  items-center">
          <Text className="text-base text-white font-medium" style={{ fontFamily: "Livvic_500Medium" }}>
            Booking Code: 5Tg76oki
          </Text>
          <TouchableOpacity className="ml-2">
            <Feather name="copy" size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>
        </View>
        
        <View className="bg-gray-50 px-6 rounded-lg p-4 mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base font-medium" style={{ fontFamily: "Livvic_500Medium" }}>
              Home
            </Text>
            <Text className="text-base font-bold" style={{ fontFamily: "Livvic_700Bold" }}>
              {selectedOdds}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Feather name="x" size={18} color="#6B7280" />
            <Text className="ml-2 text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
              1×2
            </Text>
          </View>
        </View>
        
        <View className="mb-5 px-6 ">
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600" style={{ fontFamily: "Livvic_400Regular" }}>
              Stake
            </Text>
            <Text className="font-medium" style={{ fontFamily: "Livvic_500Medium" }}>
              NGN {stake.toLocaleString()}
            </Text>
          </View>
          
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600" style={{ fontFamily: "Livvic_400Regular" }}>
              Total Stake
            </Text>
            <Text className="font-medium" style={{ fontFamily: "Livvic_500Medium" }}>
              NGN {stake.toLocaleString()}
            </Text>
          </View>
          
          <View className="flex-row justify-between">
            <Text className="text-gray-600" style={{ fontFamily: "Livvic_400Regular" }}>
              Potential Win
            </Text>
            <Text className="font-bold" style={{ fontFamily: "Livvic_700Bold" }}>
              NGN {potentialWin}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity className="bg-[#473BF0] mx-6 py-4 rounded-lg items-center">
          <Text className="text-white font-bold text-base" style={{ fontFamily: "Livvic_700Bold" }}>
            Book Bet
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className={`flex-1 bg-white ${Platform.OS === 'android' ? 'pt-[2rem]' : ''}`}>
      <View className="px-6 py-2 flex-row items-center ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="ml-[35%] text-lg font-bold" style={{ fontFamily: "Livvic_700Bold" }}>
          Details
        </Text>
       </View>
      
      <View className="p-6 border-b border-gray-200">
        <View className="flex-row justify-between items-center">
          <View className="items-center">
            <Image source={match.homeImage} className="w-16 h-16" />
            <Text className="mt-1 font-bold" style={{ fontFamily: "Livvic_700Bold" }}>
              {match.homeTeam}
            </Text>
          </View>
          
          <View className="items-center">
            <Text className="text-gray-500 text-xs mb-1" style={{ fontFamily: "Livvic_400Regular" }}>
              {match.league}
            </Text>
            <Text className="text-3xl font-bold" style={{ fontFamily: "Livvic_700Bold" }}>
              {match.homeScore} : {match.awayScore}
            </Text>
            <View className="flex-row items-center mt-1">
              <View className="w-2 h-2 rounded-full bg-[#473BF0] mr-1" />
              <Text className="text-gray-500 text-xs" style={{ fontFamily: "Livvic_400Regular" }}>
                {match.time}
              </Text>
            </View>
          </View>
          
          <View className="items-center">
            <Image source={match.awayImage} className="w-16 h-16" />
            <Text className="mt-1 font-bold" style={{ fontFamily: "Livvic_700Bold" }}>
              {match.awayTeam}
            </Text>
          </View>
        </View>
      </View>
      
      <View className="flex-row border-b border-gray-200">
        <TabButton 
          title="Market" 
          active={activeTab === "Market"} 
          onPress={() => setActiveTab("Market")} 
        />
        <TabButton 
          title="Stats" 
          active={activeTab === "Stats"} 
          onPress={() => setActiveTab("Stats")} 
        />
        <TabButton 
          title="Comments" 
          active={activeTab === "Comments"} 
          onPress={() => setActiveTab("Comments")} 
        />
      </View>
      
      {activeTab === "Market" && (
        <>
          <View className="flex-row p-2 border-b border-gray-200">
            <BetTypeButton 
              title="Bet Builder" 
              active={activeBetType === "BetBuilder"} 
              onPress={() => setActiveBetType("BetBuilder")} 
            />
            <BetTypeButton 
              title="Main" 
              active={activeBetType === "Main"} 
              onPress={() => setActiveBetType("Main")} 
            />
            <BetTypeButton 
              title="Goals" 
              active={activeBetType === "Goals"} 
              onPress={() => setActiveBetType("Goals")} 
            />
            <BetTypeButton 
              title="Half" 
              active={activeBetType === "Half"} 
              onPress={() => setActiveBetType("Half")} 
            />
            <BetTypeButton 
              title="Booking" 
              active={activeBetType === "Booking"} 
              onPress={() => setActiveBetType("Booking")} 
            />
          </View>
          
          <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: showBookingSlip ? 300 : 20 }}>
            {betMarkets.map(market => renderBetMarket(market))}
          </ScrollView>
          
          {renderBookingSlip()}
        </>
      )}
      
      {activeTab === "Stats" && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
            Match statistics coming soon
          </Text>
        </View>
      )}
      
      {activeTab === "Comments" && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
            Match comments coming soon
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}