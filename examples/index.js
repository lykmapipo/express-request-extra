import { merge } from 'lodash';
import express from '../src';

const PORT = 3000;

// prepare express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '2mb' }));

// handle requests
app.all('/', (request, response) => {
  const data = merge({}, request.all());
  response.json(data);
});

// run express app
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  } else {
    console.log(`visit http://0.0.0.0:${PORT}`);
  }
});
