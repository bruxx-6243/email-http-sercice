import { emailRouter as emails } from "@/lib/api/routers/email.router";

export default [
  {
    path: "/deliver",
    router: emails,
  },
];
