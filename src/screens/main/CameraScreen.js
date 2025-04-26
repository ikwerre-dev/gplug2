import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Alert, Image, TextInput, SafeAreaView, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { CameraView, CameraType, FlashMode, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CameraScreen({ navigation }) {
    const [facing, setFacing] = useState('back');
    const [flash, setFlash] = useState('off');
    const [isRecording, setIsRecording] = useState(false);
    const [recordingStartTime, setRecordingStartTime] = useState(null);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [mediaUri, setMediaUri] = useState(null);
    const [mediaType, setMediaType] = useState("video");
    const [caption, setCaption] = useState('');
    const [trimStart, setTrimStart] = useState(0);
    const [trimEnd, setTrimEnd] = useState(0);

    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
    const [mediaLibraryPermission, requestMediaLibraryPermission] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    const cameraRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        (async () => {
            const libraryPermission = await MediaLibrary.requestPermissionsAsync();
            requestMediaLibraryPermission(libraryPermission.status === 'granted');
        })();

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isRecording) {
            const startTime = Date.now()
            timerRef.current = setInterval(() => {
                setRecordingDuration(Math.floor((Date.now() - startTime) / 1000))
            }, 1000)
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
            setRecordingDuration(0)
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [isRecording])

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleLongPressIn = async () => {
        if (cameraRef.current && !isRecording) {
            setIsRecording(true);

            try {
                const videoRecordPromise = cameraRef.current.recordAsync({
                    maxDuration: 60, // Maximum recording duration in seconds
                    quality: '1080p', // Video quality
                    mute: false, // Include audio

                });

                const data = await videoRecordPromise;

                setIsSaving(true);
                setMediaUri(data.uri);
                setMediaType('video');
                setTrimEnd(recordingDuration);
                setShowPreview(true);
                // await saveVideo(data.uri);
                setIsSaving(false);
            } catch (error) {
                console.error('Recording error:', error);
                Alert.alert('Error', 'Failed to record video');
                setIsRecording(false);
            }
        }
    };

    const handleSend = async () => {
        setIsSaving(true);
        try {
            if (mediaType === 'video') {
                const finalUri = mediaUri;
                await saveVideo(finalUri);
            } else {
                await saveVideo(mediaUri);
            }
            setShowPreview(false);
            setMediaUri(null);
            setMediaType('video');
            setCaption('');
            setTrimStart(0);
            setTrimEnd(0);
        } catch (error) {
            console.error('Error saving media:', error);
            Alert.alert('Error', 'Failed to save media');
        }
        setIsSaving(false);
    };


    const handleLongPressOut = async () => {
        if (cameraRef.current && isRecording) {
            try {
                await cameraRef.current.stopRecording();
            } catch (error) {
                console.error('Error stopping recording:', error);
            }
            setIsRecording(false);
        }
    };

    const saveVideo = async (uri) => {
        try {
            const asset = await MediaLibrary.createAssetAsync(uri);
            Alert.alert('Success', 'Video saved to your library!');
            return asset;
        } catch (error) {
            console.error('Error saving video:', error);
            Alert.alert('Error', 'Failed to save video');
        }
    };

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const toggleFlash = () => {
        setFlash(current => (current === 'off' ? 'on' : 'off'));
    };

    const handlePress = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                setIsSaving(true);
                setMediaUri(photo.uri);
                setMediaType('photo');
                setShowPreview(true);
                // await saveVideo(photo.uri);
                setIsSaving(false);
            } catch (error) {
                console.error('Taking picture failed:', error);
                Alert.alert('Error', 'Failed to take picture');
            }
        }
    };

    // Check if permissions are still loading
    if (!cameraPermission || !microphonePermission || mediaLibraryPermission === null) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    // Check if permissions are granted
    if (!cameraPermission.granted || !microphonePermission.granted || !mediaLibraryPermission) {
        return (
            <View className="flex-1 justify-center items-center bg-black p-5">
                <Text className="text-white text-lg text-center mb-5">
                    We need camera, microphone, and media library permissions to record and save videos
                </Text>
                <TouchableOpacity
                    className="bg-white px-4 py-2 rounded-lg"
                    onPress={() => {
                        requestCameraPermission();
                        requestMicrophonePermission();
                        MediaLibrary.requestPermissionsAsync().then(result =>
                            requestMediaLibraryPermission(result.status === 'granted')
                        );
                    }}
                >
                    <Text className="text-black font-bold text-base">Grant Permissions</Text>
                </TouchableOpacity>
            </View>
        );
    }
    console.log(mediaUri)
    if (showPreview) {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                className="bg-black"
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView className="flex-1">
                        <View className="flex-1">
                            {mediaType === 'video' ? (
                                <Video
                                    source={{ uri: mediaUri }}
                                    className="flex-1"
                                    style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH, flex: 1 }}
                                    resizeMode="cover"
                                    shouldPlay
                                    isLooping
                                />
                            ) : (
                                <Image
                                    source={{ uri: mediaUri }}
                                    className="flex-1"
                                    resizeMode="cover"
                                />
                            )}

                            <View className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
                                <TextInput
                                    className="bg-white/10 rounded-xl p-4 text-white mb-4"
                                    placeholder="Add a caption..."
                                    placeholderTextColor="#999"
                                    value={caption}
                                    onChangeText={setCaption}
                                    multiline
                                    maxLength={200}
                                />

                                {/* {mediaType === 'video' && (
                                    <View className="mb-4">
                                        <Slider
                                            style={{ width: SCREEN_WIDTH - 32, height: 40 }}
                                            minimumValue={0}
                                            maximumValue={recordingDuration}
                                            value={trimEnd}
                                            onValueChange={setTrimEnd}
                                            minimumTrackTintColor="#fff"
                                            maximumTrackTintColor="#666"
                                        />
                                        <Text className="text-white text-center">
                                            {formatDuration(Math.floor(trimEnd))}
                                        </Text>
                                    </View>
                                )} */}

                                <View className="flex-row justify-between">
                                    <TouchableOpacity
                                        className="bg-white/20 p-4 rounded-full"
                                        onPress={() => {
                                            setShowPreview(false);
                                            setMediaUri(null);
                                            setMediaType('video');
                                            setCaption('');
                                        }}
                                    >
                                        <MaterialIcons name="close" size={24} color="white" />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        className="bg-[#25D366] px-8 py-4 rounded-full flex-row items-center"
                                        onPress={handleSend}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? (
                                            <ActivityIndicator color="white" />
                                        ) : (
                                            <>
                                                <Text className="text-white font-semibold mr-2">Send</Text>
                                                <MaterialIcons name="send" size={20} color="white" />
                                            </>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }


    const pickMedia = async () => {
         const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (!result.canceled) {
            setMediaUri(result.assets[0].uri);
            setMediaType(result.assets[0].type === 'video' ? 'video' : 'photo');
            setShowPreview(true);
        }
    };

    return (
        <View className="h-screen bg-black flex-1">
            <CameraView
                className="flex-1"
                ref={cameraRef}
                facing={facing}
                style={{ flex: 1 }}
                flash={flash}
                videoStabilizationMode={true}
                videoQuality='1080p'
                mirror={mediaType != 'video' ? true : false}
                mode={mediaType}
                onCameraReady={() => {
                    console.log('Camera ready');
                    setIsCameraReady(true);
                }}
                onMountError={(error) => console.error('Camera mount error:', error)}
            >
                <SafeAreaView className="flex-1 bg-transparent">
                    <View className="flex-1 justify-between p-5">
                        <View className="flex-row justify-between items-center mt-4">
                            <TouchableOpacity
                                className="w-12 h-12 rounded-full bg-black/30 justify-center items-center"
                                onPress={() => navigation.goBack()}
                            >
                                <MaterialIcons name="close" size={28} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="w-12 h-12 rounded-full bg-black/30 justify-center items-center"
                                onPress={toggleFlash}
                            >
                                <MaterialIcons
                                    name={flash === 'on' ? 'flash-on' : 'flash-off'}
                                    size={28}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>

                        {isRecording && (
                            <View className="absolute flex-row  items-center top-2 self-center bg-black/50 px-4 py-2 rounded-full mt-8">
                                <View className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                                <Text className="text-white text-base">
                                    {formatDuration(recordingDuration)}
                                </Text>
                            </View>
                        )}

                        <View className="absolute bottom-10 left-0 right-0 flex-row justify-evenly items-center">
                            <TouchableOpacity
                                className="w-14 h-14 rounded-full bg-black/30 justify-center items-center"
                                onPress={pickMedia}
                            >
                                <MaterialIcons name="photo-library" size={28} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                className={`w-20 h-20 rounded-full justify-center items-center border-4 ${isRecording ? 'border-red-500' : 'border-white'} bg-white/30`}
                                onPress={isCameraReady ? handlePress : null}
                                onLongPress={isCameraReady ? handleLongPressIn : null}
                                onPressOut={handleLongPressOut}
                                delayLongPress={300}
                                activeOpacity={0.7}
                                disabled={!isCameraReady}
                            >
                                {isSaving ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <View className={isRecording ? "w-8 h-8 bg-red-500 rounded" : "w-16 h-16 rounded-full bg-white"} />
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="w-14 h-14 rounded-full bg-black/30 justify-center items-center"
                                onPress={toggleCameraFacing}
                            >
                                <MaterialIcons name="flip-camera-ios" size={28} color="white" />
                            </TouchableOpacity>
                        </View>

                        {!isRecording && !isSaving && (
                            <Text className="text-white text-center text-base absolute bottom-32 left-0 right-0">
                                {isCameraReady ? "Long press to record video" : "Camera initializing..."}
                            </Text>
                        )}
                    </View>
                </SafeAreaView>
            </CameraView>
        </View>
    );
}
