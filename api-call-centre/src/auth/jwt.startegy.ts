import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Repository } from "typeorm";
import { jwtPayload } from "./jwt-payload-interface";
import { Users } from "entities/Users";

export class JwtStartegy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(Users) private repoUsers: Repository<Users>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'eyJsb2dpbiI6InIiLCJuYW1lIjoiTEFCUkFETyBSVUJFTiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwMTU1MzI4OSwiZXhwIjoxNjAxNTU2ODg5fQ'
        });
    }

    validate(payload: jwtPayload): Promise<Users> {
        const { login } = payload;
        const user = this.repoUsers.findOne({where:{email:login}})

        if (!user) throw new UnauthorizedException()
        return user
    }
} 