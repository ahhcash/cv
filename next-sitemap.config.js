/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ahhcash.xyz",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  exclude: ["/api/*"], // Exclude API routes
};
