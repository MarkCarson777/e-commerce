"use client";

import { Field, Formik, Form, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signIn } from "@/firebase/auth";
import { useRouter } from "next/navigation";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={toFormikValidationSchema(SignInSchema)}
        onSubmit={async (values) => {
          const { result, error } = await signIn(values.email, values.password);

          if (error) {
            return console.log("Error signing in", error);
          }

          console.log("Successfully signed in", result);
          return router.push("/");
        }}
      >
        {() => (
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
            <button type="submit">Sign in</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
