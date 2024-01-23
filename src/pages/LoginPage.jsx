import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export function LoginPage() {
  const navigate = useNavigate();
  let [emailInput, setemailInput] = useState("");
  let [passwordInput, setpasswordInput] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      navigate("/chat");
    } catch {
      alert("Пользователя не существует");
    }
  }
  return (
    <div className="welcome_page">
      <div className="login_page_content">
        <form
          className="login_form"
          onSubmit={(e) => {
            handleLogin(e);
          }}
        >
          <div className="circle_decor circle-red"></div>
          <h1>ВОЙТИ В СВОЙ АККАУНТ</h1>
          <input
            value={emailInput}
            onChange={(e) => {
              setemailInput(e.target.value);
            }}
            type="text"
            placeholder="Почтовый адрес"
          />
          <input
            value={passwordInput}
            onChange={(e) => {
              setpasswordInput(e.target.value);
            }}
            type="text"
            placeholder="Пароль"
          />
          <button className="btn btn-red btn-login">ВОЙТИ</button>
          <p
            onClick={() => {
              navigate("/register");
            }}
          >
            или создайте новый
          </p>
        </form>
      </div>
    </div>
  );
}
