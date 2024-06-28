import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStartegy } from './jwt.startegy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: "eyJsb2dpbiI6InIiLCJuYW1lIjoiTEFCUkFETyBSVUJFTiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwMTU1MzI4OSwiZXhwIjoxNjAxNTU2ODg5fQ",
      signOptions: {
        expiresIn: 3600 * 12 // 1h
      }
    }),
  ],
  providers: [
    AuthService,
    JwtStartegy,
  ],
  exports: [
    JwtStartegy,
    PassportModule
  ],
  controllers: [AuthController]
})
export class AuthModule { }
