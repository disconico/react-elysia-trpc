/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./src/auth/lucia").Auth;
  type DatabaseUserAttributes = {
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
  };
  type DatabaseSessionAttributes = {};
}
