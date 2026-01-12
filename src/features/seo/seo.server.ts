import { wpFetch } from "@/lib/wpFetch";
import { SeoContext, SeoResponse } from "./seo.types";

function buildSeoParams(context: SeoContext): Record<string, string> {
  const params: Record<string, string> = {
    type: context.type,
  };

  if ("id" in context) {
    params.id = String(context.id);
  }

  return params;
}

export async function getSeo(context: SeoContext): Promise<SeoResponse> {
  const params = buildSeoParams(context);

  return wpFetch<SeoResponse>("/headless/v1/seo", params, { revalidate: 300 });
}
