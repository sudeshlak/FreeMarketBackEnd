import { Context } from '../types/context';
import { INewUser, IUser } from '../types/userTypes';
import CryptoJS from 'crypto-js';
import { addUserService, getUserByEmail } from '../services/user.service';
import * as jwt from 'jsonwebtoken';
import { VerifyAuthorization } from '../decorators/auth.decorator';

const Users = require('../models/users');

export class UsersController {
  async addUser(newUser: INewUser) {
    if (!await getUserByEmail(newUser.email)) {
      const passwordSha: string = CryptoJS.SHA256(newUser.password).toString(CryptoJS.enc.Hex);
      return await addUserService({ ...newUser, password: passwordSha });
    } else {
      throw new Error('Email already exists');
    }
  }

  @VerifyAuthorization
  async getUserByToken(ctx: Context, token: string) {
    const payload = <{ data: string; iat: number }>(
      jwt.verify(token, <string>process.env.auth_encryption_salt)
    );
    const email = payload['data'];
    return await getUserByEmail(email);
  }

  async login(email: string, password: string) {
    const tempUser: IUser | null = await getUserByEmail(email);
    if (!tempUser) {
      throw new Error('Invalid email address');
    } else {
      const passwordSha: string = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
      if (tempUser.password === passwordSha) {
        return tempUser;
      } else {
        throw new Error('Invalid password');
      }
    }
  }

  updateUser(inputObject: any) {
    return Users.findOneAndUpdate({ _id: inputObject.id }, inputObject.input, { new: true }).then(
      (userInfo: any) => {
        return userInfo;
      },
    );
  }
}