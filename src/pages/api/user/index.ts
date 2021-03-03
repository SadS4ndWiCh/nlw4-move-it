import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    const { name } = req.body;
    if(!name) {
      return res.status(400).json({ message: 'Missing `name` of user' });
    }

    const { db } = await connectToDatabase();

    const userExists = await db.collection('usersdata').findOne({ name });

    if(userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const newUser = await db.collection('usersdata').insertOne({
      name,
      level: 1,
      currentExperience: 0,
      challangesCompleted: 0,
    });

    return res.status(200).json(newUser.ops[0]);
  }

  res.status(400).json({ message: 'Invalid method' });
}