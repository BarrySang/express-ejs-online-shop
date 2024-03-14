const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

const products = generateProducts(10)
const cart = []

const data = {
    products: [],
    content: '',
    cart: [1, 2, 3]
}

/**
 * routes
 */
// root
app.get('/', (req, res) => {
    sentData = {
        ...data,
        products: products,
        content: 'products'
    }
    res.render('index', {sentData})
})

// about
app.get('/about', (req, res) => {
    sentData = {
        ...data,
        content: 'about'
    }
    res.render('index', {sentData})
})

// product
app.get('/product/:productId', (req, res) => {
    sentData = {
        ...data,
        product: getProduct(products, req.params.productId),
        content: 'product'
    }
    console.log(sentData)
    res.render('index', {sentData})
})

// product
// add to cart
app.post('/product/addToCart', (req, res) => {
    // get data from the request
    // console.log(req.body)
    const {userId, productId} = req.body

    // store the data
    // check if the user's cart already exists
    const cartEntry = getCartEntry(userId)
    if (cartEntry) {
        // add the item to the user's cart
        cartEntry.products.push(productId)
    } else {
        cart.push({
            id: cart.length ? cart[cart.length - 1].id + 1 : 1,
            userId: userId,
            products: [
                productId
            ]
        })
    }

    console.log(cart)
})

// get cart items
app.get('/cart/:userId', (req, res) => {
    const userId = req.params.userId
    const cartEntry = getCartEntry(parseInt(userId))
    res.send(cartEntry)
})


// get a user's cart entry
function getCartEntry(userId) {
    return cart.find(cartEntry => cartEntry.userId === userId)
}

// @TODO - move this functions to 'lib' folder
/**
 * 
 * @param {number} numberOfProducts 
 * @returns array
 */
 function generateProducts(numberOfProducts) {
    let products = []
    for (let i = 0; i < numberOfProducts; i++) {
        const product = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            productName: products.length ? 'product '+(products[products.length - 1].id + 1) : 'product 1',
            price: Math.floor(Math.random() * 10000)+500,
            inStock: Math.floor(Math.random() * 200),
        }
        products.push(product)
    }

    return products
}

/**
 * 
 * @param {array} products 
 * @param {string} productId 
 * @returns object or undefined
 */
function getProduct(products = [], productId) {
    let results = products.filter(product => parseInt(productId) === product.id)
    return results[0]
}

app.listen(port, () => console.log(`listening on port ${port}`))