/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { jwtDecode } from "jwt-decode";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "./shared/card-wrapper";
import { FormError } from "./shared/form-error";
import { FormSuccess } from "./shared/form-success";
import { Button } from "./ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const LoginFrom = () => {
  const [error, setError] = useState<string | undefined>("");

  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "abtahihasan@gmail.com",
      password: "123456",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    console.log(values);
    startTransition(() => {
      login(values)
        .then((data: any) => {
          console.log("login", data?.data?.data?.accessToken);
          if (data?.data.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.data?.success) {
            form.reset();

            const user = jwtDecode(data?.data?.data?.accessToken);
            dispatch(
              setUser({ user: user, token: data?.data?.data?.accessToken })
            );
            setSuccess(data?.data?.message);
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          console.log(error);
          setError("Something went wrong");
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
