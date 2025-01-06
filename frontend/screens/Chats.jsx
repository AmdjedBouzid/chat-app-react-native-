import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchChats } from "../utils/functions";
import { useIsFocused } from "@react-navigation/native";
import { statesContainer } from "../context/GlobalState";
const ChatsScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  // const [chats, setChats] = useState([]);
  const { chats, setChats } = statesContainer();

  useEffect(() => {
    const fetchData = async () => {
      const CHATS = await fetchChats();
      console.log("CHATS___:::::___", CHATS);
      setChats(CHATS);
    };
    fetchData();
  }, [isFocused]);

  // Filter chats based on the search query
  var filteredChats = [];
  if (chats) {
    filteredChats = chats.filter((chat) => {
      if (chat.participants && chat.participants.length > 0) {
        const participant = chat.participants[0];
        const fullName = `${participant.first_name} ${participant.last_name}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false; // Exclude chats without participants
    });
  }

  const renderChatItem = ({ item }) => {
    if (item.participants && item.participants.length > 0) {
      const participant = item.participants[0]; // Safely get the first participant
      return (
        <TouchableOpacity
          style={styles.friendCard}
          onPress={() => {
            navigation.navigate("ChatDetails", { id: item.chatId });
          }}
        >
          <Image source={{ uri: participant.image }} style={styles.avatar} />
          <View style={styles.infoContainer}>
            <Text
              style={styles.name}
            >{`${participant.first_name} ${participant.last_name}`}</Text>
            <Text style={styles.status}>{item?.lastMessage?.text}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      // Handle missing participants
      return (
        <View style={styles.friendCard}>
          <Text style={styles.name}>Unknown Participant</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search friends..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {chats ? (
        <FlatList
          data={filteredChats} // Use filtered chats here
          keyExtractor={(item) => item.chatId.toString()} // Ensure chatId is a string
          renderItem={renderChatItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    padding: 10,
  },
  searchInput: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingBottom: 20,
  },
  friendCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  status: {
    fontSize: 14,
    color: "#666",
  },
});

export default ChatsScreen;
