var express = require("express"),
    app = express();
app.use(express.static(__dirname));
app.listen(8888);
console.log('Started test server on http://localhost:8888');
