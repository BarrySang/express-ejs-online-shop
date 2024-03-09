const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.set('view engine', 'ejs')
app.use(express.static('public'))

// const items = generateItems
// console.log(items)
app.get('/', (req, res) => {
    res.render('index', {data: 'updated data from server'})
})

app.listen(port, () => console.log(`listening on port ${port}`))