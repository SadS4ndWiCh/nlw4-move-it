import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '../../../utils/database';

import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'GET') {
    const { name } = req.query;

    if(!name) {
      return res.status(400).json({ message: 'Missing `name` data' });
    }

    const { db } = await connectToDatabase();

    const user = await db.collection('usersdata').findOne({ name });

    if(!user) {
      return res.status(200).json({ message: `Not found user with ${name} name` });
    }

    return res.status(200).json(user);
    
  } else if(req.method === 'PUT') {
    const session = await getSession({ req });
    if(!session) {
      return res.status(401).json({ message: 'You don\'t has Authorization' });
    }

    const { name } = req.query;
    const { level, currentExperience, challangesCompleted } = req.body;

    if((!level && level !== 0) || (!currentExperience && currentExperience !== 0) || (!challangesCompleted && challangesCompleted !== 0)) {
      return res.status(400).json({ message: 'Incompleted request' });
    }

    const { db } = await connectToDatabase();

    await db.collection('usersdata').updateOne({ name }, {
      $set: {
        level,
        currentExperience,
        challangesCompleted,
      }
    });

    return res.status(200).json({ message: 'ok' });
  }

  res.status(400).json({ message: 'Invalid method' });

}