import UserRepository from "./user.repository.js";
import { generatePassword } from "../../utils/pwd.js";

const UserRepositoryInst = new UserRepository();

export default class UserService {
  constructor() {}

  async createUser(payload) {
    const newPayload = {
      email: payload.email,
      password: generatePassword(payload.password, "1"),
    };

    const data = await UserRepositoryInst.create(newPayload);
    return data.id;
  }

  async getListUser() {
    const data = await UserRepositoryInst.getList();
    return data;
  }

  async deleteUser(id) {
    await UserRepositoryInst.delete(id);
    return;
  }
}
