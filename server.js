require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app.js');

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zbr7exs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url).then(() => {
  console.log('-------- Database Connected --------');
});

app.listen(1600, () => {
    console.log('----------- App Started -----------')
});
