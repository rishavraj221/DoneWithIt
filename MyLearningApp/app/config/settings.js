import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "<localhost>/api",
  },
  staging: {
    apiUrl: "<localhost>/api",
  },
  prod: {
    apiUrl: "<localhost>/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
