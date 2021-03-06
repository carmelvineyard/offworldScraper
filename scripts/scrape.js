var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    request("http://offworld.com", function(err, res, body){
        var $ = cheerio.load(body);

        var articles = [];

        $(".byline").each(function(i, element) {
            var head = $(this).sibling("a").text().trim();
            var sum = $(this).sibling(".excerpt").text().trim();

            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };

                articles.push(dataToAdd);
            }
        }); // end byline
        cb(articles);

    }); //end request

}; //end scrape

module.exports = scrape;