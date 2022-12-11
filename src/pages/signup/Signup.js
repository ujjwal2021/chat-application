import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ui/errorMessage/ErrorMessage";
import Identifier from "../../components/ui/identifier/Identifier";
import Terminal from "../../components/ui/terminal/Terminal";
import { useGlobalContext } from "../../context";

const Signup = () => {
  const { handleEnter, error, setError} = useGlobalContext()
    // use navigate
    const navigate = useNavigate()
    // refs
    const usernameRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    // useState
    const [active, setActive] = useState([])

    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("") 
    const [confirmPass, setConfirmPass] = useState("") 




    const handleFocusClick = useCallback(() => {
      if(active.includes("confirm-password")) {
          confirmPasswordRef.current.focus();
      }
      else if (active.includes("password")) {
        passwordRef.current.focus();
      } else {
          usernameRef.current.focus()
      }
    }, [active]);

    const handleErrorSubmit = (msg) => {
      setError({ status: true, msg });
      setActive([])
      setUsername("")
      setPass("")
      setConfirmPass("")
      setTimeout(() => {
        setError({ status: false, msg });
      }, 2000);
  
    };

    const handleSubmit = (event) => {
      if (event.keyCode === 13) {
          if(pass !== confirmPass)
              handleErrorSubmit("Passwords donot match")
          else navigate("/login")
      }
    };

    useEffect(()=> {
      handleFocusClick()
    },[handleFocusClick])

  return (
        <Terminal terminalWrapperOnClick={handleFocusClick}>
          <form className="terminal-form signup-form">
            <div className="form-control active">
              <Identifier title2="/signup" />
              <label>username: </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                ref={usernameRef}
                onKeyDown={e=>handleEnter(e, active, setActive)}
              />
            </div>
            <div
              className={`form-control ${(active.includes("password")) ? "active":""} signup-password-control`}
            >
              <Identifier title2="/signup" />
              <label>password: </label>
              <input
                type="password"
                name="password"
                value={pass}
                onChange={(e)=> setPass(e.target.value)}
                ref={passwordRef}
                onKeyDown={e=>handleEnter(e, active, setActive)}

              />
            </div>
            <div
              className={`form-control ${(active.includes("confirm-password")) ? "active":""} signup-password-control`}
            >
              <Identifier title2="/signup" />
              <label>confirm password: </label>
              <input
                type="password"
                name="confirm-password"
                value={confirmPass}
                onChange={(e)=> setConfirmPass(e.target.value)}
                ref={confirmPasswordRef}
                onKeyDown={handleSubmit}
              />
            </div>
            {error.status && <ErrorMessage {...{error}} />}

          </form>
        </Terminal>
  );
};

export default Signup;
