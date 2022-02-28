import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Returns Email Address to prevent email harvesting
 * @return Boolean
 */
const getEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.key === 'allow') {
    res.setHeader('Cache-Control', 'public, s-max-age=31557600, immutable'); // 1 year
    res.status(200).json({ email: 'contact@mooseical.com' });
  } else {
    res.status(400).json({ email: 'error' });
  }
};

export default getEmail;
