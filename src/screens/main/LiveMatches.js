// LiveMatches.js
import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
} from "react-native";
import { Feather, FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const SportButton = ({ icon, label, active, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        className={`px-4 py-3 rounded-full mr-3 ${active ? 'bg-[#473BF0]' : 'bg-[#E4E5E5]'}`}
    >
        <View className="flex-row items-center">
            {icon}
            <Text
                className={`${active ? 'ml-2 text-white font-medium' : ''}`}
                style={{ fontFamily: active ? "Livvic_600SemiBold" : "Livvic_400Regular" }}
            >
                {active ? label : ''}
            </Text>
        </View>
    </TouchableOpacity>
);

const LiveMatchItem = ({ league, homeTeam, awayTeam, homeScore, awayScore, time, homeOdds, drawOdds, awayOdds, homeImage, awayImage, onPress }) => (
    <TouchableOpacity onPress={onPress} className="bg-white rounded-lg border border-gray-200 mb-4 overflow-hidden">
        <View className="p-3">
            <Text className="text-gray-500 mb-1" style={{ fontFamily: "Livvic_400Regular" }}>
                {league}
            </Text>

            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center w-1/3">
                    <Image source={homeImage} className="w-6 h-6 mr-2" />
                    <Text className="font-medium" style={{ fontFamily: "Livvic_500Medium" }}>
                        {homeTeam}
                    </Text>
                </View>

                <View className="flex-row items-center justify-center w-1/3">
                    <Text className="text-lg font-bold" style={{ fontFamily: "Livvic_700Bold" }}>
                        {homeScore}
                    </Text>
                    <Text className="text-lg font-bold mx-1" style={{ fontFamily: "Livvic_700Bold" }}>
                        :
                    </Text>
                    <Text className="text-lg font-bold" style={{ fontFamily: "Livvic_700Bold" }}>
                        {awayScore}
                    </Text>
                </View>

                <View className="flex-row items-center justify-end w-1/3">
                    <Text className="font-medium mr-2" style={{ fontFamily: "Livvic_500Medium" }}>
                        {awayTeam}
                    </Text>
                    <Image source={awayImage} className="w-6 h-6" />
                </View>
            </View>

            <View className="items-center mt-1">
                <View className="flex-row items-center">
                    <View className="w-2 h-2 rounded-full bg-[#473BF0] mr-1" />
                    <Text className="text-gray-500 text-xs" style={{ fontFamily: "Livvic_400Regular" }}>
                        {time}
                    </Text>
                </View>
            </View>

            <View className="flex-row justify-between items-center mt-4">
                <View className="flex-row gap-1 items-center">
                    <View className="bg-gray-100 rounded-md p-1 mr-1">
                        <Text className="w-8 text-center font-medium" style={{ fontFamily: "Livvic_500Medium" }}>
                            {homeOdds}
                        </Text>
                    </View>
                    <View className="bg-gray-100 rounded-md p-1 mx-1">
                        <Text className="w-8 text-center font-medium" style={{ fontFamily: "Livvic_500Medium" }}>
                            {drawOdds}
                        </Text>
                    </View>
                    <View className="bg-gray-100 rounded-md p-1 ml-1">
                        <Text className="w-8 text-center font-medium" style={{ fontFamily: "Livvic_500Medium" }}>
                            {awayOdds}
                        </Text>
                    </View>
                </View>

                <View className="bg-gray-100 rounded-md px-2 py-1">
                    <Text className="text-sm text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
                        +770
                    </Text>
                </View>
            </View>
        </View>

        <View className="flex-row gap-5 pb-3 px-3 pt-5 border-gray-100">
            <TouchableOpacity className={`flex-1 py-3 items-center ${homeOdds === "1.8" ? 'bg-gray-100' : 'bg-gray-100'}`}>
                <Text className={`font-medium ${homeOdds === "1.8" ? 'text-black' : 'text-gray-500'}`} style={{ fontFamily: "Livvic_500Medium" }}>
                    {homeOdds}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity className={`flex-1 py-3 items-center ${drawOdds === "2.1" ? 'bg-gray-100' : 'bg-gray-100'}`}>
                <Text className={`font-medium ${drawOdds === "2.1" ? 'text-black' : 'text-gray-500'}`} style={{ fontFamily: "Livvic_500Medium" }}>
                    {drawOdds}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity className={`flex-1 py-3 items-center ${awayOdds === "1.3" ? 'bg-[#473BF0]' : 'bg-gray-100'}`}>
                <Text className={`font-medium ${awayOdds === "1.3" ? 'text-white' : 'text-gray-500'}`} style={{ fontFamily: "Livvic_500Medium" }}>
                    {awayOdds}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 py-3 items-center bg-gray-50">
                <Text className="font-medium text-gray-500" style={{ fontFamily: "Livvic_500Medium" }}>
                    1.3
                </Text>
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
);

export default function LiveMatches({ navigation }) {
    const [activeSport, setActiveSport] = useState("Football");
    const [searchText, setSearchText] = useState("");

    const liveMatches = [
        {
            id: 1,
            league: "Premier League",
            homeTeam: "Chelsea",
            awayTeam: "Leicester C",
            homeScore: "0",
            awayScore: "1",
            time: "49:30",
            homeOdds: "1.8",
            drawOdds: "2.1",
            awayOdds: "1.3",
            homeImage: require("../../assets/icons/club.png"),
            awayImage: require("../../assets/icons/club.png"),
        },
        {
            id: 2,
            league: "UEFA Europa League",
            homeTeam: "Arsenal",
            awayTeam: "Roma",
            homeScore: "0",
            awayScore: "1",
            time: "88:42",
            homeOdds: "22.8",
            drawOdds: "14.2",
            awayOdds: "1.2",
            homeImage: require("../../assets/icons/club.png"),
            awayImage: require("../../assets/icons/club.png"),
        },
        {
            id: 3,
            league: "UEFA Europa League",
            homeTeam: "Arsenal",
            awayTeam: "Roma",
            homeScore: "0",
            awayScore: "1",
            time: "88:42",
            homeOdds: "22.8",
            drawOdds: "14.2",
            awayOdds: "1.2",
            homeImage: require("../../assets/icons/club.png"),
            awayImage: require("../../assets/icons/club.png"),
        },
    ];

    const navigateToMatchDetails = (matchId) => {
        navigation.navigate('MatchDetails', { matchId });
    };

    return (
        <SafeAreaView className={`flex-1 bg-white ${Platform.OS === 'android' ? 'pt-[2rem]' : ''}`}>
            <View className="px-6 py-4">
                <View className="flex-row items-center mb-4">
                    <View className="w-3 h-3 rounded-full bg-[#473BF0] mr-2" />
                    <Text className="text-xl font-bold" style={{ fontFamily: "Livvic_700Bold" }}>
                        LIVE
                    </Text>
                </View>

                <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 mb-4">
                    <Feather name="search" size={20} color="#6B7280" />
                    <TextInput
                        placeholder="Search by events, teams"
                        placeholderTextColor="#6B7280"
                        value={searchText}
                        onChangeText={setSearchText}
                        className="ml-2 text-base flex-1"
                        style={{ fontFamily: "Livvic_400Regular" }}
                    />
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mb-4"
                >
                    <SportButton
                        icon={<FontAwesome name="soccer-ball-o" size={20} color={activeSport === "Football" ? "white" : "#6B7280"} />}
                        label="Football"
                        active={activeSport === "Football"}
                        onPress={() => setActiveSport("Football")}
                    />
                    <SportButton
                        icon={<FontAwesome5 name="basketball-ball" size={20} color={activeSport === "Basketball" ? "white" : "#6B7280"} />}
                        label="Basketball"
                        active={activeSport === "Basketball"}
                        onPress={() => setActiveSport("Basketball")}
                    />
                    <SportButton
                        icon={<MaterialCommunityIcons name="volleyball" size={20} color={activeSport === "Volleyball" ? "white" : "#6B7280"} />}
                        label="Volleyball"
                        active={activeSport === "Volleyball"}
                        onPress={() => setActiveSport("Volleyball")}
                    />
                    <SportButton
                        icon={<MaterialCommunityIcons name="tennis" size={20} color={activeSport === "Tennis" ? "white" : "#6B7280"} />}
                        label="Tennis"
                        active={activeSport === "Tennis"}
                        onPress={() => setActiveSport("Tennis")}
                    />
                    <SportButton
                        icon={<FontAwesome5 name="football-ball" size={20} color={activeSport === "AmericanFootball" ? "white" : "#6B7280"} />}
                        label="American Football"
                        active={activeSport === "AmericanFootball"}
                        onPress={() => setActiveSport("AmericanFootball")}
                    />
                </ScrollView>
            </View>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 30 }}
                className="mb-20 flex-1 px-6"
                showsVerticalScrollIndicator={false}
            >
                {liveMatches.map((match) => (
                    <LiveMatchItem
                        key={match.id}
                        {...match}
                        onPress={() => navigateToMatchDetails(match.id)}
                    />
                ))}
            </ScrollView>

        </SafeAreaView >
    );
}