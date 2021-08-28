
const model = require('./model');

let getStoreByFilter = (filter) => {
  return model.findOne(filter);
};

let newObj = (data) => {
  return new model(data);
};

let getStores = async (countryCode) => {
  let $or = [{ 'scope.isGlobal': true }];
  if (countryCode) $or.push({ 'scope.countryCode': countryCode });

  return model.find({ $or });
};

let deleteEmptyStores = () => {
  return model.deleteMany({
    featuredApps: { $size: 0 },
    tryNew: { $size: 0 },
    peopleAreLoving: { $size: 0 },
    banners: { $size: 0 },
    topCategories: { $size: 0 }
  });
};

let removeApps = async (appIds) => {
  if (!Array.isArray(appIds)) appIds = [appIds];
  await model.updateMany(
    {
      $or: [
        { featuredApps: { $in: appIds } },
        { tryNew: { $in: appIds } },
        { peopleAreLoving: { $in: appIds } },
        { 'banners.appId': { $in: appIds } }
      ]
    },
    {
      $pull: {
        featuredApps: { $in: appIds },
        tryNew: { $in: appIds },
        peopleAreLoving: { $in: appIds },
        banners: { appId: { $in: appIds } }
      }
    }
  );
  await deleteEmptyStores();
};

let removeCategory = async (categoryId) => {
  await model.updateMany(
    {
      topCategories: categoryId
    },
    {
      $pull: {
        topCategories: categoryId
      }
    }
  );
  await deleteEmptyStores();
};

let removeBannersByAppId = async (appId) => {
  await model.updateMany(
    {
      'banners.appId': appId
    },
    {
      $pull: {
        banners: { appId: appId }
      }
    }
  );
  await deleteEmptyStores();
};

module.exports = {
  getStoreByFilter,
  newObj,
  getStores,
  removeApps,
  removeCategory,
  removeBannersByAppId
};
