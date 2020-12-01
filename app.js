const express = require('express');
const app = express();
const path = require('path')
const request = require('request')

app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get("/", (req,res)=>{
    res.render('search')
})


app.get("/movies", (req,res)=>{
    let query = req.query.search;
    request('https://api.themoviedb.org/3/search/movie?api_key=45daf83156b7eeb8eaeeb98a8271181e&query='+query, (error,response,body)=>{
       if(error){
           console.log(error)
       }
       let data = JSON.parse(body);
       res.render('movies', {data:data, searchQuery:query})

    })
})



const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})