"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { JobInfoFormSchema } from "../JobInfoFormSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { jobInfoTable } from "@/drizzle/schema";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { createJobInfo, updateJobInfo } from "../actions";

type JobInfoFormData = z.infer<typeof JobInfoFormSchema>;
interface JobInfoFormProps {
  jobInfo?: Pick<
    typeof jobInfoTable.$inferSelect,
    "id" | "title" | "description" | "experienceLevel"
  >;
}
export default function JobInfoForm({ jobInfo }: JobInfoFormProps) {
  const form = useForm<JobInfoFormData>({
    resolver: zodResolver(JobInfoFormSchema),
    defaultValues: jobInfo ?? {
      name: "",
      title: null,
      description: "",
      experienceLevel: "Intern",
    },
  });
  async function onSubmit(data: JobInfoFormData) {
    const action = jobInfo
      ? updateJobInfo.bind(null, jobInfo.id)
      : createJobInfo;
    const res = await action(data);
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success("Job Info saved successfully");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Google" {...field} />
              </FormControl>
              <FormDescription>
                This name is displayed in the UI for easy identification
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Software Engineer"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormDescription>
                  Optional. Only enter if there is a specific job title you are
                  applying for
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem key={"Intern"} value="Intern">
                      Intern
                    </SelectItem>
                    <SelectItem key={"Junior"} value="Junior">
                      Junior
                    </SelectItem>
                    <SelectItem key={"Mid"} value="Mid">
                      Mid
                    </SelectItem>
                    <SelectItem key={"Senior"} value="Senior">
                      Senior
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The experience level required for the job you are applying for
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A Next.js 15 and React 19 full stack web developer job that uses Drizzle ORM and Postgres for database management."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Be as specific as possible as the more information you provide
                the better our accuracy would be
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full"
        >
          <LoadingSwap isLoading={form.formState.isSubmitting}>
            Save the job info
          </LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
