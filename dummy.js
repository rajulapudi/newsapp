var HeadlineOptions = {
    q: 'technology',
    language: 'en',
    sortBy: 'popularity',
    page: 2
  }
  newsapi.v2.topHeadlines(HeadlineOptions, (err, res) => {
      if (err) {
          console.log(err)
      } else {
        for (var i = 0; i < 1; i++) {
          htmlheadline += '<a class="pos-relative h-100 dplay-block" href="' + res.articles[i].url + '">' + '<div style= "background-image: url(' + res.articles[i].urlToImage + ')" class="img-bg bg-1 bg-grad-layer-6"></div>' + '<div class="abs-blr color-white p-20 bg-sm-color-7">' + '<h3 class="mb-15 mb-sm-5 font-sm-13"><b>' + res.articles[i].title + '</b></h3>' + '<ul class="list-li-mr-20">' + '<li>by <span class="color-primary"><b>' + res.articles[i].author + '</b></span>' + res.articles[i].publishedAt + '</li>' + '</ul></div></a>'
        }
      }
  })