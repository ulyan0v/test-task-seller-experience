const express = require('express');
const config = require('./config');
const cors = require('cors');

const app = express();
const HOSTNAME = config.hostname;
const PORT = config.port;

app.use( cors() );

app.use('/api/v1', require('./routes/api.v1'));

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server ready at http://${HOSTNAME}:${PORT}`);
});