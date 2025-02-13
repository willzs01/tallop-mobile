import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image } from "react-native";
import { User, Mail, Phone, MapPin, Edit2, LogOut, BookOpen, Trophy, Bell } from "lucide-react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="flex-1">
        {/* Header with Avatar */}
        <LinearGradient
          colors={['#4c1d95', '#7c3aed']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="pt-8 pb-28 rounded-b-[48px]"
        >
          <View className="flex-row justify-end px-6 mb-4">
            <TouchableOpacity className="bg-purple-500/20 p-3 rounded-full">
              <Bell color="#e9d5ff" size={24} />
            </TouchableOpacity>
          </View>

          <View className="items-center">
            <View className="relative">
              <View className="w-40 h-40 bg-gray-800 rounded-full items-center justify-center border-4 border-purple-400/30 shadow-2xl">
                <User color="#e9d5ff" size={96} />
              </View>
              <TouchableOpacity className="absolute bottom-0 right-0 bg-purple-600 p-3 rounded-full shadow-lg">
                <Edit2 color="#ffffff" size={20} />
              </TouchableOpacity>
            </View>
            
            <Text className="text-white text-3xl font-bold mt-6">John Doe</Text>
            <View className="bg-purple-500/20 rounded-full px-5 py-2 mt-3">
              <Text className="text-purple-100 text-base font-medium">Advanced Learner</Text>
            </View>
            
          
          </View>
        </LinearGradient>

        {/* Profile Details */}
        <View className="px-6 -mt-16">
          <View className="bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-7 mb-6">
            <Text className="text-white text-xl font-semibold mb-6">Personal Information</Text>
            
            <View className="space-y-5">
              <View className="flex-row items-center">
                <View className="bg-purple-500/20 p-3 rounded-xl mr-4">
                  <Mail color="#a855f7" size={22} />
                </View>
                <View>
                  <Text className="text-gray-400 text-sm mb-1">Email</Text>
                  <Text className="text-gray-100 text-base">john.doe@example.com</Text>
                </View>
              </View>
              
              <View className="flex-row items-center">
                <View className="bg-purple-500/20 p-3 rounded-xl mr-4">
                  <Phone color="#a855f7" size={22} />
                </View>
                <View>
                  <Text className="text-gray-400 text-sm mb-1">Phone</Text>
                  <Text className="text-gray-100 text-base">+1 234 567 8900</Text>
                </View>
              </View>
              
              <View className="flex-row items-center">
                <View className="bg-purple-500/20 p-3 rounded-xl mr-4">
                  <MapPin color="#a855f7" size={22} />
                </View>
                <View>
                  <Text className="text-gray-400 text-sm mb-1">Location</Text>
                  <Text className="text-gray-100 text-base">New York, USA</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity className="bg-purple-600 rounded-2xl py-4 mb-4 flex-row justify-center items-center shadow-lg">
            <Edit2 color="#ffffff" size={20} className="mr-2" />
            <Text className="text-white text-center font-semibold text-lg">Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-800/90 backdrop-blur-lg rounded-2xl py-4 flex-row justify-center items-center mb-8">
            <LogOut color="#ef4444" size={20} className="mr-2" />
            <Text className="text-red-500 text-center font-semibold text-lg">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
