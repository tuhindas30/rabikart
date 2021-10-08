import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import DefaultWithoutSearch from "../layouts/DefaultWithoutSearch";
import { ReactComponent as Loader } from "../assets/images/Loader.svg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../assets/css/Form.css";

const SignUp = () => {
  const [isPassHidden, setShowPass] = useState(true);
  const navigate = useNavigate();
  const { token, signup } = useAuth();
  const [submitBtn, setSubmitBtn] = useState({
    isDisabled: true,
    isLoading: false,
  });
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    token && navigate("/");
  }, [token]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    setSubmitBtn((state) => ({ ...state, isDisabled: true, isLoading: true }));
    if (
      userCredentials.username.length > 0 &&
      userCredentials.email.length > 0
    ) {
      await signup(userCredentials);
      setUserCredentials({ username: "", email: "", password: "" });
      setSubmitBtn((state) => ({
        ...state,
        isDisabled: false,
        isLoading: false,
      }));
      navigate("/signin");
    }
  };

  const handleInput = (e) => {
    setUserCredentials((credentials) => ({
      ...credentials,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordInput = (e) => {
    setUserCredentials((credentials) => ({
      ...credentials,
      password: e.target.value,
    }));
    if (e.target.value.length >= 8) {
      setSubmitBtn((state) => ({ ...state, isDisabled: false }));
    } else {
      setSubmitBtn((state) => ({ ...state, isDisabled: true }));
    }
  };

  return (
    <DefaultWithoutSearch>
      <div className="form--container">
        <form className="form--control" onSubmit={handleSumbit}>
          <h1>Sign Up</h1>
          <label htmlFor="email">
            <div>Username</div>
            <input
              onChange={handleInput}
              value={userCredentials.username}
              type="text"
              name="username"
              required
              autoFocus
            />
          </label>
          <label htmlFor="email">
            <div>Email Address</div>
            <input
              onChange={handleInput}
              type="email"
              name="email"
              value={userCredentials.email}
              required
            />
          </label>
          <label className="form--pass" htmlFor="password">
            <div>Password</div>
            <input
              onChange={handlePasswordInput}
              type={isPassHidden ? "password" : "text"}
              name="password"
              value={userCredentials.password}
              required
            />
            {isPassHidden ? (
              <AiFillEye
                onClick={() => setShowPass(false)}
                className="password-icon"
              />
            ) : (
              <AiFillEyeInvisible
                onClick={() => setShowPass(true)}
                className="password-icon"
              />
            )}
          </label>
          <button
            className={`btn primary ${submitBtn.isDisabled && "disabled-btn"}`}
            type="submit"
            disabled={submitBtn.isDisabled}>
            {submitBtn.isLoading ? (
              <Loader style={{ width: "1.5rem", height: "1.5rem" }} />
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="form--footer">
            Already a user? <Link to="/signin">Sign In</Link>
          </div>
        </form>
      </div>
    </DefaultWithoutSearch>
  );
};

export default SignUp;
