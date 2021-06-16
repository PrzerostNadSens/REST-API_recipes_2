const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('mongodb/db');


module.exports = {authenticate};

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
        ...informations(user),
        jwtToken,
    };
}


function Token(user) {
    return jwt.sign({ sub: user.id, id: user.id }, config.secret, { expiresIn: '15m' });
}

function informations(user) {
    const { id, firstName, lastName, username, role } = user;
    return { id, firstName, lastName, username, role };
}