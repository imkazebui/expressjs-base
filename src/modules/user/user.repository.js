import User from "./user.model.js";

export default class UserRepository {
  constructor() {}

  async create(data) {
    const user = await User.create(data);
    return user;
  }

  async getList() {
    const users = await User.findAll();
    return users;
  }

  async delete(id) {
    await User.destroy({
      where: {
        id,
      },
    });
    return;
  }
}
