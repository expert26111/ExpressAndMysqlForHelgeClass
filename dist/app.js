'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Yoana on 9/7/2017.
 */

//import  FirstComponent from './firstReactComponent'

var express = require('express');
var app = express();
var logger = require('./logger');

var db = require('../db');
app.use(logger);

app.use(express.static('../public'));
var router = require('../routes/users');
app.use('/users', router);

var data = {
    tables: {
        users: [{ name: "John", origin: "English" }, { name: "Peter", origin: "Canadian" }]

    }
};
console.log(process.versions); //GOOD FOR KNOWING YOUR VERSIONS
// Connect to MySQL on start
db.connect(db.MODE_TEST, function (err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit(1);
    } else {
        app.listen(5000, function () {
            console.log('Listening on port 5000...');
        });
    }
});

// db.connect(db.MODE_TEST, function() {
//     db.fixtures(data, function(err) {
//         if (err) return console.log(err)
//         console.log('Data has been loaded...')
//     })
// })


// app.use(function(request, response, next){
//     if (request.path === "/blocks"){
//         next();
//     } else {
//         response.status(404).json("Path requested does not exist");
//     }
// });

var blocks = {
    'Fixed': 'Fasted securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

app.param('year', function (request, response, next) {
    if (isYearFormat(request.params.year)) {
        next();
    } else {
        response.status(400).json('Invalid Format for Year');
    }
});

function isYearFormat(value) {
    var regexp = RegExp(/^d{4}$/);
    return regexp.test(value);
}

app.get('/cities/year/:year', function (request, response) {
    var year = request.params.year;
    var city = citiesYear[year];

    if (!city) {
        response.status(404).json("No City found for given year");
    } else {
        response.json("In " + year + ", " + city + " is created.");
    }
});

var citiesYear = {
    5000: 'Lotopia',
    5100: 'Caspiana',
    5105: 'Indigo',
    6000: 'Paradise',
    7000: 'Flotilla'
};

app.param('name', function (request, response, next) {
    // var name = request.params.name;
    // var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.blockName = parseCityName(request.params.name);;
    next();
});

function parseCityName(name) {
    var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    return parsedName;
}

app.get('/cities/:name', function (request, response) {
    var description = blocks[request.blockName]; //if you have a route for example blocks/:name
    if (!description) {
        response.status(404).json('No description found for ' + request.params.name);
        //  response.json(citySearch(request.query.search));
    } else {
        response.json(description); // it sets the status code to 200 success
    }
});

app.get('/blocks', function (request, response) {
    //var blocks = ['Fixed','Movable','Rotating'];

    if (request.query.limit >= 0) {
        response.json(blocks.slice(0, request.query.limit));
    } else {
        response.json((0, _keys2.default)(blocks));
    }
});

// app.listen(3000, function(){
//    console.log('Go server on port 3000 \n ')
// });


//app.get('/',function(request,response){
// response.sendfile(__dirname,'/public/index.html');

//});

//
// function citySearch (keyword) {
//     var regexp = RegExp(keyword, 'i');
//     var result = cities.filter(function (city) {
//         return city.match(regexp);
//     });
//
//     return result;
// }
// app.post('/users', parseUrlencoded, function(request,response){
//     if(request.body.description.length > 4) {
//         var user = createUser(request.body.name, request.body.description);
//         response.status(201).json(user);
//     }else
//     {
//         response.status(400).json('Invalid request'); // Bad request
//     }
// });

// app.delete('/user/:name', function (request,response) {
//     if(users[request.blockName]) {
//         delete users[request.blockName];
//         response.sendStatus(200);//some clients can not handle empty respond very well
//     }else{
//         response.sendStatus(404);
//     }
// });

// app.get('/users/:name',function(request,response){
//     var username = users[request.blockName];//if you have a route for example blocks/:name
//     if(!username)
//     {
//         response.status(404).json('No Person found with Name: '+request.params.name);
//     }else {
//         response.json(username);// it sets the status code to 200 success
//     }
// });


// app.get('/users',function(request,response){
//     if(request.query.limit >= 0){
//         response.json(users.slice(0, request.query.limit));
//     }else{
//         response.json(Object.keys(users));
//     }
// });
//# sourceMappingURL=app.js.map