CREATE TYPE "public"."Job_Info_Experience_level" AS ENUM('Intern', 'Entry', 'Mid', 'Senior');--> statement-breakpoint
CREATE TYPE "public"."question_question_level" AS ENUM('Easy', 'Medium', 'Hard');--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"imageUrl" varchar NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_Info" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"title" varchar NOT NULL,
	"experience_level" "Job_Info_Experience_level" NOT NULL,
	"description" varchar NOT NULL,
	"userId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interview" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"jobId" uuid NOT NULL,
	"duration" varchar NOT NULL,
	"humChartId" varchar,
	"feedback" varchar
);
--> statement-breakpoint
CREATE TABLE "question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"title" varchar NOT NULL,
	"experience_level" "question_question_level" NOT NULL,
	"jobId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "job_Info" ADD CONSTRAINT "job_Info_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview" ADD CONSTRAINT "interview_jobId_job_Info_id_fk" FOREIGN KEY ("jobId") REFERENCES "public"."job_Info"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_jobId_job_Info_id_fk" FOREIGN KEY ("jobId") REFERENCES "public"."job_Info"("id") ON DELETE cascade ON UPDATE no action;