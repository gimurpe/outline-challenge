import { Get, JsonController, QueryParam, Res } from "routing-controllers";
import { IUser } from "outline-challenge-shared/models";
import { faker } from "@faker-js/faker";
import { Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "0Tl1n3"; // For dev purposes, this should be generated differently

function seedUser(): IUser {
  const res: IUser = { id: "", name: "", email: "", password: "" };

  return {
    id: faker.database.mongodbObjectId(),
    email: "prologin@prologin.com",
    name: "Pro Login",
    password: "ProLogin123456",
  };
}

const userData: IUser = seedUser();

@JsonController("/auth")
export class AuthController {
  @Get("/login")
  getContacts(
    @QueryParam("email", { required: true }) email: string,
    @QueryParam("password", { required: true }) password: string,
    @Res() res: Response
  ): IUser {
    if (userData.email === email && userData.password === password) {
      const token = jwt.sign(
        { id: userData.id, email: userData.email }, // Payload
        JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Options
      );
      // Protect agains XSS attacks
      res.cookie("authToken", token, {
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        secure: false, // Ensures the cookie is sent over HTTPS
        sameSite: "strict", // Protects against CSRF attacks
      });
      return userData;
    } else {
      throw new Error("Invalid Login Information");
    }
  }
}
