const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.set('view engine', 'ejs')
app.use(express.static('public'))

const items = generateItems(10)
console.log(items)

/**
 * root route
 */
app.get('/', (req, res) => {
    res.render('index', {data: 'updated data from server'})
})

// @TODO - move this function to 'lib' folder
/**
 * 
 * @param {number} numberOfItems 
 * @returns array
 */
 function generateItems(numberOfItems) {
    let items = []
    for (let i = 0; i < numberOfItems; i++) {
        const item = {
            id: items.length ? items[items.length - 1].id + 1 : 1,
            itemName: items.length ? 'item'+(items[items.length - 1].id + 1) : 'item1',
            price: Math.floor(Math.random() * 10000)+500,
            inStock: Math.floor(Math.random() * 200),
        }
        items.push(item)
    }

    return items
}

app.listen(port, () => console.log(`listening on port ${port}`))