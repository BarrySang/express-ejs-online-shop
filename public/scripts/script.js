let cart = []

function addToCart(event, productId) {
    event.preventDefault()
    cart.push(productId)
    console.log(cart)
}