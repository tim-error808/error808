import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onLoginSubmit = (e) => {
    e.preventDefault();
    login({ email });
    navigate("/");
  };

  return (
    <section className="login-form">
      <header>
        <h1>Welcome</h1>
      </header>
      <main className={`login ${isFlipped ? "flipped" : ""}`}>
        <form onSubmit={onLoginSubmit} className="form front">
          <label htmlFor="login_username">Email:</label>
          <input
            className="form__input"
            type="text"
            title="email"
            name="email"
            id="login_email"
            autoComplete="off"
            placeholder="e.g. john@doe.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="login_password">Password:</label>
          <input
            className="form__input"
            title="password"
            name="password"
            id="login_password"
            type="password"
            required
          />

          <p className="flip-text" onClick={() => setIsFlipped(true)}>
            New to here? Sign Up &rarr;
          </p>

          <button type="submit" className="form__submit-button">
            Log in
          </button>
        </form>
        <form className="form back">
          <label htmlFor="signup_email">Email:</label>
          <input
            className="form__input"
            type="text"
            title="email"
            name="email"
            id="signup_email"
            autoComplete="off"
            placeholder="e.g. john@doe.com"
            required
          />

          <label htmlFor="signup_password">Password:</label>
          <input
            className="form__input"
            title="password"
            name="password"
            id="signup_password"
            type="password"
            required
          />

          <label htmlFor="signup_address">Address:</label>
          <input
            className="form__input"
            type="text"
            title="address"
            name="address"
            id="signup_address"
            autoComplete="off"
            placeholder="e.g. street number, city"
            required
          />

          <p className="flip-text" onClick={() => setIsFlipped(false)}>
            Already a member? Log In &rarr;
          </p>

          <button className="form__submit-button">Sign Up</button>
        </form>
      </main>
    </section>
  );
};

export default Login;
