document.addEventListener('DOMContentLoaded', async () => {

    let res = await fetch("/shoppingcart")

    let result = await res.json()
    console.log(result)
    const productList = document.getElementById('product-list');

    let totalPrice = 0;

    for (let product of result.data) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <div><fieldset>
                <div class="productPicture">Photo</div>
                <div class="productProperty">
                    <div class="productName_Details">
                        <div class="productName">Product Name: ${product.product_name}</div>
                        <div class="productDetails">Product Details: </div>
                    </div>
                    <div class="productQuantity_Price">
                        <label for="quantity">Quantity:</label>
                            <select id="quantity" name="quantity">
                                <option value="1" ${product.quantity == 1 ? "selected" : ""}>1</option>
                                <option value="2" ${product.quantity == 2 ? "selected" : ""}>2</option>
                                <option value="3" ${product.quantity == 3 ? "selected" : ""}>3</option>
                                <option value="4" ${product.quantity == 4 ? "selected" : ""}>4</option>
                                <option value="5" ${product.quantity == 5 ? "selected" : ""}>5</option>
                            </select>
                            <div id="customInputContainer" style="display: none"><input type="text" id="customInput" name="customQuantity" placeholder="Custom" min="1"></div>
                            <div class="productPrice">Product Price: ${product.product_price}</div>
                    </div>
                <div>
                <button type="button" class="delectProduct">刪除</button>
            </fieldset></div>
        `;
        productList.appendChild(productDiv);
    }
});




//     productDiv.querySelector('.delectProduct').addEventListener('click', function () {
//         productDiv.remove();
//         const productId = product.product_id

//         fetch('/deleteProduct', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ productId: productId })
//         })
//             .then(response => {
//                 if (response.ok) {
//                     productDiv.remove();
//                 } else {
//                     console.error('error');
//                 }
//             })
//             .catch(error => {
//                 console.error('error:', error);
//             });
//     });


//     const quantitySelect = productDiv.querySelector('#quantity');
//     const customInputContainer = productDiv.querySelector('#customInputContainer');
//     const productPriceDiv = productDiv.querySelector('.productPrice');
//     const productPrice = parseFloat(product.product_price)

//     quantitySelect.addEventListener('change', function () {
//         let quantity = this.value;
//         if (quantity === 'custom') {
//             quantitySelect.style.display = 'none';
//             customInputContainer.style.display = 'block';
//             quantity = customInput.value || 1;
//         } else {
//             quantitySelect.style.display = 'block';
//             customInputContainer.style.display = 'none';
//         }
//         const newPrice = productPrice * parseInt(quantity, 10);
//         productPriceDiv.textContent = `Product Price: ${newPrice.toFixed(2)}`;
//         updateTotalPrice();
//     });

//     const customInput = productDiv.querySelector('#customInput');
//     customInput.addEventListener('input', function () {
//         let quantity = this.value || 1;
//         const newPrice = productPrice * parseInt(quantity, 10);
//         productPriceDiv.textContent = `Product Price: ${newPrice.toFixed(2)}`;
//         updateTotalPrice();
//     });

//     customInput.addEventListener('keypress', function (event) {
//         if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
//             event.preventDefault();
//         }
//     });
// });

// function updateTotalPrice() {
//     totalPrice = 0;
//     document.querySelectorAll('.product').forEach(productDiv => {
//         const quantitySelect = productDiv.querySelector('#quantity');
//         const customInput = productDiv.querySelector('#customInput');
//         const productPrice = parseFloat(productDiv.querySelector('.productPrice').textContent.split(': ')[1]);
//         let quantity = quantitySelect.value;
//         if (quantity === 'custom') {
//             quantity = customInput.value || 1;
//         }
//         totalPrice += productPrice * parseInt(quantity, 10);
//     });
//     const countingPriceDiv = document.getElementById('countingPrice');
//     countingPriceDiv.textContent = `Total Price: ${totalPrice.toFixed(2)}`;
// }

// updateTotalPrice();








// fetch('/shoppingcart')
//     .then(async (response) => {
//         if (!response.ok) {
//             if (response.status === 401) {
//                 const data = await response.json();
//                 throw new Error(data.message);
//             } else {
//                 throw new Error('Network response was not ok');
//             }
//         }
//         let products = await response.json().data;
//         console.log(products)

//         return products
//     })
//     .then(products => {
//     })
//     .catch(error => {
//         console.error('Error fetching shopping cart:', error.message);
//         alert(error.message);
//         window.location.href = "/login.html";
//     });
