"use client";

import { AuthRoute } from "@/containers/AuthRoute";

function Page() {
  return (
    <div>
      <h1>Your account</h1>
    </div>
  );
}

export default AuthRoute(Page);
