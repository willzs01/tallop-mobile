import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { ArrowLeft, Mic, StopCircle, Save } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue
} from 'react-native-reanimated';

const Record = () => {
  const navigation = useNavigation();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);

  const pulseValue = useSharedValue(1);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseValue.value }],
    opacity: pulseValue.value * 0.8,
  }));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      setDuration(0);

      pulseValue.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1
      );
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);
    pulseValue.value = 1;
    
    // Here you would typically handle the recorded audio file
    console.log('Recording stopped and stored at', uri);
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1">
        {/* Header */}
        <View className="p-4">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="w-10 h-10 justify-center items-center"
          >
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-3xl font-bold mb-8">
            {isRecording ? 'Recording...' : 'Ready to Record'}
          </Text>
          
          <Text className="text-purple-400 text-6xl font-mono mb-12">
            {formatTime(duration)}
          </Text>

          <View className="relative">
            {isRecording && (
              <Animated.View 
                className="absolute bg-purple-600/30 rounded-full w-40 h-40"
                style={[pulseStyle, { top: -12, left: -12 }]}
              />
            )}
            <TouchableOpacity
              onPress={isRecording ? stopRecording : startRecording}
              className={`w-32 h-32 rounded-full justify-center items-center border-4 border-b-8 ${
                isRecording 
                  ? 'bg-red-600 border-red-400 border-b-red-800' 
                  : 'bg-purple-600 border-purple-400 border-b-purple-800'
              }`}
            >
              {isRecording ? (
                <StopCircle size={48} color="#fff" />
              ) : (
                <Mic size={48} color="#fff" />
              )}
            </TouchableOpacity>
          </View>

          {!isRecording && recording && (
            <TouchableOpacity 
              className="mt-8 bg-green-600 py-3 px-6 rounded-full flex-row items-center"
              onPress={() => console.log('Save recording')}
            >
              <Save size={20} color="#fff" className="mr-2" />
              <Text className="text-white font-semibold text-lg">Save Recording</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Record;
