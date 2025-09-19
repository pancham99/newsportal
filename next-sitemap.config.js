module.exports = {
  siteUrl: "https://www.topbriefing.in",
  generateRobotsTxt: true,
  additionalPaths: async (config) => [
    await config.transform(config, "/topnews"),
  ],
};