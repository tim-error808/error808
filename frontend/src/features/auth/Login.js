import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import LoginButtons from "./LoginButtons";

const Login = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    setIdentifier("");
    setPassword("");
    try {
      const result = await login({ identifier, password });
      console.log(result.data.message);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  const onSignUpSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setUsername("");
    setPassword("");
    setRepeatPassword("");
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    } else {
      try {
        const result = await signup({ username, email, password });
        console.log(result.data.message);
        navigate("/");
      } catch (error) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (error) return <div className="error">{error}</div>;

  return (
    <section className="login-form">
      <header>
        <h1>Welcome</h1>
      </header>
      <main className={`login ${isFlipped ? "flipped" : ""}`}>
        <form onSubmit={onLoginSubmit} className="form front">
          <label htmlFor="login_username">Email/Username:</label>
          <input
            className="form__input"
            type="text"
            title="email"
            name="email"
            id="login_email"
            autoComplete="off"
            placeholder="e.g. john@doe.com, Anne Smith"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="flip-text" onClick={() => setIsFlipped(true)}>
            New to here? Sign Up &rarr;
          </p>

          <LoginButtons text="Log In" />
        </form>
        <form onSubmit={onSignUpSubmit} className="form back">
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
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="signup_username">Username:</label>
          <input
            className="form__input"
            type="text"
            title="signup_username"
            name="signup_username"
            id="signup_username"
            autoComplete="off"
            placeholder="e.g. Anne Smith"
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="signup_password">New Password:</label>
          <input
            className="form__input"
            title="password"
            name="password"
            id="signup_password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="signup_repeat_password">Repeat Password:</label>
          <input
            className="form__input"
            type="password"
            title="repeat_password"
            name="repeat_password"
            id="signup_repeat_password"
            autoComplete="off"
            required
            onChange={(e) => setRepeatPassword(e.target.value)}
          />

          <p className="flip-text" onClick={() => setIsFlipped(false)}>
            Already a member? Log In &rarr;
          </p>

          <LoginButtons text="Sign Up" />
        </form>
      </main>
    </section>
  );
};

export default Login;
