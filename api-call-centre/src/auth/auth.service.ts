import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { jwtPayload } from './jwt-payload-interface';
import { Users } from 'entities/Users';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private repoUsers: Repository<Users>,
        private srvJWT: JwtService
    ) { }s

    /* -------------------------------------------------------------------------- */
    /*                                    login                                   */
    /* -------------------------------------------------------------------------- */
    async signup(data: { login: string, password: string }): Promise<{ accessToken: string }> {
        // const salt = await bcrypt.genSalt(); // Not now

        const res = await this.repoUsers.findAndCount({where:{email:data.login,password:data.password}});
        const exist = res[1]
        const check = (exist === 1) ? true : false
        if (!check) {
            throw new UnauthorizedException('Invalid Credentials!')
        }
        const user = res[0][0]
        const payload: jwtPayload = {
            login: user.email,
            name: `${user.firstName} ${user.lastName}`,
            roles: user.role,
        }
        const accessToken = await this.srvJWT.sign(payload)
        return { accessToken }
    }

    /* -------------------------------------------------------------------------- */
    /*                                Hash Password                               */
    /* -------------------------------------------------------------------------- */
    private async hashPassword(pass: string, salt: string) {
        return await bcrypt.hash(pass, salt)
    }
}
