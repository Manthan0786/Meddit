export const Gateway = process.env.GATEWAY_URL || "http://localhost:8000";

export const Endpoints = {
  AUTH: {
    GOOGLE: "/auth/google",
  },
  FEED: {
    GET_POSTS: "/feed/posts",
    CREATE_POST: "/feed/post",
    VOTE: "/feed/vote",
  },
};
