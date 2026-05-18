// Vercel Node Serverless Function entry.
// Adapts Node IncomingMessage/ServerResponse to the Web Fetch API
// and delegates to our SSR handler.
import type { IncomingMessage, ServerResponse } from "node:http";
import { Readable } from "node:stream";
import { handleRequest } from "../src/server";

export const config = {
  runtime: "nodejs20.x",
};

function buildRequest(req: IncomingMessage): Request {
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const proto = (req.headers["x-forwarded-proto"] as string) || "https";
  const url = `${proto}://${host}${req.url ?? "/"}`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, String(value));
    }
  }

  const method = req.method ?? "GET";
  const hasBody = method !== "GET" && method !== "HEAD";

  return new Request(url, {
    method,
    headers,
    body: hasBody ? (Readable.toWeb(req) as unknown as BodyInit) : undefined,
    // @ts-expect-error - Node fetch requires duplex for streamed bodies
    duplex: hasBody ? "half" : undefined,
  });
}

async function sendResponse(res: ServerResponse, response: Response): Promise<void> {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  if (!response.body) {
    res.end();
    return;
  }
  const nodeStream = Readable.fromWeb(response.body as unknown as Parameters<typeof Readable.fromWeb>[0]);
  nodeStream.pipe(res);
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const request = buildRequest(req);
    const response = await handleRequest(request);
    await sendResponse(res, response);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}
