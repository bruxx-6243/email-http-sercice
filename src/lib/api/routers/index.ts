import { emailRouter as emails } from "@/lib/api/routers/email.router";
import { logRouter as logs } from "@/lib/api/routers/log.router";

export default [
  {
    path: "/send",
    router: emails,
  },
  {
    path: "/logs",
    router: logs,
  },
];
