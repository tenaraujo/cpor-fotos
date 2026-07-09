import { handleUpload } from "./upload";

const PUBLIC_URL =
  "https://pub-08ee869e987a4011bdba919e5c698f33.r2.dev";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // ============================
    // CORS
    // ============================

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers,
      });
    }

    // ============================
    // Health Check
    // ============================

    if (url.pathname === "/") {
      return Response.json(
        {
          status: "ok",
          service: "CPOR API",
        },
        {
          headers,
        }
      );
    }

    // ============================
    // Autenticação
    // ============================

    if (
      url.pathname === "/api/auth" &&
      request.method === "POST"
    ) {
      const body = await request.json<{
        password: string;
      }>();

      return Response.json(
        {
          valid:
            body.password === env.UPLOAD_PASSWORD,
        },
        {
          headers,
        }
      );
    }

    // ============================
    // Listar Fotos
    // ============================

    if (
      url.pathname === "/api/photos" &&
      request.method === "GET"
    ) {
      const prefix =
        url.searchParams.get("prefix") ?? "";

      const objects =
        await env.CPOR_BUCKET.list({
          prefix,
        });

      const photos = objects.objects.map(
        (object) => ({
          key: object.key,
          url: `${PUBLIC_URL}/${object.key}`,
          size: object.size,
          uploaded: object.uploaded,
        })
      );

      return Response.json(photos, {
        headers,
      });
    }

    // ============================
    // Upload
    // ============================

    if (
      url.pathname === "/api/upload" &&
      request.method === "POST"
    ) {
      return handleUpload(request, env);
    }

    // ============================
    // 404
    // ============================

    return Response.json(
      {
        error: "Not Found",
      },
      {
        status: 404,
        headers,
      }
    );
  },
} satisfies ExportedHandler<Env>;