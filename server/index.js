const api = require('./api');
const errhandler = require('./errHandler');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
app.use(express.static(path.resolve(__dirname, '../dapp-pic')))
app.use(errhandler);


app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dapp-pic/dist/index.html'), 'utf-8')
    res.send(html)
})
// 监听8088端口
app.listen(8088);
console.log('success listen in 8088');
