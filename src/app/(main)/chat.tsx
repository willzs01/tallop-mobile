import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { useColorScheme } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { Send, Bot } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const colorScheme = useColorScheme();
  const { height } = useWindowDimensions();

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now().toString(),
          text: 'This is a bot response.',
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      className={`p-4 my-2 rounded-2xl max-w-[80%] ${
        item.sender === 'user' 
          ? 'bg-blue-600 self-end rounded-tr-sm border border-gray-700 border-b-4' 
          : 'bg-gray-700 self-start rounded-tl-sm border border-gray-700 border-b-4'
      }`}
    >
      <Text className="text-white text-base">{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar hidden />
      <View className="flex-row items-center p-4 bg-gray-800 border-b border-gray-700">
        <View className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-2 mr-3 shadow-lg">
          <Bot size={32} color="#fff" />
        </View>
        <View>
          <Text className="text-white text-xl font-bold">Recall AI</Text>
          <Text className="text-gray-400 text-sm">Always here to help</Text>
        </View>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ 
            padding: 16,
            paddingBottom: 16,
          }}
          className="flex-1"
          inverted={false}
          showsVerticalScrollIndicator={false}
        />
        
        <View className="px-4 pb-2 pt-2 bg-gray-800 border-t border-gray-700">
          <View className="flex-row items-center space-x-2">
            <View className="flex-1 bg-gray-700 rounded-2xl shadow-lg border border-gray-700 border-b-4">
              <TextInput
                className="flex-1 text-white px-4 py-3 min-h-[44px] text-base"
                placeholder="Type your message..."
                placeholderTextColor="#9ca3af"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
                style={{
                  maxHeight: 120
                }}
              />
            </View>
            <TouchableOpacity 
              onPress={handleSend} 
              className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg"
              disabled={!inputText.trim()}
            >
              <Send size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
