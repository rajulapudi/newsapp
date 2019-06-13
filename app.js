const express = require('express');
const NewsAPI = require('newsapi');



var app = express();
const port = process.env.PORT || 3030;

app.set('view engine', 'ejs');
app.use('/common', express.static('common'));
app.use('/plugin-frameworks', express.static('plugin-frameworks'))
app.use(express.static('views'));

const newsapi = new NewsAPI('014317ccd6ce42e2854ffd72bc0103a2');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

app.get('/',(req, res) => {

    var newsOptions = {
        q: 'politics, +india',
        language: 'en',
        sortBy: 'popularity',
        pageSize: 25
    }

    newsapi.v2.everything(newsOptions, (err, response) => {
        if (err) {
            console.log(err)
        } else {
            var recentright = '';
            var recentleft = '';
            var htmlheadline = '';
            var rightheads = '';
            var bottomheads = '';
            var lastsection = '';
            var popuposts = '';

            for (var i = 17; i < 22; i++) {
                popuposts += 
                '<a class="oflow-hidden pos-relative mb-20 dplay-block" href="' + response.articles[i].url + '">' 
                + '<div class="wh-100x abs-tlr"><img src="' + response.articles[i].urlToImage + '"></div>' 
                + '<div class="ml-120 min-h-100x">' 
                + '<h5><b>' + response.articles[i].title + '</b></h5>' 
                + '<h6 class="color-lite-black pt-10">by <span class="color-black"><b>'+ response.articles[i].author +',</b></span>' 
                + response.articles[i].publishedAt + '</h6></div></a>'
            }
            for (var i = 11; i < 17; i++) {
                lastsection += '<div class="col-sm-6">' + '<img src="' + response.articles[i].urlToImage + '">' + '<h4 class="pt-20"><a href="' + response.articles[i].url + '"><b>' + response.articles[i].title + '</b></a></h4>' + '<ul class="list-li-mr-20 pt-10 mb-30">' + '<li class="color-lite-black">by <span class="color-black"><b>' + response.articles[i].author + ',,</b></a>' + response.articles[i].publishedAt + '</li></ul></div>'
            }
            for (var i = 8; i < 11; i++) {
                bottomheads += '<div class="pl-5 pl-sm-0 pt-5 pt-sm-10 float-left float-sm-none pos-relative w-1-3 w-sm-100 h-100 h-sm-300x">' + '<a class="pos-relative h-100 dplay-block" href="' + response.articles[i].url + '">' + '<div style= "background-image: url(' + response.articles[i].urlToImage + ')" class="img-bg bg-6 bg-grad-layer-6"></div>' + '<div class="abs-blr color-white p-20 bg-sm-color-7">' + '<h4 class="mb-10 mb-sm-5"><b>' + response.articles[i].title + '</b></h4>' + '<ul class="list-li-mr-20">' + '<li>Jan 25, 2018</li>' + '</ul></div></a></div>'
            }
            for (var i = 6; i < 8; i++) {
                rightheads += '<div class="pl-5 pb-5 pl-sm-0 ptb-sm-5 pos-relative h-50">' + '<a class="pos-relative h-100 dplay-block" href="' + response.articles[i].url + '">' + '<div style= "background-image: url(' + response.articles[i].urlToImage + ')"class="img-bg bg-2 bg-grad-layer-6"></div>' + '<div class="abs-blr color-white p-20 bg-sm-color-7">' + '<h4 class="mb-10 mb-sm-5"><b>' + response.articles[i].title + '</b></h4>' + '<ul class="list-li-mr-20">' + '<li>' + response.articles[i].publishedAt + '</li>' + '</ul></div></a></div>'
            }
            for (var i = 0; i < 1; i++) {
                htmlheadline += '<a class="pos-relative h-100 dplay-block" href="' + response.articles[i].url + '">' + '<div style= "background-image: url(' + response.articles[i].urlToImage + ')" class="img-bg bg-1 bg-grad-layer-6"></div>' + '<div class="abs-blr color-white p-20 bg-sm-color-7">' + '<h3 class="mb-15 mb-sm-5 font-sm-13"><b>' + response.articles[i].title + '</b></h3>' + '<ul class="list-li-mr-20">' + '<li>by <span class="color-primary"><b>' + response.articles[i].author + '</b></span>' + response.articles[i].publishedAt + '</li>' + '</ul></div></a>'
            }
            for (var i = 1; i < 5; i++) {
                recentright += '<a class="oflow-hidden pos-relative mb-20 dplay-block" href="' + response.articles[i].url + '">' + '<div class="wh-100x abs-tlr"><img src="' + response.articles[i].urlToImage + '"></div>' + '<div class="ml-120 min-h-100x"><h5><b>' + response.articles[i].title + '</b></h5>' + '<h6 class="color-lite-black pt-10">by <span class="color-black"><b>' + response.articles[i].author + ',</b></span>' + response.articles[i].publishedAt + '</h6>' + '</div></a>'
            }
            for (i = 5; i < 6; i++) {
                recentleft += '<img src="' + response.articles[i].urlToImage + '" alt="">' + '<h4 class="pt-20"><a href="' + response.articles[i].url + '"><b>' + response.articles[i].title + '<br/></b></a></h4>' + '<ul class="list-li-mr-20 pt-10 pb-20">' + '<li class="color-lite-black">by <p class="color-black"><b>' + response.articles[i].author + ',</b></p>' + response.articles[i].publishedAt + '</li>' + '<li><i class="color-primary mr-5 font-12 ion-ios-bolt"></i><b></b></li>' + '</ul>' + '<p>' + response.articles[i].content + '</p>'
            }
        }
        res.render('index.ejs', {
            rightheads: rightheads,
            bottomheads: bottomheads,
            headline1: htmlheadline,
            recentright: recentright,
            recentleft: recentleft,
            lastsection: lastsection,
            popuposts: popuposts
        })
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
