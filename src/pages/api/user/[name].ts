import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;

  if(!name) {
    return res.status(400).json({ message: 'Missing `name` data' });
  }

  if(req.method === 'GET') {
    const { db } = await connectToDatabase();

    const user = await db.collection('usersdata').findOne({ name });

    if(!user) {
      return res.status(404).json({ message: `Not found user with ${name} name` });
    }

    return res.status(200).json(user);
  }

  res.status(400).json({ message: 'Invalid method' });

}