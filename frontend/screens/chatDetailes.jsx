import React, { useEffect, useState } from "react";
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
import { getToken } from "../utils/functions";
import axios from "axios";
import DOMAIN from "../utils/constants";
import * as ImagePicker from "expo-image-picker";
const { width, height } = Dimensions.get("window");
import io from "socket.io-client";
import { statesContainer } from "../context/GlobalState";
const ChatPage = ({ route }) => {
  const { user } = statesContainer();
  const chatId = route.params.id;
  const [messageText, setMessageText] = useState("");
  const [chatFriend, setChatsFriend] = useState(null);
  const [toSendImage, setToSendImage] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [toStoreImage, setToStoreImage] = useState("");
  useEffect(() => {
    const newSocket = io(DOMAIN);
    setSocket(newSocket);

    // Join the chat room
    newSocket.emit("joinChat", chatId);

    newSocket.on("newMessage", (data) => {
      console.log("newMessage", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [chatId]);

  useEffect(() => {
    const storeImage = async () => {
      if (toStoreImage !== "") {
        try {
          const formData = new FormData();
          formData.append("image", {
            uri: toStoreImage,
            name: "image.jpg",
            type: "image/jpeg",
          });
          console.log("hello1");
          const response = await axios.post(
            `${DOMAIN}/api/messages/image`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("hello2");
          if (response.status === 200) {
            setToSendImage(response.data.path);
          }
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      }
    };
    storeImage(); // Bug: Infinite loop - effect calls storeImage which updates state
  }, [toStoreImage]);

  useEffect(() => {
    const handlingGettingMessages = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${DOMAIN}/api/chats/${chatId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setChatsFriend(response.data.participants[0]);
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handlingGettingMessages();
  }, [chatId]);

  const sendMessage = () => {
    if (messageText.trim() === "" && !toSendImage) return;

    const data = {
      idSender: user.id,
      idChat: chatId,
      message: messageText,
      image: toSendImage !== "" ? toSendImage : null,
    };

    socket.emit("waitMessage", data);
    setMessageText("");
    setToSendImage("");
  };

  const handlePickImage = async () => {
    if (toStoreImage !== "") {
      setToStoreImage("");
      console.log("to sent image", toSendImage);
      return;
    }

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      ToastUtils.showErrorToast(
        "Permission to access camera roll is required!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setToStoreImage(result.assets[0].uri);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={
        item.idSender === user.id
          ? [styles.messageContainer, styles.userMessage]
          : [styles.messageContainer, styles.friendMessage]
      }
    >
      {/* Render text message if present */}
      {item.msg && (
        <Text
          style={
            item.idSender === user.id
              ? [styles.messageText, styles.userMessageText]
              : [styles.messageText, styles.friendMessageText]
          }
        >
          {item.msg}
        </Text>
      )}
      {/* Render image if present */}
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.imageMessage} />
      )}
      {/* Optionally render the sentAt timestamp */}
      {item.sentAt && (
        <></>
        // <Text
        //   style={
        //     item.idSender === user.id
        //       ? [styles.timestamp, styles.userMessageText]
        //       : [styles.timestamp, styles.friendMessageText]
        //   }
        // >
        //   {new Date(item.sentAt).toLocaleTimeString([], {
        //     hour: "2-digit",
        //     minute: "2-digit",
        //   })}
        // </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Profile Bar */}
      <View style={styles.profileBar}>
        <Image source={{ uri: chatFriend?.image }} style={styles.avatar} />
        <Text style={styles.friendName}>
          <Text> {chatFriend?.first_name}</Text>
          <Text> {chatFriend?.last_name}</Text>
        </Text>
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
        <TouchableOpacity
          style={toStoreImage === "" ? styles.iconButton : styles.smallImage}
          onPress={handlePickImage}
        >
          {toStoreImage === "" ? (
            <Icon name="image" size={18} color="#fff" />
          ) : (
            <Image source={{ uri: toStoreImage }} style={styles.avatar} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={sendMessage}>
          <Icon name="paper-plane" size={18} color="#fff" />
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
  smallImage: {},
  timestamp: {
    fontSize: 10,
  },
});

export default ChatPage;
