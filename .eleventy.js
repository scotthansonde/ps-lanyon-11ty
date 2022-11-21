const { readFileSync } = require('fs')
const { DateTime } = require('luxon')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

function format(date, str) {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(str)
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('dateToString', (date) => {
    return format(date, 'dd LLL yyyy') // 09 Oct 1986
  })
  eleventyConfig.addFilter('htmlDateString', (date) => {
    return format(date, 'yyyy-LL-dd') // 1986-10-09
  })
  eleventyConfig.addFilter('dateToFolders', (date) => {
    return format(date, 'yyyy/LL/dd') // 1986/10/09
  })

  eleventyConfig.addFilter('limit', function (arr, limit) {
    return arr.slice(0, limit)
  })

  eleventyConfig.addFilter('post_permalink', (page) => {
    const yyyy = page.date.getFullYear()
    const mm = String(page.date.getMonth() + 1).padStart(2, '0')
    const dd = String(page.date.getDate()).padStart(2, '0')
    return `${yyyy}/${mm}/${dd}/${page.fileSlug}/`
  })

  for (const f of ['css', 'public', 'admin/']) {
    eleventyConfig.addPassthroughCopy(f)
  }

  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = readFileSync('_site/404.html')

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404)
          res.end()
        })
      },
    },
  })
}
