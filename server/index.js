const express = require('express');
const config = require('config');

const app = express();
const HOSTNAME = config.get('hostname');
const PORT = config.get('port');

app.use('/api/v1', require('./routes/api.v1'));

app.listen(3001, '', () => {
  console.log(`Server ready at http://${HOSTNAME}:${PORT}`);
});