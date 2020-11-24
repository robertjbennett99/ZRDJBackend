
const Sentiment = require('sentiment')
let sentiment = new Sentiment();

const fetch = require('node-fetch');


// News
async function getNewsSentiment(query) {
    const apiKey = 'd347e0c152474af7a453cf69bbbf6ca0';

    let url = `http://newsapi.org/v2/everything?q=${query}&from=2020-11-22&to=2020-11-23&sortBy=popularity&apiKey=${apiKey}`

    let average = 0;

    await fetch(url).then((res) => {
        return res.json();
    }).then((data) => {
        data.articles.forEach(article => {
            average += sentiment.analyze(article.title).score
        })
        average = average / data.articles.length
    })
    return average;
}

// Twitter
let Twitter = require('twitter');
let client = new Twitter({
    consumer_key: 'GMyXsKwEJn60KnyQp79oXJTzU',
    consumer_secret: 'eWGFND6ea8VBcQ5knaORj7FAPl0oqLFE61lmynUgS83tGeyefK',
    access_token_key: '2683859232-rSLlu4g0fZASZoofBuPgF1qllAtsKUuJww3eLB0',
    access_token_secret: 'RzSBkqR0zF30vWncteO392IStZVSfZ2iQBCOLZOFJ4hXS'
});

let average = 0;
async function getTwitterSentiment(query) {
    average = 0;
    let params = {q: query, lang: 'en', result_type: 'recent', count: '100'};
    await client.get('search/tweets', params).then(function (tweets) {
        tweets.statuses.forEach(tweet => {
            average += sentiment.analyze(tweet.text).score;
        })
        average = average/tweets.statuses.length;
    });
    return average;
}

module.exports = {getNewsSentiment, getTwitterSentiment}