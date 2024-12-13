import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

const ChatsScreen = ({ navigation }) => {
  const chats = [
    { id: "1", name: "Chat 1" },
    { id: "2", name: "Chat 2" },
    { id: "3", name: "Chat 3" },
  ];

  const handleChatClick = (chatId) => {
    // Navigate to the ChatDetails screen and pass the chatId as a parameter
    navigation.navigate("ChatDetails", { chatId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChatClick(item.id)}>
            <View style={styles.chatItem}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});

export default ChatsScreen;
