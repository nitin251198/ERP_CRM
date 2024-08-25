require('dotenv').config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const compression = require('compression');

const connectDB = require("./config/db");
const errorHandler = require('./middleware/error');

//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SwaggerOptions = require('../swagger.json');
const swaggerDocument = swaggerJsDoc(SwaggerOptions);

//setup graphql
const { applyGraphQLMiddleware } = require('./graphql');

// Routes File
const IndexRoutes = require('./routes/index.routes');
const AuthRoutes = require('./routes/auth.routes');

var app = express();

connectDB();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));

//all API
app.use("/", IndexRoutes);
app.use('/api/v1/auth', AuthRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Apply Graphql
applyGraphQLMiddleware(app);

app.use(errorHandler);

module.exports = app;


