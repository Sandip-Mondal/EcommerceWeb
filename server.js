const dotenv = require('dotenv');
require('dotenv').config();
require('./Db/conn');
const express = require('express');
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const app = express();
const path = require("path");
app.use(express.json());
app.use(cookieParser());
const router = require("./Route/router");


app.use(router);

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})


app.listen(PORT, () => {
    console.log(`server is  ${PORT}`);
});

