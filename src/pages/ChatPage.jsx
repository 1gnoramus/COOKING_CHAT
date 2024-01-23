import send from "../assets/send.png";
import logout from "../assets/logout.png";
import { ChatPartner } from "../components/ChatPartner";
import { PartnerMEssageBubble } from "../components/PartnerMEssageBubble";
import { UserMessageBubble } from "../components/UserMessageBubble";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export function ChatPage() {
  const navigate = useNavigate();
  function handleLogOut() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        alert(e);
      });
  }
  return (
    <div className="welcome_page">
      <div className="chat_page_content">
        <div className="sidebar_panel">
          <h1>Чаты</h1>
          <div className="chatPartners_list">
            <ChatPartner sender="Бабушка" message="Добрый вечер!"></ChatPartner>
            <ChatPartner
              sender="Дедушка"
              message="Ты видел мои очки?"
            ></ChatPartner>
            <ChatPartner
              sender="Сестра"
              message="Когда придешь домой?"
            ></ChatPartner>
          </div>
        </div>
        <div className="top_panel">
          <h1>Бабушка</h1>
          <div className="logout" onClick={handleLogOut}>
            <img src={logout} alt="" />
            <p>Выйти</p>
          </div>
        </div>
        <div className="chat_panel">
          <PartnerMEssageBubble></PartnerMEssageBubble>
          <UserMessageBubble></UserMessageBubble>
        </div>
        <div className="bottom_panel">
          <input type="text" placeholder="Напишите что нибудь..." />
          <button>
            <img src={send} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
