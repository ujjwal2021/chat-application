import React, { useEffect, useState } from "react";
import "./terminal.css";
import { FaMinus, FaTimes } from "react-icons/fa";
import Brave from "../../../assets/brave-logo.png";
import LoginLogo from "../../../assets/login-icon.png";
import MessengerIcon from "../../../assets/messenger-icon.png";
import InstagramIcon from "../../../assets/instagram-icon";
import Draggable from "react-draggable";

const Terminal = ({ children, terminalWrapperOnClick = null }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragDisable, setIsDragDisable] = useState(false);
  const closeIconClick = () => {};

  const minimizeIconClick = () => {
    setIsMinimized(true);
  };
  const maximizeIconClick = () => {
    setIsMinimized(!isMinimized);
  };

  const handleResize = () => {
    if (window.innerWidth <= 600) setIsDragDisable(true);
    else setIsDragDisable(false);
  };

  useEffect(() => {
    if (window.innerWidth <= 600) setIsDragDisable(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="main">
      <Draggable disabled={isDragDisable}>
        <div
          className={`terminal-card-wrapper ${isMinimized ? "minimized" : ""}`}
          onClick={terminalWrapperOnClick}
        >
          <div className="terminal-card-top">
            <div className="terminal-card-top-title">/chat-app ~/signup</div>
            <div className="terminal-card-top-icon-container">
              <div className="terminal-card-top-icons minimize">
                <FaMinus onClick={minimizeIconClick} className="close-icon" />
              </div>
              <div className="terminal-card-top-icons close">
                <FaTimes onClick={closeIconClick} />
              </div>
            </div>
          </div>
          <div className="terminal-card-body">{children}</div>
        </div>
      </Draggable>

      <div className="main-bottom">
        <div className="bottom-main-container">
          <div className="bottom-main-icon active">
            <img src={Brave} alt="brave icon" onClick={maximizeIconClick} />
          </div>
          <div className="bottom-main-icon">
            <img src={LoginLogo} alt="brave icon" />
          </div>
          <div className="bottom-main-icon">
            <img src={MessengerIcon} alt="brave icon" />
          </div>
          <div className="bottom-main-icon">
            <img src={InstagramIcon} alt="brave icon" />
          </div>
          <div className="bottom-main-icon">
            <img src={Brave} alt="brave icon" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Terminal;
