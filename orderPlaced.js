document.cookie = "orderId="+0 +",counter="+0
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
// let httpRequest = new XMLHttpRequest(),
// jsonArray,
// method = "GET",
// jsonRequestURL = "https://5d76bf96515d1a0014085cf9.mockapi.io/order";

// httpRequest.open(method, jsonRequestURL, true);
// httpRequest.onreadystatechange = function()
// {
//     if(httpRequest.readyState == 4 && httpRequest.status == 200)
//     {
//         // convert JSON into JavaScript object
//         jsonArray = JSON.parse(httpRequest.responseText)
//         console.log(jsonArray)    
//         jsonArray.push(
//             {
//                 "id": (jsonArray.length)+1, "amount": 200,"product":["userOrder"]
//             })

//         // send with new request the updated JSON file to the server:
//         httpRequest.open("POST", jsonRequestURL, true)
//         httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
//         httpRequest.send(jsonArray)
//     }
// }
// httpRequest.send(null);
