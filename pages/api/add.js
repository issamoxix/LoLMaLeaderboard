import nextConnect from "next-connect";
import middleware from "../../util/put_data";

const handler = nextConnect();
handler.use(middleware);
export default handler;
