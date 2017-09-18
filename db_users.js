/**
 * Created by Yoana on 9/11/2017.
 */
var db = require('./db.js')
    , async = require('async');

// exports.create =  function(name,origin,done) {
//     var values = [name, origin]
//
//         db.get().query('INSERT INTO users ( Name, Origin ) VALUES(?, ?)', values, function(err, result) {
//         if (err) return done(err)
//         console.log('the returning value ',result);
//       //  return result.insertId;
//         done(null, result.insertId)
//     })
// }


exports.create =  async function(name,origin) {
    var values = [name, origin]
    return new Promise((resolve) => {
        db.get().query('INSERT INTO users ( Name, Origin ) VALUES(?, ?)', values, function (err, result) {
            if (err) return console.log(err);
            resolve(result.insertId)
        })
    })
}

exports.getAll = function() {
    return new Promise((resolve) => {
        db.get().query('SELECT * FROM users', function (err, rows) {
            if (err) return console.log(err);
            resolve(rows)
        })
    })
}


exports.getAllById = function(id) {
    return new Promise((resolve) => {
        db.get().query('SELECT * FROM users  WHERE Id = ? ',id, function (err, rows) {
            if (err) return console.log(err);
            resolve(rows)
        })
    })
}

exports.deleteAllById = function(id) {
    return new Promise((resolve) => {
        db.get().query('DELETE FROM users  WHERE Id = ? ',id, function (err, rows) {
            //console.log("the erors are ",)
            if (err) return console.log(err);
            resolve(rows)
        })
    })
}


// db.get().query('SELECT * FROM users', function (err, rows) {
//     if (err) return done(err)
//     done(null, rows)
// })

// exports.create = function(name,origin) {
//     var values = [name, origin]
//
//     db.get().query('INSERT INTO users ( Name, Origin ) VALUES(?, ?)', values, function(err, result) {
//         if (err)
//         {
//             console.log("Sorry");
//         }
//         console.log('the returning value ',result);
//         return result.insertId;
//     })
// }

//
// exports.create = async function (name,origin)  {
//     return new Promise((resolve,reject) => {
//
//           var values = [name, origin];
//          resolve( db.get().query('INSERT INTO users ( Name, Origin ) VALUES(?, ?)', values ));
//           // console.log(result.insertId);
//          // return result.insertId;
//        } );
// };


// exports.create = async function (name,origin)  {
//     var values = [name, origin];
//    const promise = await db.get().query('INSERT INTO users ( Name, Origin ) VALUES(?, ?)', values );
//    console.log("THE RESULTS IS ",promise);
//     console.log("THE RESULTS IS ",promise.insertId);
//    console.log(THE )
//     return promise.insertId;
//        // .then( function(result){
//        //     return result.insertId;
//        // });
// };



// exports.getAllByUser = function(userId, done) {
//     db.get().query('SELECT * FROM comments WHERE user_id = ?', userId, function (err, rows) {
//         if (err) return done(err)
//         done(null, rows)
//     })
// }