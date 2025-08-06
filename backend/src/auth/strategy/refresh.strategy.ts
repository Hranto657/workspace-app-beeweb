import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, StrategyOptionsWithRequest } from "passport-jwt";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "src/common/types/tokens.type";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor(config: ConfigService) {
    const refreshSecret = config.get<string>("JWT_REFRESH_SECRET");

    if (!refreshSecret) {
      throw new Error("JWT_REFRESH_SECRET is not defined");
    }

    super({
      jwtFromRequest: (req: Request) => {
        if (!req.cookies?.refreshToken) {
          throw new UnauthorizedException("No refresh token provided");
        }
        return req.cookies.refreshToken;
      },
      secretOrKey: refreshSecret,
      passReqToCallback: true,
    } satisfies StrategyOptionsWithRequest);
  }

  validate(req: Request, payload: JwtPayload) {
    return payload;
  }
}
