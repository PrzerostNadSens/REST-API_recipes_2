import passport from "passport";
import bcrypt from "bcryptjs";
import { User } from "../model/userModel";
import { BasicStrategy } from "passport-http";

enum Strategy {
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

passport.use(Strategy.Basic, basicStrategy);

const auth = {
  authenticate: (strategies: Array<Strategy>) => {
    return passport.authenticate(strategies, { session: false });
  },
};

export { Strategy, auth };
