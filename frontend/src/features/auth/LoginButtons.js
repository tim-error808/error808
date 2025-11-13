import GoogleButton from "./GoogleButton";

const LoginButtons = ({ text }) => {
  return (
    <div className="login_buttons">
      <button className="form__submit-button">{text}</button>
      <span style={{ color: "#05808c" }}>or</span>
      <GoogleButton />
    </div>
  );
};

export default LoginButtons;
