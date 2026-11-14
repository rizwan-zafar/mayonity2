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
-- 3) REQUIRED — Service FAQs column (run once)
--    Status: [ ] not run
-- -----------------------------------------------------------------------------

-- CHECK (optional):
-- SHOW COLUMNS FROM `Service` LIKE 'faqs';

-- ALTER TABLE `Service`
--   ADD COLUMN `faqs` TEXT NULL AFTER `features`;

-- UPDATE `Service` SET `faqs` = '[]' WHERE `faqs` IS NULL;

-- ALTER TABLE `Service`
--   MODIFY COLUMN `faqs` TEXT NOT NULL;


-- -----------------------------------------------------------------------------
-- 4) REQUIRED — Rename suggestions-solutions service slug (run once)
--    Status: [ ] not run
-- -----------------------------------------------------------------------------

-- UPDATE `Service`
-- SET
--   `slug` = 'it-consulting',
--   `name` = 'IT Consulting & Digital Strategy'
-- WHERE `slug` = 'suggestions-solutions';


-- -----------------------------------------------------------------------------
-- 5) REQUIRED — Location landing pages table (run once)
--    Status: [ ] not run
-- -----------------------------------------------------------------------------

-- CHECK (optional):
-- SHOW TABLES LIKE 'Location';

-- CREATE TABLE `Location` (
--   `id` INTEGER NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(191) NOT NULL,
--   `slug` VARCHAR(191) NOT NULL,
--   `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
--   `sortOrder` INTEGER NOT NULL DEFAULT 0,
--   `seoTitle` VARCHAR(191) NULL,
--   `metaDescription` TEXT NULL,
--   `eyebrow` VARCHAR(191) NULL,
--   `h1` VARCHAR(191) NOT NULL,
--   `intro` TEXT NOT NULL,
--   `whyTitle` VARCHAR(191) NULL,
--   `whyBody` TEXT NOT NULL,
--   `processTitle` VARCHAR(191) NULL,
--   `processBody` TEXT NOT NULL,
--   `industries` TEXT NOT NULL,
--   `cities` TEXT NOT NULL,
--   `faqs` TEXT NOT NULL,
--   `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--   `updatedAt` DATETIME(3) NOT NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE INDEX `Location_slug_key`(`slug`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- -----------------------------------------------------------------------------
-- 6) REQUIRED — Blog post team author (run once)
--    Status: [ ] not run
-- -----------------------------------------------------------------------------

-- CHECK (optional):
-- SHOW COLUMNS FROM `BlogPost` LIKE 'teamMemberId';

-- ALTER TABLE `BlogPost`
--   ADD COLUMN `teamMemberId` INTEGER NULL AFTER `authorId`,
--   ADD INDEX `BlogPost_teamMemberId_idx`(`teamMemberId`),
--   ADD CONSTRAINT `BlogPost_teamMemberId_fkey`
--     FOREIGN KEY (`teamMemberId`) REFERENCES `TeamMember`(`id`)
--     ON DELETE SET NULL ON UPDATE CASCADE;


-- -----------------------------------------------------------------------------
-- No other SQL required for:
--   - sitemap static URLs (no lastModified)
--   - view counter without touching updatedAt
--   - Search Console (DNS TXT) / optional GA4 env / OG default image
-- -----------------------------------------------------------------------------
