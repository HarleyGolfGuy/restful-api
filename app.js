
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , products = require('./routes/products')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/products', products.all_products);
app.get('/lots', products.all_lots);
app.get('/:prod/lots', products.oneproduct_alllots);
app.get('/:prod/:lot/parts', products.oneproduct_onelot_allparts);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
