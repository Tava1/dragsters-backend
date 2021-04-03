import 'dotenv/config';

export default {
  jwt: {
    secret: String(process.env.SECRET_JWT),
    expiresIn: '1d',
  },
};
