import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export function RegistrationPage() {
  let [emailInput, setEmailInput] = useState("");
  let [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  async function handleRegistration(event) {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
      navigate("/chat");
    } catch {
      alert("Вы ввели данные неверно");
    }
  }
  return (
    <div className="welcome_page">
      <div className="register_page_content">
        <form
          className="register_form"
          onSubmit={(e) => {
            handleRegistration(e);
          }}
        >
          <div className="circle_decor circle-yellow"></div>
          <h1>СОЗДАЙТЕ НОВЫЙ АККАУНТ</h1>
          <input
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
            }}
            type="text"
            placeholder="Почтовый адрес"
          />
          <input
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            type="text"
            placeholder="Пароль"
          />
          <button className="btn btn-yellow btn-register">
            СОЗДАТЬ АККАУНТ
          </button>
          <p
            onClick={() => {
              navigate("/login");
            }}
          >
            или войдите в имеющийся
          </p>
        </form>
      </div>
    </div>
  );
}
