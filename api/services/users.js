const MongoDB = require('../../libs/mongodb');

class Users {
    constructor() {
        this.db = new MongoDB();
        this.collection = 'users';
    }

    async listUsers(params) {
        const users = await this.db.getAll(this.collection, params);
        return users || [];
    }

    async findUser(params) {
        const user = await this.db.query(this.collection, params);
        return user;
    }
}

module.exports = Users;