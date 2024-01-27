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
  const db = getFirestore();

  let [newMessage, setNewMessage] = useState("");
  let [messagesArray, setMessagesArray] = useState([]);
  let [partnersArray, setPartnersArray] = useState([]);
  let [selectedPartner, setSelectedPartner] = useState("");

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        alert(e);
      });
  }
  function handleChatSelection(partner) {
    setSelectedPartner(partner);
  }
  async function sendNewMessage() {
    let sender = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      sender: sender.displayName,
      message: newMessage,
      receiver: selectedPartner,
    });
    setNewMessage("");
  }
  async function getAllUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));

    const allUsersData = querySnapshot.docs.map((doc) => doc.data()); // [1,2,3]- все пользователи
    const usersData = allUsersData.filter(
      (doc) => doc.username != auth.currentUser.displayName
    );
    setPartnersArray(usersData);
  }

  useEffect(() => {
    onSnapshot(collection(db, "messages"), (querySnapshot) => {
      const queryData = querySnapshot.docs.filter(
        (doc) =>
          doc.data().receiver == selectedPartner ||
          doc.data().sender == selectedPartner
      );
      const messagesData = queryData.map((doc) => ({
        id: doc.id,
        info: doc.data(),
      }));
      setMessagesArray(messagesData);
    });
    getAllUsers();
  }, [selectedPartner]);

  return (
    <div className="welcome_page">
      <div className="chat_page_content">
        <div className="sidebar_panel">
          <h1>Чаты</h1>
          <div className="chatPartners_list">
            {partnersArray.map((partner) => {
              return (
                <ChatPartner
                  key={partner.email}
                  partner={partner.username}
                  message={partner.email}
                  handleChatSelection={handleChatSelection}
                ></ChatPartner>
              );
            })}
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
            if (auth.currentUser) {
              if (info.info.sender == auth.currentUser.displayName) {
                return (
                  <UserMessageBubble
                    key={info.id}
                    messageText={info.info.message}
                  ></UserMessageBubble>
                );
              } else if (info.info.receiver == auth.currentUser.displayName) {
                return (
                  <PartnerMEssageBubble
                    key={info.id}
                    messageText={info.info.message}
                  ></PartnerMEssageBubble>
                );
              }
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
        </div>
      </div>
    </div>
  );
}
