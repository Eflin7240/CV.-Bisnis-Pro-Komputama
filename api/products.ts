import type { VercelRequest, VercelResponse } from "@vercel/node";
import pool from "./db";

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        const { rows } = await pool.query(`
            SELECT
                p.id,
                p.name,
                p.brand,
                p.selling_price,
                p.stock_qty,
                p.description,
                p.created_at,
                c.name AS category_name
            FROM products p
            LEFT JOIN categories c
                ON c.id = p.category_id
            WHERE p.show_on_web = true
            ORDER BY p.created_at DESC
        `);

        for (const product of rows) {
            const photos = await pool.query(
                `
                SELECT id, photo_url
                FROM product_photos
                WHERE product_id=$1
                `,
                [product.id]
            );

            product.photos = photos.rows;
            product.category = product.category_name ?? "Umum";
            product.in_stock = product.stock_qty > 0;
        }

        res.status(200).json(rows);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
}