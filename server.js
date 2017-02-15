'use strict';

//import BookService from 'BookService'

const massive = require("massive");
const connectionString = "postgres://postgres:123456@localhost/books";

const Hapi = require('hapi');

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
        return reply('retrive book');
    }
});

server.route({
    method: 'GET',
    path: '/books',
    handler: function (request, reply) {
        const db = massive.connectSync({connectionString: connectionString});
        
        //const bookService = new BookService(db);
        db.books.findDoc(function(err, res){
            return reply(res);
        });//bookService.findBooks();
    }
});

server.route({
    method: 'POST',
    path: '/books',
    handler: function (request, reply) {
        const db = massive.connectSync({connectionString: connectionString});
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
            console.info("saved");
        });
        return reply('create')
    }
});

server.route({
    method: 'PUT',
    path: '/books/{id}',
    handler: function (request, reply) {
        return reply('update')
    }
});

server.route({
    method: 'DELETE',
    path: '/books/{id}',
    handler: function (request, reply) {
        return reply('delete')
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});