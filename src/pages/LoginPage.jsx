export function LoginPage() {
  return (
    <div className="welcome_page">
      <div className="login_page_content">
        <form className="login_form" action="">
          <div className="circle_decor circle-red"></div>
          <h1>ВОЙТИ В СВОЙ АККАУНТ</h1>
          <input type="text" placeholder="Почтовый адрес" />
          <input type="text" placeholder="Пароль" />
          <button className="btn btn-red btn-login"></button>
          <p>или создайте новый</p>
        </form>
      </div>
    </div>
  );
}
