import 'dotenv/config';
import './passport';
import './database';
import { app } from './app';

const port = app.get('port');
const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

export default server;
