
module.exports = (controller) => {
    return (request, response, next) => {
      console.log('1')
      controller(request, response, next).catch(next);
    };
  };
  