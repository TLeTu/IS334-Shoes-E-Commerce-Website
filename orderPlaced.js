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

let order = JSON.parse(localStorage.getItem('order'));

sendEmail();

function sendEmail(){
    const email = order.email;
      const customerName = order.name;
      const orderId = Math.random().toString(36).substr(2, 8);
      const totalAmount = order.totalAmount;
      const paymentStatus = "Đã thanh toán";

      // Dữ liệu gửi email
      const serviceID = "service_5imyqcx"; // Thay bằng service_id của bạn
      const templateID = "template_y6soe9p"; // Thay bằng template_id của bạn
      const publicKey = "Pbh6VXMHJxmXbSB7h"; // Thay bằng public_key của bạn

      const templateParams = {
        to_email: email,
        customer_name: customerName,
        order_id: orderId,
        order_total: totalAmount,
        payment_status: paymentStatus,
      };

      // Sử dụng fetch API để gửi email
      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceID,
          template_id: templateID,
          user_id: publicKey,
          template_params: templateParams,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Email đã được gửi thành công!");
            //alert("Email đã được gửi thành công!");
          } else {
            throw new Error("Gửi email thất bại.");
          }
        })
        .catch((error) => {
          console.error("Lỗi:", error);
          alert("Không thể gửi email. Vui lòng kiểm tra lại.");
        });
}