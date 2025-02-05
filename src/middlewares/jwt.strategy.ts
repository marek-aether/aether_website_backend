import { User } from 'src/models/user.schema';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWT_SECRET } from 'src/utils/constants';
import { UserService } from 'src/services/user.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies?.token]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: { sub: string }) {
    const { password, ...restUser } = (
      await this.userModel.findById(payload.sub)
    ).toObject();

    return { userId: payload.sub, user: restUser };
  }
}
