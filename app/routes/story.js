// dependency library
const router = require('express').Router();

// feature modules
const controller = require('../modules/story/controller');
const asyncExecute = require('../../lib/middlewares/asyncExecute');


router.get('/:userId', asyncExecute(controller.getStory));
/**
 * @apiGroup STORY 
 * @apiVersion  1.0.0
 * @apiDescription API to get user instagram stories.
 * @api {get} /story/:userId get user stories
 *
 *@apiParam {String} userId Send user insta id as a path variable
 *
 *
 *@apiSuccessExample {json} Success-Response: status - 200
    {
        "statusCode": 200,
        "result": [
            {
                "display_resources": [
                    {
                        "src": "https://instagram.fmel14-2.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/254895551_171523801861836_802262100501037570_n.jpg?_nc_ht=instagram.fmel14-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=m7cVhoDW538AX8KC6tC&edm=AHlfZHwBAAAA&ccb=7-4&oh=3a92f0fa6b91bdfd5d635b3a1d449c89&oe=618C9D6C&_nc_sid=21929d",
                        "config_width": 640,
                        "config_height": 1137
                    },
                    {
                        "src": "https://instagram.fmel14-2.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/254895551_171523801861836_802262100501037570_n.jpg?_nc_ht=instagram.fmel14-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=m7cVhoDW538AX8KC6tC&edm=AHlfZHwBAAAA&ccb=7-4&oh=d6a775303ccd1e5616df3419a8170d14&oe=618C1DEC&_nc_sid=21929d",
                        "config_width": 750,
                        "config_height": 1332
                    },
                    {
                        "src": "https://instagram.fmel14-2.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/254895551_171523801861836_802262100501037570_n.jpg?_nc_ht=instagram.fmel14-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=m7cVhoDW538AX8KC6tC&edm=AHlfZHwBAAAA&ccb=7-4&oh=8cd748ba317e487079abc78c65b51910&oe=618C82CF&_nc_sid=21929d",
                        "config_width": 1080,
                        "config_height": 1919
                    }
                ],
                "video_resources": []
            }
        ]
    }
  @apiErrorExample {json} Error-Response: status - 500
    {
        "statusCode": 400,
        "error": {
            "errorDescription": "Invalid body in request",
            "type": "",
            "errorUserTitle": "",
            "errorUserMsg": "Bad Request"
        }
    }
*/


module.exports = router;