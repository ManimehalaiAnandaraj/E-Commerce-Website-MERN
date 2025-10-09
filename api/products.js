import Cors from 'cors';
import initMiddleware from '../utils/initMiddleware';

// Initialize CORS middleware
const cors = initMiddleware(
  Cors({
    origin: 'https://e-commerce-website-mern.vercel.app', // temporarily allow all origins
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === 'GET') {
    res.status(200).json([
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 }
    ]);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
