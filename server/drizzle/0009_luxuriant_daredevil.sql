ALTER TABLE "auth_user" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "auth_user" ALTER COLUMN "is_admin" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "auth_user" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;