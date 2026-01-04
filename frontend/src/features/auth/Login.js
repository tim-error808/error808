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
  const [message, setMessage] = useState("");
  const [authDone, setAuthDone] = useState(false);
  const { login, signup, setJustLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    setIdentifier("");
    setPassword("");
    try {
      const result = await login({ identifier, password });
      console.log(result.data.message);
      setMessage(result.data.message);
      setAuthDone(true);
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setAuthDone(true);
    }
  };

  const onSignUpSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setUsername("");
    setPassword("");
    setRepeatPassword("");
    if (password !== repeatPassword) {
      setError("Passwords do not match!");
      setAuthDone(true);
      return;
    } else {
      try {
        const result = await signup({ username, email, password });
        console.log(result.data.message);
        setMessage(result.data.message);
        setAuthDone(true);
      } catch (error) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
        setAuthDone(true);
      }
    }
  };

  useEffect(() => {
    setError("");
    setMessage("");
  }, [isFlipped]);

  return (
    <>
      {authDone && (
        <div className="auth-done-popup">
          <h1 className="auth-done-text">{message ? message : error}</h1>
          {!error && <h2>Welcome {user.username}!</h2>}
          <button
            className="auth-done-btn"
            onClick={() => {
              setAuthDone(false);
              setJustLoggedIn(false);
              if (error) return;
              navigate("/");
            }}
          >
            {error ? "Try Again" : "Go To Front Page"}
          </button>
        </div>
      )}
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
              value={password}
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
              value={email}
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
              value={username}
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
              value={password}
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
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />

            <p className="flip-text" onClick={() => setIsFlipped(false)}>
              Already a member? Log In &rarr;
            </p>

            <LoginButtons text="Sign Up" />
          </form>
        </main>
      </section>
    </>
  );
};

export default Login;
