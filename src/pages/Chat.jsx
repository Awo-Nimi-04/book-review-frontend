import React, { useContext, useEffect, useState } from "react";
import { getSocket } from "../services/socket";
import { PageContext } from "../context/Context";
import ChatListCard from "../components/ChatListCard";
import { useHttpClient } from "../utilities/customHooks/httpHook";
import { formatMessageTime } from "../utilities/TimeFormatter";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { username, token, userId } = useContext(PageContext);
  const { sendRequest } = useHttpClient();
  const { uid } = useParams();

  const [currentOtherUser, setCurrentOtherUser] = useState();
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on("receiveMessage", (msg) => {
        if (
          msg.senderID === currentOtherUser ||
          msg.receiverID === currentOtherUser
        ) {
          setMessages((prev) => [...prev, msg]);
        }

        // always refresh chat list (unread counts, last message, etc.)
        getChatList();
      });
    }
    return () => {
      if (socket) socket.off("receiveMessage");
    };
  }, [currentOtherUser, token]);

  useEffect(() => {
    if (!token) return;
    getChatList();
  }, [token]);

  useEffect(() => {
    if (uid) {
      setCurrentOtherUser(uid);
      handleSelectChatListCard(uid);
    }
  }, [uid]);

  const sendMessage = () => {
    const socket = getSocket();
    if (socket) {
      socket.emit("sendMessage", {
        receiverId: currentOtherUser,
        text,
      });
    }
    setText("");
    getChatList();
  };

  const getChatList = async () => {
    console.log(token);
    try {
      const data = await sendRequest(
        "http://localhost:8000/api/messages/chats",
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      setChatList(data.chats);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSelectChatListCard = async (otherUserId) => {
    setCurrentOtherUser(otherUserId);

    try {
      const data = await sendRequest(
        `http://localhost:8000/api/messages/conversation/${otherUserId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      setMessages(data.messages);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-[20%] bg-white flex flex-col">
        {chatList.map((chat) => {
          return (
            <ChatListCard
              key={chat._id}
              username={`${chat.firstName} ${chat.lastName.slice(0, 1)}`}
              lastMessage={chat.lastMessage}
              timestamp={formatMessageTime(chat.lastMessageTime)}
              profileImg={chat.image}
              unReadCount={chat.unreadCount}
              onClick={() => {
                handleSelectChatListCard(chat.otherUserId);
              }}
              isSelected={currentOtherUser === chat.otherUserId}
            />
          );
        })}
      </div>
      {!currentOtherUser && (
        <div className="w-full flex flex-col items-center justify-center text-4xl">
          <h1 className="text-center text-white">Hello, {username}</h1>
          <p className="text-center text-white">This is your chat hub</p>
        </div>
      )}
      {currentOtherUser && (
        <div className="w-[70%] p-4">
          <div className="border rounded-md p-2 h-64 overflow-y-auto mb-2">
            {messages.map((m, i) => {
              if (m.senderID === userId) {
                return (
                  <div key={i} className="flex justify-end mb-2">
                    <div className="inline-block bg-sky-200 text-right p-2 rounded-xl max-w-[60%] break-words">
                      {m.text}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={i} className="flex justify-start mb-2">
                    <div className="inline-block bg-indigo-500 text-left text-white p-2 rounded-xl max-w-[60%] break-words">
                      {m.text}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-3 py-1"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
