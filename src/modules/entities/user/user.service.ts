import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export interface UserToken {
    token: string;
    user: any;
}

@Component()
export class UserService {
    constructor(
        @Inject('UserRepositoryToken') private userRepository: Repository<User>
    ) {}

    async listAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    async getById(id: number) {
        try {
            const found = await this.userRepository.findOneById(id);
            return found;
        } catch (err) {
            console.error('no user with id ' + id);
        }
    }

    async register(info: User): Promise<UserToken> {
        const encryptedPassword: string = await this.bcryptHash(info.password);
        const userToCreate: User = this.userRepository.create({
            email: info.email,
            userName: info.userName,
            password: encryptedPassword,
        });
        const createdUser = await this.userRepository.save(userToCreate);
        const token = await this.signJwtToken({user: createdUser});
        return { token, user: createdUser };
    }
    
    async login(userName: string, password: string): Promise<UserToken> {
        const foundUser = await this.userRepository.findOne({userName: userName});
        const passwordIsCorrect = await this.bcryptCompare(password, foundUser.password);
        if (passwordIsCorrect) {
            const token = await this.signJwtToken({user: foundUser});
            return { token, user: foundUser };
        } else {
            throw new Error('Supplied password didn\'t match the encrypted one');
        }
    }  

    async signJwtToken(payload: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            jwt.sign(payload, process.env.SECRET_HASH_KEY, (err: Error, encoded: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(encoded);
                }
            });
        });
    }

    async bcryptCompare(clearPassword: string, encrypted: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            bcrypt.compare(clearPassword, encrypted, (err, itIsTheSame) =>{
                if (err) {
                    return reject(err);
                }
                return resolve(itIsTheSame);
            });
        });
    }

    async bcryptHash(stringToEncrypt: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            bcrypt.hash(stringToEncrypt, 10, (hashingError: Error, encrypted: string) => {
                if (hashingError) {
                    reject(hashingError);
                } else {
                    resolve(encrypted);
                }
            });
        });
    }
}