// feature modules
const model = require('./model');


const getCookies = () => {
  return model.aggregate(
    [{ $sample: { size: 1 } }]
  );
  // return model.findOne();
};



module.exports = {
  getCookies
};
