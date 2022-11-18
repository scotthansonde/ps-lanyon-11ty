const fetch = require("node-fetch");

const handler = async function () {
  try {
    const params = new URLSearchParams();
    params.append(
      "url",
      "https://astonishing-starlight-2035d3.netlify.app/feed.xml"
    );

    const response = await fetch("http://rpc.rsscloud.io:5337/ping", {
      method: "POST",
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
