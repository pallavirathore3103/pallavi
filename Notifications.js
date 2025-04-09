import React, { useState } from 'react'
import { BiSearch, BiNotification, BiFilter } from 'react-icons/bi'
import { FaFilter, FaBell, FaRegBell, FaShieldAlt, FaMoneyBillWave, FaGift } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
// import StickyHeadTable from '../components/table/Table.js'

function Notifications() {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const [activeTab, setActiveTab] = useState('all');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for notifications
  const [notificationsData, setNotificationsData] = useState([
    {
      id: 'NOT12345',
      type: 'System',
      title: 'Account Verification Complete',
      message: 'Your account verification has been completed successfully.',
      time: '2025-03-28 14:32:10',
      status: 'Unread',
      priority: 'High',
      category: 'Account'
    },
    {
      id: 'NOT12346',
      type: 'Transaction',
      title: 'Deposit Successful',
      message: 'Your deposit of 500 USDT has been processed successfully.',
      time: '2025-03-27 09:45:22',
      status: 'Read',
      priority: 'Medium',
      category: 'Payment'
    },
    {
      id: 'NOT12347',
      type: 'Security',
      title: 'New Login Detected',
      message: 'A new login to your account was detected from a new device.',
      time: '2025-03-26 18:12:45',
      status: 'Unread',
      priority: 'Critical',
      category: 'Security'
    },
    {
      id: 'NOT12348',
      type: 'Promotion',
      title: 'Special Offer Available',
      message: 'Check out our new trading fee discount for premium members.',
      time: '2025-03-25 11:30:15',
      status: 'Read',
      priority: 'Low',
      category: 'Marketing'
    }
  ]);
  
  // Handle toggling read status
  const handleToggleStatus = (notificationId) => {
    setNotificationsData(notifications => 
      notifications.map(notification => 
        notification.id === notificationId 
          ? { 
              ...notification, 
              status: notification.status === 'Unread' ? 'Read' : 'Unread' 
            } 
          : notification
      )
    );
  };
  
  // Handle delete click
  const handleDeleteClick = (notification) => {
    setSelectedNotification(notification);
    setDeleteModalOpen(true);
  };
  
  // Handle confirm delete
  const handleConfirmDelete = () => {
    setNotificationsData(notifications => 
      notifications.filter(notification => notification.id !== selectedNotification.id)
    );
    setDeleteModalOpen(false);
    setSelectedNotification(null);
  };
  
  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    setNotificationsData(notifications => 
      notifications.map(notification => ({
        ...notification,
        status: 'Read'
      }))
    );
  };
  
  // Get filtered notifications based on active tab
  const getFilteredNotifications = () => {
    let filtered = notificationsData;
    
    // Filter by tab
    if (activeTab === 'unread') {
      filtered = filtered.filter(notification => notification.status === 'Unread');
    } else if (activeTab === 'read') {
      filtered = filtered.filter(notification => notification.status === 'Read');
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(notification => 
        notification.title.toLowerCase().includes(term) ||
        notification.message.toLowerCase().includes(term) ||
        notification.id.toLowerCase().includes(term) ||
        notification.type.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };
  
  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notificationsData.filter(notification => notification.status === 'Unread').length;
  
  // Get icon for notification type
  const getNotificationTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'system':
        return <FaBell />;
      case 'transaction':
        return <FaMoneyBillWave />;
      case 'security':
        return <FaShieldAlt />;
      case 'promotion':
        return <FaGift />;
      default:
        return <FaRegBell />;
    }
  };
  
  // Transform notifications data to match table columns
  const tableData = filteredNotifications.map((notification, index) => ({
    id: index,
    name: notification.title,
    code: notification.id,
    population: 0,
    size: 0,
    originalData: notification
  }));
  
  // Custom columns for notifications
  const notificationColumns = [
    { 
      id: 'type', 
      label: 'Type', 
      minWidth: 100,
      render: (row) => {
        const notification = row.originalData;
        return (
          <div className="notification-type">
            <div className={`notification-type-icon ${notification.type.toLowerCase()}`}>
              {getNotificationTypeIcon(notification.type)}
            </div>
            <span>{notification.type}</span>
          </div>
        );
      }
    },
    { 
      id: 'title', 
      label: 'Title', 
      minWidth: 200,
      render: (row) => {
        const notification = row.originalData;
        const titleClass = notification.status === 'Unread' 
          ? 'font-semibold text-indigo-600 dark:text-indigo-400' 
          : 'text-gray-800 dark:text-gray-200';
        
        return (
          <div className={titleClass}>
            {notification.title}
          </div>
        );
      }
    },
    { 
      id: 'message', 
      label: 'Message', 
      minWidth: 300,
      render: (row) => {
        const notification = row.originalData;
        return (
          <div className="text-gray-600 ">
            {notification.message}
          </div>
        );
      }
    },
    { 
      id: 'category', 
      label: 'Category', 
      minWidth: 120,
      render: (row) => {
        const notification = row.originalData;
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {notification.category}
          </span>
        );
      }
    },
    { 
      id: 'time', 
      label: 'Time', 
      minWidth: 150,
      render: (row) => {
        const notification = row.originalData;
        return (
          <div className="text-gray-600 ">
            {notification.time}
          </div>
        );
      }
    },
    { 
      id: 'status', 
      label: 'Status', 
      minWidth: 120,
      render: (row) => {
        const notification = row.originalData;
        const badgeClass = notification.status === 'Unread' 
          ? 'notification-badge unread' 
          : 'notification-badge read';
        
        return (
          <span className={badgeClass}>
            {notification.status}
          </span>
        );
      }
    },
    { 
      id: 'actions', 
      label: 'Actions', 
      minWidth: 120,
      render: (row) => {
        const notification = row.originalData;
        
        return (
          <div className="notification-actions">
            <button 
              className="notification-action-btn read-toggle"
              onClick={() => handleToggleStatus(notification.id)}
            >
              {notification.status === 'Unread' ? 'Mark as Read' : 'Mark as Unread'}
            </button>
            <button 
              className="notification-action-btn delete"
              onClick={() => handleDeleteClick(notification)}
            >
              Delete
            </button>
          </div>
        );
      }
    }
  ];

  return (
    <div className="notifications-container ">
      <h1 className="text-2xl font-bold text-indigo-950 dark:text-white mb-6">Notifications</h1>
      
      {/* Tabs */}
      <div className="tab-buttons">
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
          <span className="status-counter">{notificationsData.length}</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'unread' ? 'active' : ''}`}
          onClick={() => setActiveTab('unread')}
        >
          Unread
          <span className="status-counter">{unreadCount}</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'read' ? 'active' : ''}`}
          onClick={() => setActiveTab('read')}
        >
          Read
          <span className="status-counter">{notificationsData.length - unreadCount}</span>
        </button>
      </div>
      
      {/* Search and filter bar */}
      <div className="filter-bar">
        <div className="flex space-x-2">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center gap-2">
            <BiFilter className="text-sm" />
            <span>Filter</span>
          </button>
          <button className="bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-slate-700">
            Reset
          </button>
        </div>
        
        <div className="flex items-center">
          <div className="search-box mr-2">
            <input 
              type="text" 
              placeholder="Search notifications" 
              className="bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <BiSearch className="search-icon" />
          </div>
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
            onClick={handleMarkAllAsRead}
          >
            Mark All as Read
          </button>
        </div>
      </div>
      
      {/* Data Table or Empty State */}
      {filteredNotifications.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden">
         
        </div>
      ) : (
        <div className="empty-state">
          <BiNotification className="empty-state-icon" />
          <h3 className="text-lg font-medium mb-2">No notifications found</h3>
          <p>There are no notifications matching your current filters.</p>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && selectedNotification && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Delete Notification</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setDeleteModalOpen(false)}
              >
                <IoMdClose />
              </button>
            </div>
            <p>Are you sure you want to delete this notification? This action cannot be undone.</p>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications