// import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

// // Define the context structure
// export type Context = {
//   // Add any specific context properties here
//   // For example, user information, authentication tokens, etc.
//   // Example: user?: User;
// };

// // Create context function
// export const createContext = async (opts: FetchCreateContextFnOptions): Promise<Context> => {
//   // Here you can extract information from the opts and construct your context
//   // For example, you can authenticate a user and add them to the context
//   // Example: const user = await authenticateUser(opts.req);

//   // Return the context object
//   console.log("Creating context with options:", opts);

//   // Context creation logic

//   const context = {
//     user: "nico",
//   };

//   console.log("Context created:", context);

//   return context;
// };
