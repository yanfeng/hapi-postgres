'use strict';

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
        return reply('all books')
    }
});

server.route({
    method: 'POST',
    path: '/books',
    handler: function (request, reply) {
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