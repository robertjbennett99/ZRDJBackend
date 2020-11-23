#ZRDJStockSentimentBackend

Backend implementation to support login and user information of: https://github.com/robertjbennett99/ZRDJ

Primary Methods:

POST '/login'
data: {
    username: ...
    password: ...
}
returns: boolean indicating login success

POST '/addkeyword'
data: {
    username: ...
    keyword: ...
}
returns: updated keyword list

POST '/deletekeyword'
data: {
    username: ...
    keyword: ...
}
returns: updated keyword list

GET '/getkeywords/:username'
returns: array of users stored keywords

GET '/usernameexists/:username'
returns boolean indicating whether this username is taken



