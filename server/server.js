import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

routes(app);

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

app.listen(port, () => {
  console.log('we are running live');
});

export default app;
