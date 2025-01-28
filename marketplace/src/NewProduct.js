import React, { useState } from 'react';
import './App.css';
import { addProduct } from './FirebaseServer';

function NewProduct({ user, setShowComponentNewProduct }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [loading, setLoading] = useState(false);
    
    const close = () =>{
      setShowComponentNewProduct(false);
    };


    const validateInputs = () => {
        if (!name || !price || !description || !stock) {
          alert("All fields are required.");
          return false;
        }
        if (price < 1) {
          alert("Price must be bigger than 0.");
          return false;
        }
        return true;
      };

    const createProduct = async () => {
        if (!validateInputs()) return;
    
        setLoading(true);
        const product = {
          name: name.trim(),
          price: parseFloat(price.trim()),
          description: description.trim(),
          stock: parseInt(stock.trim()),
          seller: user.username
        };
    
        
        await handleSubmit(product);
    
        setLoading(false);
        
      };

      const handleSubmit = async (product) => {
          try {
            await addProduct(product);
            alert("Product added successfully!");
            setShowComponentNewProduct(false);
          } catch (error) {
            console.error("Error adding product: ", error.message);
            alert("Failed to add product. Please try again.");
          }
        };


    return (
      <div style={{ backgroundColor:"gray"}}>
  <button class="btn btn-info close" onClick={close}>X</button>
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh", flexDirection: "column" }}>
      
    <h2> Enter details of product to sell</h2>
    <div style={{ width: "50%", textAlign: "center" }}>
    <div className="container">
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="form-control"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="form-control"
              type="number"
              placeholder="How many in stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <button type="button" onClick={createProduct} className="btn btn-secondary" disabled={loading}>
              {loading ? "Submitting..." : "Submit New Product"}
            </button>
          </div>
  </div>
  </div>
  </div>
      
    );
  }
  
  export default NewProduct; 
  