-- =============================================================================
-- Mayonity — production MySQL (phpMyAdmin / mysql CLI)
-- Run AFTER deploying code that includes SEO + blog view-counter changes.
--
-- Mark each block when done (comment with date), then commit this file:
--   -- EXECUTED 2026-11-12 rizwan
--
-- Order: run section 1 before using admin SEO fields on live.
--        run section 2 only if blog sitemap lastmod is still wrong.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1) REQUIRED — Service & Portfolio SEO columns (run once)
--    Skip if columns already exist (use CHECK below first).
--    Status: [ ] not run
-- -----------------------------------------------------------------------------

-- CHECK (optional):
-- SHOW COLUMNS FROM `Service` LIKE 'seoTitle';
-- SHOW COLUMNS FROM `Portfolio` LIKE 'seoTitle';

ALTER TABLE `Service`
  ADD COLUMN `seoTitle` VARCHAR(191) NULL AFTER `name`,
  ADD COLUMN `metaDescription` TEXT NULL AFTER `seoTitle`;

ALTER TABLE `Portfolio`
  ADD COLUMN `seoTitle` VARCHAR(191) NULL AFTER `name`,
  ADD COLUMN `metaDescription` TEXT NULL AFTER `seoTitle`;


-- -----------------------------------------------------------------------------
-- 2) OPTIONAL — Blog updatedAt inflated by old “increment views” code
--    Deploy fixes views so updatedAt is not bumped on every visit.
--    This only fixes EXISTING wrong dates in the database.
--    Status: [ ] not run  |  [ ] skipped (not needed)
--
--    WARNING: Sets updatedAt to publish time for all rows with publishedAt.
--            Do NOT run if you rely on updatedAt for posts edited after publish.
--            Prefer per-slug UPDATEs (see section 2b).
-- -----------------------------------------------------------------------------

-- 2a) Bulk fix (review first):
-- UPDATE `BlogPost`
-- SET `updatedAt` = COALESCE(`publishedAt`, `createdAt`)
-- WHERE `publishedAt` IS NOT NULL;

-- 2b) Safer — one post at a time:
-- UPDATE `BlogPost`
-- SET `updatedAt` = `publishedAt`
-- WHERE `slug` = 'your-post-slug' AND `publishedAt` IS NOT NULL;


-- -----------------------------------------------------------------------------
-- No other SQL required for:
--   - sitemap static URLs (no lastModified)
--   - view counter without touching updatedAt
--   - Search Console (DNS TXT) / optional GA4 env / OG default image
-- -----------------------------------------------------------------------------
