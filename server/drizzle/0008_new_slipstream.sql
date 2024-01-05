ALTER TABLE "auth_user" DROP CONSTRAINT "auth_user_enail_unique";--> statement-breakpoint
ALTER TABLE "auth_user" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "auth_user" ADD COLUMN "is_admin" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "auth_user" DROP COLUMN IF EXISTS "firstName";--> statement-breakpoint
ALTER TABLE "auth_user" DROP COLUMN IF EXISTS "lastName";--> statement-breakpoint
ALTER TABLE "auth_user" DROP COLUMN IF EXISTS "enail";--> statement-breakpoint
ALTER TABLE "auth_user" DROP COLUMN IF EXISTS "isAdmin";