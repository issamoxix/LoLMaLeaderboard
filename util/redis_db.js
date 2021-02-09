const redis = require("redis");
export default function insert_data(name, rank_all) {
  console.log("Add to redis");
  const client = redis.createClient();
  client.on("error", function (error) {
    console.log(error);
  });
  const args = ["lolrank", parseInt(rank_all), name];
  client.zadd(args, function (addError, addResponse) {
    if (addError) throw addError;
    console.log(addResponse);
    client.end(true);
  });
}
