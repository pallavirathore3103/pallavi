import React, { useState } from 'react';
import { AiFillDashboard } from "react-icons/ai";
import { IoIosCard } from "react-icons/io";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineAccountBalance } from "react-icons/md";
import { HiBanknotes } from "react-icons/hi2";
import { FaPeopleArrows } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { SiWebmoney } from "react-icons/si";
import { FaBoxOpen } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Check if the current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className='sidebar-container h-full shadow-lg'>
      <div className='flex flex-col gap-3 w-full text-slate-300 h-full justify-between'>
        <div className='flex flex-col gap-6 px-4 mt-4'>
          <div className='flex items-center justify-center gap-2 py-2'>
            {/* <SiWebmoney className='text-indigo-900 dark:text-white text-xl md:text-4xl'/> */}
            <div className='hidden md:flex font-bold text-white'>FinaApp</div>
          </div>
          <div className='flex flex-col gap-2 text-md sm:text-xs md:text-sm lg:text-lg'>
            <Link 
              to="/" 
              className={`sidebar-link ${isActive('/') ? 'active' : ''}`}
            >
              <AiFillDashboard className="sidebar-link-icon"/>
              <div className='hidden sm:flex sidebar-link-text'>Dashboard</div>
            </Link>
            <Link 
              to="/orders" 
              className={`sidebar-link ${isActive('/orders') ? 'active' : ''}`}
            >
              <FaBoxOpen className="sidebar-link-icon"/>
              <div className='hidden sm:flex sidebar-link-text'>Orders</div>
            </Link>
            <Link 
              to="/advertisement" 
              className={`sidebar-link ${isActive('/advertisement') ? 'active' : ''}`}
            >
              <MdOutlineLocalOffer className="sidebar-link-icon"/>
              <div className='hidden sm:flex sidebar-link-text'>Advertisements</div>
            </Link>
            <Link 
              to="/profile" 
              className={`sidebar-link ${isActive('/profile') ? 'active' : ''}`}
            >
              <MdOutlinePayments className="sidebar-link-icon"/>
              <div className='hidden sm:flex sidebar-link-text'>Profile</div>
            </Link>
            <Link 
              to="/FundaingAccounts" 
              className={`sidebar-link ${isActive('/FundaingAccounts') ? 'active' : ''}`}
            >
              <MdOutlineAccountBalance className="sidebar-link-icon"/>
              <div className='hidden sm:flex sidebar-link-text'>Funding Accounts</div>
            </Link>
            <Link 
              to="/Notifications" 
              className={`sidebar-link ${isActive('/Notifications') ? 'active' : ''}`}
            >
              <FaPeopleArrows className="sidebar-link-icon"/>
              <div className='hidden sm:flex sidebar-link-text'>Notifications</div>
            </Link>
          </div>
        </div>
        <Link 
          to="/settings" 
          className={`sidebar-link mx-4 mb-4 ${isActive('/settings') ? 'active' : ''}`}
        >
          <IoSettingsOutline className="sidebar-link-icon"/>
          <div className='hidden sm:flex sidebar-link-text'>Settings</div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
