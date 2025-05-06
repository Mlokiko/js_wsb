const swaggerJSDoc = require(`swagger-jsdoc`);

const swaggerDefinition = {
openapi: `3.0.0`,
info: {
title: `My API`,
version: `1.0.0`,
description: `Pseuforms API - opis, którego nie ma`,
},
};

const options = {
swaggerDefinition,
//apis: [`./routes/*.js`], // Path to the API routes in your Node.js application
apis: [`./routes/surveyRoutes.js`], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;