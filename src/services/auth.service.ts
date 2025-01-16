import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, password }: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPassword });

    return newUser.save();
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.userModel.findOne({ email });
    const credentialsValid =
      user && (await bcrypt.compare(password, user.password));

    if (!credentialsValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { email, sub: user._id }
    const accessToken = this.jwtService.sign(payload)

    return {
      accessToken
    };
  }

  async loginWithFacebook(profile: { instagramId: string, username: string, displayName: string }) {
    // const user = await this.userModel.findOne({ instagramId: profile.instagramId });

    // if (!user) {
    //   //create user if does not exist
    // }

    // const payload = {
    //   instagramId: profile.instagramId,
    //   username: profile.username,
    //   displayName: profile.displayName,
    // };

    console.log(profile)

    // const accessToken = this.jwtService.sign(profile);

    return {
      // accessToken,
      profile
    };
  }
}
