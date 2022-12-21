require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8888;
var mongoose = require("mongoose");

const LedModel = require("./models/LedModel");
try {
  mongoose.connect(
    "mongodb+srv://Chungmaster:chungmaster@cluster0.3fx7ubp.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("ok");
} catch (e) {
  console.log(e);
}
let LedRouter = require("./LED/LED");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/led", LedRouter);

async function UpdateTemp() {
  try {
    const options = {
      method: "GET",
      url: "http://api.weatherapi.com/v1/forecast.json",
      params: {
        key: "6f02ae4bddd947b7ae920159221510",
        q: "Hanoi",
        days: 1,
      },
    };
    axios
      .request(options)
      .then(async function (response) {
        let xx = await LedModel.findOne({});
        await LedModel.findOneAndUpdate(
          {},
          {
            $set: {
              program: xx.program,
              data: {
                ...xx.data,
                temp: response.data.current.temp_c,
              },
            },
          }
        );
        console.error(response.data.current.temp_c);
      })
      .catch(function (error) {});
  } catch (err) {
    console.error(err);
  }
}
async function Ping() {
  try {
    let dataquery = await LedModel.find({});
    dataquery.map(async (item) => {
      await LedModel.findOneAndUpdate(
        { led_id: item.led_id },
        { $set: { status: false } }
      );
    });
  } catch (err) {
    console.error(err);
  }
}
setInterval(async () => {
  await UpdateTemp();
  await Ping();
}, 300000);
app.listen(PORT, () => {
  console.log(`Sever listen on port ${PORT}`);
});
