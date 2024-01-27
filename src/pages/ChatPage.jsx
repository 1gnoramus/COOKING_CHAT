import send from "../assets/send.png";
import logout from "../assets/logout.png";
import { ChatPartner } from "../components/ChatPartner";
import { PartnerMEssageBubble } from "../components/PartnerMEssageBubble";
import { UserMessageBubble } from "../components/UserMessageBubble";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export function ChatPage() {
  const navigate = useNavigate();

  let [newMessage, setNewMessage] = useState("");
  let [messagesArray, setMessagesArray] = useState([]);

  let [selectedPartner, setSelectedPartner] = useState("Бабушка");
  function handleChatSelection(partner) {
    setSelectedPartner(partner);
  }

  const db = getFirestore();

  async function sendNewMessage() {
    let sender = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      sender: sender.email,
      message: newMessage,
      receiver: selectedPartner,
    });
    setNewMessage("");
  }

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        alert(e);
      });
  }
  useEffect(() => {
    onSnapshot(collection(db, "messages"), (querySnapshot) => {
      const queryData = querySnapshot.docs.filter(
        (doc) => doc.data().receiver == selectedPartner
      );
      const messagesData = queryData.map((doc) => ({
        id: doc.id,
        info: doc.data(),
      }));
      setMessagesArray(messagesData);
    });
  }, [selectedPartner]);

  return (
    <div className="welcome_page">
      <div className="chat_page_content">
        <div className="sidebar_panel">
          <h1>Чаты</h1>
          <div className="chatPartners_list">
            <ChatPartner
              partner="Бабушка"
              message="Добрый вечер!"
              handleChatSelection={handleChatSelection}
            ></ChatPartner>
            <ChatPartner
              partner="Дедушка"
              message="Ты видел мои очки?"
              handleChatSelection={handleChatSelection}
            ></ChatPartner>
            <ChatPartner
              partner="Сестра"
              message="Когда придешь домой?"
              handleChatSelection={handleChatSelection}
            ></ChatPartner>
          </div>
        </div>
        <div className="top_panel">
          <h1>{selectedPartner}</h1>
          <div className="logout" onClick={handleLogOut}>
            <img src={logout} alt="" />
            <p>Выйти</p>
          </div>
        </div>
        <div className="chat_panel">
          {messagesArray.map((info) => {
            if (
              auth.currentUser &&
              info.info.sender == auth.currentUser.email
            ) {
              return (
                <UserMessageBubble
                  key={info.id}
                  messageText={info.info.message}
                ></UserMessageBubble>
              );
            } else {
              return (
                <PartnerMEssageBubble
                  key={info.id}
                  messageText={info.info.message}
                ></PartnerMEssageBubble>
              );
            }
          })}
        </div>
        <div className="bottom_panel">
          <input
            type="text"
            value={newMessage}
            onChange={(event) => {
              setNewMessage(event.target.value);
            }}
            placeholder="Напишите что нибудь..."
          />
          <button
            onClick={() => {
              sendNewMessage();
            }}
          >
            <img src={send} alt="" />
          </button>
          {/* <button
          // onClick={() => {
          //   getMessages();
          // }}
          >
            <img src={send} alt="" />
          </button> */}
        </div>
      </div>
    </div>
  );
}
