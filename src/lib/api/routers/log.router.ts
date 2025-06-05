import { readTxtFiles } from "@/lib/utils";
import { Hono } from "hono";

type LogMessage = {
  success?: boolean;
  messageId: string;
  message?: string;
  subject?: string;
};

const logRouter = new Hono();

logRouter.get("/", async (c) => {
  try {
    const contents = await readTxtFiles("./logs");

    const parsedData: LogMessage[] = contents.map((content) => {
      try {
        const parsed = JSON.parse(content);
        return {
          success: parsed.success,
          messageId: parsed.messageId,
          message: parsed.message,
          subject: parsed.subject,
        };
      } catch (error) {
        console.error(`Error parsing JSON content: ${content}`, error);
        return {
          messageId: "invalid-json",
          message: `Failed to parse content: ${content}`,
        };
      }
    });

    return c.json({ success: true, data: parsedData }, 200);
  } catch (error) {
    console.error("Error processing request:", error);
    return c.json(
      { success: false, error: "Failed to read or parse logs" },
      500
    );
  }
});

export { logRouter };
