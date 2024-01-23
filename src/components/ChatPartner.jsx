export function ChatPartner({ sender, message }) {
  return (
    <div className="chatPartner_cont">
      <h1>{sender}</h1>
      <p>{message}</p>
    </div>
  );
}
