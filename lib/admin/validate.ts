import type { ZodType } from "zod";

export async function parseJsonBody<T>(
  request: Request,
  schema: ZodType<T>
): Promise<{ data: T; error?: undefined } | { data?: undefined; error: Response }> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return { error: Response.json({ success: false, message: "Malformed request." }, { status: 400 }) };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      if (!errors[key]) errors[key] = issue.message;
    }
    return {
      error: Response.json({ success: false, message: "Please check the highlighted fields.", errors }, { status: 422 }),
    };
  }

  return { data: parsed.data };
}
