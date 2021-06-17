const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('mongodb/db');


module.exports = {
    authenticate,
    getById
};

async function authenticate({ login, password, ipAddress }) {
    const user = await db.User.findOne({ login });

    if (!user) {
        throw 'Nieprawidłowy login';
    }
    if (!bcrypt.compareSync(password, user.password)) {
        throw 'Nieprawidłowe hasło';
    }

    const jwtToken = Token(user);
    return { 
        //...informations(user),
        jwtToken,
    };
}


function Token(user) {
    return jwt.sign({ sub: user.id, id: user.id }, config.secret, { expiresIn: '15m' });
}

async function getById(id) {
    const user = await getUser(id);
    return informations(user);
}

function informations(user) {
    const { id, first_name, subname, login, role } = user;
    return { id, first_name, subname, login, role };
}