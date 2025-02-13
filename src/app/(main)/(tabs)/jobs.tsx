import { View } from 'react-native';
import { Redirect } from 'expo-router';

export default function JobsScreen() {
  return (
    <View className="flex-1 bg-gray-900">
      <Redirect href="/slider" />
    </View>
  );
}