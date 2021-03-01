import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'GET') {
    const { db } = await connectToDatabase();

    const allUsers = await db.collection('usersdata').find().toArray();
    const sortedUsers = allUsers.sort((a, b) => a.level > b.level ? -1 : 1);

    return res.status(200).json(sortedUsers);

  }

  return res.status(400).json({ message: 'Invalid method' });
}