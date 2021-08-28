
const DAL = require('./DAL');
const userService = require('../user/service');
const categoryService = require('../category/service');
const appService = require('../app/service');
const categorySectionService = require('../categorySection/service');

const { ERROR_CODES } = require('./error');
const AppError = require('../../utils/appError');

let getStoreForUser = async (userId, countryCode, languageCode) => {
  if (!userId) return getStore(countryCode, languageCode);

  let result = await userService.getUserCountryAndLanguage(userId);
  return getStore(result.countryCode || countryCode, languageCode || result.languageCode);
};

let getStoreForAdmin = async (countryCode, languageCode) => {
  return getStore(countryCode, languageCode);
};

let getStore = async (countryCode, languageCode) => {
  let stores = await DAL.getStores(countryCode);
  let result;

  for (let store of stores) {
    if (!result || (result.scope.isGlobal && store.scope.countryCode))
      result = store;
  }
  if (!result) return {};

  let appsIds = [].concat(result.featuredApps, result.tryNew, result.peopleAreLoving);
  let bannerAppIds = result.banners.map(banner => banner.appId);
  let topCategoryIds = result.topCategories;

  let [bannerApps, categories, categoryTopApps] = await Promise.all([
    appService.getByIds(bannerAppIds, { select: 'name categoryId icon urls images.banners description', languageCode }),
    categoryService.getAllActive({ select: 'name icon color', map: true, languageCode }),
    categorySectionService.getTopAppsByCategoryIds(topCategoryIds, countryCode)
  ]);

  for (let categoryId in categoryTopApps) appsIds = appsIds.concat(categoryTopApps[categoryId]);
  let apps = await appService.getByIds(appsIds, { languageCode });

  result = result.toJSON();
  result.topCategories = Object.keys(categoryTopApps).map(categoryId => ({ id: categoryId, topApps: categoryTopApps[categoryId] }));
  result.allCategories = Object.keys(categories);

  return {
    result: result,
    dictionary: {
      apps: { ...apps, ...bannerApps },
      categories: { ...categories }
    }
  };
};

let update = async (data) => {
  let filter = { scope: data.scope };

  let store = await DAL.getStoreByFilter(filter);
  if (!store) store = DAL.newObj(filter);

  if (data.illustration) store.illustration = data.illustration;

  let appsFilter = { isActive: true };
  if (!data.scope.isGlobal) appsFilter.countryCode = data.scope.countryCode;

  let promises = [];
  if (data.featuredApps)
    promises[0] = appService.getCount({ ...appsFilter, ids: data.featuredApps });
  if (data.tryNew)
    promises[1] = appService.getCount({ ...appsFilter, ids: data.tryNew });
  if (data.peopleAreLoving)
    promises[2] = appService.getCount({ ...appsFilter, ids: data.peopleAreLoving });
  if (data.topCategories)
    promises[3] = categoryService.getCount({ ids: data.topCategories, isActive: true });
  if (data.banners) {
    promises[4] = appService.getByFilter({
      ...appsFilter,
      ids: data.banners.map(banner => banner.appId)
    }, { map: true });
  }

  let [
    featuredAppsCount,
    tryNewAppsCount,
    peopleAreLovingAppsCount,
    categoriesCount,
    bannerApps
  ] = await Promise.all(promises);

  if (data.featuredApps) {
    if (featuredAppsCount != data.featuredApps.length)
      throw new AppError(ERROR_CODES.INVALID_IDS_IN_FEATURED_APPS);

    store.featuredApps = data.featuredApps;
  }
  if (data.tryNew) {
    if (tryNewAppsCount != data.tryNew.length)
      throw new AppError(ERROR_CODES.INVALID_IDS_IN_TRY_NEW_APPS);

    store.tryNew = data.tryNew;
  }
  if (data.peopleAreLoving) {
    if (peopleAreLovingAppsCount != data.peopleAreLoving.length)
      throw new AppError(ERROR_CODES.INVALID_IDS_IN_PEOPLE_LOVING_APPS);

    store.peopleAreLoving = data.peopleAreLoving;
  }
  if (data.topCategories) {
    if (categoriesCount != data.topCategories.length)
      throw new AppError(ERROR_CODES.INVALID_IDS_IN_TOP_CATEGORIES);

    store.topCategories = data.topCategories;
  }
  if (data.banners) {
    if (Object.keys(bannerApps).length != data.banners.length)
      throw new AppError(ERROR_CODES.INVALID_APP_IDS_IN_BANNERS);

    for (let banner of data.banners) {
      if (!bannerApps[banner.appId].images.banners.id(banner.bannerId))
        throw new AppError(ERROR_CODES.INVALID_BANNER_IDS_IN_BANNERS);
    }

    store.banners = data.banners;
  }

  return store.save();
};

module.exports = {
  getStoreForUser,
  getStoreForAdmin,
  update
};
