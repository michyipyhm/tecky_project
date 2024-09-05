document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    const res = await fetch(`/product?product=${productId}`)

    const result = await res.json()
    const product = result.data
    console.log(product)
    const productDetails = document.getElementById('productDetails');
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
        <div class="firstSection">
            <div class="photo"><img src="${product.image_path}" width="500" height="500"/></div>
            <div class="productBtn">
                <div class="price">$${product.product_price}</div>
                <div class="productId">WSP012-${product.id}</div>
                <div class="pickUp">
                    <div calss="pickUpLocation">Pickup available at Kowloon Bay Tecky Academy<div>
                    <div class="pickUpTime">Usually ready in 2-4 days</div>
                </div>
                <div class="addToCart"><a href="#" class="btn btn-light">Add to cart</a></div>
            </div>
        </div>
        <div class="secondSection>
            <div class="description">
            <h2>Description</h2>
            <div class="cameraType">Type: ${product.camera_type}</div>
            <div class="brand">Brand: ${product.brand_name}</div></div>
            <div class="origin">Origin Country: ${product.origin_country}</div>
            <div class="year">Year: ${product.production_year}</div>
            <div class="format">Format: ${product.format_name}</div>
            <div class="weight">Weight: ${product.weight}</div>
            <div class="isoDiv">ISO: <span id="iso>${product.iso}</span></div>
            </div>
        </div>
    `;
    productDetails.appendChild(productDiv)
    const productTitle = document.getElementById('productName');
    productTitle.textContent = `${product.product_name}`
})