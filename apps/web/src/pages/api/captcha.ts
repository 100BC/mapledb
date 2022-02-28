import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Verifies the ReCAPTCHA Token with Googles API
 * @return Boolean
 */
const getCaptcha = async (req: NextApiRequest, res: NextApiResponse) => {
  const verifyCaptcha = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_RECAPTCHA_KEY}&response=${req.body}`,
    { method: 'POST' }
  );

  const response = await verifyCaptcha.json();

  res.status(200).json(response.success);
};

export default getCaptcha;
