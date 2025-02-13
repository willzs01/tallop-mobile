import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  Target,
  ChevronRight,
  Sparkles,
  Star,
  Zap,
  Code,
  Palette,
  Database,
  Building2,
  Briefcase,
  TrendingUp,
} from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_PADDING = 20;
const CARD_WIDTH = width * 0.75;

const HomeScreen = () => {
  const scaleValue = useSharedValue(0.95);
  const router = useRouter();

  useEffect(() => {
    scaleValue.value = withSpring(1, { damping: 10, stiffness: 100 });
  }, []);
 
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  

  const RecommendedJobCard = ({ role, company, location, match }) => (
    <TouchableOpacity 
      className="bg-gray-800/90 rounded-2xl p-6 mr-4 shadow-xl"
      style={{ width: CARD_WIDTH }}
    >
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <Text className="text-white font-bold text-xl mb-2">{role}</Text>
          <View className="flex-row items-center">
            <Building2 size={18} color="#94a3b8" />
            <Text className="text-gray-400 ml-2 text-base">{company}</Text>
          </View>
        </View>
        <View className="bg-green-500/30 rounded-xl px-4 py-2">
          <Text className="text-green-400 font-semibold">{match}% Match</Text>
        </View>
      </View>
      
      <Text className="text-gray-400 text-base mb-6">{location}</Text>
      
      <TouchableOpacity className="bg-purple-600 rounded-xl py-4 items-center">
        <Text className="text-white font-semibold text-base">View Details</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const SkillProgressCard = ({ skill, progress, icon: Icon, color }) => (
    <TouchableOpacity 
      className="bg-gray-800/90 rounded-2xl p-6 mr-4 shadow-lg" 
      style={{ width: width * 0.45 }}
    >
      <View className={`bg-${color}-500/30 p-3 rounded-xl w-12 h-12 items-center justify-center mb-4`}>
        <Icon size={24} color={`#${color === 'purple' ? 'a855f7' : color === 'blue' ? '3b82f6' : '22c55e'}`} />
      </View>
      <Text className="text-white font-bold text-lg mb-3">{skill}</Text>
      <View className="bg-gray-700/50 h-2 rounded-full mb-3">
        <View 
          className="bg-purple-600 h-2 rounded-full" 
          style={{ width: `${progress}%` }} 
        />
      </View>
      <Text className="text-gray-400 text-base">{progress}% Complete</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="flex-1 mb-24">
        <Animated.View className="px-6 pt-4" style={animatedStyle}>
          {/* Header */}
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-white text-4xl font-bold">Hi, John 👋</Text>
              <Text className="text-gray-400 text-lg mt-2">Your career dashboard</Text>
            </View>
            <TouchableOpacity className="bg-gray-800/90 p-3 rounded-xl shadow-lg">
              <Star size={26} color="#a855f7" />
            </TouchableOpacity>
          </View>

     
          {/* Quick Actions */}
          <View className="flex-row justify-between items-center mb-8">
            <TouchableOpacity className="bg-gray-800/90 rounded-2xl p-6 flex-1 mr-3 shadow-lg">
              <View className="bg-purple-500/30 p-3 rounded-xl w-12 h-12 items-center justify-center mb-3">
                <Briefcase size={24} color="#a855f7" />
              </View>
              <Text className="text-white font-bold text-lg">Find Jobs</Text>
              <Text className="text-gray-400 text-base mt-2">120 matches</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-gray-800/90 rounded-2xl p-6 flex-1 ml-3 shadow-lg">
              <View className="bg-green-500/30 p-3 rounded-xl w-12 h-12 items-center justify-center mb-3">
                <TrendingUp size={24} color="#22c55e" />
              </View>
              <Text className="text-white font-bold text-lg">Skill Analysis</Text>
              <Text className="text-gray-400 text-base mt-2">View Report</Text>
            </TouchableOpacity>
          </View>

          {/* Recommended Jobs */}
          <View className="mb-8">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-2xl font-semibold">Recommended Jobs</Text>
              <Link href="/jobs" asChild>
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-purple-400 text-base mr-2">View All</Text>
                  <ChevronRight size={18} color="#a855f7" />
                </TouchableOpacity>
              </Link>
            </View>
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: CARD_PADDING }}
            >
              <RecommendedJobCard
                role="Senior Frontend Developer"
                company="TechCorp Inc."
                location="San Francisco, CA"
                match="95"
              />
              <RecommendedJobCard
                role="UI/UX Designer"
                company="Design Studio"
                location="Remote"
                match="88"
              />
              <RecommendedJobCard
                role="Full Stack Developer"
                company="StartupX"
                location="New York, NY"
                match="82"
              />
            </ScrollView>
          </View>

          {/* Skills in Progress */}
          <View className="mb-8">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-2xl font-semibold">Skills in Progress</Text>
              <Link href="/explore" asChild>
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-purple-400 text-base mr-2">View All</Text>
                  <ChevronRight size={18} color="#a855f7" />
                </TouchableOpacity>
              </Link>
            </View>
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: CARD_PADDING }}
            >
              <SkillProgressCard
                skill="React Advanced"
                progress={75}
                icon={Code}
                color="purple"
              />
              <SkillProgressCard
                skill="UI Design"
                progress={60}
                icon={Palette}
                color="blue"
              />
              <SkillProgressCard
                skill="Node.js"
                progress={45}
                icon={Database}
                color="green"
              />
            </ScrollView>
          </View>

          {/* Career Tips */}
          <View>
            <Text className="text-white text-2xl font-semibold mb-6">Career Tips</Text>
            <TouchableOpacity className="bg-gray-800/90 rounded-2xl p-6 mb-4 shadow-lg">
              <View className="flex-row items-start">
                <View className="bg-purple-500/30 p-3 rounded-xl mr-4">
                  <Sparkles size={26} color="#a855f7" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg mb-2">Portfolio Enhancement</Text>
                  <Text className="text-gray-400 text-base">Learn how to showcase your projects effectively</Text>
                </View>
                <ChevronRight size={22} color="#a855f7" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-gray-800/90 rounded-2xl p-6 shadow-lg">
              <View className="flex-row items-start">
                <View className="bg-blue-500/30 p-3 rounded-xl mr-4">
                  <Zap size={26} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg mb-2">Interview Preparation</Text>
                  <Text className="text-gray-400 text-base">Top questions and best practices</Text>
                </View>
                <ChevronRight size={22} color="#a855f7" />
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
