import React, { useEffect, useState, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';
import { BsInfoCircleFill, BsCalendar } from 'react-icons/bs';
import { RiFileSearchLine } from 'react-icons/ri';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import DataTable from 'react-data-table-component';
import { SiTether } from 'react-icons/si';
import websiteStore from '../stores/userStore.js';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

const Orders = observer(() => {
  const [activeTab, setActiveTab] = useState('history');
  const sliderRef = useRef(null);
  // Check if the page is in dark mode
  const isDarkMode = document.documentElement.classList.contains('dark');

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const customStyles = {
    header: {
      style: {
        paddingLeft: '16px',
        paddingRight: '16px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
      },
    },
    headRow: {
      style: {
        backgroundColor: '#f9f9f9',
        borderBottom: '2px solid #ececec',
      },
    },
    headCells: {
      style: {
        color: '#555',
        fontSize: '14px',
        fontWeight: '600',
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
    rows: {
      style: {
        minHeight: '60px',
        borderBottom: '1px solid #ececec',
      },
      highlightOnHoverStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderBottomColor: '#fff',
        outline: '1px solid #ddd',
      },
    },
    cells: {
      style: {
        paddingLeft: '16px',
        paddingRight: '16px',
        fontSize: '14px',
        color: '#333',
      },
    },
  };

  const cryptoData = [
    { symbol: 'USDT', value: '4918.02', fiat: '446,710.99 INR', icon: <SiTether className="text-2xl text-teal-500" /> },
    { symbol: 'MXN', value: '-', fiat: '-', icon: <div className="text-2xl font-bold text-green-500">$</div> },
    { symbol: 'ARS', value: '-', fiat: '-', icon: <div className="text-2xl font-bold text-blue-500">$</div> },
    { symbol: 'RARE', value: '-', fiat: '-', icon: <div className="text-2xl font-bold text-black dark:text-white">$</div> },
    { symbol: 'SHIB', value: '-', fiat: '-', icon: <div className="text-2xl font-bold text-orange-500">🐕</div> },
    { symbol: 'DOGE', value: '-', fiat: '-', icon: <div className="text-2xl font-bold text-amber-500">Ð</div> },
    { symbol: 'USDT', value: '4918.02', fiat: '446,710.99 INR', icon: <SiTether className="text-2xl text-teal-500" /> },
    { symbol: 'MXN', value: '-', fiat: '-', icon: <div className="text-2xl font-bold text-green-500">$</div> },
    { symbol: 'ARS', value: '-', fiat: '-', icon: <div className="text-2xl font-bold text-blue-500">$</div> },
    { symbol: 'RARE', value: '-', fiat: '-', icon: <div className="text-2xl font-bold text-black dark:text-white">$</div> },
    { symbol: 'SHIB', value: '-', fiat: '-', icon: <div className="text-2xl font-bold text-orange-500">🐕</div> },
    { symbol: 'DOGE', value: '-', fiat: '-', icon: <div className="text-2xl font-bold text-amber-500">Ð</div> },
  ];

  const columns = [
    {
      name: 'Order ID',
      selector: (row, index) => index + 1,
      sortable: false,
    },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Order Number', selector: row => row.order_number },
    { name: 'Type', selector: row => row.type },
    { name: 'Crypto', selector: row => row.crypto },
    { name: 'Crypto Amount', selector: row => row.crypto_amount },
    { name: 'Flat Amount', selector: row => row.flat_amount },
    { name: 'Price', selector: row => row.price },
    { name: 'Payment Method', selector: row => row.payment_method },
    { name: 'Source', selector: row => row.source },
    { 
      name: 'Status', 
      selector: row => row.status,
      cell: row => (
        <div>
          {row.status.toLowerCase() === 'completed' ? (
            <span className="text-green-500 font-bold">{row.status}</span>
          ) : (
            <span className="text-yellow-500">{row.status}</span>
          )}
        </div>
      )
    },
    {
      name: 'Created At',
      selector: row => new Date(row.created_at).toLocaleString()
    },
    {
      name: 'Match Time',
      selector: row => new Date(row.match_time).toLocaleString()
    },
    {
      name: 'Updated At',
      selector: row => new Date(row.updated_at).toLocaleString()
    },
    {
      name: 'Deleted At',
      selector: row => row.deleted_at ? new Date(row.deleted_at).toLocaleString() : 'N/A'
    }
  ];

  const [orderList, setOrderList] = useState([]);

  const completedRows = orderList.filter(row => row.status.toLowerCase() === 'completed');
  const pendingRows = orderList.filter(row => row.status.toLowerCase() === 'pending');

  useEffect(() => {
    websiteStore.getOrder();
  }, []);

  useEffect(() => {
    const orders = toJS(websiteStore?.data?.order);
    if (Array.isArray(orders)) {
      setOrderList(orders);
    } else {
      setOrderList([]);
    }
  }, [websiteStore?.data?.order]);

  return (
    <div className="orders-container p-6 rounded-lg shadow-sm h-full">
      <h1 className="text-2xl font-bold text-indigo-950 dark:text-white mb-6">My orders</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-slate-800 mb-6">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-6">
            <button
              className={`inline-block py-2 px-1 text-sm font-medium ${activeTab === 'pending'
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              onClick={() => setActiveTab('pending')}
            >
              Pending
            </button>
          </li>
          <li className="mr-6">
            <button
              className={`inline-block py-2 px-1 text-sm font-medium ${activeTab === 'history'
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </li>
          <li>
            <button
              className={`inline-block py-2 px-1 text-sm font-medium ${activeTab === 'profit'
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              onClick={() => setActiveTab('profit')}
            >
              Profit & Loss Statement
            </button>
          </li>
        </ul>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
          <select className="w-full bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-200 py-2 px-3 rounded-md shadow-sm focus:outline-none">
            <option>All assets</option>
            <option>All binance</option>
            <option>All money</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        <div>
          <select className="w-full bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-200 py-2 px-3 rounded-md shadow-sm focus:outline-none">
            <option>All types</option>
            <option>All types money doge crypto</option>
            <option>All types binance money</option>
            <option>All types coins</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        <div>
          <select className="w-full bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-200 py-2 px-3 rounded-md shadow-sm focus:outline-none">
            <option>All status</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        <div>
          <select className="w-full bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-200 py-2 px-3 rounded-md shadow-sm focus:outline-none">
            <option>All currencies</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        <div className="flex items-center md:col-span-5 lg:col-span-1">
          <div className="bg-gray-100 dark:bg-slate-900 py-2 px-3 rounded-md shadow-sm flex items-center w-full">
            <BsCalendar className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">2025-02-28 00:00:00 - 2025-03-28 23:59:59</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-6 flex-wrap gap-4">
        <div className="flex space-x-2">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center gap-2">
            <FaFilter className="text-sm" />
            <span>Filter</span>
          </button>
          <button className="bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-slate-700">
            Reset
          </button>
        </div>

        <div className="flex items-center">
          <div className="mr-2 relative">
            <input
              type="text"
              placeholder="Order number"
              className="bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-200 py-2 pl-9 pr-3 rounded-l-md shadow-sm focus:outline-none w-40"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BiSearch className="text-gray-400" />
            </div>
          </div>
          <button className="bg-amber-500 text-white px-3 py-2 rounded-r-md">
            Paste
          </button>

          <div className="ml-4 relative">
            <select className="bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-200 py-2 pl-3 pr-8 rounded-md shadow-sm focus:outline-none">
              <option>Order number</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Crypto Summary */}
      {activeTab === 'history' && (
        <div className="index-containero p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={scrollLeft}
              className="p-1 mr-1 rounded-full bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300"
            >
              <IoIosArrowBack />
            </button>

            <div
              className="flex items-center overflow-x-auto space-x-16 pb-2 crypto-slider"
              ref={sliderRef}
            >
              {cryptoData.map((crypto, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-800 mb-2">
                    {crypto.icon}
                  </div>
                  <div className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    {crypto.symbol}
                  </div>
                  <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {crypto.value}
                  </div>
                  <div className="text-xs text-gray-600">{crypto.fiat}</div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="p-1 rounded-full bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300"
            >
              <IoIosArrowForward />
            </button>
          </div>
          <div className="flex justify-end">
            <span className="text-xs text-gray-500">
              *Only completed orders are included in the calculation.
            </span>
          </div>
        </div>
      )}

      {/* Alert banner */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 px-4 py-3 rounded-md mb-6 flex items-center">
        <BsInfoCircleFill className="text-amber-500 mr-2 flex-shrink-0" />
        <p className="text-sm">Only maker's orders are shown on Merchant Portal. To check all orders, please visit the Binance app or website.</p>
      </div>

      {/* Data Table for each tab */}
      {activeTab === 'history' && (
        <DataTable
          title="Order History"
          columns={columns}
          data={completedRows}
          pagination
          highlightOnHover
          responsive
          pointerOnHover
          customStyles={customStyles}
        />
      )}

      {activeTab === 'pending' && (
        <DataTable
          title="Pending Orders"
          columns={columns}
          data={pendingRows}
          pagination
          highlightOnHover
          responsive
          pointerOnHover
          customStyles={customStyles}
        />
      )}
    </div>
  );
});

export default Orders;
