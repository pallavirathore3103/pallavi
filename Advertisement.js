import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { BiSearch } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';
import { FiCopy, FiCalendar } from 'react-icons/fi';
import { HiOutlineEye, HiOutlineDocumentDuplicate } from 'react-icons/hi';
// import StickyHeadTable from '../components/table/Table.js';

import { Link } from 'react-router-dom';

// Reusable select component with dropdown arrow
const SelectDropdown = ({ options }) => (
  <div className="">
    <select className="w-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 py-2 px-3 rounded-md shadow-sm focus:outline-none">
      {options.map(opt => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

// Reusable input with icon component
const IconInput = ({ placeholder, IconComponent }) => (
  <div className="">
    <input
      type="text"
      placeholder={placeholder}
      className="w-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 py-2 pl-9 pr-3 rounded-md shadow-sm focus:outline-none"
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <IconComponent className="text-gray-400" />
    </div>
  </div>
);

const Advertisement = () => {
  const [tabIndex, setTabIndex] = useState(0); // 0 for Active, 1 for Closed
  const [activeSubTab, setActiveSubTab] = useState('normalAds');
  const isDarkMode = document.documentElement.classList.contains('dark');

  // Mock data for ads (4 identical objects for demonstration)
  const adData = Array(4).fill({
    adNumber: '127379122684555018⁠24',
    type: 'Buy',
    assetType: 'USDT/INR',
    adBalance: '81.98 USDT',
    orderLimit: '10,000.00 - 4,530,000.00 INR',
    adPrice: '90.67 INR [+6%]',
    exchangeRate: '85.53 0',
    paymentMethod: 'IMPS',
    altPaymentMethod: 'Bank Transfer (India)',
    lastUpdated: '2025-03-28 20:20:21',
    createTime: '2025-03-25 23:36:38',
    status: 'Offline'
  });

  const adHistoryData = Array(4).fill({
    adNumber: '127378507882347⁠91808',
    type: 'Buy',
    assetType: 'USDT/INR',
    targetQuantity: '5000',
    completed: '0',
    exchangeRate: '--',
    lastUpdated: '2025-03-25 23:30:02',
    createTime: '2025-03-25 19:32:20',
    status: 'Closed'
  });

  // Transform data for the tables
  const tableData = adData.map(ad => ({
    name: ad.adNumber,
    code: ad.adNumber,
    population: parseInt(ad.orderLimit.replace(/[^\d]/g, '') || '0'),
    size: parseInt(ad.adBalance.replace(/[^\d]/g, '') || '0'),
    originalData: ad
  }));

  const historyTableData = adHistoryData.map(ad => ({
    name: ad.adNumber,
    code: ad.adNumber,
    population: parseInt(ad.targetQuantity.replace(/[^\d]/g, '') || '0'),
    size: parseInt(ad.completed.replace(/[^\d]/g, '') || '0'),
    originalData: ad
  }));

  // Custom columns for ad history table
  const historyColumns = [
    {
      id: 'adNumber',
      label: 'Ad Number / Type',
      minWidth: 200,
      render: ({ originalData: ad }) => (
        <div>
          <div className="text-indigo-600 dark:text-indigo-400 font-medium">{ad.adNumber}</div>
          <div className="text-green-600 dark:text-green-400 font-medium">{ad.type}</div>
        </div>
      )
    },
    {
      id: 'assetType',
      label: 'Asset Type/Cash',
      minWidth: 150,
      render: ({ originalData: ad }) => (
        <div className="text-gray-700 dark:text-gray-300">{ad.assetType}</div>
      )
    },
    {
      id: 'quantities',
      label: 'Target Quantity / Completed',
      minWidth: 180,
      render: ({ originalData: ad }) => (
        <div>
          <div className="text-gray-700 dark:text-gray-300">{ad.targetQuantity}</div>
          <div className="text-gray-600 ">{ad.completed}</div>
        </div>
      )
    },
    {
      id: 'exchangeRate',
      label: 'Exchange Rate',
      minWidth: 130,
      render: ({ originalData: ad }) => (
        <div className="text-gray-700 dark:text-gray-300">{ad.exchangeRate}</div>
      )
    },
    {
      id: 'timestamps',
      label: 'Last Updated / Create Time',
      minWidth: 200,
      render: ({ originalData: ad }) => (
        <div>
          <div className="text-gray-700 dark:text-gray-300">{ad.lastUpdated}</div>
          <div className="text-gray-600 ">{ad.createTime}</div>
        </div>
      )
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      render: ({ originalData: ad }) => (
        <span className="status-badge offline px-2 py-1 rounded-full text-xs inline-flex items-center justify-center">
          {ad.status}
        </span>
      )
    },
    {
      id: 'actions',
      label: 'Action',
      minWidth: 100,
      render: () => (
        <div className="flex space-x-2">
          <button className="action-button p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md">
            <HiOutlineEye size={18} />
          </button>
          <button className="action-button p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md">
            <HiOutlineDocumentDuplicate size={18} />
          </button>
        </div>
      )
    }
  ];

  // Mapping for sub‑tab labels
  const subTabLabels = {
    normalAds: 'Normal Ads',
    cashAds: 'Cash Ads',
    blockAds: 'Block Ads',
    flatAds: 'Flat Ads'
  };

  return (
    <div className="advertisement-container p-6  rounded-lg shadow-sm h-full">
      <div className="flex flex-wrap justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {tabIndex === 0 ? 'My Ads' : 'Ads History'}
        </h1>
        {tabIndex === 0 && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
              <span className="text-gray-600 dark:text-gray-300 mr-2">Current Exchange Rate</span>
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-300 mr-2">USD/INR</span>
                <SelectDropdown options={['85.50']} />
              </div>
              <button className="ml-2 text-gray-500  hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                <FiCopy />
              </button>
            </div>
            <Link to="/postnewads"> {/* Adjust the route as needed */}
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 px-4 rounded-lg shadow-sm yellow-button">
                Post new ads
              </button>
            </Link>
          </div>
        )}
      </div>

      <Tabs selectedIndex={tabIndex} onSelect={setTabIndex} className="react-tabs">
        <TabList className="border-b border-gray-200 dark:border-gray-700 mb-6 flex">
          {['Active', 'Closed'].map((label, idx) => (
            <Tab
              key={label}
              className={`py-2 px-1 text-sm font-medium cursor-pointer mr-6 ${tabIndex === idx
                  ? 'text-yellow-500 border-b-2 border-yellow-500 dark:text-yellow-400 dark:border-yellow-400'
                  : 'text-gray-500 hover:text-yellow-500  dark:hover:text-yellow-400'
                }`}
            >
              {label}
            </Tab>
          ))}
        </TabList>

        {/* Active Ads Tab */}
        <TabPanel>
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <ul className="flex flex-wrap -mb-px">
              {Object.entries(subTabLabels).map(([key, label]) => (
                <li key={key} className="mr-6">
                  <button
                    className={`inline-block py-2 px-1 text-sm font-medium ${activeSubTab === key
                        ? 'text-yellow-500 border-b-2 border-yellow-500 dark:text-yellow-400 dark:border-yellow-400'
                        : 'text-gray-500 hover:text-yellow-500  dark:hover:text-yellow-400'
                      }`}
                    onClick={() => setActiveSubTab(key)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              {['All Cryptos', 'All currencies', 'All types', 'All status'].map(opt => (
                <SelectDropdown key={opt} options={[opt]} />
              ))}
              <IconInput placeholder="Ad number" IconComponent={BiSearch} />
            </div>
            <div className="flex justify-between mb-2 flex-wrap gap-4">
              <div className="flex space-x-2">
                <button className=" dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 py-2 px-4 rounded-md flex items-center gap-2">
                  <FaFilter className="text-sm" /> Filter
                </button>
                <button className="bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-slate-600">
                  Reset
                </button>
              </div>
              <div className="flex space-x-2">
                <button className="bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md">
                  Publish all
                </button>
                <button className="bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md">
                  Take all offline
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden">

          </div>

          <div className="flex justify-end mt-6">
            <nav className="flex items-center space-x-1 bg-white dark:bg-slate-900 rounded-lg shadow-sm p-2">
              <button className="px-2 py-1 text-gray-500  rounded hover:bg-gray-100 dark:hover:bg-slate-800">
                &laquo;
              </button>
              <button className="px-3 py-1 bg-yellow-400 text-gray-900 rounded">1</button>
              <button className="px-2 py-1 text-gray-500  rounded hover:bg-gray-100 dark:hover:bg-slate-800">
                &raquo;
              </button>
            </nav>
          </div>
        </TabPanel>

        {/* Ads History Tab */}
        <TabPanel>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
              {['All Assets', 'All currencies', 'All types', 'All Ad Types'].map(opt => (
                <SelectDropdown key={opt} options={[opt]} />
              ))}
              <div className="flex items-center space-x-2">
                <IconInput placeholder="2024-12-28" IconComponent={FiCalendar} />
                <span className="text-gray-500 ">→</span>
                <IconInput placeholder="2025-03-28" IconComponent={FiCalendar} />
              </div>
              <IconInput placeholder="Ad number" IconComponent={BiSearch} />
            </div>
            <div className="flex mb-2 space-x-2">
              <button className=" dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 py-2 px-4 rounded-md flex items-center gap-2">
                <FaFilter className="text-sm" /> Filter
              </button>
              <button className="bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-slate-600">
                Reset
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden">
            {/* <StickyHeadTable data={historyTableData} customColumns={historyColumns} isDarkMode={isDarkMode} /> */}
          </div>

          <div className="flex justify-end mt-6">
            <nav className="flex items-center space-x-1 bg-white dark:bg-slate-900 rounded-lg shadow-sm p-2">
              <button className="px-2 py-1 text-gray-500  rounded hover:bg-gray-100 dark:hover:bg-slate-800">
                &laquo;
              </button>
              <button className="px-3 py-1 bg-yellow-400 text-gray-900 rounded">1</button>
              <button className="px-2 py-1 text-gray-500  rounded hover:bg-gray-100 dark:hover:bg-slate-800">
                &raquo;
              </button>
            </nav>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Advertisement;
