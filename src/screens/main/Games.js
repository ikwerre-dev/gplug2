// Games.js
import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const GameCard = ({ title, image, backgroundColor, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        className="rounded-xl overflow-hidden shadow-lg mb-4 w-[46%] "
        style={{
            backgroundColor: '#fff',
            elevation: 2,
        }}
    >
        <View className="items-center">
            <Image
                source={image}
                className="mb-2"
                resizeMode="cover"
                style={{ width: '100%', height: '100' }}
            />
            <Text
                className="text-center font-medium"
                style={{ fontFamily: "Livvic_500Medium" }}
            >
                {title}
            </Text>
        </View>
    </TouchableOpacity>
);

export default function Games({ navigation }) {
    const games = [
        {
            id: 'chess',
            title: 'Chess',
            image: require('../../assets/games/chess.png'),
            backgroundColor: 'white',
        },
        {
            id: 'ludo',
            title: 'Ludo',
            image: require('../../assets/games/chess.png'),
            backgroundColor: 'white',
        },
        {
            id: 'what-what',
            title: 'What What',
            image: require('../../assets/games/chess.png'),
            backgroundColor: '#2B82C4',
        },
        {
            id: 'rock-paper-scissors',
            title: 'Rock Paper Scissors',
            image: require('../../assets/games/chess.png'),
            backgroundColor: '#8E44AD',
        },
        {
            id: 'darts',
            title: 'Darts',
            image: require('../../assets/games/chess.png'),
            backgroundColor: '#F1C40F',
        },
        {
            id: 'ball-pool',
            title: '8 Ball Pool',
            image: require('../../assets/games/chess.png'),
            backgroundColor: '#27AE60',
        },
    ];

    const navigateToGame = (gameId) => {
        // Navigate to the specific game screen
        navigation.navigate('GameDetail', { gameId });
    };

    return (
        <SafeAreaView className={`flex-1 bg-white ${Platform.OS === 'android' ? 'pt-[2rem]' : ''}`}>
            <View className="px-6 py-4">
                <Text
                    className="text-2xl font-bold text-center mb-4"
                    style={{ fontFamily: "Livvic_700Bold" }}
                >
                    Games
                </Text>
            </View>

            <ScrollView className="flex-1 px-2">
                <View className="flex-row flex-wrap justify-between">
                    {games.map((game) => (
                        <GameCard
                            key={game.id}
                            title={game.title}
                            image={game.image}
                            backgroundColor={game.backgroundColor}
                            onPress={() => navigateToGame(game.id)}
                        />
                    ))}
                </View>
            </ScrollView>


        </SafeAreaView>
    );
}