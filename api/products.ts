import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from 'pg'

// DATABASE_URL diisi di Vercel Dashboard -> Project -> Settings -> Environment Variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Supabase mewajibkan koneksi SSL
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Data publik read-only, aman dibuka buat semua origin
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const result = await pool.query(`
      SELECT p.id, p.name, p.brand, p.selling_price, p.stock_qty, p.description, p.created_at,
             c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.show_on_web = true
      ORDER BY p.created_at DESC
    `)

    const products = result.rows

    for (const product of products) {
      const photosResult = await pool.query(
        'SELECT id, photo_url FROM product_photos WHERE product_id = $1',
        [product.id]
      )
      product.photos = photosResult.rows
      product.category = product.category_name || 'Umum'
      product.in_stock = Number(product.stock_qty || 0) > 0
    }

    res.status(200).json(products)
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({ message: 'Gagal mengambil data produk' })
  }
}
