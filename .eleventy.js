module.exports = function (eleventyConfig) {
  // Static marketing pages: copied as-is, untouched by templating.
  eleventyConfig.addPassthroughCopy("src/index.html");
  eleventyConfig.addPassthroughCopy("src/psychosocial-consultancy.html");
  eleventyConfig.addPassthroughCopy("src/psychosocial-training.html");
  eleventyConfig.addPassthroughCopy("src/workplace-investigations.html");
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy("src/contact.html");
    
  // Decap CMS admin panel — copied straight through to /admin on the built site.
  eleventyConfig.addPassthroughCopy({ admin: "admin" });

  // All blog posts (files in src/blog/posts/ tagged "post" via posts.json),
  // sorted newest first, EXCLUDING whichever one is flagged featured: true.
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("post")
      .filter((post) => !post.data.featured)
      .sort((a, b) => b.date - a.date);
  });

  // The single featured post, wrapped in an array (Eleventy requires every
  // custom collection to return an array, even a one-item one). Falls back
  // to the newest post if none is flagged featured.
  eleventyConfig.addCollection("featuredPost", function (collectionApi) {
    const all = collectionApi
      .getFilteredByTag("post")
      .sort((a, b) => b.date - a.date);
    const featured = all.find((post) => post.data.featured) || all[0];
    return featured ? [featured] : [];
  });

  // Simple date formatter usable in templates: {{ post.date | readableDate }}
  eleventyConfig.addFilter("readableDate", function (dateObj) {
    return new Date(dateObj).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    // Only .njk and .md files are compiled as templates. The four .html
    // marketing pages are handled entirely by addPassthroughCopy above,
    // so they're copied byte-for-byte and never touched by templating.
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
  };
};
