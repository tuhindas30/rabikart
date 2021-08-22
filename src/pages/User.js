import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import DefaultWithoutSearch from "../layouts/DefaultWithoutSearch";
import "../assets/css/Form.css";
import NavTabs from "../components/NavTabs/NavTabs";

const User = () => {
  const [isPassHidden, setShowPass] = useState(true);
  const { isUserLoading, user, updateUser, changePassword } = useAuth();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [updateInfoBtn, setUpdateInfoBtn] = useState({
    isDisabled: true,
    isLoading: false,
  });
  const [changePasswordBtn, setChangePasswordBtn] = useState({
    isDisabled: true,
    isLoading: false,
  });

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setUpdateInfoBtn((state) => ({
      ...state,
      isDisabled: true,
      isLoading: true,
    }));
    if (userCredentials.email.length > 0) {
      await updateUser(userCredentials.email);
      setUserCredentials((credentials) => ({ ...credentials, email: "" }));
    }
    setUpdateInfoBtn((state) => ({
      ...state,
      isDisabled: true,
      isLoading: false,
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setChangePasswordBtn((state) => ({
      ...state,
      isDisabled: true,
      isLoading: true,
    }));
    await changePassword(
      userCredentials.oldPassword,
      userCredentials.confirmPassword
    );
    setChangePasswordBtn((state) => ({
      ...state,
      isDisabled: true,
      isLoading: false,
    }));
    setUserCredentials((state) => ({
      ...state,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const handleEmailInput = (e) => {
    setUserCredentials((credentials) => ({
      ...credentials,
      email: e.target.value,
    }));
    if (e.target.value.length > 0) {
      setUpdateInfoBtn((state) => ({ ...state, isDisabled: false }));
    } else {
      setUpdateInfoBtn((state) => ({ ...state, isDisabled: true }));
    }
  };

  const handleOldPasswordInput = (e) => {
    setUserCredentials((credentials) => ({
      ...credentials,
      oldPassword: e.target.value,
    }));
  };

  const handleNewPasswordInput = (e) => {
    setUserCredentials((credentials) => ({
      ...credentials,
      newPassword: e.target.value,
    }));
  };

  const handleConfirmPasswordInput = (e) => {
    setUserCredentials((credentials) => ({
      ...credentials,
      confirmPassword: e.target.value,
    }));
    if (userCredentials.newPassword === e.target.value) {
      setChangePasswordBtn((state) => ({
        ...state,
        isDisabled: false,
      }));
    } else {
      setChangePasswordBtn((state) => ({
        ...state,
        isDisabled: true,
      }));
    }
  };

  if (isUserLoading) {
    return (
      <DefaultWithoutSearch>
        <NavTabs />
        <h1 className="overlay">Loading ...</h1>
      </DefaultWithoutSearch>
    );
  }

  return (
    <DefaultWithoutSearch>
      <NavTabs />
      <div
        className="form--container justify-space"
        style={{ height: "80vh", marginTop: "0" }}>
        <form className="form--control" onSubmit={handleUpdateUser}>
          <h1>Update Info</h1>
          <label htmlFor="email">
            <div>Username</div>
            <input value={user.username} type="text" name="username" disabled />
          </label>
          <label htmlFor="email">
            <div>Email Address</div>
            <input
              onChange={handleEmailInput}
              type="email"
              name="email"
              value={userCredentials.email}
              required
            />
          </label>
          <button
            className={`btn primary ${
              updateInfoBtn.isDisabled && "disabled-btn"
            }`}
            type="submit"
            disabled={updateInfoBtn.isDisabled}>
            {updateInfoBtn.isLoading ? "Loading ..." : "Update"}
          </button>
        </form>
        <form className="form--control" onSubmit={handleChangePassword}>
          <h1>Change Password</h1>
          <label className="form--pass" htmlFor="password">
            <div>Old Password</div>
            <input
              onChange={handleOldPasswordInput}
              type={isPassHidden ? "password" : "text"}
              name="password"
              value={userCredentials.oldPassword}
              required
            />
            {isPassHidden ? (
              <i
                onClick={() => setShowPass(false)}
                className="bi bi-eye-fill"></i>
            ) : (
              <i
                onClick={() => setShowPass(true)}
                className="bi bi-eye-slash-fill"></i>
            )}
          </label>
          <label className="form--pass" htmlFor="password">
            <div>New Password</div>
            <input
              onChange={handleNewPasswordInput}
              type={isPassHidden ? "password" : "text"}
              name="password"
              value={userCredentials.newPassword}
              required
            />
            {isPassHidden ? (
              <i
                onClick={() => setShowPass(false)}
                className="bi bi-eye-fill"></i>
            ) : (
              <i
                onClick={() => setShowPass(true)}
                className="bi bi-eye-slash-fill"></i>
            )}
          </label>
          <label className="form--pass" htmlFor="password">
            <div>Confirm new Password</div>
            <input
              onChange={handleConfirmPasswordInput}
              type={isPassHidden ? "password" : "text"}
              name="password"
              value={userCredentials.confirmPassword}
              required
            />
            {isPassHidden ? (
              <i
                onClick={() => setShowPass(false)}
                className="bi bi-eye-fill"></i>
            ) : (
              <i
                onClick={() => setShowPass(true)}
                className="bi bi-eye-slash-fill"></i>
            )}
          </label>
          <button
            className={`btn primary ${
              changePasswordBtn.isDisabled && "disabled-btn"
            }`}
            type="submit"
            disabled={changePasswordBtn.isDisabled}>
            {changePasswordBtn.isLoading ? "Loading ..." : "Change Password"}
          </button>
        </form>
      </div>
    </DefaultWithoutSearch>
  );
};

export default User;
