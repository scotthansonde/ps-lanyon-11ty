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
