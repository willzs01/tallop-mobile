import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { ChevronLeft, Mail, Lock, User } from 'lucide-react-native';
import { Link, useRouter } from 'expo-router';
import { createUser } from '../../../lib/appwrite';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (!email || !password || !username) {
        setError('Please fill in all fields');
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }

      // Basic password validation
      if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      // Username validation
      if (username.length < 3) {
        setError('Username must be at least 3 characters long');
        return;
      }

      const newUser = await createUser(email, password, username);
      if (newUser) {
        router.push('/onboarding-flow');
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      if (error.message?.includes('already exists')) {
        setError('An account with this email already exists');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView className="flex-1 bg-gray-950">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView 
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{paddingBottom: 100}}
          >
            {/* Header with Gradient Background */}
            <View className="h-64 bg-gradient-to-b from-blue-600 to-gray-950 px-8 pt-6 pb-8">
              <TouchableOpacity className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-lg items-center justify-center">
                <Link href="/">
                  <ChevronLeft size={28} color="#fff" />
                </Link>
              </TouchableOpacity>
              
              <View className="mt-8">
                <Text className="text-5xl font-bold text-white">
                  Join Tallop
                </Text>
                <Text className="text-gray-100 text-lg mt-2 opacity-80">
                  Where professionals connect & grow
                </Text>
              </View>
            </View>

            {/* Main Content */}
            <View className="px-8 mt-8 space-y-6">
              {/* Username Input */}
              <View>
                <Text className="text-gray-400 text-base mb-2 ml-1">Username</Text>
                <View className="flex-row items-center space-x-3 bg-gray-900 px-4 py-3.5 rounded-xl border border-gray-800">
                  <User size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-white text-base"
                    placeholder="Choose a username"
                    placeholderTextColor="#6B7280"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Email Input */}
              <View>
                <Text className="text-gray-400 text-base mb-2 ml-1">Email</Text>
                <View className="flex-row items-center space-x-3 bg-gray-900 px-4 py-3.5 rounded-xl border border-gray-800">
                  <Mail size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-white text-base"
                    placeholder="Enter your email"
                    placeholderTextColor="#6B7280"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-gray-400 text-base mb-2 ml-1">Password</Text>
                <View className="flex-row items-center space-x-3 bg-gray-900 px-4 py-3.5 rounded-xl border border-gray-800">
                  <Lock size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-white text-base"
                    placeholder="Create a password"
                    placeholderTextColor="#6B7280"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              {error ? (
                <Text className="text-red-500 text-center text-sm py-2">{error}</Text>
              ) : null}

              {/* Sign Up Button */}
              <TouchableOpacity
                className={`bg-blue-600 p-4 rounded-xl mt-6 ${loading ? 'opacity-70' : ''}`}
                onPress={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <View className="flex-row justify-center items-center space-x-2">
                    <ActivityIndicator color="#fff" />
                    <Text className="text-white font-semibold text-base ml-2">
                      Creating Account...
                    </Text>
                  </View>
                ) : (
                  <Text className="text-white text-center font-semibold text-base">
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>

              {/* Sign In Link */}
              <View className="flex-row justify-center items-center py-8">
                <Text className="text-gray-400 text-base">Already have an account? </Text>
                <Link href="/signin" asChild>
                  <TouchableOpacity>
                    <Text className="text-blue-400 font-semibold text-base">Sign In</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;