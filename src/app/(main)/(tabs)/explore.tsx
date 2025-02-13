import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import { Search, Filter, Star, Clock, Users, BookOpen, Code, Palette, Database, ChevronRight, TrendingUp, Zap } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import type { LucideIcon } from 'lucide-react-native';

interface CareerPathCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  progress: number;
  trending?: boolean;
}

interface SkillCardProps {
  title: string;
  level: string;
  category: string;
  duration: string;
  students: string;
}

const ExploreScreen = () => {
  const scaleValue = useSharedValue(0.9);
  const opacityValue = useSharedValue(0);

  useEffect(() => {
    scaleValue.value = withSpring(1);
    opacityValue.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
    opacity: opacityValue.value,
  }));

  const CareerPathCard = ({ title, description, icon: Icon, color, progress, trending }: CareerPathCardProps) => (
    <TouchableOpacity className="bg-gray-800/90 backdrop-blur-lg rounded-3xl p-6 mb-6 shadow-xl">
      <LinearGradient
        colors={[`#${color === 'purple' ? '4c1d95' : color === 'blue' ? '1e40af' : '166534'}`, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute top-0 left-0 right-0 h-32 rounded-3xl opacity-20"
      />
      <View className="flex-row justify-between items-start mb-6">
        <View className={`bg-${color}-500/30 p-4 rounded-2xl shadow-lg`}>
          <Icon size={28} color={`#${color === 'purple' ? 'a855f7' : color === 'blue' ? '3b82f6' : '22c55e'}`} />
        </View>
        {trending && (
          <View className="bg-purple-500/30 rounded-2xl px-4 py-2 flex-row items-center shadow-lg">
            <TrendingUp size={18} color="#a855f7" className="mr-2" />
            <Text className="text-purple-400 font-semibold">Trending</Text>
          </View>
        )}
      </View>
      
      <Text className="text-white font-bold text-2xl mb-3">{title}</Text>
      <Text className="text-gray-400 text-base mb-6">{description}</Text>
      
      <View className="bg-gray-700/50 h-3 rounded-full mb-3">
        <View 
          className="bg-purple-600 h-3 rounded-full shadow-lg"
          style={{ width: `${progress}%` }} 
        />
      </View>
      
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-400 text-base font-medium">{progress}% Match</Text>
        <TouchableOpacity className="flex-row items-center bg-purple-500/20 px-4 py-2 rounded-xl">
          <Text className="text-purple-400 font-semibold mr-2">Explore Path</Text>
          <ChevronRight size={18} color="#a855f7" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const SkillCard = ({ title, level, category, duration, students }: SkillCardProps) => (
    <TouchableOpacity className="bg-gray-800/90 backdrop-blur-lg rounded-3xl p-6 mb-6 shadow-xl">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <Text className="text-white font-bold text-xl mb-3">{title}</Text>
          <View className="flex-row items-center space-x-3">
            <View className="bg-purple-500/30 rounded-xl px-4 py-2">
              <Text className="text-purple-400 font-semibold">{level}</Text>
            </View>
            <View className="bg-gray-700/50 rounded-xl px-4 py-2">
              <Text className="text-gray-300">{category}</Text>
            </View>
          </View>
        </View>
        <View className="bg-green-500/30 rounded-xl px-4 py-2">
          <Text className="text-green-400 font-semibold">Recommended</Text>
        </View>
      </View>
      
      <View className="flex-row space-x-6 mt-4">
        <View className="flex-row items-center bg-gray-700/30 px-4 py-2 rounded-xl">
          <Clock size={18} color="#94a3b8" className="mr-2" />
          <Text className="text-gray-300">{duration}</Text>
        </View>
        <View className="flex-row items-center bg-gray-700/30 px-4 py-2 rounded-xl">
          <Users size={18} color="#94a3b8" className="mr-2" />
          <Text className="text-gray-300">{students} learners</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <Animated.View className="flex-1 px-6 pt-4 mb-24" style={animatedStyle}>
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-white text-3xl font-bold">Explore Careers</Text>
            <Text className="text-gray-400 text-lg mt-2">Discover your perfect path</Text>
          </View>
          <TouchableOpacity className="bg-purple-500/20 p-3 rounded-xl">
            <Filter size={26} color="#a855f7" />
          </TouchableOpacity>
        </View>
        
        <View className="flex-row space-x-4 mb-8">
          <View className="flex-1 flex-row items-center bg-gray-800/90 backdrop-blur-lg rounded-2xl px-5 py-4 shadow-lg">
            <Search size={22} color="#94a3b8" />
            <TextInput
              placeholder="Search careers & skills..."
              placeholderTextColor="#94a3b8"
              className="flex-1 ml-3 text-white text-base"
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-white text-2xl font-semibold mb-6">Recommended Career Paths</Text>
          
          <CareerPathCard
            title="Frontend Development"
            description="Master modern web development with React, TypeScript, and more"
            icon={Code}
            color="purple"
            progress={85}
            trending
          />
          
          <CareerPathCard
            title="UI/UX Design"
            description="Create beautiful and intuitive user experiences"
            icon={Palette}
            color="blue"
            progress={72}
          />
          
          <CareerPathCard
            title="Data Science"
            description="Analyze data and build machine learning models"
            icon={Database}
            color="green"
            progress={65}
          />

          <View className="mt-8 mb-4">
            <Text className="text-white text-2xl font-semibold mb-6">Skills to Develop</Text>
            
            <SkillCard
              title="Advanced React Patterns"
              level="Intermediate"
              category="Frontend"
              duration="4 weeks"
              students="2.3k"
            />
            
            <SkillCard
              title="System Design"
              level="Advanced"
              category="Architecture"
              duration="6 weeks"
              students="1.8k"
            />
            
            <SkillCard
              title="UI Animation"
              level="Beginner"
              category="Design"
              duration="3 weeks"
              students="3.1k"
            />
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default ExploreScreen;
