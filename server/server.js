import express from 'express';
import bodyParser from 'body-parser';
import eventsRouter from './routes/eventRoute';
import centersRouter from './routes/centerRoute'

const app = express();

const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.use('/api/events', eventsRouter);
app.use('/api/centers', centersRouter);

app.listen(port, () => {
  console.log('we are running live');
});

export default app;
