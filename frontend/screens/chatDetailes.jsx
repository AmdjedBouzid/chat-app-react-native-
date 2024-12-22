import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome"; // Import icons

const { width, height } = Dimensions.get("window");

const ChatPage = ({ route }) => {
  const id = route.id;
  console.log("id++++++", id);
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello!", sender: "friend" },
    { id: "2", text: "Hi! How are you?", sender: "user" },
    { id: "3", text: "I'm good, thanks!", sender: "friend" },
  ]);
  const [messageText, setMessageText] = useState("");

  const handleSend = () => {
    if (messageText.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: `${prevMessages.length + 1}`, text: messageText, sender: "user" },
      ]);
      setMessageText("");
    }
  };

  const handlePickImage = () => {
    console.log("Opening image picker...");
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      console.log("Image picker response:", response);
      if (response.assets && response.assets.length > 0) {
        const { uri } = response.assets[0];
        console.log("Selected image URI:", uri);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: `${prevMessages.length + 1}`, image: uri, sender: "user" },
        ]);
      }
    });
  };

  const renderMessage = ({ item }) => (
    <View
      style={
        item.sender === "user"
          ? [styles.messageContainer, styles.userMessage]
          : [styles.messageContainer, styles.friendMessage]
      }
    >
      {item.text && (
        <Text
          style={
            item.sender === "user"
              ? [styles.messageText, styles.userMessageText]
              : [styles.messageText, styles.friendMessageText]
          }
        >
          {item.text}
        </Text>
      )}
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.imageMessage} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Profile Bar */}
      <View style={styles.profileBar}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} // Example image URL for avatar
          style={styles.avatar}
        />
        <Text style={styles.friendName}>John Doe</Text>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
          <Icon name="paper-plane" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handlePickImage}>
          <Icon name="image" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  profileBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  friendName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  messageContainer: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007BFF",
  },
  friendMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e4e6eb",
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: "#fff",
  },
  friendMessageText: {
    color: "#000",
  },
  imageMessage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    marginRight: 10,
  },
  iconButton: {
    backgroundColor: "#007BFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});

export default ChatPage;
