
// feature modules
const successRes = require('./../../../lib/response/successRes');



const mergePdf = (req, res) => {
    console.log("req.body", req.body);

    res.send(successRes());
}



module.exports = {
    mergePdf
}
