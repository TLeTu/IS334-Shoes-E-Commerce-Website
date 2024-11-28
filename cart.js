
console.clear();

if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}
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

let cartContainer = document.getElementById('cartContainer');

let boxContainerDiv = document.createElement('div');
boxContainerDiv.id = 'boxContainer';

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob, itemCounter) {
    let boxDiv = document.createElement('div');
    boxDiv.id = 'box';
    boxContainerDiv.appendChild(boxDiv);

    let boxImg = document.createElement('img');
    boxImg.src = ob.preview;
    boxDiv.appendChild(boxImg);

    let boxh3 = document.createElement('h3');
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter);
    boxh3.appendChild(h3Text);
    boxDiv.appendChild(boxh3);

    let boxh4 = document.createElement('h4');
    let h4Text = document.createTextNode(ob.price + " $");
    boxh4.appendChild(h4Text);
    boxDiv.appendChild(boxh4);

    // Add delete button
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    //Make the delete button text white and bold
    deleteButton.style.color = 'white';
    deleteButton.style.fontWeight = 'bold';
    // background color of the delete button is red
    deleteButton.style.backgroundColor = 'red';
    deleteButton.onclick = function () {
        deleteItem(ob.id);
    };
    boxDiv.appendChild(deleteButton);

    deleteButton.style.float = 'right';
    deleteButton.style.marginRight = '10px';
    
    buttonLink.appendChild(buttonText)
    cartContainer.appendChild(boxContainerDiv);
    cartContainer.appendChild(totalContainerDiv);

    return cartContainer;
}

let totalContainerDiv = document.createElement('div');
totalContainerDiv.id = 'totalContainer';

let totalDiv = document.createElement('div');
totalDiv.id = 'total';
totalContainerDiv.appendChild(totalDiv);

let totalh2 = document.createElement('h2');
let h2Text = document.createTextNode('Total Amount: ');
totalh2.appendChild(h2Text);
totalDiv.appendChild(totalh2);

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount) {
    let totalh4 = document.createElement('h4');
    let totalh4Text = document.createTextNode(amount + " $");
    // make the text bigger and bold
    totalh4.style.fontSize = '30px';
    totalh4.style.fontWeight = 'bold';

    totalh4.appendChild(totalh4Text);
    totalDiv.appendChild(totalh4);

    // Create input fields for Name, Address, and Email
    let nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Name';
    nameInput.id = 'nameInput';
    nameInput.style.display = 'block'; // Ensure input is on a new line
    nameInput.style.marginTop = '10px'; // Add some spacing
    nameInput.style.width = '100%'; // Make input cover the width of the box
    nameInput.style.borderRadius = '5px'; // Rounded corners
    nameInput.style.height = '30px'; // Increase height
    totalDiv.appendChild(nameInput);

    let addressInput = document.createElement('input');
    addressInput.type = 'text';
    addressInput.placeholder = 'Address';
    addressInput.id = 'addressInput';
    addressInput.style.display = 'block'; // Ensure input is on a new line
    addressInput.style.marginTop = '10px'; // Add some spacing
    addressInput.style.width = '100%'; // Make input cover the width of the box
    addressInput.style.borderRadius = '5px'; // Rounded corners
    addressInput.style.height = '30px'; // Increase height
    totalDiv.appendChild(addressInput);

    let emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Email';
    emailInput.id = 'emailInput';
    emailInput.style.display = 'block'; // Ensure input is on a new line
    emailInput.style.marginTop = '10px'; // Add some spacing
    emailInput.style.marginBottom = '10px';
    emailInput.style.width = '100%'; // Make input cover the width of the box
    emailInput.style.borderRadius = '5px'; // Rounded corners
    emailInput.style.height = '30px'; // Increase height
    totalDiv.appendChild(emailInput);

    totalDiv.appendChild(buttonDiv);
}

let buttonDiv = document.createElement('div');
buttonDiv.id = 'button';
totalDiv.appendChild(buttonDiv);

let buttonTag = document.createElement('button');
buttonDiv.appendChild(buttonTag);

let buttonLink = document.createElement('a');
// buttonLink.href = '/orderPlaced.html?';
buttonTag.appendChild(buttonLink);

let buttonText = document.createTextNode('Place Order');
buttonTag.onclick = function () {
    console.log("clicked");
};

// Fetch product data from products.json
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        let counter = Number(document.cookie.split(',')[1].split('=')[1]);
        document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter);

        // Parse items from the cookie and group by unique IDs
        let itemIds = document.cookie.split(',')[0].split('=')[1].trim().split(" ");
        let itemCountMap = {};

        itemIds.forEach(id => {
            if (itemCountMap[id]) {
                itemCountMap[id] += 1; // Increment count if ID already exists
            } else {
                itemCountMap[id] = 1; // Initialize count for new ID
            }
        });

        let totalAmount = 0;

        // Iterate over unique items
        for (let id in itemCountMap) {
            let product = products.find(p => p.id == id); // Find product in JSON
            if (product) {
                let itemCounter = itemCountMap[id];
                totalAmount += Number(product.price) * itemCounter; // Accumulate total price
                dynamicCartSection(product, itemCounter); // Display product in cart
            }
        }

        amountUpdate(totalAmount); // Update total amount
    })
    .catch(error => console.error('Error fetching products:', error));

// Function to delete item from cart
function deleteItem(itemId) {
    let itemIds = document.cookie.split(',')[0].split('=')[1].trim().split(" ");
    let counter = Number(document.cookie.split(',')[1].split('=')[1]);

    // Find the index of the item to delete
    let index = itemIds.indexOf(itemId);
    if (index !== -1) {
        itemIds.splice(index, 1); // Remove the item from the array
        counter -= 1; // Decrease the counter

        // Update the cookie
        document.cookie = 'orderId=' + itemIds.join(' ') + ',counter=' + counter;

        // Refresh the page to reflect changes
        location.reload();
    }
}