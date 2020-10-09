const { Router } = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const route = Router();

route.get('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = route;
