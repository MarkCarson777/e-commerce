"use client";

import { Field, Formik, Form } from "formik";
import { signIn } from "@/firebase/auth";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          const { result, error } = await signIn(values.email, values.password);

          if (error) {
            return console.log("Error signing in", error);
          }

          console.log("Successfully signed in", result);
          return router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <Field
              name="email"
              type="email"
              placeholder="Email..."
              autoComplete="email"
            />
            <Field
              name="password"
              type="password"
              placeholder="Password..."
              autoComplete="current-password"
            />
            <button type="submit" disabled={isSubmitting}>
              Sign in
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
