import React, { useState } from 'react';
import './App.css';
import { addProduct } from './FirebaseServer';
const { v4: uuidv4 } = require('uuid');
function NewProduct({ user, setShowComponentNewProduct }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Convert image to Base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64String = reader.result;
          setImageUrl(base64String);
        };
      }
    };
    const close = () =>{
      setShowComponentNewProduct(false);
    };


    const validateInputs = () => {
        if (!name || !price || !description || !stock || !category||!imageUrl) {
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
          category: category,
          stock: parseInt(stock.trim()),
          seller: user.username,
          productID: uuidv4(),
          image:imageUrl,
        };
        console.log(product);
        
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
<div style={{ backgroundColor: "#f7f7f7", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
  <button
    className="btn btn-danger close"
    onClick={close}
    style={{ position: "absolute", top: "20px", right: "20px", fontSize: "18px", backgroundColor: "#dc3545", border: "none", borderRadius: "50%" }}
  >
    X
  </button>

  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "40px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
    <h2 style={{ color: "#333", fontWeight: "600", marginBottom: "20px" }}>
      Enter details of product to sell
    </h2>

    <div style={{ width: "70%", textAlign: "center" }}>
      <div className="container">
        <input
          className="form-control"
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "15px", padding: "10px", fontSize: "16px" }}
        />

        <input
          className="form-control"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginBottom: "15px", padding: "10px", fontSize: "16px" }}
        />

        <input
          className="form-control"
          type="text"
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: "15px", padding: "10px", fontSize: "16px" }}
        />

        <select
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginBottom: "15px", padding: "10px", fontSize: "16px" }}
        >
          <option value="" disabled>Choose a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Home">Home</option>
          <option value="Clothing">Clothing</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Toys">Toys</option>
        </select>

        <input
          className="form-control"
          type="number"
          placeholder="How many in stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={{ marginBottom: "15px", padding: "10px", fontSize: "16px" }}
        />

        <input
          className="form-control"
          type="file"
          onChange={handleImageUpload}
          style={{ marginBottom: "20px", padding: "10px" }}
        />

        <button
          type="button"
          onClick={createProduct}
          className="btn btn-primary"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          {loading ? "Submitting..." : "Submit New Product"}
        </button>
      </div>
    </div>
  </div>
</div>


      
    );
  }
  
  export default NewProduct; 
  