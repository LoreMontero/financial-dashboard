import { connectToDatabase } from '../../lib/mysql'; // Adjust the import path as necessary

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
      const connection = await connectToDatabase();
      const [rows] = await connection.execute('SELECT * FROM Users WHERE username = ?', [username]);

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const user = rows[0];

      // Check if the password matches directly
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Successful login
      return res.status(200).json({ message: 'Login successful', userID: user.userID });

    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}



