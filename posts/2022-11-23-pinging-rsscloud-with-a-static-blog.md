---
title: Pinging RSSCloud with a static blog
date: 2022-11-23T19:07:07.923Z
tags:
  - post
---
O﻿ne way to connect a blog to RSS readers and communities is to ping an RSSCloud server whenever your feed changes. But with the Jamstack model of triggering deploys to a static site hoster, I wasn't sure how to implement that, and a web search did not offer much help.

H﻿owever, my hoster Netlify offers serverless functions (as do similar hosters like Vercel, Cloudflare, DigitalOcean, etc.).  Specifically, I can run a [function on a "deploy-successful" event,](https://docs.netlify.com/functions/trigger-on-events/) so I know the blog has just been rebuilt. RSSCloud expects a POST request, so I can send that off with node-fetch.

js

const fetch = require("node-fetch");



const handler = async function (event, _context) {

try {

const params = new URLSearchParams();

params.append("url", "https://scotthanson.de/feed.xml");



const response = await fetch("http://rpc.rsscloud.io:5337/ping", {

method: "POST",

headers: { Accept: "application/json" },

body: params,

});

const data = await response.json();

console.log(data);

} catch (error) {

// output to netlify function log

console.log(error);

}

};



module.exports = { handler };
