export const ENDPOINT_URL = {
  LOGIN_URL: "auth/login",
  SIGNUP: "auth/register",
  PROFILE: "user/profile",
  GET_POST_LIST: "posts",
  GET_DETAIL_POST: "posts",
  CREATE_POST: "posts",
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
