import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, integer, varchar, bigint, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  message: text("message").notNull(),
  author: text("author").notNull(),
});

export const postsRelations = relations(posts, ({ many }) => ({
  comments: many(comments),
}));

// https://orm.drizzle.team/docs/zod
export const insertPostSchema = createInsertSchema(posts);
export const selectPostSchema = createSelectSchema(posts);

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  postId: integer("postId")
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  message: text("message").notNull(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));

export const insertCommentSchema = createInsertSchema(comments);
export const selectCommentSchema = createSelectSchema(comments);

export const user = pgTable("auth_user", {
  id: varchar("id", {
    length: 15, // change this when using custom user ids
  }).primaryKey(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  email: text("enail").notNull().unique(),
  isAdmin: boolean("isAdmin").default(false),
  // other user attributes
});

export const session = pgTable("user_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});

export const key = pgTable("user_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
});
