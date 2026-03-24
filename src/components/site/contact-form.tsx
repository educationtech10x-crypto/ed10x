"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { contactSchema, type ContactPayload, adTypes, budgetRanges } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = React.useState(false);

  const form = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      adType: "Digital Ads",
      budgetRange: "₹10k–₹25k",
      message: "",
    },
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  React.useEffect(() => {
    const service = searchParams.get("service");
    if (service && adTypes.includes(service as (typeof adTypes)[number])) {
      setValue("adType", service as ContactPayload["adType"], { shouldValidate: true });
    }
  }, [searchParams, setValue]);

  async function onSubmit(values: ContactPayload) {
    try {
      setSubmitting(true);
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      toast.success("Request sent. We’ll reach out shortly.");
      form.reset({
        ...form.getValues(),
        name: "",
        company: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <Input placeholder="Your name" {...register("name")} />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <Input placeholder="Company / brand" {...register("company")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" error={errors.phone?.message}>
          <Input placeholder="Phone number" inputMode="tel" {...register("phone")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input placeholder="you@company.com" inputMode="email" {...register("email")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ad Type" error={errors.adType?.message}>
          <Select
            value={watch("adType")}
            onValueChange={(v) => setValue("adType", v as ContactPayload["adType"], { shouldValidate: true })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ad type" />
            </SelectTrigger>
            <SelectContent>
              {adTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Budget Range" error={errors.budgetRange?.message}>
          <Select
            value={watch("budgetRange")}
            onValueChange={(v) =>
              setValue("budgetRange", v as ContactPayload["budgetRange"], { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Message" error={errors.message?.message}>
        <Textarea placeholder="What are you promoting? Which city/campus? Timeline? Goal?" {...register("message")} />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 text-white/45">
          By submitting, you agree to be contacted by ED10X about your request.
        </p>
        <Button type="submit" disabled={submitting} className="sm:min-w-[180px]">
          {submitting ? "Sending..." : "Send Request"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <Label>{label}</Label>
        {error ? <span className="text-xs text-red-300">{error}</span> : null}
      </div>
      <div className={cn("mt-2")}>{children}</div>
    </div>
  );
}

