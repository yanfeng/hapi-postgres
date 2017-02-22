'use strict';

export default class BookService {
    constructor(db) {
        this.db = db;
    }

    findBooks() {
        return new Promise((resolve, reject) => {
            this.db.books.findDoc(function(err, res){
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    }

    getBook(id) {
        return new Promise((resolve, reject) => {
            this.db.books.findDoc({id:id}, function(err, res){
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    }

    createBook(title, desc, price, tags) {
        return new Promise((resolve, reject) => {
            const newDoc = {
                title : title,
                description: desc,
                price : price,
                tags : tags
            };

            this.db.saveDoc('books', newDoc, function(err, res){
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    }

    changeBook(id, title, desc, price, tags) {
        return new Promise((resolve, reject) => {
            const mydb = this.db;
            mydb.books.findDoc({id:id}, function(err, res) {
                const book = Object.assign({}, res);
                book.title = title;
                book.description = desc;
                book.price = price;
                book.tags = tags;

                mydb.saveDoc('books', book, function(err, res){
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(res);
                });
            });
        });
    }

    deleteBook(id) {
        return new Promise((resolve, reject) => {
            this.db.books.destroy({id: id}, function(err, res){
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    }
}