import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { RefreshToken, RefreshTokenDocument } from '../schemas/refresh-token.schema';

@Injectable()
export class AuthRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(RefreshToken.name) private tokenModel: Model<RefreshTokenDocument>,
    ) { }

    async findUserByEmailOrPhone(identifier: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ emailOrPhone: identifier }).exec();
    }

    async findUserById(id: string | Types.ObjectId): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    async createCustomerIdentity(data: Partial<User>): Promise<UserDocument> {
        const createdUser = new this.userModel({ ...data, role: 'CUSTOMER' });
        return createdUser.save();
    }

    async saveRefreshToken(userId: string | Types.ObjectId, tokenHash: string, expiresAt: Date): Promise<RefreshTokenDocument> {
        const createdToken = new this.tokenModel({ userId, tokenHash, expiresAt });
        return createdToken.save();
    }

    async findRefreshToken(tokenHash: string): Promise<RefreshTokenDocument | null> {
        return this.tokenModel.findOne({ tokenHash, isRevoked: false }).exec();
    }

    async revokeRefreshToken(tokenId: string | Types.ObjectId): Promise<void> {
        await this.tokenModel.findByIdAndUpdate(tokenId, { isRevoked: true }).exec();
    }
}
