const swaggerJSDoc = require(`swagger-jsdoc`);

const swaggerDefinition = {
openapi: `3.0.0`,
info: {
title: `API PseudoForms`,
version: `1.0.0`,
description: `PseudoForms API - Opis, którego nie ma, i być nie będzie - nie chce mi sie`,
},
};

const options = {
swaggerDefinition,
apis: ['./routes/*.js'], // Path to the API routes in your Node.js application
//apis: ['./routes/surveyRoutes.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;