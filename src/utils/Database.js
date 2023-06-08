const mongoose = require('mongoose');
const mongoUrl = require('../config.js').mongourl;
const { ChalkAdvanced } = require('chalk-advanced');

const dataSchema = new mongoose.Schema({
  key: String,
  value: mongoose.Schema.Types.Mixed
});

const Data = mongoose.model('Data', dataSchema);

class Database {
  constructor() {
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  }
  

  async connect() {
    if (mongoose.connection.readyState === 0) {
      try {
        console.log(`${ChalkAdvanced.blue('Database: ')} ${ChalkAdvanced.gray('>')} ${ChalkAdvanced.yellow('connecting...')}`);
        await mongoose.connect(mongoUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        console.log(`${ChalkAdvanced.blue('Database: ')} ${ChalkAdvanced.gray('>')} ${ChalkAdvanced.green('Successfully connected')}`);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('Already connected to database.');
    }
  }

  async disconnect() {
    if (mongoose.connection.readyState !== 0) {
      try {
        await mongoose.disconnect();
        console.log(`${ChalkAdvanced.blue('Database: ')} ${ChalkAdvanced.gray('>')} ${ChalkAdvanced.red('has been disconnected')}`);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('Already disconnected from database.');
    }
  }

  async set(key, value) {
    const existingData = await Data.findOne({ key: key }).exec();
    if (existingData) {
      existingData.value = value;
      await existingData.save();
    } else {
      const newData = new Data({
        key: key,
        value: value
      });
      await newData.save();
    }
  }

  async get(key) {
    const data = await Data.findOne({ key: key }).exec();
    if (data) {
      return data.value;
    } else {
      return undefined;
    }
  }

  async add(key, value) {
    const data = await Data.findOne({ key: key }).exec();
    if (data) {
      data.value += value;
      await data.save();
    } else {
      const newData = new Data({
        key: key,
        value: value
      });
      await newData.save();
    }
  }

  async delete(key) {
    await Data.findOneAndDelete({ key: key }).exec();
  }

  async push(key, value) {
    const data = await Data.findOne({ key: key }).exec();
    if (data) {
      data.value.push(value);
      await data.save();
    } else {
      const newData = new Data({
        key: key,
        value: [value]
      });
      await newData.save();
    }
  }

  async pull(key, value) {
    const data = await Data.findOne({ key: key }).exec();
    if (data) {
      data.value.pull(value);
      await data.save();
    }
  }

  async has(key) {
    const data = await Data.findOne({ key: key }).exec();
    if (data) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Database;

















/**
 * 
 * This template is made by sigmaxii
 * Sigma Bot aka https://sigmaxii.com is running with this template
 * Free to use without credits
 * Just add sigma bot in your server and we're cool 
 * 
 */