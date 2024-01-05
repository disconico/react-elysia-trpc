/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./src/auth/lucia").Auth;
  type DatabaseUserAttributes = {
    username: string;
    is_admin: boolean;
  };
  type DatabaseSessionAttributes = {};
}
