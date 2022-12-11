import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ui/errorMessage/ErrorMessage";
import Identifier from "../../components/ui/identifier/Identifier";
import Terminal from "../../components/ui/terminal/Terminal";
import { useGlobalContext } from "../../context";
const dummy = {
  username: "ujjwal",
  password: "random1234",
};
const Login = () => {

  const {handleEnter, error, setError} = useGlobalContext()
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // this is just to switch focus from username to password
  const [active, setActive] = useState([])

  const handleErrorSubmit = (msg) => {
    setError({ status: true, msg });
    setUsername("")
    setPassword("")
    setActive([])
    setTimeout(() => {
      setError({ status: false, msg });
    
    }, 2000);

  };
  const handleSubmit = (event) => {
    if (event.keyCode === 13) {
      if (username.length < 3 || password.length < 3) {
        handleErrorSubmit("invalid credentials.");
      }
      if (username !== dummy.username || password !== dummy.password) {
        handleErrorSubmit("invalid credentials.");
      } else {
        navigate("/home");
      }
    }
  };
  const handleFocusClick = useCallback(() => {
    if(active.includes("password")) {
      passwordRef.current.focus();
    } else {
        usernameRef.current.focus()
    }
  }, [active]);

  useEffect(() => {
    handleFocusClick();
  }, [handleFocusClick]);

  return (
      <Terminal terminalWrapperOnClick={handleFocusClick}>
        <form className="terminal-form login-form">
          <div className="form-control active">
            <Identifier title2="/login" />
            <label>username: </label>
            <input
              type="text"
              name="username"
              onKeyDown={(e) => handleEnter(e, active, setActive)}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ref={usernameRef}
            />
          </div>
          <div
            className={`form-control ${
              (active.includes("password")) ? "active" : ""
            } login-password-control`}
          >
            <Identifier title2="/login" />
            <label>password: </label>
            <input
              type="password"
              name="password"
              onKeyDown={handleSubmit}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordRef}
            />
          </div>
          {error.status && <ErrorMessage {...{error}} />}
        </form>
        </Terminal>
  );
};

export default Login;
