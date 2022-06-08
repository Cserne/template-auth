require("dotenv").config();
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT;

mongoose
.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false
  // , useCreateIndex: true
}, 
)
.then(() => {
  console.log("MongoDB connected");
})
.catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
