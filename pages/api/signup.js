// pages/api/signup.js
import User from '../../models/User.js'; // Adjust the path if necessary

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password, email, dob } = req.body;

    console.log('Received data:', req.body);

    try {
      // Check if the user already exists
      const existingUser1 = await User.findOne({ where: { email } });
      const existingUser2 = await User.findOne({ where: { username } });
      if (existingUser1) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      if (existingUser2) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      // Create a new user
      const newUser = await User.create({
        username,
        password, 
        email,
        dob,
      });

      res.status(201).json({ message: 'User created successfully', userId: newUser.id });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

