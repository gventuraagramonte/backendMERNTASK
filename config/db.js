const mongoose = require("mongoose");
require("dotenv").config({ path: "environments/variables.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("DB connected successfully!");
  } catch (error) {
    console.log(error);
    process.exit(1); //detener la app
  }
};

module.exports = conectarDB;
