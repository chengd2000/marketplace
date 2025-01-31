import React, { useState, Suspense, useEffect } from 'react';
import { findProducts, findUsers } from './FirebaseServer';
import './App.css';

const Connect = React.lazy(() => import('./Connect'));
const NewProduct = React.lazy(() => import('./NewProduct'));

function Market({ user }) {
  const [showComponentConnect, setShowComponentConnect] = useState(false);
  const [responseConnect, setResponseConnect] = useState(null);
  const [responseUser2, setResponseUser2] = useState(null);
  const [responseProduct, setResponseProduct] = useState(null);
  const [showComponentNewProduct, setShowComponentNewProduct] = useState(false);
  const [responseNewProduct, setResponseNewProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
      const fetchProducts = async () => {
        const fetchedProducts = await findProducts([]);
        // fetchedProducts.sort((a, b) => a.date.seconds - b.date.seconds);
    
        const userPromises = fetchedProducts.flatMap(product => [
          findUsers({ username: product.seller })
        ]);
    
        const otherUsers = (await Promise.all(userPromises)).filter(user => user != null);
        const uniqueOtherUsers = Array.from(new Set(otherUsers.map(user => JSON.stringify(user)))).map(user => JSON.parse(user));
        
        setUsers(uniqueOtherUsers);
        setProducts(fetchedProducts);
      };
    
      fetchProducts();
    });
  

  const goConnect = (product) => {
    setResponseConnect(user); // Save user details to be sent to Connect
    setShowComponentConnect(true); // Show Connect component
    // const user2 = {
    //   username: 'otheruser',
    //   password: 'otheruserpassword',
    //   email: 'aa@gmail.com',
    //   phone: '0974445876',
    // };
    // const newuser = {
    //   username: 'newuser',
    //   password: 'otheruserpassword',
    //   email: 'sdfsd@gmail.com',
    //   phone: '045656757',
    // };
    // const product = {
    //   name: 'wow',
    // };
    // const anotherproduct = {
    //   name: 'rgdsfg',
    // };

      let user2 = {};
      for(var i = 0; i < users.length; i++){
        if(users[i].username == product.seller){
          console.log(users[i]);
          user2 = users[i];
          console.log(user2);

        }
      }
      setResponseUser2(user2);
      setResponseProduct(product);
    
    
  };

  const goNewProduct = () => {
    setResponseNewProduct(user);
    setShowComponentNewProduct(true);
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
        {showComponentNewProduct && (
          <NewProduct
            user={responseNewProduct}
            setShowComponentNewProduct={setShowComponentNewProduct}
          />
        )}
      </Suspense>

      <button className="btn btn-primary" onClick={goNewProduct}>
        Add New Product
      </button>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {products.map((p, index) => (
          <div key={index} className="card" style={{ width: "20%" }}>
            <img
              src="https://icons.getbootstrap.com/assets/img/icons-hero@2x.png"
              className="card-img-top"
              alt="Product"
            />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">{p.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{p.price}</li>
              <li className="list-group-item">{p.category}</li>
              <li className="list-group-item">{p.stock} in stock</li>
              <li className="list-group-item">Seller: {p.seller}</li>
            </ul>
            <div className="card-body">
              <button onClick={() => goConnect(p)} className="btn btn-link">
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Market;
