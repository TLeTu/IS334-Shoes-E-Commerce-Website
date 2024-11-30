console.clear();

let contentTitle;
let mainContainer = document.getElementById("containerClothing");

console.log(document.cookie);

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


  let h2 = document.createElement("h3");
  let h2Text = document.createTextNode((parseFloat(ob.price).toLocaleString('vi-VN')) + "đ");
  h2.appendChild(h2Text);
  
  detailsDiv.appendChild(h3);

  
  let priceContainer = document.createElement("div");
  priceContainer.style.display = "flex";
  priceContainer.style.alignItems = "center";
  
  priceContainer.appendChild(h2);
  
  if (ob.discount && ob.discount !== "0%") {
    h2.style.textDecoration = "line-through";
    h2.style.marginRight = "10px"; // Add some space between the prices
    let discountPercentage = parseFloat(ob.discount) / 100;
    let discountedPrice = ob.price - (ob.price * discountPercentage);
    let discountPrice = document.createElement("h3");
    discountPrice.style.color = "red";
    let discountText = document.createTextNode(discountedPrice.toLocaleString('vi-VN') + "đ");
    discountPrice.appendChild(discountText);
    priceContainer.appendChild(discountPrice);
  }
  
  detailsDiv.appendChild(priceContainer);
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

    // Render all products
    for (let i = 0; i < contentTitle.length; i++) {
      console.log(contentTitle[i]);
      mainContainer.appendChild(dynamicClothingSection(contentTitle[i]));
    }
  })
  .catch(error => {
    console.error('Error fetching the JSON file:', error);
  });