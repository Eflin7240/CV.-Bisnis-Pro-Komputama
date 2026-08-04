import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./supabase.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories(name),
        product_photos(id, photo_url)
      `)
      .eq("show_on_web", true)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}