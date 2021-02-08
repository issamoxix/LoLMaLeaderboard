import nextConnect from "next-connect";
import middleware from "../../util/dbc";

const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => {
  let doc = await req.db;
  let data = req.query;
  let ct = await req.ct;
  res.json({
    data: doc,
    ct: ct,
  });
  // res.json(doc);
});
export default handler;
