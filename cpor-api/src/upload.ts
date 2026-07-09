const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders,
  });
}

function sanitizeFileName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w.\-]/g, "_");
}

export async function handleUpload(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    console.log("====================================");
    console.log("NOVO UPLOAD");
    console.log("====================================");

    const form = await request.formData();

    const password = form.get("password");
    const prefix = form.get("prefix");

    console.log("Password:", password);
    console.log("Prefix:", prefix);

    if (typeof password !== "string") {
      return json(
        {
          success: false,
          message: "Senha não enviada.",
        },
        400
      );
    }

    if (typeof prefix !== "string") {
      return json(
        {
          success: false,
          message: "Álbum inválido.",
        },
        400
      );
    }

    console.log(
      "Senha correta:",
      password.trim() === env.UPLOAD_PASSWORD.trim()
    );

    if (password.trim() !== env.UPLOAD_PASSWORD.trim()) {
      return json(
        {
          success: false,
          message: "Senha inválida.",
        },
        401
      );
    }

    const files = form.getAll("files");

    console.log("Arquivos recebidos:", files.length);

    if (files.length === 0) {
      return json(
        {
          success: false,
          message: "Nenhum arquivo enviado.",
        },
        400
      );
    }

    let uploaded = 0;

    for (const item of files) {
      if (!(item instanceof File)) {
        console.log("Item ignorado (não é File)");
        continue;
      }

      console.log("--------------------------------");
      console.log("Arquivo:", item.name);
      console.log("Tipo:", item.type);
      console.log("Tamanho:", item.size);

      if (!item.type.startsWith("image/")) {
        console.log("Ignorado (não é imagem)");
        continue;
      }

      const fileName =
        `${crypto.randomUUID()}-${sanitizeFileName(item.name)}`;

      const key = `${prefix}/${fileName}`;

      console.log("KEY:", key);

      await env.CPOR_BUCKET.put(
        key,
        await item.arrayBuffer(),
        {
          httpMetadata: {
            contentType: item.type,
          },
        }
      );

      console.log("PUT concluído");

      const object = await env.CPOR_BUCKET.head(key);

      console.log("HEAD:", object);

      uploaded++;
    }

    const objects = await env.CPOR_BUCKET.list({
      prefix,
    });

    console.log("====================================");
    console.log("OBJETOS NO PREFIX:");
    console.log(
      objects.objects.map((o) => o.key)
    );
    console.log("====================================");

    return json({
      success: true,
      uploaded,
    });
  } catch (error) {
    console.error("ERRO NO UPLOAD");
    console.error(error);

    return json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Erro interno.",
      },
      500
    );
  }
}