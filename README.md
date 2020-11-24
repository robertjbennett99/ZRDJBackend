#ZRDJStockSentimentBackend

Backend implementation to support login and user information of: https://github.com/robertjbennett99/ZRDJ

Primary Methods:

POST - '/login' - data: {
    username: ...
    password: ...
} - returns: boolean indicating login success

POST '/addkeyword' - data: {
    username: ...
    keyword: ...
} - returns: updated keyword list

POST - '/deletekeyword' - data: {
    username: ...
    keyword: ...
} - returns: updated keyword list

GET - '/getkeywords/:username' - 
returns: array of users stored keywords

GET - '/usernameexists/:username' -
returns boolean indicating whether this username is taken

GET - '/newssentiment/:ticker' - 
returns sentiment score from -5 to 5, determined by recent headlines pulled from News API

GET - '/twittersentiment/:ticker' - 
returns sentiment score from -5 to 5, determined by recent tweets pulled from Twitter API


https://developer.twitter.com/en/docs
https://newsapi.org/


