import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import axios from 'axios';

import { connectToDatabase } from '../../../utils/database';
import { signIn } from 'next-auth/client';

interface SignInUserData {
  id: number;
  name: string;
  email?: string;
  image?: string;
}

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,

  callbacks: {
    async signIn(user: SignInUserData, account: any, profile: any) {
      const { db } = await connectToDatabase();
      const userExists = await db.collection('usersdata').findOne({ name: user.name });

      if(!userExists) {
        await db.collection('usersdata').insertOne({
          name: user.name,
          avatarUrl: user.image,

          level: 1,
          currentExperience: 0,
          challangesCompleted: 0,
        });
      }

      return true;
    },
  },

  debug: false,
}

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => NextAuth(req, res, options);