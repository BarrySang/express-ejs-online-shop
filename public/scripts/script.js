let cart = []

function addToCart(event, userId, productId) {
    event.preventDefault()
    const data = {
        userId: userId,
        productId: productId
    }

    // send request to server
    fetch('/product/addToCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('network error')
        }

        return response.json()
    })
    .then(data => {
        // update UI based on server response
        console.log('data sent succesfully: ', data)
    })
    .catch(error => {
        console.error('an error occured')
    })

    // get cart entries from server
    fetch(`/cart/${userId}`)
    .then(response => {
        if(!response.ok) {
            throw new Error('network error')
        }

        return response.json()
    })
    .then(data => {
        // update 'cart'
        if(data) {
            // update cart
            cart = data.products
        } else {
            console.log('an error occured')
        }
    })
    .catch(error => {
        console.log('an error occured')
    })

    
}