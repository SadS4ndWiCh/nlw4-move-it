import { NextApiRequest, NextApiResponse } from 'next';

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

interface SignInUserData {
  id: number;
  name: string;
  email?: string;
  image?: string;
}

interface SignInAccountData {
  provider: string;
  type: string;
  id: number;
  accessToken: string;
  accessTokenExpires?: string;
  refreshToken?: string;
  idToken?: string;
  access_token: string;
  scope: string;
  token_type: string;
}

interface ISignIn {
  user: SignInUserData,
  account: SignInAccountData;
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

  events: {
  }
}

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => NextAuth(req, res, options);