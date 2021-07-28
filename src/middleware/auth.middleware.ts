import passport from "passport";
import bcrypt from "bcryptjs";
import { User } from "../model/userModel";
import { BasicStrategy } from "passport-http";
import { Strategy, ExtractJwt } from "passport-jwt";

enum StrategyOptions {
  Basic = "basic",
  Bearer = "bearer",
}

const basicStrategy = new BasicStrategy(async (login, password, done) => {
  try {
    const user = await User.findOne({ login });
    if (!user) {
      return done(null, false);
    }
    if (!(await bcrypt.compare(password, user.password!))) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

const bearerStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      done(err, null);
    }
  }
);

passport.use(StrategyOptions.Basic, basicStrategy);
passport.use(StrategyOptions.Bearer, bearerStrategy);

const auth = {
  authenticate: (strategies: Array<StrategyOptions>) => {
    return passport.authenticate(strategies, { session: false });
  },
};

export { StrategyOptions, auth };
