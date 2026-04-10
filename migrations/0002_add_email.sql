-- Migration: Add customer_email to orders for user dashboard
-- Run this in Cloudflare Dashboard > D1 > Console

ALTER TABLE orders ADD COLUMN customer_email TEXT DEFAULT '';
