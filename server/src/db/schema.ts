import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  message: text("message").notNull(),
  author: text("author").notNull(),
});

// https://orm.drizzle.team/docs/zod
export const insertPostSchema = createInsertSchema(posts);
export const selectPostSchema = createSelectSchema(posts);

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  postId: integer("postId")
    .references(() => posts.id)
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  message: text("message").notNull(),
});

export const insertCommentSchema = createInsertSchema(comments);
export const selectCommentSchema = createSelectSchema(comments);
