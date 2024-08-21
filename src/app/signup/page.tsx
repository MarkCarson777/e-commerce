"use client";

import { Field, Formik, Form, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { signUp } from "@/firebase/auth";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/Button";
import { User as FirebaseUser } from "firebase/auth";
import { useUserContext } from "@/context/UserContext";

type SignUpValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, "Must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords didn't match",
        path: ["confirmPassword"],
      });
    }
  });

export default function Page() {
  const { createUser } = useUserContext();
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <Formik<SignUpValues>
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={toFormikValidationSchema(SignUpSchema)}
        onSubmit={async (values: SignUpValues) => {
          const { result, error } = await signUp(values.email, values.password);

          if (result) {
            const user: FirebaseUser = result.user;
            await createUser(user);
          }

          if (error) {
            return console.log("Error signing up user", error);
          }

          console.log("Successfully signed up user", result);
          return router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <>
            <Form className="flex flex-col">
              <Field
                name="email"
                type="email"
                placeholder="Email..."
                autoComplete="email"
              />
              <ErrorMessage name="email" />
              <Field
                name="password"
                type="password"
                placeholder="Password..."
                autoComplete="new-password"
              />
              <ErrorMessage name="password" />
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm password..."
                autoComplete="confirm-password"
              />
              <ErrorMessage name="confirmPassword" />
              <Button
                type="submit"
                disabled={isSubmitting}
                color="primary"
                pending={isSubmitting}
              >
                <span>Sign up</span>
              </Button>
            </Form>
            <div className="flex gap-1 text-xs">
              <span>Already have an account?</span>
              <Link className="underline hover:no-underline" href="/signin">
                Sign In
              </Link>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
