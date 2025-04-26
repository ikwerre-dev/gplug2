// BetHistory.js
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const TabButton = ({ title, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 items-center py-3 ${active ? 'border-b-2 border-[#473BF0]' : ''}`}
  >
    <Text
      className={`${active ? 'text-[#473BF0] font-semibold' : 'text-gray-500'}`}
      style={{ fontFamily: active ? "Livvic_600SemiBold" : "Livvic_400Regular" }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const BetHistoryItem = ({ date, time, amount, odds, status, matches, betType, potentialWin }) => {
  const [expanded, setExpanded] = useState(false);

  const statusColors = {
    Won: "text-green-600",
    Lost: "text-red-600",
    Pending: "text-yellow-600",
    Canceled: "text-gray-600"
  };

  const statusBgColors = {
    Won: "bg-green-100",
    Lost: "bg-red-100",
    Pending: "bg-yellow-100",
    Canceled: "bg-gray-100"
  };

  return (
    <TouchableOpacity 
      onPress={() => setExpanded(!expanded)}
      className="bg-white rounded-lg border border-gray-200 mb-4 overflow-hidden shadow-sm"
    >
      <View className="p-4">
        <View className="flex-row justify-between mb-2">
          <Text className="font-bold" style={{ fontFamily: "Livvic_700Bold" }}>
            {date}
          </Text>
          <View className={`px-2 py-1 rounded-md ${statusBgColors[status]}`}>
            <Text className={`${statusColors[status]} font-medium`} style={{ fontFamily: "Livvic_600SemiBold" }}>
              {status}
            </Text>
          </View>
        </View>
        
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
            {time}
          </Text>
          <Text className="font-semibold" style={{ fontFamily: "Livvic_600SemiBold" }}>
            {betType}
          </Text>
        </View>
        
        <View className="flex-row justify-between">
          <Text className="text-gray-700" style={{ fontFamily: "Livvic_500Medium" }}>
            NGN {amount}
          </Text>
          <Text className="font-bold" style={{ fontFamily: "Livvic_700Bold" }}>
            {odds}
          </Text>
        </View>
        
        {expanded && (
          <View className="mt-4 pt-4 border-t border-gray-200">
            <Text className="font-semibold mb-2" style={{ fontFamily: "Livvic_600SemiBold" }}>
              Matches
            </Text>
            
            {matches.map((match, index) => (
              <View key={index} className="mb-3">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-gray-800 font-medium" style={{ fontFamily: "Livvic_500Medium" }}>
                    {match.teams}
                  </Text>
                  <Text className="text-gray-800 font-medium" style={{ fontFamily: "Livvic_500Medium" }}>
                    {match.result}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
                    {match.market}
                  </Text>
                  <Text className="text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
                    {match.odds}
                  </Text>
                </View>
              </View>
            ))}
            
            <View className="mt-2 pt-2 border-t border-gray-200">
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
                  Stake
                </Text>
                <Text className="text-gray-800" style={{ fontFamily: "Livvic_500Medium" }}>
                  NGN {amount}
                </Text>
              </View>
              
              <View className="flex-row justify-between">
                <Text className="text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
                  {status === "Won" ? "Won" : "Potential Win"}
                </Text>
                <Text className={`font-bold ${status === "Won" ? "text-green-600" : "text-gray-800"}`} style={{ fontFamily: "Livvic_700Bold" }}>
                  NGN {potentialWin}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function BetHistory({ navigation }) {
  const [activeTab, setActiveTab] = useState("All");
  
  const betHistory = [
    {
      id: 1,
      date: "April 24, 2025",
      time: "15:30",
      amount: "1,000",
      odds: "2.5",
      status: "Won",
      betType: "Multiple",
      potentialWin: "2,500",
      matches: [
        {
          teams: "Chelsea vs Leicester",
          result: "1:0",
          market: "Home Win",
          odds: "1.8"
        },
        {
          teams: "Arsenal vs Roma",
          result: "2:1",
          market: "BTTS",
          odds: "1.5"
        }
      ]
    },
    {
      id: 2,
      date: "April 23, 2025",
      time: "12:15",
      amount: "500",
      odds: "3.2",
      status: "Lost",
      betType: "Multiple",
      potentialWin: "1,600",
      matches: [
        {
          teams: "Man Utd vs Liverpool",
          result: "0:2",
          market: "Home Win",
          odds: "2.1"
        },
        {
          teams: "Tottenham vs Newcastle",
          result: "1:1",
          market: "Over 2.5",
          odds: "1.7"
        }
      ]
    },
    {
      id: 3,
      date: "April 22, 2025",
      time: "18:45",
      amount: "2,000",
      odds: "1.9",
      status: "Pending",
      betType: "Single",
      potentialWin: "3,800",
      matches: [
        {
          teams: "Barcelona vs Real Madrid",
          result: "Pending",
          market: "Away Win",
          odds: "1.9"
        }
      ]
    },
    {
      id: 4,
      date: "April 21, 2025",
      time: "14:00",
      amount: "1,500",
      odds: "2.7",
      status: "Canceled",
      betType: "Single",
      potentialWin: "4,050",
      matches: [
        {
          teams: "PSG vs Monaco",
          result: "Canceled",
          market: "Home Win",
          odds: "2.7"
        }
      ]
    },
  ];
  
  // Filter bets based on active tab
  const filteredBets = () => {
    if (activeTab === "All") return betHistory;
    return betHistory.filter(bet => bet.status === activeTab);
  };

  return (
    <SafeAreaView className={`flex-1 bg-gray-50 ${Platform.OS === 'android' ? 'pt-[2rem]' : ''}`}>
      <View className="px-4 py-2 flex-row items-center border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-bold" style={{ fontFamily: "Livvic_700Bold" }}>
          Bet History
        </Text>
      </View>
      
      <View className="flex-row bg-white mb-4">
        <TabButton 
          title="All" 
          active={activeTab === "All"} 
          onPress={() => setActiveTab("All")} 
        />
        <TabButton 
          title="Won" 
          active={activeTab === "Won"} 
          onPress={() => setActiveTab("Won")} 
        />
        <TabButton 
          title="Lost" 
          active={activeTab === "Lost"} 
          onPress={() => setActiveTab("Lost")} 
        />
        <TabButton 
          title="Pending" 
          active={activeTab === "Pending"} 
          onPress={() => setActiveTab("Pending")} 
        />
      </View>
      
      <ScrollView className="flex-1 px-4">
        {filteredBets().map((bet) => (
          <BetHistoryItem
            key={bet.id}
            date={bet.date}
            time={bet.time}
            amount={bet.amount}
            odds={bet.odds}
            status={bet.status}
            betType={bet.betType}
            matches={bet.matches}
            potentialWin={bet.potentialWin}
          />
        ))}
        
        {filteredBets().length === 0 && (
          <View className="items-center justify-center py-10">
            <Feather name="inbox" size={50} color="#9CA3AF" />
            <Text className="mt-4 text-gray-500 text-lg text-center" style={{ fontFamily: "Livvic_400Regular" }}>
              No {activeTab !== "All" ? activeTab.toLowerCase() : ""} bets found
            </Text>
          </View>
        )}
      </ScrollView>
      
     
    </SafeAreaView>
  );
}