
const Sentiment = require('sentiment')
let sentiment = new Sentiment();
require('dotenv').config();

const fetch = require('node-fetch');


// News
async function getNewsSentiment(query) {
    const apiKey = process.env.NEWS_KEY;

    let url = `http://newsapi.org/v2/everything?q=${query}&from=2020-11-22&to=2020-11-23&sortBy=popularity&apiKey=${apiKey}`

    let average = 0;

    await fetch(url).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data)
        data.articles.forEach(article => {
            average += sentiment.analyze(article.title).score
        })
        average = average / data.articles.length
    }).catch(function(error) {
        average = 0;
    })
    return average;
}

// Twitter
let Twitter = require('twitter');
let client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
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