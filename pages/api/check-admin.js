import { getSession } from 'next-auth/react';
import User from '@models/User';
import dbConnect from '@lib/db';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session?.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await dbConnect();

  try {
    const user = await User.findOne({ userId: session.user.id });

    if (!user || !user.roles.includes(process.env.DISCORD_ADMIN_ROLE_ID)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.status(200).json({ message: 'Authorized' });

  } catch (error) {
    console.error('Admin check failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}