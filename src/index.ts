import express from 'express';


import axios from 'axios';
import { NotionModel } from './models/external/notion.model';
import path from 'path';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const page_id = "80d7950e-1de9-4262-85a0-44428f866bf8";

const insertBlockToPage = async (text: string, author: string) => {
  const notion = new NotionModel();
  const response = await notion.insertBlockToPage(text, page_id, author);
}

app.get('/form', (req, res) => {
  res.render('form');
});

app.post('/notion/send', async (req, res) => {

  const { body } = req;
  const { input } = body;

  const apiUrl = 'https://ai.arclightsoftware.com/api/v1/api-hook/message';
  const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RJZCI6MTYwLCJjaGFubmVsSWQiOjI4NCwiY3JlYXRlZEF0IjoiMjAyMy0wOC0xMFQwNzowNDozMC42MjRaIiwiaG9va1VybCI6Imh0dHBzOi8vMTQzNS00Ny0xNTQtOTktMjIubmdyb2suaW8vbm90aW9uL2hvb2siLCJpYXQiOjE2OTE2NTEwNzB9.6DeG_ESArzHrS0RSYMbBx00RqNxGHPximBtBKFrl-6M';

  const headers = {
    Authorization: 'Bearer ' + bearerToken,
  };

  const bodyData = {
    input: {
      value: input.value,
      type: 'text',
    },
    options: {
      // This object will be returned in webhook request.
    },
  };
  await insertBlockToPage(input.value, 'Me');
  await axios.post(apiUrl, bodyData, { headers });
  // res.status(200).send('OK');
  res.redirect('/form');
});

app.post('/notion/hook', async (req, res) => {
  const { body } = req;
  const { input } = body;
  // const { url } = body;
  await insertBlockToPage(input.value, "Bot");
  res.status(200).send('OK');

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
