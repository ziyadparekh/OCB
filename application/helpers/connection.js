var mysql = require('mysql');

var pool = mysql.createPool({
    host     : "localhost",
    user     : "your-username",
    password : "your-password",
    port     : 3306,
    database : "your-db-name",
    charset: "UTF8MB4_GENERAL_CI",
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

pool.on('connection', function(connection) {
    connection.on('error', function(err) {
        console.log(err);
        if (!err.fatal) return;
        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            console.log(err.code);
            return process.exit();
        }
        connection.destroy();
        console.log("connection err ", err);
    });
    connection.query('FLUSH HOSTS;', [], function(err) {
        if(err) return console.log(err);
        console.log("new connection flush hosts");
    });
});

function keepalive() {
    pool.getConnection(function(err, connection) {
        connection.query('select 1', [], function(err) {
            connection.release();
            if(err)
                console.log(err);
            console.log("keepalive");
        });
    })
}

clearTimeout(keepalive);
setInterval(keepalive, 1000*60*5);


exports.mysql_pool = function() {
    return pool;
};

exports.query = function(query, params, done, next) {
    if (!query) {
        if(next) {
            return next();
        } else {
            return;
        }
    }
    if (done === 'undefined') {
        done = params;
        params = [];
    }
    pool.query(query, params, function(err, results){
        if(err){
            console.log(err);
            if(next) {
                return next();
            } else {
                return;
            }
        }
        if (done) {
            done(null, results);
        }
    });

}
