class UserService {
  async createUser(user_name, password) {
    return "User created";
  }
}

module.exports = new UserService();
