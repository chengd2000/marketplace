import React, { useState, Suspense } from 'react';
import './App.css';

const Connect = React.lazy(() => import('./Connect'));

function Market({ user }) {
  const [showComponentConnect, setShowComponentConnect] = useState(false);
  const [responseConnect, setResponseConnect] = useState(null);
  const [responseUser2, setResponseUser2] = useState(null);
  const [responseProduct, setResponseProduct] = useState(null);

  const goConnect = () => {
    setResponseConnect(user); // שמירת פרטי המשתמש שנשלחים ל-Connect
    setShowComponentConnect(true); // הצגת רכיב ה-Connect
    const user2 = {
      username: "otheruser",
      password: "otheruserpassword",
      email: "aa@gmail.com",
      phone: "0974445876"
    };
    const product = {
      name: "wow"
      
    };
    setResponseUser2(user2);
    setResponseProduct(product);
  };

  return (
    <div>
      {!showComponentConnect ? ( // הצגת Market רק אם Connect לא מוצג
        <div className="card" style={{ width: "20%" }}>
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
            <li className="list-group-item">How many in stock</li>
            <li className="list-group-item">Seller username</li>
          </ul>
          <div className="card-body">
            <button onClick={goConnect} className="card-link">
              Connect
            </button>
          </div>
        </div>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Connect user={responseConnect} user2={responseUser2} product={responseProduct}/>
        </Suspense>
      )}
    </div>
  );
}

export default Market;
