import React, { useState, Suspense } from 'react';
import './App.css';

const Connect = React.lazy(() => import('./Connect'));

function Market({ user }) {
  const [showComponentConnect, setShowComponentConnect] = useState(false);
  const [responseConnect, setResponseConnect] = useState(null);
  const [responseUser2, setResponseUser2] = useState(null);
  const [responseProduct, setResponseProduct] = useState(null);

  const goConnect = (id) => {
    setResponseConnect(user); // Save user details to be sent to Connect
    setShowComponentConnect(true); // Show Connect component
    const user2 = {
      username: 'otheruser',
      password: 'otheruserpassword',
      email: 'aa@gmail.com',
      phone: '0974445876',
    };
    const newuser = {
      username: 'newuser',
      password: 'otheruserpassword',
      email: 'sdfsd@gmail.com',
      phone: '045656757',
    };
    const product = {
      name: 'wow',
    };
    const newproduct = {
      name: 'rgdsfg',
    };
    if (id === 1) {
      setResponseUser2(user2);
      setResponseProduct(product);
    }
    if (id === 2) {
      setResponseUser2(newuser);
      setResponseProduct(newproduct);
    }
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {showComponentConnect && (
          <Connect
            user={responseConnect}
            user2={responseUser2}
            product={responseProduct}
            setShowComponentConnect={setShowComponentConnect}
          />
        )}
      </Suspense>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div className="card" style={{ width: '20%' }}>
          <img
            src="https://icons.getbootstrap.com/assets/img/icons-hero@2x.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Product Name</h5>
            <p className="card-text">Description</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Cost</li>
            <li className="list-group-item">Category</li>
            <li className="list-group-item">How many in stock</li>
            <li className="list-group-item">Seller username</li>
          </ul>
          <div className="card-body">
            <button onClick={() => goConnect(1)} className="card-link">
              Connect
            </button>
          </div>
        </div>
        <div className="card" style={{ width: '20%' }}>
          <img
            src="https://icons.getbootstrap.com/assets/img/icons-hero@2x.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Product Name</h5>
            <p className="card-text">Description</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Cost</li>
            <li className="list-group-item">Category</li>
            <li className="list-group-item">How many in stock</li>
            <li className="list-group-item">Seller username</li>
          </ul>
          <div className="card-body">
            <button onClick={() => goConnect(2)} className="card-link">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Market;
