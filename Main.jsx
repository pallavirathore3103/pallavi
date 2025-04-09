import React from 'react';

const Main = () => {
  return (
    <div className="container my-4">
      {/* Header */}
      <div className="row mb-3">
        <div className="d-flex justify-content-between">
          <h4>Order Number</h4>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn">Complete Transaction(s)</button>
        </div>
      </div>

      {/* Order Book */}
      <div className="row">

        {/* Ads Quantity */}
        <div className="col-md-6">
          <div className="card order-book">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <p>Pending Orders Number</p>
                  <p>0</p>
                </div>
                <div>
                  <h6>Order History</h6>
                  <p>7</p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary ">Publish</button>
                <button className="btn btn-secondary">Complete Transaction(s)</button>
              </div>
            </div>
          </div>
          <div className="mb-4 d-flex justify-content-between">
          <h4>Ads Quantity</h4>
        </div>
          <div className="card order-book">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6>Ads Online</h6>
                  <p>1</p>
                </div>
                <div>
                  <h6>Ads Offline</h6>
                  <p>0</p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary">Publish</button>
                <button className="btn btn-secondary">Complete Transaction(s)</button>
              </div>
            </div>
          </div>
        </div>


        <div className="col-md-6">
          <div className="card order-book">
            <div className="card-body">
              <h5>Order Book</h5>
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <h6>Best Sell Price:</h6>
                  <span className="text-danger best-price">₹ 95.86</span>
                </div>
                <div>
                  <h6>Best Buy Price:</h6>
                  <span className="text-success best-price">₹ 85.46</span>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary">Refresh</button>
                <div>
                  <select className="form-select">
                    <option>All Ads</option>
                    <option>USDT</option>
                    <option>HMSTR</option>
                    <option>BTC</option>
                    <option>USDC</option>
                    <option>FDUSD</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div>
                <span>Fiat Price (INR)</span>
              </div>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                  ₹ 95.86
                  <span>21,000</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  ₹ 95.69
                  <span>19,000</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  ₹ 95.27
                  <span>50,000</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  ₹ 95.26
                  <span>50,000</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  ₹ 95.21
                  <span>20,000</span>
                </li>
              </ul>
            </div>
          </div>

        </div>


      </div>

    </div>
  );
};

export default Main;
