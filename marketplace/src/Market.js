import React, { useState, Suspense, useEffect } from 'react';
import { findProducts, findUsers,deleteProductById } from './FirebaseServer';
import './App.css';

const Connect = React.lazy(() => import('./Connect'));
const NewProduct = React.lazy(() => import('./NewProduct'));
const EditProduct = React.lazy(() => import('./EditProduct'));

function Market({ user }) {
  const [showComponentConnect, setShowComponentConnect] = useState(false);
  const [responseConnect, setResponseConnect] = useState(null);
  const [responseUser2, setResponseUser2] = useState(null);
  const [responseProduct, setResponseProduct] = useState(null);
  const [showComponentNewProduct, setShowComponentNewProduct] = useState(false);
  const [responseNewProduct, setResponseNewProduct] = useState(null);
  const [showComponentEditProduct, setShowComponentEditProduct] = useState(false);
  const [responseEditProduct, setResponseEditProduct] = useState(null);
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
    setResponseConnect(user);
    setShowComponentConnect(true); 
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
    const goEdit=(p)=>{
      setResponseEditProduct(p);
      setShowComponentEditProduct(true);
    };
    const deleteProduct = async (productID) => {
      try {
        console.log("product productID: "+productID);
        await deleteProductById({productID: productID});
        alert("Product deleted");
      } catch (error) {
        console.error("Error deleting product: ", error.message);
          alert("Failed to delete product. Please try again.");
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
        {showComponentNewProduct && (
          <NewProduct
            user={responseNewProduct}
            setShowComponentNewProduct={setShowComponentNewProduct}
          />
        )}
        {showComponentEditProduct && (
          <EditProduct
            product={responseEditProduct}
            setShowComponentEditProduct={setShowComponentEditProduct}
          />
        )}
      </Suspense>

      <button
  className="btn btn-success"
  onClick={goNewProduct}
  style={{
    padding: "10px 20px",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: "600",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
    marginBottom: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }}
>
  Add New Product
</button>

<div style={{ display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center" }}>
  {products.map((p, index) => (
    <div key={index} className="card" style={{
      width: "calc(20% - 20px)", // Responsive layout: 3 items per row
      borderRadius: "10px", 
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      transition: "transform 0.3s ease"
    }}>
      <img 
  className="card-img-top" 
  src={p.image} 
  alt="" 
  style={{ 
    width: "100%", 
    height: "200px", 
    objectFit: "contain", 
    maxHeight: "200px" 
  }} 
/>

      <div className="card-body" style={{ padding: "20px", backgroundColor: "#fff" }}>
        <h5 className="card-title" style={{ fontWeight: "600", fontSize: "18px", color: "#333" }}>{p.name}</h5>
        <p className="card-text" style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>{p.description}</p>
      </div>

      <ul className="list-group list-group-flush" style={{ borderTop: "1px solid #eee" }}>
        <li className="list-group-item" style={{ fontSize: "14px", padding: "10px" }}><strong>Price:</strong> {p.price}</li>
        <li className="list-group-item" style={{ fontSize: "14px", padding: "10px" }}><strong>Category:</strong> {p.category}</li>
        <li className="list-group-item" style={{ fontSize: "14px", padding: "10px" }}><strong>Stock:</strong> {p.stock} in stock</li>
        <li className="list-group-item" style={{ fontSize: "14px", padding: "10px" }}><strong>Seller:</strong> {p.seller}</li>
      </ul>

      <div className="card-body" style={{ padding: "10px", backgroundColor: "#f8f9fa" }}>
        <button
          onClick={() => goConnect(p)}
          className="btn btn-primary"
          style={{
            padding: "8px 15px",
            fontSize: "14px",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            color: "#fff",
            fontWeight: "600",
            transition: "background-color 0.3s ease"
          }}
        >
          Connect
        </button>

        {p.seller === user.username && (
          <>
            <button
              onClick={() => deleteProduct(p.productID)}
              className="btn btn-danger"
              style={{
                padding: "8px 15px",
                fontSize: "14px",
                backgroundColor: "#dc3545",
                border: "none",
                borderRadius: "5px",
                color: "#fff",
                fontWeight: "600",
                marginLeft: "10px",
                transition: "background-color 0.3s ease"
              }}
            >
              Delete
            </button>

            <button
              onClick={() => goEdit(p)}
              className="btn btn-warning"
              style={{
                padding: "8px 15px",
                fontSize: "14px",
                backgroundColor: "#ffc107",
                border: "none",
                borderRadius: "5px",
                color: "#fff",
                fontWeight: "600",
                marginLeft: "10px",
                transition: "background-color 0.3s ease"
              }}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  ))}
</div>
</div>
  );
}

export default Market;
