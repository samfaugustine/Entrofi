import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Serves the gated Claude Code guide (HTML) to authenticated members only. */
export async function GET(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", "/resources/claude-code");
    return NextResponse.redirect(url);
  }

  const html = readFileSync(
    join(process.cwd(), "content/guides/claude-code.html"),
    "utf8"
  );

  return new NextResponse(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "private, no-store",
    },
  });
}
