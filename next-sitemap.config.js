// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://your-domain.com', // ← 여기 실제 배포 주소로 변경 (예: vercel 도메인)
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
};
