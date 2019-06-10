const NewsAPI = require('newsapi');
const keys = require('./keys')
const newsapi = new NewsAPI('014317ccd6ce42e2854ffd72bc0103a2');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

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
    for(var i=0; i<response.articles.length; i++){
      htmlelement += '<a class="oflow-hidden pos-relative mb-20 dplay-block" href="'+response.articles[i].url+'">'
      +'<div class="wh-100x abs-tlr"><img src="'+response.articles[i].urlToImage+'alt=""></div>'
      +'<div class="ml-120 min-h-100x"><h5><b>'+response.articles[i].title+'</b></h5>'
     /*  title += '<li>'+response.articles[i].title+'</li>';
      url += '<a href="'+ response.articles[i].url+'">';
      console.log(url); */
      console.log(htmlelement);
    }
  }
})


