const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.set('view engine', 'ejs')
app.use(express.static('public'))

const products = generateProducts(10)
console.log(products)

const data = {
    products: [],
    content: ''
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