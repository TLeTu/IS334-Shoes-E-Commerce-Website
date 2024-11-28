console.clear();

let id = location.search.split('?')[1];
console.log("Product ID:", id);
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
// Update badge if the counter exists in cookies
if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

// Function to dynamically create the product details section
function dynamicContentDetails(ob) {
    let mainContainer = document.createElement('div');
    mainContainer.id = 'containerD';
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div');
    imageSectionDiv.id = 'imageSection';

    let imgTag = document.createElement('img');
    imgTag.id = 'imgDetails';
    imgTag.src = ob.preview;

    imageSectionDiv.appendChild(imgTag);

    let productDetailsDiv = document.createElement('div');
    productDetailsDiv.id = 'productDetails';

    let h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode(ob.name));

    let h4 = document.createElement('h4');
    h4.appendChild(document.createTextNode(ob.brand));

    let detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';

    let h3DetailsDiv = document.createElement('h3');
    h3DetailsDiv.appendChild(document.createTextNode(ob.price + "$"));

    if (ob.discount && ob.discount !== "0%") {
        h3DetailsDiv.style.textDecoration = "line-through";
        let discountPercentage = parseFloat(ob.discount) / 100;
        let discountedPrice = ob.price - (ob.price * discountPercentage);
        let discountPrice = document.createElement("h2");
        discountPrice.style.color = "red";
        let discountText = document.createTextNode(discountedPrice.toFixed(2) + "$ ( " + ob.discount + " OFF )");
        discountPrice.appendChild(discountText);
        detailsDiv.appendChild(discountPrice);
      }

    let h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode('Description'));

    let para = document.createElement('p');
    para.appendChild(document.createTextNode(ob.description));

    let productPreviewDiv = document.createElement('div');
    productPreviewDiv.id = 'productPreview';

    let h3ProductPreviewDiv = document.createElement('h3');
    h3ProductPreviewDiv.appendChild(document.createTextNode('Product Preview'));
    productPreviewDiv.appendChild(h3ProductPreviewDiv);

    ob.photos.forEach((photo, i) => {
        let imgTagProductPreviewDiv = document.createElement('img');
        imgTagProductPreviewDiv.id = 'previewImg';
        imgTagProductPreviewDiv.src = photo;

        imgTagProductPreviewDiv.onclick = function () {
            console.log("Clicked preview:", this.src);
            document.getElementById("imgDetails").src = this.src;
        };

        productPreviewDiv.appendChild(imgTagProductPreviewDiv);
    });

    let buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';

    let buttonTag = document.createElement('button');
    buttonTag.appendChild(document.createTextNode('Add to Cart'));
    buttonTag.onclick = function () {
        let order = id + " ";
        let counter = 1;

        if (document.cookie.indexOf(',counter=') >= 0) {
            // Update the order and counter if cookie exists
            order = document.cookie.split(',')[0].split('=')[1] + " " + id;
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1;
        }

        // Set updated cookies
        document.cookie = "orderId=" + order + ",counter=" + counter;
        document.getElementById("badge").innerHTML = counter;
        console.log("Updated Cookies:", document.cookie);
    };

    buttonDiv.appendChild(buttonTag);

    // Append all elements to the main container
    mainContainer.appendChild(imageSectionDiv);
    mainContainer.appendChild(productDetailsDiv);
    productDetailsDiv.appendChild(h1);
    productDetailsDiv.appendChild(h4);
    productDetailsDiv.appendChild(detailsDiv);
    detailsDiv.appendChild(h3DetailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(para);
    productDetailsDiv.appendChild(productPreviewDiv);
    productDetailsDiv.appendChild(buttonDiv);

    return mainContainer;
}

// Fetch product details from JSON and populate the page
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        let product = products.find(p => p.id == id);
        if (product) {
            dynamicContentDetails(product);
        } else {
            console.error("Product not found for ID:", id);
        }
    })
    .catch(error => console.error('Error fetching product details:', error));