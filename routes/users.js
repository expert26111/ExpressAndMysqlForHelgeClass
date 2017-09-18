/**
 * Created by Yoana on 9/10/2017.
 */
var express = require('express');
var db_users = require('../db_users');
//const Router = require('express-promise-router')
var router = express.Router();
var babelregister  = require('babel-register')({stage: 1});

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

//const router = new Router();

var users = {
    'Ivajlo' : 'Bulgarian',
    'Hose' : 'Spanish'
};

// app.param('name',function(request,response,next){
//     // var name = request.params.name;
//     // var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
//     request.blockName = parseCityName(request.params.name);
//     next();
// });

function parseName(name){
    var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    return parsedName;
}

router.route('/')
    .post(parseUrlencoded, async function(request,response) {
        if(request.body.origin.length > 4)
        {
            try {
                const userId = await db_users.create(request.body.name, request.body.origin);
                console.log("THE USER OBJECT", userId);
                response.status(201).json(userId);
               // response.status.json(await db_users.create(request.body.name, request.body.origin));
            }catch(err){
                console.log(err);
                response.status(500).json('Server error.');
            }
        }else
        {
            response.status(400).json('Invalid request');
        }
    })
    .get(async function(request,response){
        // if(request.query.limit >= 0){
        //     // response.json(users.slice(0, request.query.limit));\
        //     response.json(Object.keys(users).slice(0,request.query.limit));
        // }else{
        //     response.json(Object.keys(users));
        // }

        try {
            const getAllFellas = await db_users.getAll();
            console.log("THE ALL OBJECT", getAllFellas);
            response.status(200).json(getAllFellas);
            // response.status.json(await db_users.create(request.body.name, request.body.origin));
        }catch(err){
            console.log(err);
            response.status(500).json({'message': 'Server error'});
        }

    });

router.route('/:Id')
    // .all(function(request, response, next){
    //     request.blockName = parseName(request.params.name);
    //     next();
    // })
    .delete( async function (request,response) {
        // if(users[request.blockName]) {
        //     delete users[request.blockName];
        //     response.sendStatus(200);//some clients can not handle empty respond very well
        // }else{
        //     response.sendStatus(404);
        // }

        var id = request.params.Id;
        console.log("the id is ",id);

        try {
            const getTheFella = await db_users.deleteAllById(id);
            console.log("THE ALL OBJECT", getTheFella);
            response.status(204);
            // response.status.json(await db_users.create(request.body.name, request.body.origin));
        }catch(err){
            console.log(err);
            response.status(500).json({'message': 'Server error'});
        }

    })
    .get( async function(request,response){

          var id = request.params.Id;
          console.log("the id is ",id);

        try {
            const getTheFella = await db_users.getAllById(id);
            console.log("THE ALL OBJECT", getTheFella);
            response.status(200).json(getTheFella);
            // response.status.json(await db_users.create(request.body.name, request.body.origin));
        }catch(err){
            console.log(err);
            response.status(500).json({'message': 'Server error'});
        }



        // var userorigin = users[request.blockName];//if you have a route for example blocks/:name
        // if(!userorigin)
        // {
        //     response.status(404).json('No Person found with Name: '+request.params.name);
        // }else {
        //     response.json(userorigin);// it sets the status code to 200 success
        // }
    });



var createUser = function(name, origin){
    users[name] = origin;
    return name;
};

module.exports = router;// exports the router as a Node module

// .post(parseUrlencoded, function (request,response){
//      console.log("the body is ",request.body);
//      if(request.body.origin.length > 4) {
//          //var user = createUser(request.body.name, request.body.origin);//ALL SYNTAX WITHOUT DB
//          db_users.create(request.body.name, request.body.origin, function(err, id){
//              //console.log("the db answer is ", id); THE CONSOLE.LOG SHOWS CORRECTLY THE ANSWER
//          response.status(201).json(id);
//        });
//      }else
//      {
//          response.status(400).json('Invalid request'); // Bad request
//      }
// })