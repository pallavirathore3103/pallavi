import React from 'react';
import { Link } from 'react-router-dom';
import { IoNotificationsOutline } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import secureLocalStorage from 'react-secure-storage';


const Header = () => {
  
  const logout = () => {
    secureLocalStorage.setItem("authToken", "");
  };

  return (
    <header >
      <div className="d-flex justify-between align-items-center w-100">
        <div className="left-section">
          <h1></h1>
        </div>
        <nav className="hidden md:block">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li onClick={logout}>
              <Link>Logout</Link>
            </li>
          </ul>
        </nav>
        <div className="right-section">
          <IoCalendarOutline className="cursor-pointer" />
          <IoNotificationsOutline className="cursor-pointer" />
          <MdMarkEmailUnread className="cursor-pointer" />
          <div className="user-icon">U</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
