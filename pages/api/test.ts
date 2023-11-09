// pages/api/hello.ts

import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import middleware from "../../util/test"

const handler = nextConnect();

handler.use(middleware);


handler.get(async (req, res) => {
});

export default handler;