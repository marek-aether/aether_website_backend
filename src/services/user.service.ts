import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ContestApplication } from 'src/models/application.schema';
import { User } from 'src/models/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async updateUser(userId: string, body: Partial<User>) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid ID format');
    }

    const filteredBody = Object.fromEntries(
      Object.entries(body).filter(([_, v]) => v !== '' && v !== null),
    );

    const updated = await this.userModel.findByIdAndUpdate(
      userId,
      filteredBody,
      {
        new: true,
      },
    );

    return updated;
  }

  async submitContestApplication(
    userId: string,
    body: Partial<ContestApplication>,
  ) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid ID format');
    }

    const user = await this.userModel.findById(userId);
    const userApplications = user.applications;
    const price = user.hasDiscount
      ? 100 - 20 - (userApplications.length + 1) * 10
      : 100 - (userApplications.length + 1) * 10;

    const updated = await (
      await this.userModel.findByIdAndUpdate(
        userId,
        { applications: [...userApplications, body], applicationPrice: price },
        {
          new: true,
        },
      )
    ).save();

    return updated.applications;
  }
}
