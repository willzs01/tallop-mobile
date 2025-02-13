import "../global.css";
import { Slot } from "expo-router";
import { Stack } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { ClerkProvider, ClerkLoaded} from '@clerk/clerk-expo';
import { tokenCache } from '../../lib/auth';
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler'

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false
});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error('EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not set.');
}

export default function Layout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        {/* <StatusBar backgroundColor="#7c3aed" barStyle="light-content" /> */}
        <GestureHandlerRootView>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen 
          name="onboarding" 
        />
        
        <Stack.Screen 
          name="/signin" 
        />
        <Stack.Screen 
          name="/signup" 
        />
        <Stack.Screen 
          name="(main)" 
          options={{ headerShown: false }} 
        />
       
        </Stack>
         </GestureHandlerRootView>
      </ClerkLoaded>
      
    </ClerkProvider>
  )
}
