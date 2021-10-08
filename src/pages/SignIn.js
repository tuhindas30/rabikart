import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import DefaultWithoutSearch from "../layouts/DefaultWithoutSearch";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ReactComponent as Loader } from "../assets/images/Loader.svg";
import "../assets/css/Form.css";

const SignIn = () => {
  const [isPassHidden, setShowPass] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [submitBtn, setSubmitBtn] = useState({
    isDisabled: true,
    isLoading: false,
  });
  const [guestBtn, setGuestBtn] = useState({
    isDisabled: false,
    isLoading: false,
  });
  const { token, signin } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    token && navigate("/");
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userCredentials.email.length > 0) {
      setSubmitBtn((state) => ({
        ...state,
        isDisabled: true,
        isLoading: true,
      }));
      try {
        await signin(userCredentials);
      } catch (err) {
        alert(err.message);
      }
      setSubmitBtn((state) => ({
        ...state,
        isDisabled: false,
        isLoading: false,
      }));
      setUserCredentials({ email: "", password: "" });
      navigate(state?.from ? state.from : "/");
    }
  };

  const handleGuestLogin = async () => {
    const credentials = {
      email: process.env.REACT_APP_TEST_EMAIL,
      password: process.env.REACT_APP_TEST_PASSWORD,
    };
    setGuestBtn((state) => ({
      ...state,
      isDisabled: true,
      isLoading: true,
    }));
    try {
      await signin(credentials);
    } catch (err) {
      alert(err.message);
    }
    setGuestBtn((state) => ({
      ...state,
      isDisabled: false,
      isLoading: false,
    }));
    navigate(state?.from ? state.from : "/");
  };

  const handleEmailInput = (e) => {
    setUserCredentials((credentials) => ({
      ...credentials,
      email: e.target.value,
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
        <form className="form--control" onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <label htmlFor="email">
            <div>Email Address</div>
            <input
              onChange={handleEmailInput}
              type="email"
              name="email"
              value={userCredentials.email}
              required
              autoFocus
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
            className={`btn primary signin-btn ${
              submitBtn.isDisabled ? "disabled-btn" : ""
            }`}
            type="submit"
            disabled={submitBtn.isDisabled}>
            {submitBtn.isLoading ? (
              <Loader style={{ width: "1.5rem", height: "1.5rem" }} />
            ) : (
              "Sign In"
            )}
          </button>
          <button
            className={`btn primary ${
              guestBtn.isDisabled ? "disabled-btn" : ""
            }`}
            type="button"
            onClick={handleGuestLogin}
            disabled={guestBtn.isDisabled}>
            {guestBtn.isLoading ? (
              <Loader style={{ width: "1.5rem", height: "1.5rem" }} />
            ) : (
              "Sign In as Guest"
            )}
          </button>
          <div className="form--footer">
            Don't have an account? <Link to="/signup">Sign up</Link>{" "}
          </div>
        </form>
      </div>
    </DefaultWithoutSearch>
  );
};

export default SignIn;
