// Function to get product details by ID and display them in HTML
async function displayProductDetails(id) {
    try {
      // Fetch the JSON file
      const response = await fetch('shoes.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the JSON file
      const products = await response.json();
  
      // Find the product with the given ID
      const product = products.find(item => item.id === id);
  
      // Get the HTML container for product details
      const productDetailsDiv = document.getElementById('product-details');
  
      // Display product details or an error message
      if (product) {
        productDetailsDiv.innerHTML = `
          <p><strong>ID:</strong> ${product.id}</p>
          <p><strong>Name:</strong> ${product.name}</p>
          <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        `;
      } else {
        productDetailsDiv.innerHTML = `<p>Product with ID ${id} not found.</p>`;
      }
    } catch (error) {
      console.error('Error fetching or processing JSON file:', error);
    }
  }
  
  // Example: Display product details for product with ID 2
  displayProductDetails(1);
  