import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Apple } from 'lucide-react-native';
import { Link } from 'expo-router';

const SignIn = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-950 p-4">
      {/* Header */}
      <View className="px-6 pt-4 pb-6 mb-4">
        <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-900 items-center justify-center">
          <Link href="/onboarding">
            <ChevronLeft size={24} color="#fff" />
          </Link>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="px-6 flex-1 space-y-8">
        {/* Title Section */}
        <View className="space-y-3 mb-8">
          <Text className="text-3xl font-bold text-white">
            Welcome Back!
          </Text>
          <Text className="text-gray-400 text-lg">
            Continue your professional journey on Tallop
          </Text>
        </View>

        {/* Social Sign-in Buttons */}
        <View className="flex flex-col gap-8 space-y-6 mb-8">
          {/* Google Button */}
          <Link href="/home" asChild>
          <TouchableOpacity 
            className="flex-row items-center justify-center space-x-3 bg-gray-900 p-4 rounded-2xl border border-gray-800"
          >
           
            <View className="w-6 h-6 items-center justify-center">
              <View className="w-5 h-5 bg-white rounded-full overflow-hidden items-center justify-center">
                <Text className="text-sm font-bold text-blue-500">G</Text>
              </View>
            </View>
            <Text className="text-white font-medium text-base">
              Continue with Google
            </Text>
            
          </TouchableOpacity>
          </Link>
          {/* Apple Button */}
          <TouchableOpacity 
            className="flex-row items-center justify-center space-x-3 bg-gray-900 p-4 rounded-2xl border border-gray-800"
          >
            <Apple size={24} color="#fff" />
            <Text className="text-white font-medium text-base">
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;