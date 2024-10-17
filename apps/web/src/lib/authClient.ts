import { IUser } from "outline-challenge-shared/models";

class AuthClient {
  private apiUrl = "http://localhost:4001/api/auth";

  async login(email: string, password: string): Promise<IUser> {
    const res = await fetch(
      `${this.apiUrl}/login?email=${email}&password=${password}`
    );
    if (!res.ok) {
      throw new Error("Login failed");
    }

    return res.json();
  }
}

export const authClient = new AuthClient();
