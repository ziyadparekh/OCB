"use strict";

process.env.DB_NAME = process.env.DB_NAME || "OCB";
process.env.WEB = process.env.WEB || 'http://localhost:3010';
process.env.LOCAL = process.env.WEB;
process.env.API_VERSION = process.env.API_VERSION || '1';

var app = require('./express-app');
app.listen(process.env.PORT || 3010);
