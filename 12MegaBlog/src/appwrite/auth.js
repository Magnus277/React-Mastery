import conf from "../conf/conf.js";
// import { useEffect } from "react";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    const userAccount = await this.account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });
    if (userAccount) {
      // log them in instantly
      return this.login({email,password});
    } else {
      return userAccount;
    }
  }

  async login( { email, password }) {
    return await this.account.createEmailPasswordSession({ email, password });
  }

  async logout() {
    try {
        await this.account.deleteSession({
        sessionId: 'current'
        })
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      return null;
    }
  }
}

const authService = new AuthService();

export default authService;
