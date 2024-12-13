import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ChatDetailsScreen = ({ route }) => {
  const { chatId } = route.params;
  console.log("chatId________", chatId);

  // Fetch or simulate data based on chatId
  const chatDetails = {
    1: { name: "Chat 1", messages: ["Hello!", "How are you?"] },
    2: { name: "Chat 2", messages: ["Hey!", "What's up?"] },
    3: { name: "Chat 3", messages: ["Hi!", "Good morning!"] },
  };

  const chat = chatDetails[chatId];

  return (
    <View style={styles.container}>
      {chat ? (
        <>
          <Text style={styles.chatName}>{chat.name}</Text>
          <Text style={styles.messages}>Messages:</Text>
          {chat.messages.map((message, index) => (
            <Text key={index} style={styles.message}>
              {message}
            </Text>
          ))}
        </>
      ) : (
        <Text>Chat not found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  chatName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  messages: {
    fontSize: 18,
    marginTop: 10,
  },
  message: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ChatDetailsScreen;
