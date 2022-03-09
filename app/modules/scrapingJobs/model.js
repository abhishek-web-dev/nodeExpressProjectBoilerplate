const mongoose = require('mongoose');
const { JOB_STATUS } = require('./constants');

const jobSchema = new mongoose.Schema({
  jobId: { type: String, unique: true, index: true, required: true },// random job id
  type: { type: String, required: true, unique: true },//means which type of scraping
  senderSocketId: { type: String, required: true },//web user
  receiverSocketId: { type: String, required: true },//app user
  payload: { type: Object, required: true },// info required for scraping
  result: { type: Object },// scraping data
  status: { type: String, enum: JOB_STATUS },// job completion status
}, { timestamps: true });


module.exports = mongoose.model('jobs', jobSchema);

