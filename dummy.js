var request = require('request');

var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=014317ccd6ce42e2854ffd72bc0103a2';


request(url, function (err, res,body) {
  //var total = body.totalResults;
  var obj = JSON.parse(body);
  console.log(obj.articles)
});
