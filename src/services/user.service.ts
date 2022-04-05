import { INewUser } from '../types/userTypes';
const User = require('../models/users');

export const addUserService = async (newUser: INewUser) => {
  try {
    return await User.create(newUser);
  } catch (err) {
    throw new Error('Failed to register user');
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await User.findOne({email:email});
  } catch (err) {
    throw new Error('Can not find a user');
  }
};