import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from './Context/Authcontext';
import api from './Api.config';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { state } = useContext(Authcontext);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Add search term state
  const productsPerPage = 4;
  const router = useNavigate();

  useEffect(() => {
    async function getProducts() {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await api.get("/all-products", { token });
      if (response.data.success) {
        setAllProducts(response.data.Product);
      }
    }
    getProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Filter products based on the search term
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <div>
      <div>Welcome: {state?.user?.name}</div>
      <div id='main'>
        <h2>All products</h2>

        <div id='search-section'>
          {/* Add a search input */}
          <input id='search'
            type="text"
            placeholder="Search products"
          
            onChange={handleSearchChange}
          />
        </div>

        {currentProducts.length ? (
          <div>
            {currentProducts.map((product) => (
              <div onClick={() => router(`/single-products/${product._id}`)} key={product._id}>
                <div id='img-div'>
                  <img src={product.image} alt={product.name} />
                </div>
                <p>{product.name}</p>
                <p>{product.price} ₹</p>
              </div>
            ))}
          </div>
        ) : (
          <div>No Products found!</div>
        )}

        <div className="pagination">
          <button onClick={prevPage}>Previous Page</button>
          <button onClick={nextPage}>Next Page</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
