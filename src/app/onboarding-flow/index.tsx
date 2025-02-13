import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { userOnboardingSteps, OnboardingResponse, initialOnboardingResponse } from './userOnboardingData';

export default function OnboardingFlow() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [responses, setResponses] = useState<OnboardingResponse>(initialOnboardingResponse);
  const router = useRouter();

  const currentStep = userOnboardingSteps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < userOnboardingSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Save responses and redirect to preview
      router.push('/onboarding-flow/preview');
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleInputChange = (fieldId: string, value: string | string[]) => {
    setResponses(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
        return (
          <TextInput
            className="w-full bg-gray-900 text-white p-4 rounded-xl mb-4"
            placeholder={field.placeholder}
            placeholderTextColor="#666"
            value={responses[field.id] as string}
            onChangeText={(value) => handleInputChange(field.id, value)}
          />
        );
      case 'select':
        return (
          <View className="mb-4">
            {field.options?.map((option: string) => (
              <TouchableOpacity
                key={option}
                className={`p-4 mb-2 rounded-xl ${
                  responses[field.id] === option ? 'bg-blue-600' : 'bg-gray-900'
                }`}
                onPress={() => handleInputChange(field.id, option)}
              >
                <Text className="text-white">{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  const renderMultiSelect = () => {
    const selectedOptions = responses[currentStep.id] as string[] || [];
    
    return (
      <View className="mb-4">
        {currentStep.options?.map((option: string) => (
          <TouchableOpacity
            key={option}
            className={`p-4 mb-2 rounded-xl ${
              selectedOptions.includes(option) ? 'bg-blue-600' : 'bg-gray-900'
            }`}
            onPress={() => {
              const newSelection = selectedOptions.includes(option)
                ? selectedOptions.filter(item => item !== option)
                : [...selectedOptions, option];
              
              if (!selectedOptions.includes(option) && 
                  currentStep.maxSelections && 
                  newSelection.length > currentStep.maxSelections) {
                return;
              }
              
              handleInputChange(currentStep.id, newSelection);
            }}
          >
            <Text className="text-white">{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <ScrollView className="flex-1 px-6">
        <View className="py-8">
          <Text className="text-2xl font-bold text-white mb-2">
            {currentStep.title}
          </Text>
          <Text className="text-gray-400 mb-6">
            {currentStep.description}
          </Text>

          {currentStep.type === 'form' && currentStep.fields?.map(field => (
            <View key={field.id} className="mb-4">
              <Text className="text-white mb-2">{field.label}</Text>
              {renderField(field)}
            </View>
          ))}

          {currentStep.type === 'multiSelect' && renderMultiSelect()}
        </View>
      </ScrollView>

      <View className="p-6 flex-row justify-between bg-gray-950">
        <TouchableOpacity
          className={`px-6 py-3 rounded-xl ${
            currentStepIndex === 0 ? 'bg-gray-800' : 'bg-gray-900'
          }`}
          onPress={handleBack}
          disabled={currentStepIndex === 0}
        >
          <Text className="text-white">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="px-6 py-3 rounded-xl bg-blue-600"
          onPress={handleNext}
        >
          <Text className="text-white">
            {currentStepIndex === userOnboardingSteps.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 