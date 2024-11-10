import { describe, it, beforeEach, expect } from "vitest";
import {
  validatePassword,
  validateUsername,
} from "../../src/api/services/AuthService.js";

describe("Unit test for validation of password and username in UserService", () => {
  let username: string;
  let password: string;

  beforeEach(() => {
    username = "";
    password = "";
  });

  describe("Validate the username", () => {
    it("should throw an error if the username is empty", () => {
      username = "";

      expect(() => validateUsername(username)).toThrow(
        "Username must contain at least 3 non-space characters"
      );
    });

    it("should throw an error if the username only contains spaces", () => {
      username = "     ";

      expect(() => validateUsername(username)).toThrow(
        "Username must contain at least 3 non-space characters"
      );
    });

    it("should throw an error if the username has less than 3 non-space characters", () => {
      username = "ab";

      expect(() => validateUsername(username)).toThrow(
        "Username must contain at least 3 non-space characters"
      );
    });

    it("should return true for a valid username", () => {
      username = "username123";

      expect(validateUsername(username)).toBe(true);
    });

    it("should return true for a valid short username of 3 characters", () => {
      username = "abc";

      expect(validateUsername(username)).toBe(true);
    });
  });

  describe("Validate the password", () => {
    it("should throw an error if password is empty", () => {
      password = "";

      expect(() => validatePassword(password)).toThrow("Password is required");
    });

    it("should throw an error if password has only spaces", () => {
      password = "     ";

      expect(() => validatePassword(password)).toThrow("Password is required");
    });

    it("should return even if the password dont have any digits", () => {
      password = "password";

      expect(validatePassword(password)).toBe(true);
    });

    it("should return true for a valid password", () => {
      password = "password1";

      expect(validatePassword(password)).toBe(true);
    });

    it("should return true for a password with special characters and digits", () => {
      password = "P@ssw0rd123";

      expect(validatePassword(password)).toBe(true);
    });
  });
});
