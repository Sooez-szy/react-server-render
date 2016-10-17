/**
 * Created by Administrator on 2016/10/13.
 */
/**
 * Created by Administrator on 2016/10/13.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var page = require("./server/page.generated");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;
var mongoose = require('mongoose');
var Character = require('./models/character');
var config = require('./config');
var api = require('./server/api')
mongoose.connect(config.database);
mongoose.connection.on('error',function(){
    console.info('Error:Could not connect to MongoDB.Did you forget to run `mongod`?');
})

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 所有页面匹配react-router方法
 */
app.get('*',function (req, res) {
    page.allPageView(req,res)
});
app.post('/api/characters',function (req, res) {
    api.getCharacters(req,res)
});

io.on('connection', function (_socket) {
    onlineUsers++;
    _socket.emit('onlineUsers', {onlineUsers: onlineUsers});
    _socket.broadcast.emit('onlineUsers', {onlineUsers: onlineUsers});
    _socket.on('disconnect', function () {
        onlineUsers--;
        _socket.emit('onlineUsers', {onlineUsers: onlineUsers});
        _socket.broadcast.emit('onlineUsers', {onlineUsers: onlineUsers})
    });
});

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

