const redis = require("redis");
export default function get_ladder(name) {
  const client = redis.createClient();
  client.on("error", function (error) {
    console.log(error);
  });
  client.ZREVRANK(["lolrank", name && name.toLowerCase()], (e, r) => {
    return r;
  });
}
