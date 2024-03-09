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