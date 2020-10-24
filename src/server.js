const { PORT } = require('./common/config');
const mongoose = require('mongoose');
const app = require('./app');

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => {
      console.log('mongoDB connected');
      console.log(`App is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
