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

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function (req, res) {
    page(req,res)
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

