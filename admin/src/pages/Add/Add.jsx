import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import "./Add.css";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("Image", image);

      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-container animate-fade-in">
      <header className="page-header">
        <h1 className="page-title">Add New Dish</h1>
        <p className="page-subtitle">Add a scrumptious meal to your menu</p>
      </header>

      <form onSubmit={onSubmitHandler} className="add-form-card">
        <div className="form-section">
          <label className="form-label">Product Image</label>
          <label htmlFor="image" className="image-upload-wrapper">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="preview-img"
              />
            ) : (
              <>
                <img className="upload-icon" src={assets.upload_area || assets.ori} alt="Upload" />
                <p className="text-muted">Click or drag to upload image</p>
              </>
            )}
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="form-section">
          <label className="form-label" htmlFor="name">Product Name</label>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            id="name"
            placeholder="e.g. Delicious Pasta"
            className="input-field"
            required
          />
        </div>

        <div className="form-section">
          <label className="form-label" htmlFor="description">Product Description</label>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            id="description"
            rows="4"
            placeholder="Tell us more about the dish..."
            className="textarea-field"
            required
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-section">
            <label className="form-label" htmlFor="category">Product Category</label>
            <select
              name="category"
              id="category"
              onChange={onChangeHandler}
              value={data.category}
              className="select-field"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="form-section">
            <label className="form-label" htmlFor="price">Product Price (₹)</label>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              id="price"
              placeholder="e.g. 150"
              className="input-field"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Add;


