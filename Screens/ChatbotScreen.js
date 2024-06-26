import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { exampleQuestions, getResponse } from './chatbotUtils';  // Import helper functions and data

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hi! I am the Carpool Chatbot. How can I assist you today?\nHere are some questions you can ask me by number or text:\n' + getResponse(''),
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Carpool Chatbot',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    const userMessage = newMessages[0].text;
    const botResponse = {
      _id: Math.round(Math.random() * 1000000),
      text: getResponse(userMessage),
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Carpool Chatbot',
      },
    };
    setTimeout(() => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, [botResponse]));
    }, 1000);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default ChatbotScreen;
