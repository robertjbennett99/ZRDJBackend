
const user_data = require('data-store')({path: process.cwd() + '/data/users.json'})

class User {
    constructor (id, username, password, keywords) {
        // add defense to catch errors if necessary
        this.id = id;
        this.username = username;
        this.password = password;
        this.keywords = keywords;
    }

    update () {
        user_data.set(this.id.toString(), this)
    }

    delete() {
        user_data.del(this.id.toString());
    }
}

User.getAllIDs = () => {
    return Object.keys(user_data.data).map( (id => { return parseInt(id); }));
}

User.findByID = (id) => {
    let udata = user_data.get(id);
    if(udata == null) { return null; }
    return new User(udata.id, udata.username, udata.password, udata.keywords);
}

User.findByUsername = (uName) => {
    let udata = null;
    let ids = Object.keys(user_data.data).map( (id => { return parseInt(id); }));

    ids.forEach(i => {
        u = user_data.get(i.toString());
        if(u.username == uName) {
            udata = u;
        }
    })

    if(udata == null) { return null; }
    return new User(udata.id, udata.username, udata.password, udata.keywords);
}

User.next_id = User.getAllIDs().reduce((max, next_id) => {
    if(max < next_id) {
        return next_id
    }
    return max
}, -1) + 1;

User.create = (username, password, keywords) => {
    let id = User.next_id;
    User.next_id +=1;
    let u = new User(id, username, password, keywords);
    user_data.set(u.id.toString(), u) // add to data store
    return u
}

User.verifyUser = (uName, uPass) => {
    let udata = null;
    let ids = Object.keys(user_data.data).map( (id => { return parseInt(id); }));

    ids.forEach(i => {
        let u = user_data.get(i.toString());
        if(u.username == uName) {
            udata = u;
        }
    })

    if(udata == null) { return false; }
    if(udata.password == uPass) { return true;}
    return false;
}


module.exports = User;