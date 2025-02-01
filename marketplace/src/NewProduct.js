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
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled> choose a category</option>
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
            />
            <input className="form-control" type="file" onChange={handleImageUpload} />

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
  