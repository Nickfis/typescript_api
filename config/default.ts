export default {
  port: 5000,
  dbUri: "mongodb://localhost:27017/sharelab_db",
  saltWorkFactor: 10,
  jwtSecret: "sharelab_init",
  accessTokenTimeToLive: "15m",
  refreshTokenTimeToLive: "1y",
};
