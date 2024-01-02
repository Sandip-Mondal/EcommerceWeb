const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE)
    .then(() => console.log("connection ... "))
    .catch((e) => console.log('not connect ... '));