import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, BookOpen, Brain, User, Calendar, Search, Layout } from 'lucide-react-native';
import { format, addDays, subDays } from 'date-fns';

const TodayStudyPlan = () => {
  const currentProgress = 70;
  const today = new Date();
  
  // Create array with 2 days before and 2 days after today
  const days = [...Array(5)].map((_, i) => {
    const date = addDays(today, i - 2); // Subtract 2 to center today
    return {
      day: format(date, 'EEE'),
      date: format(date, 'd'),
      active: i === 2, // Index 2 is now today
      fullDate: date
    };
  });

  const studyTasks = [
    {
      title: "Review Session",
      duration: "20 min",
      icon: (props) => <BookOpen {...props} />,
      colors: ['#8B5CF6', '#6366F1'],
      time: '9:00 AM'
    },
    {
      title: "Practice Problems",
      duration: "45 min", 
      icon: (props) => <Brain {...props} />,
      colors: ['#2563EB', '#06B6D4'],
      time: '10:30 AM'
    },
    {
      title: "Focus Study",
      duration: "60 min",
      icon: (props) => <Clock {...props} />,
      colors: ['#DB2777', '#E11D48'],
      time: '2:00 PM'
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mt-6 mb-8">
          <View>
            <Text className="text-gray-400 text-sm">Keep learning, John</Text>
            <Text className="text-white text-2xl font-bold mt-1">Today's Study Plan</Text>
          </View>
          <View className="w-14 h-14 rounded-full bg-purple-600 items-center justify-center">
            <Text className="text-white text-lg font-bold">{currentProgress}%</Text>
          </View>
        </View>

        {/* Date Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-8"
          contentContainerStyle={{ paddingHorizontal: 24 }}
        >
          {days.map((day, index) => (
            <TouchableOpacity
              key={index}
              className={`items-center rounded-3xl py-3 px-6 mx-2 ${
                day.active ? 'bg-purple-600' : 'bg-gray-800'
              }`}
            >
              <Text className={`${day.active ? 'text-white' : 'text-gray-400'} text-sm`}>
                {day.day}
              </Text>
              <Text className={`${day.active ? 'text-white' : 'text-gray-300'} text-lg font-bold mt-1`}>
                {day.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Study Tasks */}
        <View className="relative">
          {/* Timeline line */}
          <View className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-800" />
          
          {studyTasks.map((task, index) => (
            <View key={index} className="flex-row items-center mb-6">
              {/* Timeline dot */}
              <View className="w-2 h-2 rounded-full bg-purple-600 z-10 ml-3 mr-6" />
              
              <TouchableOpacity className="flex-1">
                <LinearGradient
                  colors={task.colors as [string, string]}
                  className="p-6 rounded-3xl"
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 24,
                    shadowColor: task.colors[0],
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8
                  }}
                >
                  <View className="flex-row items-center">
                    <View className="bg-black/20 p-4 rounded-2xl mr-5">
                      {task.icon({ size: 24, color: 'white' })}
                    </View>
                    <View className="flex-1">
                      <Text className="text-white text-xl font-semibold">{task.title}</Text>
                      <View className="flex-row items-center mt-2">
                        <Text className="text-white/80 text-base">{task.time}</Text>
                        <Text className="text-white/60 text-base mx-2">•</Text>
                        <Text className="text-white/80 text-base">{task.duration}</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TodayStudyPlan;