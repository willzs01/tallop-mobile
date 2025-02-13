import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CameraScreen = () => {
  return (
    <SafeAreaView className='bg-gray-700 h-screen'>
      <View >
        <Text>Camera</Text>
      </View>
    </SafeAreaView>
  );
};

export default CameraScreen;