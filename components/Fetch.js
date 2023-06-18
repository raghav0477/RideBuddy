import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

import firebase from "firebase/compat";
import firestore from "@react-native-firebase/firestore";

const Fetch = () => {
  const [messages, setMessages] = useState([]);
  // const {uid} = route.params;

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello Friend",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = (messageArray = []) => {
    const msg = messageArray[0];
    const myMsg = {
      ...msg,
      sentBy: "JSuLTh1p9CZZeHCOvKlu4iewgdH2",
      sentTo: "BdDi1wrTmIUxSSK06ZYqUv1ILt12",
      createdAt: new Date(),
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg)
    );
    // firestore()
    //   .collection("messages")
    //   .doc()
    //   .collection("chats")
    //   .add({ ...myMsg, createdAt: firestore.FieldValue.serverTimestamp() });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};
export default Fetch;
