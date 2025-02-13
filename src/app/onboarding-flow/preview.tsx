import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { User, Briefcase, GraduationCap, Code, Target, Brain, Clock, Users } from 'lucide-react-native';
import { OnboardingResponse } from './userOnboardingData';

interface PreviewSectionProps {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  delay: number;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ title, icon, content, delay }) => (
  <Animated.View 
    entering={FadeInRight.delay(delay).springify()}
    className="bg-gray-900 rounded-xl p-4 mb-4"
  >
    <View className="flex-row items-center mb-3">
      <View className="w-8 h-8 rounded-full bg-blue-600 items-center justify-center mr-3">
        {icon}
      </View>
      <Text className="text-white font-semibold text-lg">{title}</Text>
    </View>
    {content}
  </Animated.View>
);

export default function OnboardingPreview() {
  const router = useRouter();
  // In a real app, you would get this data from your state management solution
  // This is just example data matching the structure
  const userResponses: OnboardingResponse = {
    gender: "Male",
    educationLevel: "Bachelor Degree",
    fieldOfStudy: "Computer Science",
    graduationYear: "2022",
    yearsOfExperience: "1-2 years",
    currentIndustry: "Technology",
    currentRole: "Software Engineer",
    skills: ["Programming", "Problem Solving", "Communication"],
    interests: ["Technical Development", "Analysis & Strategy"],
    workEnvironment: "Remote",
    teamSize: "Small team (2-5)",
    workSchedule: "Flexible hours",
    shortTermGoal: "Learn new programming language",
    longTermGoal: "Become a Technical Lead",
    salaryExpectation: "$80,000 - $100,000",
    challenges: ["Skills gap", "Career transition"],
    personalityTraits: ["Analytical", "Problem solver"],
    learningStyle: ["Online courses", "Hands-on practice"]
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <ScrollView className="flex-1 p-6">
        {/* Header with Avatar */}
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          className="items-center mb-8"
        >
          <View className="w-24 h-24 rounded-full bg-gray-800 items-center justify-center mb-4">
            <User size={48} color="#fff" />
          </View>
          <Text className="text-white text-2xl font-bold mb-1">Your Profile</Text>
          <Text className="text-gray-400">Let's review your information</Text>
        </Animated.View>

        {/* Basic Information */}
        <PreviewSection
          title="Basic Information"
          icon={<User size={20} color="#fff" />}
          delay={400}
          content={
            <View>
              <Text className="text-gray-400">Gender: {userResponses.gender}</Text>
            </View>
          }
        />

        {/* Education */}
        <PreviewSection
          title="Education"
          icon={<GraduationCap size={20} color="#fff" />}
          delay={600}
          content={
            <View>
              <Text className="text-gray-400">Degree: {userResponses.educationLevel}</Text>
              <Text className="text-gray-400">Field: {userResponses.fieldOfStudy}</Text>
              <Text className="text-gray-400">Graduated: {userResponses.graduationYear}</Text>
            </View>
          }
        />

        {/* Work Experience */}
        <PreviewSection
          title="Work Experience"
          icon={<Briefcase size={20} color="#fff" />}
          delay={800}
          content={
            <View>
              <Text className="text-gray-400">Experience: {userResponses.yearsOfExperience}</Text>
              <Text className="text-gray-400">Industry: {userResponses.currentIndustry}</Text>
              <Text className="text-gray-400">Role: {userResponses.currentRole}</Text>
            </View>
          }
        />

        {/* Skills */}
        <PreviewSection
          title="Skills"
          icon={<Code size={20} color="#fff" />}
          delay={1000}
          content={
            <View className="flex-row flex-wrap gap-2">
              {userResponses.skills.map((skill, index) => (
                <View key={index} className="bg-blue-600 rounded-full px-3 py-1">
                  <Text className="text-white">{skill}</Text>
                </View>
              ))}
            </View>
          }
        />

        {/* Career Interests */}
        <PreviewSection
          title="Career Interests"
          icon={<Target size={20} color="#fff" />}
          delay={1200}
          content={
            <View className="flex-row flex-wrap gap-2">
              {userResponses.interests.map((interest, index) => (
                <View key={index} className="bg-gray-800 rounded-full px-3 py-1">
                  <Text className="text-white">{interest}</Text>
                </View>
              ))}
            </View>
          }
        />

        {/* Work Style */}
        <PreviewSection
          title="Work Style"
          icon={<Users size={20} color="#fff" />}
          delay={1400}
          content={
            <View>
              <Text className="text-gray-400">Environment: {userResponses.workEnvironment}</Text>
              <Text className="text-gray-400">Team Size: {userResponses.teamSize}</Text>
              <Text className="text-gray-400">Schedule: {userResponses.workSchedule}</Text>
            </View>
          }
        />

        {/* Goals */}
        <PreviewSection
          title="Career Goals"
          icon={<Target size={20} color="#fff" />}
          delay={1600}
          content={
            <View>
              <Text className="text-gray-400">Short-term: {userResponses.shortTermGoal}</Text>
              <Text className="text-gray-400">Long-term: {userResponses.longTermGoal}</Text>
              <Text className="text-gray-400">Expected Salary: {userResponses.salaryExpectation}</Text>
            </View>
          }
        />

        {/* Learning Style */}
        <PreviewSection
          title="Learning Style"
          icon={<Brain size={20} color="#fff" />}
          delay={1800}
          content={
            <View className="flex-row flex-wrap gap-2">
              {userResponses.learningStyle.map((style, index) => (
                <View key={index} className="bg-gray-800 rounded-full px-3 py-1">
                  <Text className="text-white">{style}</Text>
                </View>
              ))}
            </View>
          }
        />

        {/* Action Button */}
        <Animated.View 
          entering={FadeInDown.delay(2000).springify()}
          className="mt-8 mb-12"
        >
          <TouchableOpacity
            className="bg-blue-600 rounded-xl py-4 items-center"
            onPress={() => router.push('/(main)/(tabs)/home')}
          >
            <Text className="text-white font-semibold text-lg">Generate Action Plan</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
} 