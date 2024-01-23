import send from "../assets/send.png";
import logout from "../assets/logout.png";
import { ChatPartner } from "../components/ChatPartner";
import { PartnerMEssageBubble } from "../components/PartnerMEssageBubble";
import { UserMessageBubble } from "../components/UserMessageBubble";

export function ChatPage() {
  return (
    <div className="welcome_page">
      <div className="chat_page_content">
        <div className="sidebar_panel">
          <h1>Чаты</h1>
          <div className="chatPartners_list">
            <ChatPartner></ChatPartner>
            <ChatPartner></ChatPartner>
            <ChatPartner></ChatPartner>
          </div>
        </div>
        <div className="top_panel">
          <h1>Бабушка</h1>
          <div className="logout">
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
