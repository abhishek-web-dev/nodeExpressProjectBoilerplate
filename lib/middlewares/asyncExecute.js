
module.exports = (controller) => {
  return (request, response, next) => {
    controller(request, response, next).catch(next);
  };
};
