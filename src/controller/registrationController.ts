// registration.controller.ts
import { Request, Response } from 'express';
import { AppDataSource } from "../data-source"

import { User } from '../entity/User';

export const registerUser = async (req: Request, res: Response) => {
  console.log('In Register User Route', req.body)  
  
  const { userName,password } = req.body;
  console.log(userName,password);

  // Validate input data (e.g., username and password constraints)
  if (!userName || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Create a new user entity and save it to the database
  const userRepository = AppDataSource.getRepository(User)
  
  const newUser = new User();
  newUser.email = userName;
  newUser.password = password; // Hash the password before saving (use a bcrypt library)

  try {
    await userRepository.save(newUser);
    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed. Please try again later.' });
  }
};
