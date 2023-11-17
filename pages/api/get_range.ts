import nextConnect from "next-connect";
import middleware from "../../util/range";

const handler = nextConnect();
handler.use(middleware);

export default handler;
