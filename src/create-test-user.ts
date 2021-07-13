import bcrypt from "bcryptjs";
import { User } from "../src/model/userModel";
import Role from "../src/mongodb/role";

export default createTestUser;

async function createTestUser() {
  // create test user if the db is empty

  const user = new User({
    first_name: "Dawid",
    subname: "Szklanka",
    login: "DDDAwid123",
    password: bcrypt.hashSync("trudne.haslo123", 10), //zmienic na asynchć
    role: Role.User,
  });
  await user.save();
}

/*
    const user = new User({
        first_name: 'Administrator_1',
        subname: 'Nazwisko',
        login: 'login_1',
        password: bcrypt.hashSync('trudne.haslo123', 10),
        role: Role.User
    });
    await user.save();





        const user = new User({
        first_name: 'Administrator_2',
        subname: 'Kowalski',
        login: 'login_Administratora',
        password: bcrypt.hashSync('trudne.haslo123', 10),
        role: Role.Admin
    });
    await user.save();


    const user = new User({
        first_name: 'Użytkownik',
        subname: 'Nazwisko',
        login: 'Dobry login',
        password: bcrypt.hashSync('trudne.haslo123', 10),
        role: Role.User
    });
    await user.save();

    const user = new User({
        first_name: 'Magda',
        subname: 'Woda',
        login: 'Magddda',
        password: bcrypt.hashSync('trudne.haslo123', 10),
        role: Role.User
    });
    await user.save();


    const user = new User({
        first_name: 'Dawid',
        subname: 'Szklanka',
        login: 'DDDAwid123',
        password: bcrypt.hashSync('trudne.haslo123', 10),
        role: Role.User
    });
    await user.save();

    */
