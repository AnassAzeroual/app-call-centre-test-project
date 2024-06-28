import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtPayload } from "./jwt-payload-interface";
import { AuthService } from "./auth.service";

export class JwtStartegy extends PassportStrategy(Strategy) {
    constructor(private srvAuth : AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'eyJsb2dpbiI6InIiLCJuYW1lIjoiTEFCUkFETyBSVUJFTiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwMTU1MzI4OSwiZXhwIjoxNjAxNTU2ODg5fQ'
        });
    }

    async validate(payload: jwtPayload): Promise<any> {
        const { email } = payload;
        const user = this.srvAuth.users.find(v => v.email === email)

        if (!user) throw new UnauthorizedException()
        return await user
    }
} 