import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { ChevronLeft, Apple, Mail, Lock } from 'lucide-react-native';
import { Link, useRouter } from 'expo-router';
import { signIn } from '../../../lib/appwrite';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      await signIn(email, password);
      router.push('/home');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView className="flex-1 bg-gray-950 ">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {/* Header */}
          <View className="px-8 pt-6 pb-8">
            <TouchableOpacity className="w-12 h-12 rounded-full bg-gray-900 items-center justify-center">
              <Link href="/onboarding">
                <ChevronLeft size={28} color="#fff" />
              </Link>
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View className="px-8 flex-1 space-y-8">
            {/* Title Section */}
            <View className="space-y-4">
              <Text className="text-4xl font-bold text-white">
                Welcome Back!
              </Text>
              <Text className="text-gray-400 text-xl">
                Continue your professional journey on Tallop
              </Text>
            </View>

            {/* Email/Password Form */}
            <View className="space-y-6 mt-4">
              <View className="space-y-3">
                <Text className="text-gray-400 text-lg ml-1">Email</Text>
                <View className="flex-row items-center space-x-3 bg-gray-900 px-5 py-4 rounded-2xl border border-gray-800">
                  <Mail size={24} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-white text-lg"
                    placeholder="Enter your email"
                    placeholderTextColor="#6B7280"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View className="space-y-3">
                <Text className="text-gray-400 text-lg ml-1">Password</Text>
                <View className="flex-row items-center space-x-3 bg-gray-900 px-5 py-4 rounded-2xl border border-gray-800">
                  <Lock size={24} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-white text-lg"
                    placeholder="Enter your password"
                    placeholderTextColor="#6B7280"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              {error ? (
                <Text className="text-red-500 text-center text-base mt-2">{error}</Text>
              ) : null}

              <TouchableOpacity
                className={`bg-blue-600 p-5 rounded-2xl mt-4 flex-row justify-center items-center space-x-2 ${loading ? 'opacity-70' : ''}`}
                onPress={handleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ActivityIndicator color="#fff" />
                    <Text className="text-white text-center font-semibold text-lg ml-2">
                      Signing in...
                    </Text>
                  </>
                ) : (
                  <Text className="text-white text-center font-semibold text-lg">
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center items-center mt-8">
              <Text className="text-gray-400 text-lg">Don't have an account? </Text>
              <Link href="/signup" asChild>
                <TouchableOpacity>
                  <Text className="text-blue-500 font-semibold text-lg">Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;