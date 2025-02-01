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

                  <button type="button" onClick={editProduct} className="btn btn-secondary" disabled={loading}>
                    {loading ? "Editing..." : "Edit Product"}
                  </button>
                </div>
        </div>
        </div>
        </div>
    );
    

}
export default EditProduct;
