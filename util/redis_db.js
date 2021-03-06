const redis = require("redis");
export default function insert_data(name, rank_all, level) {
  function decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }

  console.log("Add to redis");
  const client = redis.createClient();
  client.on("error", function (error) {
    console.log(error);
  });
  let rka = parseInt(rank_all);
  let lvl = parseInt(level);
  const args = [
    "lolrank",
    rka === 0 ? lvl : rka,
    name && decode_utf8(name).toLowerCase(),
  ];
  client.zadd(args, function (addError, addResponse) {
    if (addError) throw addError;
    console.log(addResponse);
    client.end(true);
  });
}
