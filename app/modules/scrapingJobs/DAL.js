const model = require('./model')


const saveJob = (data) => {
  return new model(data);
}

const updateJob = (filter, data, options) => {
  return model.updateOne(filter, data, options);
}

const deleteJob = (filter) => {
  return model.deleteOne(filter);
}

const getOneJob = (filter) => {
  return model.findOne(filter).select('-__v').lean();
}

module.exports = {
  saveJob,
  updateJob,
  deleteJob,
  getOneJob
}