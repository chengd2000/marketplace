import React, { useState } from 'react';
import './App.css';
import { updateProduct } from './FirebaseServer';
function EditProduct({ product, setShowComponentEditProduct }) {
     const [name, setName] = useState(product.name);
        const [price, setPrice] = useState(product.price);
        const [description, setDescription] = useState(product.description);
        const [stock, setStock] = useState(product.stock);
        const [category, setCategory] = useState(product.category);
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
            setShowComponentEditProduct(false);
          };
          const validateInputs = () => {
            if (!name || !price || !description || !stock || !category) {
              alert("All fields are required.");
              return false;
            }
            if (price < 1) {
              alert("Price must be bigger than 0.");
              return false;
            }
            return true;
          };
          const editProduct = async () => {
            if (!validateInputs()) return;
        
            setLoading(true);
            let updatedProduct = {
              name: name.trim(),
              price: parseFloat(price),
              description: description.trim(),
              category: category,
              stock: parseInt(stock),
            };
            if(imageUrl){
            updatedProduct = {
                name: name.trim(),
                price: parseFloat(price),
                description: description.trim(),
                category: category,
                stock: parseInt(stock),
                image:imageUrl
              };}
            console.log(updatedProduct);
            
            await handleSubmit(product.productID,updatedProduct);
        
            setLoading(false);
          };
          const handleSubmit = async (id,updatedProduct) => {
                    try {
                      await updateProduct({ productID: id},updatedProduct);
                      alert("Product updated successfully!");
                      setShowComponentEditProduct(false);
                    } catch (error) {
                      console.error("Error editing product: ", error.message);
                      alert("Failed to edit product. Please try again.");
                    }
                  };
    return(
      <div style={{ backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
      <button
        className="btn btn-danger close"
        onClick={close}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "18px",
          backgroundColor: "#dc3545",
          border: "none",
          borderRadius: "50%",
          color: "#fff"
        }}
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
              style={{ marginBottom: "15px", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
    
            <input
              className="form-control"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ marginBottom: "15px", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
    
            <input
              className="form-control"
              type="text"
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginBottom: "15px", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
    
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ marginBottom: "15px", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
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
              style={{ marginBottom: "15px", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
    
            <input
              className="form-control"
              type="file"
              onChange={handleImageUpload}
              style={{ marginBottom: "20px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
    
            <button
              type="button"
              onClick={editProduct}
              className="btn btn-primary"
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                border: "none",
                borderRadius: "5px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "16px",
                transition: "background-color 0.3s ease",
              }}
            >
              {loading ? "Editing..." : "Edit Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    );
    

}
export default EditProduct;
