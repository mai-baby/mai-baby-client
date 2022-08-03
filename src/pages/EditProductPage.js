import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; //  <== IMPORT

function EditProductPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { productId } = useParams(); //  // Get the URL parameter `:productId`
  const navigate = useNavigate();

  // This effect will run after the initial render and each time
  // the product id coming from URL parameter `productId` changes

  useEffect(() => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        /* 
                  We update the state with the product data coming from the response.
                  This way we set inputs to show the actual title and description of the product
                */
        const oneProduct = response.data;
        setTitle(oneProduct.title);
        setDescription(oneProduct.description);
      })
      .catch((error) => console.log(error));
  }, [productId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, description };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Make a PUT request to update the product
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/products/${productId}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        // Once the request is resolved successfully and the product
        // is updated we navigate back to the details page
        navigate(`/products/${productId}`);
      });
  };

  return (
    <div className="EditProductPage">
      <h3>Edit the Product</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProductPage;
