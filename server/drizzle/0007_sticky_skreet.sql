ALTER TABLE "auth_user" RENAME COLUMN "name" TO "firstName";--> statement-breakpoint
ALTER TABLE "auth_user" ADD COLUMN "lastName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "auth_user" ADD COLUMN "isAdmin" boolean DEFAULT false;