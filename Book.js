const book_data = require('data-store')({path: process.cwd() + '/data/book.json'})

class Book {
    constructor (id, title, price, authors) {
        // add defense to catch errors if necessary
        this.id = id;
        this.title = title;
        this.price = price;
        this.authors = authors;
    }

    update () {
        book_data.set(this.id.toString(), this)
    }

    delete() {
        book_data.del(this.id.toString());
    }
}

Book.getAllIDs = () => {
    // Object.keys returns all properties of an object as an array of strings... map turns to nums
    return Object.keys(book_data.data).map( (id => {return parseInt(id); } )); 
}

Book.findByID = (id) => {
    let bdata =  book_data.get(id);
    if(bdata == null) { return null; }
    return new Book(bdata.id, bdata.title, bdata.price, bdata.authors) // Return new book in order to maintain restfulness
}

// identify max existing ID using reduce // This runs once when the module loads, to be used in create
Book.next_id = Book.getAllIDs().reduce((max, next_id) => {
    if(max < next_id) {
        return next_id
    }
    return max
}, -1) + 1; // add 1 to get next available id

//Factory Method
Book.create = (title, price, authors) => {
    let id = Book.next_id;
    Book.next_id += 1;
    let b = new Book(id, title, price, authors)
    book_data.set(b.id.toString(), b) // add to actual data store
    return b;
}






// ... Create sample book
// let b1 = new Book(0, 'a book', 10.50, ['bob', 'kmp'])
// book_data.set(b1.id.toString(), b1)


module.exports = Book;