import nextConnect from "next-connect";
import middleware from "../../util/get_sum";

const handler = nextConnect();
handler.use(middleware);

export default handler;
