// dependency library
const HttpsProxyAgent = require('https-proxy-agent');
const axios = require('axios');

// feature modules
const DAL = require("./DAL");
const { ERROR_CODES } = require("./error");
const AppError = require("../../../lib/errorClasses/appError");
const service = require('./../services/proxyIp')



const scrapStory = async (headers, userId) => {

  let endCursors = '';
  let res;
  let response = await service.getProxyIP();
  console.log('proxy response : ', response.status);
  if (response.status === 200) {

    const proxy = response.data.data.proxies[0].split(':');
    const instance = axios.create({
      httpsAgent: new HttpsProxyAgent({ host: proxy[0], port: proxy[1] })
    })

    let config = {
      method: 'get',
      url: `https://www.instagram.com/graphql/query/?query_hash=90709b530ea0969f002c86a89b4f2b8d&variables={"reel_ids":["${userId}"],"tag_names":[],"location_ids":[],"highlight_reel_ids":[],"precomposed_overlay":true,"show_story_viewer_list":true,"story_viewer_fetch_count":50,"story_viewer_cursor":"","stories_video_dash_manifest":false}`,
      headers: headers
    };

    try {
      res = await instance(config);
    }
    catch (e) {
      throw new AppError(ERROR_CODES.ERROR_FROM_INSTA_STORY_SERVER);
    }

    console.log("story completion scraping Done! ", userId, res.data, res.data.data.reels_media[0].items.length);
    return res.data.data.reels_media[0].items;

  } else {
    throw new AppError(ERROR_CODES.ERROR_FROM_PROXY_SERVER);
  }

}



let getStory = async ({ userId }) => {

  //TODO: get cookies from DB
  const cookies = await DAL.getCookies();

  if (!cookies)
    throw new AppError(ERROR_CODES.COOKIES_NOT_AVAILABLE);

  // console.log('cookies : ', cookies)

  // let headers = {
  //   "Host": "www.instagram.com",
  //   "UserAgent": "Instagram 9.5.1 (iPhone9,2; iOS 10_0_2; en_US; en-US; scale=2.61; 1080x1920)",
  //   "Language": "en-US,en;q=0.5",
  //   "Encoding": "gzip, deflate, br",
  //   "Accept": "application/json;charset=utf-8",
  //   "gzip": true,
  //   "CSRFToken": "",
  //   "AppID": "",
  //   "WWWClaim": "",
  //   "RequestedWith": "",
  //   "Connection": "keep-alive",
  //   "Cookie": cookies[0].cookies,
  //   "TE": "Trailers",
  //   "sessionId": "26700140-badf-11eb-8bb0-490d9f5677c5"
  // }
  let storyData = await scrapStory({ "Cookie": cookies[0].cookies }, userId);

  return storyData.map((story) => {
    return {
      display_resources: story.display_resources,
      video_resources: story.video_resources || []
    }
  });

};


module.exports = {
  getStory
};


// `https://www.instagram.com/graphql/query/?query_hash=90709b530ea0969f002c86a89b4f2b8d&variables={"reel_ids":["${userId}"],"tag_names":[],"location_ids":[],"highlight_reel_ids":[],"precomposed_overlay":true,"show_story_viewer_list":true,"story_viewer_fetch_count":50,${endCursors.length === 0 ? '"story_viewer_cursor"' + ':""' : '"story_viewer_cursor":' + endCursors},"stories_video_dash_manifest":false}`