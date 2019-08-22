const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurants: restaurant })
})

app.get('/search', (req, res) => {
  const restaurantSearch = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
  if (restaurantSearch.length > 0) {
    res.render('index', { restaurant: restaurantSearch, keyword: req.query.keyword })
  } else {
    res.render('notfound')
  }
})

app.get('/contact', (req, res) => {
  res.render('contact')
})



app.listen(port, () => {
  console.log(`now listening on localhost:${port}`)
})