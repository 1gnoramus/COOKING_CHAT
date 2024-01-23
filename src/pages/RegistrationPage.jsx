export function RegistrationPage() {
  return (
    <div className="welcome_page">
      <div className="register_page_content">
        <form className="register_form">
          <div className="circle_decor circle-yellow"></div>
          <h1>СОЗДАЙТЕ НОВЫЙ АККАУНТ</h1>
          <input type="text" placeholder="Почтовый адрес" />
          <input type="text" placeholder="Пароль" />
          <button className="btn btn-yellow btn-register">
            СОЗДАТЬ АККАУНТ
          </button>
          <p>или войдите в имеющийся</p>
        </form>
      </div>
    </div>
  );
}
