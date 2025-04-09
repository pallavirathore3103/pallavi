import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';
// import StickyHeadTable from '../components/table/Table.js';


// Reusable Modal Component for both Edit and Delete
const Modal = ({ title, children, onCancel, onConfirm, confirmText = "Confirm", cancelText = "Cancel" }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h2>
      {children}
      <div className="flex justify-end mt-6 space-x-2">
        <button onClick={onCancel} className="bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-slate-600">
          {cancelText}
        </button>
        <button onClick={onConfirm} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md">
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);

function FundingAccounts() {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const [accountsData, setAccountsData] = useState([
    { accountId: 'ACC123456789', accountName: 'Primary Savings', accountType: 'Bank Account', bankName: 'State Bank', accountNumber: '****5678', currency: 'INR', status: 'Active', lastUpdated: '2025-03-28 12:45:32' },
    { accountId: 'ACC987654321', accountName: 'Main Trading', accountType: 'UPI', bankName: 'HDFC Bank', accountNumber: '****3456', currency: 'INR', status: 'Active', lastUpdated: '2025-03-27 09:30:15' },
    { accountId: 'ACC567891234', accountName: 'Business Account', accountType: 'Bank Account', bankName: 'ICICI Bank', accountNumber: '****7890', currency: 'INR', status: 'Inactive', lastUpdated: '2025-03-25 16:20:45' }
  ]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [editFormData, setEditFormData] = useState({ accountName: '', accountType: '', bankName: '', currency: '', status: '' });

  const handleEditClick = (account) => {
    setSelectedAccount(account);
    setEditFormData({
      accountName: account.accountName,
      accountType: account.accountType,
      bankName: account.bankName,
      currency: account.currency,
      status: account.status
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (account) => {
    setSelectedAccount(account);
    setShowDeleteModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    setAccountsData(prev =>
      prev.map(acc =>
        acc.accountId === selectedAccount.accountId
          ? { ...acc, ...editFormData, lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19) }
          : acc
      )
    );
    setShowEditModal(false);
    setSelectedAccount(null);
  };

  const handleConfirmDelete = () => {
    setAccountsData(prev => prev.filter(acc => acc.accountId !== selectedAccount.accountId));
    setShowDeleteModal(false);
    setSelectedAccount(null);
  };

  const tableData = accountsData.map((account, index) => ({
    id: index,
    name: account.accountName,
    code: account.accountId,
    population: 0,
    size: 0,
    originalData: account
  }));

  const accountsColumns = [
    {
      id: 'accountId',
      label: 'Account ID',
      minWidth: 150,
      render: ({ originalData }) => (
        <div className="text-indigo-600 dark:text-indigo-400 font-medium">
          {originalData.accountId}
        </div>
      )
    },
    {
      id: 'accountDetails',
      label: 'Account Details',
      minWidth: 200,
      render: ({ originalData }) => (
        <div>
          <div className="text-gray-800 dark:text-gray-200 font-medium">{originalData.accountName}</div>
          <div className="text-gray-600 dark:text-gray-400">{originalData.accountType}</div>
        </div>
      )
    },
    {
      id: 'bankName',
      label: 'Bank',
      minWidth: 150,
      render: ({ originalData }) => (
        <div className="text-gray-800 dark:text-gray-200">
          {originalData.bankName}
        </div>
      )
    },
    {
      id: 'accountNumber',
      label: 'Account Number',
      minWidth: 150,
      render: ({ originalData }) => (
        <div className="text-gray-700 dark:text-gray-300">
          {originalData.accountNumber}
        </div>
      )
    },
    {
      id: 'currency',
      label: 'Currency',
      minWidth: 100,
      render: ({ originalData }) => (
        <div className="text-gray-700 dark:text-gray-300">
          {originalData.currency}
        </div>
      )
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      render: ({ originalData }) => {
        const statusClass = originalData.status === 'Active'
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        return <span className={`px-2 py-1 rounded-full text-xs ${statusClass}`}>{originalData.status}</span>;
      }
    },
    {
      id: 'lastUpdated',
      label: 'Last Updated',
      minWidth: 150,
      render: ({ originalData }) => (
        <div className="text-gray-600 dark:text-gray-400">
          {originalData.lastUpdated}
        </div>
      )
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 120,
      render: ({ originalData }) => (
        <div className="flex space-x-2">
          <button
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            onClick={() => handleEditClick(originalData)}
          >
            Edit
          </button>
          <button
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            onClick={() => handleDeleteClick(originalData)}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 rounded-lg shadow-sm h-full">
      <h1 className="text-2xl font-bold text-indigo-950 dark:text-white mb-6">Funding Accounts</h1>
      <div className="flex justify-between mb-6 flex-wrap gap-4">
        <div className="flex space-x-2">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center gap-2">
            <FaFilter className="text-sm" /> Filter
          </button>
          <button className="bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-slate-700">
            Reset
          </button>
        </div>
        <div className="relative flex items-center">
          <div className="relative mr-2">
            <input
              type="text"
              placeholder="Search accounts"
              className="bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-200 py-2 pl-9 pr-3 rounded-md shadow-sm focus:outline-none w-60"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BiSearch className="text-gray-400" />
            </div>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
            Add Account
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden">
      </div>

      {showEditModal && (
        <Modal
          title="Edit Account"
          onCancel={() => setShowEditModal(false)}
          onConfirm={handleSaveEdit}
          confirmText="Save Changes"
        >
          <div className="space-y-4">
            {['accountName', 'bankName'].map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {field === 'accountName' ? 'Account Name' : 'Bank Name'}
                </label>
                <input
                  type="text"
                  name={field}
                  value={editFormData[field]}
                  onChange={handleFormChange}
                  className="w-full bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 py-2 px-3 rounded-md shadow-sm focus:outline-none"
                />
              </div>
            ))}
            {[
              { name: 'accountType', label: 'Account Type', options: ['Bank Account', 'UPI', 'Wallet'] },
              { name: 'currency', label: 'Currency', options: ['INR', 'USD', 'EUR', 'GBP'] },
              { name: 'status', label: 'Status', options: ['Active', 'Inactive'] }
            ].map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {field.label}
                </label>
                <select
                  name={field.name}
                  value={editFormData[field.name]}
                  onChange={handleFormChange}
                  className="w-full bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 py-2 px-3 rounded-md shadow-sm focus:outline-none"
                >
                  {field.options.map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal
          title="Confirm Deletion"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          confirmText="Delete"
        >
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Are you sure you want to delete the account "{selectedAccount.accountName}"? This action cannot be undone.
          </p>
        </Modal>
      )}
    </div>
  );
}

export default FundingAccounts;
