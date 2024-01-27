import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export function RegistrationPage() {
  let [emailInput, setEmailInput] = useState("");
  let [passwordInput, setPasswordInput] = useState("");
  let [usernameInput, setUsernameInput] = useState("");
  const navigate = useNavigate();
  const db = getFirestore();

  async function handleRegistration(event) {
    event.preventDefault();
    try {
      const authResult = await createUserWithEmailAndPassword(
        auth,
        emailInput,
        passwordInput
      );
      await updateProfile(authResult.user, {
        displayName: usernameInput,
      });
      await addUser();
      navigate("/chat");
    } catch {
      alert("Вы ввели данные неверно");
    }
  }

  async function addUser() {
    await addDoc(collection(db, "users"), {
      email: emailInput,
      username: usernameInput,
    });
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
            type="text"
            value={usernameInput}
            onChange={(e) => {
              setUsernameInput(e.target.value);
            }}
            placeholder="Введите Ваше имя"
          />

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
