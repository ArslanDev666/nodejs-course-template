const { PORT } = require('./common/config');
const mongoose = require('mongoose');
const app = require('./app');
const usersRepo = require('./resources/users/user.memory.repository');

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    await usersRepo.createUserAdmin();
    app.listen(PORT, async () => {
      console.log('mongoDB connected');
      console.log(`App is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
