console.clear();

let contentTitle;
let mainContainer = document.getElementById("containerClothing");
document.getElementById('searchButton').addEventListener('click', function () {
  const query = document.getElementById('input').value.trim(); // Get the input value
  if (query) { // Check if the input is not empty
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
  } else {
      alert('Please enter a search query!'); // Optional: Prompt user to enter something
  }
});
document.getElementById('input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      const query = event.target.value.trim(); // Ensure no extra spaces
      if (query) { // Check if the input is not empty
          window.location.href = `search.html?query=${encodeURIComponent(query)}`;
      }
  }
});
document.getElementById('nikeCategory').addEventListener('click', function () {
  const query = "Nike"; // Get the input value
  if (query) { // Check if the input is not empty
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
  } else {
      alert('Please enter a search query!'); // Optional: Prompt user to enter something
  }
});
document.getElementById('adidasCategory').addEventListener('click', function () {
  const query = "Adidas"; // Get the input value
  if (query) { // Check if the input is not empty
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
  } else {
      alert('Please enter a search query!'); // Optional: Prompt user to enter something
  }
});
console.log(document.cookie);

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "/contentDetails.html?" + ob.id; // Redirects to contentDetails.html with product ID

  let imgTag = document.createElement("img");
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode((ob.price) + "$");
  h2.appendChild(h2Text);

  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  

  if (ob.discount && ob.discount !== "0%") {
    let discountPercentage = parseFloat(ob.discount) / 100;
    let discountedPrice = ob.price - (ob.price * discountPercentage);
    let discountPrice = document.createElement("h2");
    discountPrice.style.color = "red";
    let discountText = document.createTextNode(discountedPrice.toFixed(2) + "$");
    discountPrice.appendChild(discountText);
    detailsDiv.appendChild(discountPrice);
  } else {
    detailsDiv.appendChild(h2);
  }

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);

  return boxDiv;
}

// Fetch products from local JSON file
fetch('products.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    contentTitle = data;

    if (document.cookie.indexOf(",counter=") >= 0) {
      var counter = document.cookie.split(",")[1].split("=")[1];
      document.getElementById("badge").innerHTML = counter;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    // Filter products based on search query
    const filteredProducts = contentTitle.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) || 
      product.brand.toLowerCase().includes(query.toLowerCase())
    );

    // Render filtered products
    for (let i = 0; i < filteredProducts.length; i++) {
      console.log(filteredProducts[i]);
      mainContainer.appendChild(dynamicClothingSection(filteredProducts[i]));
    }
  })
  .catch(error => {
    console.error('Error fetching the JSON file:', error);
  });