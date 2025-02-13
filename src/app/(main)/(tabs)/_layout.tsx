import { Tabs } from 'expo-router';
import { Home, Briefcase, Book, Compass, User } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { Platform, View } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: Platform.OS === 'ios' ? 60 : 60,
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#1f2937',
          borderTopWidth: 0,
          elevation: 25,
          marginHorizontal: 20,
          marginBottom: Platform.OS === 'ios' ? 20 : 10,
          borderRadius: 30,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.5,
          shadowRadius: 20,
          ...Platform.select({
            ios: {
              overflow: 'hidden',
            },
          }),
        },
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView
              tint="dark"
              intensity={100}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 30,
              }}
            />
          ) : null
        ),
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View className={`p-2 rounded-full ${focused ? 'bg-purple-600' : ''}`}>
              <Home color={color} size={24} strokeWidth={2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View className={`p-2 rounded-full ${focused ? 'bg-purple-600' : ''}`}>
              <Briefcase color={color} size={24} strokeWidth={2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View className={`p-2 rounded-full ${focused ? 'bg-purple-600' : ''}`}>
              <Compass color={color} size={24} strokeWidth={2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View className={`p-2 rounded-full ${focused ? 'bg-purple-600' : ''}`}>
              <User color={color} size={24} strokeWidth={2} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}