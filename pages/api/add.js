import nextConnect from "next-connect";
import middleware from "../../util/put_data";

const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => {
  let doc = await req.db;
  let data = req.query;
});
export default handler;
