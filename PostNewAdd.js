import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';

// Set the app element for accessibility (adjust the selector if needed)
Modal.setAppElement('#root');

const PostNewAds = () => {
    const navigate = useNavigate();

    // Add modal state for Payment Method selection
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Existing states for Price & Quantity section
    const [activeTab, setActiveTab] = useState('fixed');
    const [fixedPrice, setFixedPrice] = useState(85.5);
    const [marketPrice, setMarketPrice] = useState(85.5);
    const [floatingMargin, setFloatingMargin] = useState(100);
    const [targetQuantity, setTargetQuantity] = useState(0);

    const floatingPrice = marketPrice * (floatingMargin / 100);
    const targetQuantityInINR = floatingPrice * targetQuantity;

    const initialValues = {
        authType: "FIDO2",
        autoReplyMsg: "string",
        buyerBtcPositionLimit: 0,
        buyerKycLimit: 0,
        buyerRegDaysLimit: 0,
        classify: "string",
        code: "string",
        emailVerifyCode: "string",
        fiatUnit: "string",
        googleVerifyCode: "string",
        initAmount: 0,
        maxSingleTransAmount: 0,
        minSingleTransAmount: 0,
        mobileVerifyCode: "string",
        onlineDelayTime: 0,
        onlineNow: true,
        payTimeLimit: 0,
        price: 0,
        priceFloatingRatio: 0,
        priceType: 0,
        rateFloatingRatio: 0,
        remarks: "string",
        saveAsTemplate: 0,
        takerAdditionalKycRequired: 0,
        templateName: "string",
        tradeMethods: [
            {
                identifier: "string",
                payId: 0,
                payType: "string"
            }
        ],
        tradeType: "string",
        userAllTradeCountMax: 0,
        userAllTradeCountMin: 0,
        userBuyTradeCountMax: 0,
        userBuyTradeCountMin: 0,
        userSellTradeCountMax: 0,
        userSellTradeCountMin: 0,
        userTradeCompleteCountMin: 0,
        userTradeCompleteRateFilterTime: 0,
        userTradeCompleteRateMin: 0,
        userTradeCountFilterTime: 0,
        userTradeType: 0,
        userTradeVolumeAsset: "string",
        userTradeVolumeFilterTime: 0,
        userTradeVolumeMax: 0,
        userTradeVolumeMin: 0,
        yubikeyVerifyCode: "string",
        adType: "buy",
        cashCurrency: 'SHIB',
        paymentMethod: '',
        paymentTimelimit: ''
    };

    const validationSchema = Yup.object({
        paymentMethod: Yup.string().required('Please select a payment method'),
        paymentTimelimit: Yup.string().required('Please select a payment timelimit')
    });

    // Example payment methods – update the list as needed
    const paymentMethods = [
        { id: 'credit_card', name: 'Credit Card' },
        { id: 'paypal', name: 'PayPal' },
        { id: 'bank_transfer', name: 'Bank Transfer' },
    ];

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-secondary-500 text-2xl font-bold">Post Normal Ads</h1>
                <button
                    onClick={() => navigate('/advertisement')}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                    My Ads
                </button>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('Submitted values:', values);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-lg  font-semibold">Select Ad Type</label>
                                <div role="group" className="flex space-x-6">
                                    <label className="flex items-center space-x-2">
                                        <Field type="radio" name="adType" value="buy" className="text-blue-500" />
                                        <span className="text-gray-700">Buy</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <Field type="radio" name="adType" value="sell" className="text-blue-500" />
                                        <span className="text-gray-700">Sell</span>
                                    </label>
                                </div>
                                <ErrorMessage name="adType" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Cash Currency Selection */}
                            <div className="space-y-2">
                                <label className="text-lg font-semibold">Select Cash Currency</label>
                                <div role="group" className="grid grid-cols-4 gap-4">
                                    {[
                                        'USDT', 'BTC', 'BNB', 'ETH', 'TRX', 'SHIB', 'XRP', 'SOL', 'FDUSD',
                                        'USDC', 'TON', 'HMSTR', 'DOGE', 'PEPE', 'TRUMP', 'TST', 'CHEEMS'
                                    ].map((currency) => (
                                        <label key={currency} className="flex items-center space-x-2">
                                            <Field type="radio" name="authType" value={currency} className="text-blue-500" />
                                            <span>{currency}</span>
                                        </label>
                                    ))}
                                </div>
                                <ErrorMessage name="authType" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-lg font-semibold">Select Cash Currency 2</label>
                                <div role="group" className="grid grid-cols-4 gap-4">
                                    {[
                                        'INR',
                                    ].map((currency) => (
                                        <label key={currency} className="flex items-center space-x-2">
                                            <Field type="radio" name="cashCurrency" value={currency} className="text-blue-500" />
                                            {currency}
                                        </label>
                                    ))}
                                </div>
                                <ErrorMessage name="cashCurrency" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Price & Quantity Section */}
                            <div className="border-t pt-6">
                                <h2 className="text-xl font-semibold">Price & Quantity</h2>
                                <div className="flex space-x-4 mb-4">
                                    <button
                                        type="button"
                                        className={`tab-button ${activeTab === 'fixed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                        onClick={() => setActiveTab('fixed')}
                                    >
                                        Fixed Price
                                    </button>
                                    <button
                                        type="button"
                                        className={`tab-button ${activeTab === 'floating' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                        onClick={() => setActiveTab('floating')}
                                    >
                                        Floating Price
                                    </button>
                                </div>

                                {activeTab === 'fixed' && (
                                    <div>
                                        <label className="block text-gray-700">Fixed Price</label>
                                        <input
                                            type="number"
                                            id="fixedPrice"
                                            className="w-full p-2 border text-secondary rounded-md"
                                            value={fixedPrice}
                                            onChange={(e) => setFixedPrice(Number(e.target.value))}
                                        />
                                        <p className="text-gray-500 text-sm mt-2">This is the exact price you want to set for each unit.</p>

                                        <label className="block text-gray-700 mt-4">Target Quantity</label>
                                        <input
                                            type="number"
                                            id="targetQuantity"
                                            className="w-full p-2 border rounded-md text-secondary"
                                            value={targetQuantity}
                                            onChange={(e) => setTargetQuantity(Number(e.target.value))}
                                        />
                                        <p className="text-gray-500 text-sm mt-2">Trading quantity must fall within the range of 0.0001 - 200.</p>

                                        <p className="text-xl mt-4">
                                            <strong>BTC to INR:</strong> {targetQuantity} BTC → ₹
                                            {targetQuantityInINR.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </p>
                                    </div>
                                )}

                                {activeTab === 'floating' && (
                                    <div>
                                        <label className="block text-gray-700">Floating Price Margin (%)</label>
                                        <input
                                            type="number"
                                            id="floatingMargin"
                                            className="w-full p-2 border text-secondary rounded-md"
                                            value={floatingMargin}
                                            onChange={(e) => setFloatingMargin(Number(e.target.value))}
                                        />
                                        <p className="text-gray-500 text-sm mt-2">Floating Price must fall within the range of 100% - 110%.</p>

                                        <div className="mt-4">
                                            <p><strong>Floating Price = Market Price × Floating Price Margin</strong></p>
                                            <p>Market Price: ₹{marketPrice.toLocaleString()}</p>
                                            <p>Floating Margin: {floatingMargin}%</p>
                                            <p><strong>Result:</strong> ₹{marketPrice} × {floatingMargin}% = ₹{floatingPrice.toFixed(2)}</p>
                                        </div>

                                        <label className="block text-gray-700 mt-4">Target Quantity</label>
                                        <input
                                            type="number"
                                            id="targetQuantity"
                                            className="w-full text-secondary p-2 border rounded-md"
                                            value={targetQuantity}
                                            onChange={(e) => setTargetQuantity(Number(e.target.value))}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Payment Method Section (Added after Floating Price option) */}
                            <div className="mt-6">
                                <label className="block text-lg font-semibold">Payment Method</label>

                                <label className="text-dark text-m mt-3 mb-2">Payment Method</label>
                                <div className="relative text-secondary">
                                    <Field
                                        type="text"
                                        name="paymentMethod"
                                        readOnly
                                        placeholder="Select Payment Method"
                                        className="w-full p-2 border text-secondary rounded-md cursor-pointer bg-gray-100"
                                        onClick={() => setIsModalOpen(true)}
                                        value={values.paymentMethod}
                                    />

                                </div>
                               
                                <div className="mt-6">
                                
                                <label className="text-dark text-m mt-3 mb-2">Payment Timelimit</label>
                                    <Field as="select" name="paymentTimelimit" className="w-full text-secondary p-2 border rounded-md">
                                        <option value="">Select Payment Timelimit</option>
                                        <option value="15">15 Minutes</option>
                                        <option value="30">30 Minutes</option>
                                        <option value="45">45 Minutes</option>
                                        <option value="60">60 Minutes</option>
                                    </Field>
                                    <ErrorMessage name="paymentTimelimit" component="div" className="text-red-500 text-sm" />
                                </div>



                                <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Auto Reply Msg Section */}
                            <div className="mt-6">
                                <label className="block text-lg font-semibold">Auto Reply Msg</label>
                                <Field as="textarea" name="autoReplyMsg" className="w-full p-2 border rounded-md" />
                                <ErrorMessage name="autoReplyMsg" component="div" className="text-red-500 text-sm" />
                            </div>

                            <button type="submit" className="mt-6 w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                Submit
                            </button>
                        </div>

                        {/* Modal for Payment Method Selection */}
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={() => setIsModalOpen(false)}
                            contentLabel="Select Payment Method"
                            className="bg-white p-6 max-w-md mx-auto my-20 rounded shadow-lg outline-none"
                            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        >
                            <h2 className="text-xl text-secondary font-semibold mb-4">Select Payment Method</h2>
                            <ul>
                                {paymentMethods.map(method => (
                                    <li key={method.id} className="mb-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFieldValue('paymentMethod', method.name);
                                                setIsModalOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
                                        >
                                            {method.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 text-right">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-600 hover:underline"
                                >
                                    Cancel
                                </button>
                            </div>
                        </Modal>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PostNewAds;
