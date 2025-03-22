import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import {
  EntityRepository,
  UniqueConstraintViolationException,
} from '@mikro-orm/sqlite';
import { SignInResponseDto } from './dto/sign-in.dto';
import { Token } from './token';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: EntityRepository<User>,
    private readonly _jwtService: JwtService,
  ) {}

  async signIn({ username, password }: LoginDto) {
    const user = await this._userRepository.findOne(
      { username },
      { disableIdentityMap: true },
    );
    if (!user?.validatePassword(password)) {
      throw new UnauthorizedException();
    }

    return await this.createToken(user);
  }

  async signUp({ username, password }: RegisterDto) {
    const user = new User(username, password);
    try {
      await this._userRepository.getEntityManager().persistAndFlush(user);
    } catch (e: unknown) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new ConflictException('User already exists');
      }
      throw e;
    }
    return await this.createToken(user);
  }

  private async createToken(user: User): Promise<SignInResponseDto> {
    const payload: Token = {
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: await this._jwtService.signAsync(payload),
    };
  }
}
