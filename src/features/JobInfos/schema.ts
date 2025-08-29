import { experienceLevels } from "@/drizzle/schema";
import { z } from "zod";
export const JobInfoFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1).nullable(),
  experienceLevel: z.enum(experienceLevels, {
    required_error: "Experience level is required",
    invalid_type_error: "Invalid Experience level is selected",
  }),
  description: z.string().min(1, "Description is required"),
});
