const express = require('express');
const NewsAPI = require('newsapi');
const keys = require('./keys');
const path = require('path');


var app = express();
const port = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.use('/common', express.static('common'));
app.use('/plugin-frameworks', express.static('plugin-frameworks'))
app.use(express.static('views'));

const newsapi = new NewsAPI('014317ccd6ce42e2854ffd72bc0103a2');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

app.get('/', (req, res) => {
  
  //var htmlheadline = '';
  //var htmlelement = '';
  //var htmlelement1 = '';


/*     var HeadlineOptions = {
        q: 'technology',
        language: 'en',
        sortBy: 'popularity',
        page: 2
    }
    newsapi.v2.topHeadlines(HeadlineOptions, (err, response) => {
      var htmlheadline = '';
        if (err) {
            console.log(err)
        } else {
            for (var i = 0; i < 1; i++) {
                htmlheadline += '<a class="pos-relative h-100 dplay-block" href="' + response.articles[i].url + '">' + '<div class="img-bg bg-1 bg-grad-layer-6"></div>' + '<div class="abs-blr color-white p-20 bg-sm-color-7">' + '<h3 class="mb-15 mb-sm-5 font-sm-13"><b>' + response.articles[i].title + '</b></h3>' + '<ul class="list-li-mr-20">' + '<li>by <span class="color-primary"><b>' + response.articles[i].author + '</b></span>' + response.articles[i].publishedAt + '</li>' + '</ul></div></a>'
            }
            return htmlheadline
        }
    }) */

    /* Everythin END POINT for RECENT TECH NEWS CONTENT */
    var newsOptions = {
        q: 'technology',
        language: 'en',
        sortBy: 'popularity',
        page: 2
    }

  newsapi.v2.everything(newsOptions, (err, response) => {
        if (err) {
            console.log(err)
        } else {
          var htmlelement = '';
          var htmlelement1 = '';
            for (var i = 0; i < 4; i++) {
                htmlelement += '<a class="oflow-hidden pos-relative mb-20 dplay-block" href="' + response.articles[i].url + '">' + '<div class="wh-100x abs-tlr"><img src="' + response.articles[i].urlToImage + '"></div>' + '<div class="ml-120 min-h-100x"><h5><b>' + response.articles[i].title + '</b></h5>' + '<h6 class="color-lite-black pt-10">by <span class="color-black"><b>' + response.articles[i].author + ',</b></span>' + response.articles[i].publishedAt + '</h6>' + '</div></a>'
                // console.log(htmlelement);
                // console.log(response);
            }
            for (i = 4; i < 5; i++) {
                htmlelement1 += '<img src="' + response.articles[i].urlToImage + '" alt="">' + '<h4 class="pt-20"><a href="' + response.articles[i].url + '"><b>' + response.articles[i].title + '<br/></b></a></h4>' + '<ul class="list-li-mr-20 pt-10 pb-20">' + '<li class="color-lite-black">by <p class="color-black"><b>' + response.articles[i].author + ',</b></p>' + response.articles[i].publishedAt + '</li>' + '<li><i class="color-primary mr-5 font-12 ion-ios-bolt"></i><b></b></li>' + '</ul>' + '<p>' + response.articles[i].description + '</p>'
            }
        }
        res.render('index.ejs', {
          //headline1: htmlheadline,
          element: htmlelement,
          element1: htmlelement1})
    })

})


/* Server Listening */
app.listen(port, () => {
    console.log(`Listening on port : ${port}`);
});


/* sample response 

{
            "source": {
                "id": "cnn",
                "name": "CNN"
            },
            "author": "Julia Hollingsworth, CNN",
            "title": "China extradition bill debate postponed as protesters swarm Hong Kong streets - CNN",
            "description": "Hong Kong lawmakers have postponed a debate over a controversial bill that would allow fugitives to be extradited to China after protesters blocked roads and restricted access to government buildings.",
            "url": "https://www.cnn.com/2019/06/12/asia/hk-protests-extradition-intl-hnk/index.html",
            "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/190611234807-0612-hk-protests-08-super-tease.jpg",
            "publishedAt": "2019-06-12T06:56:00Z",
            "content": "Hong Kong (CNN)Hong Kong lawmakers have postponed a debate over a controversial bill that would allow fugitives to be extradited to China after protesters blocked roads and restricted access to government buildings.\r\nThe city's legislative council was due to … [+3313 chars]"
        },


*/
