'use strict';

import Hapi from 'hapi'
import massive from 'massive'
import BookService from './bookService'

const connectionString = "postgres://postgres:123456@localhost/books";
const db = massive.connectSync({connectionString: connectionString});
const bookService = new BookService(db);

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Add the route
server.route({
    method: 'GET',
    path:'/books/{id}', 
    handler: function (request, reply) {
        bookService.getBook(request.params.id)
            .then(book => reply(book))
            .catch(reason => console.error(reason));
    }
});

server.route({
    method: 'GET',
    path: '/books',
    handler: function (request, reply) {
        bookService.findBooks()
            .then(books => reply(books))
            .catch(reason => console.error(reason));
    }
});

server.route({
    method: 'POST',
    path: '/books',
    handler: function (request, reply) {
        const data = request.payload;
        bookService.createBook(data.title, data.description, data.price, data.tags)
            .then(book => reply(book))
            .catch(reason => console.error(reason));
    }
});

server.route({
    method: 'PUT',
    path: '/books/{id}',
    handler: function (request, reply) {
        const id = request.params.id;
        const data = request.payload;
        bookService.changeBook(id, data.title, data.description, data.price, data.tags)
            .then(book => reply(book))
            .catch(reason => console.error(reason));
    }
});

server.route({
    method: 'DELETE',
    path: '/books/{id}',
    handler: function (request, reply) {
        const id = request.params.id;
        bookService.deleteBook(id)
            .then(book => reply(book))
            .catch(reason => console.error(reason));
    }
});

server.route({
    method: 'POST',
    path: '/books/sample',
    handler: function (request, reply) {
        const newDoc = {
            title : "Chicken Ate Nine",
            description: "A book about chickens of Kauai",
            price : 99.00,
            tags : [
                {name : "Simplicity", slug : "simple"},
                {name : "Fun for All", slug : "fun-for-all"}
            ]
        };
        db.saveDoc("books", newDoc, function(err, res) {
            reply(res);
        });
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});