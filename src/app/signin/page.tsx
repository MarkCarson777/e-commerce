"use client";

import { Field, Formik, Form, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { signIn } from "@/firebase/auth";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/Button";

type SignInValues = {
  email: string;
  password: string;
};

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <Formik<SignInValues>
        initialValues={{ email: "", password: "" }}
        validationSchema={toFormikValidationSchema(SignInSchema)}
        onSubmit={async (values: SignInValues) => {
          const { result, error } = await signIn(values.email, values.password);

          if (error) {
            return console.log("Error signing in", error);
          }

          console.log("Successfully signed in", result);
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
                autoComplete="current-password"
              />
              <ErrorMessage name="password" />
              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting}
                pending={isSubmitting}
              >
                <span>Sign in</span>
              </Button>
            </Form>
            <div className="flex gap-1 text-xs">
              <span>Don't have an account?</span>
              <Link className="underline hover:no-underline" href="/signup">
                Sign Up
              </Link>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
