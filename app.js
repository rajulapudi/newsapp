const express = require('express');
const NewsAPI = require('newsapi');
const keys = require('./keys');
const path = require('path');



var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use('/common',express.static('common'));
app.use('/plugin-frameworks',express.static('plugin-frameworks'))
app.use(express.static('views'));

const newsapi = new NewsAPI('014317ccd6ce42e2854ffd72bc0103a2');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

app.get('/', (req,res)=>{
  var newsOptions = {
    q: 'bitcoin',
    sources: 'bbc-news,the-verge',
    domains: 'bbc.co.uk, techcrunch.com',
    language: 'en',
    sortBy: 'relevancy',
    page: 2
  }
  
  newsapi.v2.everything(newsOptions,(err,response)=>{
    if (err){console.log(err)}
    else{
      var htmlelement = '';
      for(var i=0; i<4; i++){
        htmlelement += '<a class="oflow-hidden pos-relative mb-20 dplay-block" href="'+response.articles[i].url+'">'
        +'<div class="wh-100x abs-tlr"><img src="'+response.articles[i].urlToImage+'"></div>'
        +'<div class="ml-120 min-h-100x"><h5><b>'+response.articles[i].title+'</b></h5>'
        +'<h6 class="color-lite-black pt-10">by <span class="color-black"><b>'+response.articles[i].author+',</b></span>'+response.articles[i].publishedAt+'</h6>'
        +'</div></a>'
        //console.log(htmlelement);
        //console.log(response);
      }
    }
    res.render('index.ejs', {element : htmlelement})
  })

})




/* Server Listening */
app.listen(port, () => {
  console.log(`Listening on port : ${port}`);
});



