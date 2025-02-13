import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Brain, Calendar, Trophy, Target, ChevronRight, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');
const ICON_SIZE = width * 0.22; // Responsive icon container size

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const progressAnimation = React.useRef(new Animated.Value(0)).current;

  const steps = [
    {
      icon: (props) => <Brain {...props} />,
      title: "Welcome to Recall AI",
      description: "Master any subject with AI-powered smart repetition and personalized study paths",
      highlight: "Join 10,000+ successful learners",
      gradientColors: ['#9333EA', '#C026D3']
    },
    {
      icon: (props) => <Calendar {...props} />,
      title: "Study Consistently",
      description: "Build lasting study habits with scientifically-proven learning techniques",
      highlight: "15 minutes daily is all you need",
      gradientColors: ['#6366F1', '#8B5CF6']
    },
    {
      icon: (props) => <Trophy {...props} />,
      title: "Track Progress",
      description: "Watch your knowledge grow with detailed analytics and achievement system",
      highlight: "2x faster knowledge retention",
      gradientColors: ['#EC4899', '#F43F5E']
    },
    {
      icon: (props) => <Target {...props} />,
      title: "Set Your Goals",
      description: "What would you like to master first?",
      highlight: "Start your learning journey today",
      gradientColors: ['#8B5CF6', '#6366F1']
    }
  ];

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: (currentStep + 1) / steps.length,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  const IconContainer = ({ gradientColors, children }) => (
    <View className="items-center justify-center">
      <View
        className="absolute"
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          borderRadius: ICON_SIZE / 2,
          overflow: 'hidden'
        }}
      >
        <LinearGradient
          colors={gradientColors}
          style={{
            width: ICON_SIZE,
            height: ICON_SIZE,
            borderRadius: ICON_SIZE / 2,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </View>
      <View 
        className="items-center justify-center"
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
        }}
      >
        {children}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      {/* Progress Steps */}
      <View className="flex-row justify-center items-center space-x-2 mt-6">
        {steps.map((_, index) => (
          <React.Fragment key={index}>
            <View
              className={`h-8 w-8 rounded-full items-center justify-center ${
                index <= currentStep ? 'bg-purple-500' : 'bg-gray-700'
              }`}
            >
              <Text className="text-white font-bold">{index + 1}</Text>
            </View>
            {index < steps.length - 1 && (
              <View className="h-1 w-6 bg-gray-700" />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Main Content */}
      <View className="flex-1 px-6 justify-center">
        {/* Icon Container */}
        <View className="mb-12">
          <IconContainer gradientColors={steps[currentStep].gradientColors}>
            {steps[currentStep].icon({
              size: ICON_SIZE * 0.5,
              color: '#ffffff',
              strokeWidth: 1.5
            })}
          </IconContainer>
        </View>

        {/* Text Content */}
        <View className="space-y-4">
          <Text className="text-3xl font-bold text-white text-center">
            {steps[currentStep].title}
          </Text>
          
          <Text className="text-gray-400 text-center text-lg leading-7">
            {steps[currentStep].description}
          </Text>

          {/* Highlight Box */}
          <View className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-2xl mt-6 border border-gray-800">
            <View className="flex-row items-center justify-center space-x-2">
              <Sparkles size={20} color="#9333EA" />
              <Text className="text-purple-400 font-medium text-base">
                {steps[currentStep].highlight}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View className="px-6 pb-8 space-y-4">
        {currentStep === steps.length - 1 ? (
          <Link href="/auth/signup" asChild>
            <TouchableOpacity 
              className="bg-purple-600 rounded-2xl p-4 flex-row items-center justify-center space-x-2"
            >
              <Text className="text-white font-semibold text-lg">
                Get Started
              </Text>
            </TouchableOpacity>
          </Link>
        ) : (
          <TouchableOpacity
            onPress={() => setCurrentStep(currentStep + 1)}
            className="bg-purple-600 rounded-2xl p-4 flex-row items-center justify-center space-x-2"
          >
            <Text className="text-white font-semibold text-lg">
              Continue
            </Text>
            <ChevronRight color="white" size={20} />
          </TouchableOpacity>
        )}

        {currentStep < steps.length - 1 && (
          <TouchableOpacity
            onPress={() => setCurrentStep(steps.length - 1)}
            className="py-3"
          >
            <Text className="text-gray-500 text-center font-medium">
              Skip Introduction
            </Text>
          </TouchableOpacity>
        )}
      </View>

    </SafeAreaView>
  );
};

export default OnboardingFlow;