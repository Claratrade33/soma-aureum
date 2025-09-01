let users = [];

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.plan = null;
        this.balance = 0;
    }
}

module.exports = { users, User };