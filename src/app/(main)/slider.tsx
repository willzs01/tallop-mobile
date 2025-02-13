import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import Animated, { 
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  interpolate,
  Extrapolate,
  runOnJS,
  withSpring
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { snapPoint } from 'react-native-redash';
import { Home, Share2, Building2, MapPin, DollarSign } from 'lucide-react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');
const SNAP_POINTS = [-width, 0, width];
const CARD_HEIGHT = height * 0.75;

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
  skills: string[];
}

const DUMMY_JOBS: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA", 
    salary: "$120k - $150k",
    type: "Full-time",
    description: "Join our team to build next-generation web applications...",
    requirements: ["5+ years React experience", "TypeScript proficiency", "Team leadership"],
    skills: ["React", "TypeScript", "Node.js", "AWS"],
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Design Studio",
    location: "Remote",
    salary: "$90k - $120k",
    type: "Full-time", 
    description: "Create beautiful and intuitive user experiences...",
    requirements: ["3+ years UI/UX experience", "Figma mastery", "Portfolio"],
    skills: ["UI/UX", "Figma", "Prototyping", "User Research"],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "StartupX",
    location: "New York, NY",
    salary: "$130k - $160k",
    type: "Full-time",
    description: "Build scalable applications from front to back...",
    requirements: ["4+ years full stack experience", "Cloud expertise", "System design"],
    skills: ["React", "Node.js", "AWS", "MongoDB"],
  },
];

const JobSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(0);

  const updatePage = (dest: number) => {
    if (dest < 0 && currentPage < DUMMY_JOBS.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else if (dest > 0 && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
    rotateZ.value = withSpring(0);
  };

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withSpring(1.05);
    })
    .onUpdate(({ translationX, translationY }) => {
      translateX.value = translationX;
      translateY.value = translationY;
      rotateZ.value = interpolate(
        translationX,
        [-width, 0, width],
        [-30, 0, 30],
        Extrapolate.CLAMP
      );
    })
    .onEnd(({ velocityX, velocityY }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: velocityX });
      translateY.value = withSpring(0, { velocity: velocityY });
      scale.value = withSpring(1, {}, () => {
        if (dest !== 0) {
          runOnJS(updatePage)(dest);
        }
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotateZ.value}deg` },
      { scale: scale.value }
    ] as const
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: 0.9 }
    ] as const
  }));

  const renderJobDetails = (job: Job) => (
    <View className="flex-1 p-6">
      <View className="mb-6">
        <Text className="text-white text-3xl font-bold mb-2">{job.title}</Text>
        <View className="flex-row items-center mb-2">
          <Building2 size={20} color="#94a3b8" />
          <Text className="text-gray-400 ml-2 text-lg">{job.company}</Text>
        </View>
      
      </View>

      <View className="flex-row flex-wrap gap-2 mb-6">
        <View className="bg-purple-500/20 px-4 py-2 rounded-full">
          <Text className="text-purple-400">{job.type}</Text>
        </View>
        <View className="flex-row items-center bg-green-500/20 px-4 py-2 rounded-full">
          <DollarSign size={16} color="#22c55e" />
          <Text className="text-green-400 ml-1">{job.salary}</Text>
        </View>
      </View>

      <Text className="text-white text-xl font-semibold mb-4">Required Skills</Text>
      <View className="flex-row flex-wrap gap-2 mb-6">
        {job.skills.map((skill, idx) => (
          <View key={idx} className="bg-gray-700/50 px-4 py-2 rounded-full">
            <Text className="text-gray-300">{skill}</Text>
          </View>
        ))}
      </View>

      <Text className="text-white text-xl font-semibold mb-4">Requirements</Text>
      {job.requirements.map((req, idx) => (
        <View key={idx} className="flex-row items-center mb-3">
          <View className="w-2 h-2 rounded-full bg-purple-500 mr-3" />
          <Text className="text-gray-300 text-base">{req}</Text>
        </View>
      ))}

      <TouchableOpacity className="bg-purple-600 rounded-2xl py-4 mt-auto">
        <Text className="text-white text-center font-semibold text-lg">Apply Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1f2937' }}>
      <View style={{ flex: 1, position: 'relative' }}>
        {currentPage < DUMMY_JOBS.length - 1 && (
          <Animated.View style={[{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            height: CARD_HEIGHT,
            backgroundColor: '#374151',
            borderRadius: 16,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }, nextCardStyle]}>
            {renderJobDetails(DUMMY_JOBS[currentPage + 1])}
          </Animated.View>
        )}

        <GestureDetector gesture={gesture}>
          <Animated.View style={[{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            height: CARD_HEIGHT,
            backgroundColor: '#374151',
            borderRadius: 16,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            zIndex: 1,
          }, animatedStyle]}>
            {renderJobDetails(DUMMY_JOBS[currentPage])}
          </Animated.View>
        </GestureDetector>

        <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
          {DUMMY_JOBS.map((_, index) => (
            <View 
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: currentPage === index ? '#a855f7' : '#4b5563'
              }}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JobSlider;