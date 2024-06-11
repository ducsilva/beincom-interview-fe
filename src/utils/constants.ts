export const ENDPOINT_URL = {
  LOGIN_URL: "auth/login",
  SIGNUP: "auth/register",
  PROFILE: "user/profile",
  UPLOAD_AVATAR: "user/upload-avatar",
  GET_PROFILE_USERNAME: "user/username",
  GET_POST_LIST: "posts",
  GET_DETAIL_POST: "posts",
  CREATE_POST: "posts",
  SEARCH_POST_LIST: "posts/query",
  GET_CATEGORY_LIST: "category",
  CREATE_CATEGORY: "category",
  CREATE_COMMENT: "comments",
  UPDATE_COMMENT: "comments",
  DELETE_COMMENT: "comments",
};

export const TOKEN_MANAGEMENT = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
};

export const QueryKeys = {
  GET_LIST_POST: "postList",
  GET_CATEGORY: "categoryList",
  PROFILE: "profile",
  GET_LIST_SEARCH: "searchList",
};

export enum EMenuType {
  profile = "profile",
  dailyMissions = "dailyMissions",
  manageContent = "manageContent",
  settings = "settings",
  logout = "logout",
}

export enum EnumTabs {
  home = "home",
  community = "community",
}

export enum EActionType {
  update = "update",
  delete = "delete",
}

export const DEFAULT_AVATAR =
  "https://bic-pro-entity-attribute-s3-bucket.s3.ap-southeast-1.amazonaws.com/static/user/default-avatar.png";
