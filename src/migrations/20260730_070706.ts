import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_seo_settings_disabled_rules" AS ENUM('title', 'meta-description', 'url', 'headings', 'content', 'images', 'linking', 'social', 'schema', 'readability', 'quality', 'secondary-keywords', 'cornerstone', 'freshness', 'technical', 'accessibility', 'ecommerce');
  CREATE TYPE "public"."enum_seo_settings_sitemap_priority_overrides_changefreq" AS ENUM('daily', 'weekly', 'monthly', 'yearly');
  CREATE TYPE "public"."enum_seo_settings_sitemap_default_changefreq" AS ENUM('daily', 'weekly', 'monthly', 'yearly');
  CREATE TYPE "public"."enum_seo_settings_breadcrumb_separator" AS ENUM('>', '/', '»', '→');
  CREATE TYPE "public"."enum_seo_redirects_type" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_seo_performance_source" AS ENUM('csv', 'api', 'manual');
  CREATE TYPE "public"."enum_seo_logs_type" AS ENUM('404', 'redirect', 'error');
  CREATE TABLE "pages_focus_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"keyword" varchar
  );
  
  CREATE TABLE "_pages_v_version_focus_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"keyword" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "posts_focus_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"keyword" varchar
  );
  
  CREATE TABLE "_posts_v_version_focus_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"keyword" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "seo_score_history" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"document_id" varchar NOT NULL,
  	"collection" varchar NOT NULL,
  	"score" numeric NOT NULL,
  	"level" varchar,
  	"focus_keyword" varchar,
  	"word_count" numeric,
  	"checks_summary" jsonb,
  	"snapshot_date" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "seo_settings_ignored_slugs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings_disabled_rules" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_seo_settings_disabled_rules",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "seo_settings_sitemap_excluded_slugs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings_sitemap_priority_overrides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug_pattern" varchar NOT NULL,
  	"priority" numeric NOT NULL,
  	"changefreq" "enum_seo_settings_sitemap_priority_overrides_changefreq"
  );
  
  CREATE TABLE "seo_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar,
  	"thresholds_title_length_min" numeric,
  	"thresholds_title_length_max" numeric,
  	"thresholds_meta_desc_length_min" numeric,
  	"thresholds_meta_desc_length_max" numeric,
  	"thresholds_min_words_generic" numeric,
  	"thresholds_min_words_post" numeric,
  	"thresholds_keyword_density_min" numeric,
  	"thresholds_keyword_density_max" numeric,
  	"thresholds_flesch_score_pass" numeric,
  	"thresholds_slug_max_length" numeric,
  	"sitemap_default_changefreq" "enum_seo_settings_sitemap_default_changefreq" DEFAULT 'weekly',
  	"sitemap_default_priority" numeric,
  	"robots_custom_rules" varchar,
  	"breadcrumb_enabled" boolean DEFAULT true,
  	"breadcrumb_home_label" varchar DEFAULT 'Accueil',
  	"breadcrumb_separator" "enum_seo_settings_breadcrumb_separator" DEFAULT '>',
  	"breadcrumb_show_on_home" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "seo_redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"type" "enum_seo_redirects_type" DEFAULT '301',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "seo_performance" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"query" varchar,
  	"clicks" numeric DEFAULT 0,
  	"impressions" numeric DEFAULT 0,
  	"ctr" numeric DEFAULT 0,
  	"position" numeric DEFAULT 0,
  	"date" timestamp(3) with time zone NOT NULL,
  	"source" "enum_seo_performance_source" DEFAULT 'manual'
  );
  
  CREATE TABLE "seo_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"type" "enum_seo_logs_type" DEFAULT '404',
  	"count" numeric DEFAULT 1,
  	"last_seen" timestamp(3) with time zone,
  	"referrer" varchar,
  	"user_agent" varchar,
  	"ignored" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages" ADD COLUMN "is_cornerstone" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "focus_keyword" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_is_cornerstone" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_focus_keyword" varchar;
  ALTER TABLE "posts" ADD COLUMN "is_cornerstone" boolean DEFAULT false;
  ALTER TABLE "posts" ADD COLUMN "focus_keyword" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_is_cornerstone" boolean DEFAULT false;
  ALTER TABLE "_posts_v" ADD COLUMN "version_focus_keyword" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "seo_score_history_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "seo_settings_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "seo_redirects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "seo_performance_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "seo_logs_id" integer;
  ALTER TABLE "pages_focus_keywords" ADD CONSTRAINT "pages_focus_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_focus_keywords" ADD CONSTRAINT "_pages_v_version_focus_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_focus_keywords" ADD CONSTRAINT "posts_focus_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_focus_keywords" ADD CONSTRAINT "_posts_v_version_focus_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_ignored_slugs" ADD CONSTRAINT "seo_settings_ignored_slugs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_disabled_rules" ADD CONSTRAINT "seo_settings_disabled_rules_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_sitemap_excluded_slugs" ADD CONSTRAINT "seo_settings_sitemap_excluded_slugs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_sitemap_priority_overrides" ADD CONSTRAINT "seo_settings_sitemap_priority_overrides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_focus_keywords_order_idx" ON "pages_focus_keywords" USING btree ("_order");
  CREATE INDEX "pages_focus_keywords_parent_id_idx" ON "pages_focus_keywords" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_focus_keywords_order_idx" ON "_pages_v_version_focus_keywords" USING btree ("_order");
  CREATE INDEX "_pages_v_version_focus_keywords_parent_id_idx" ON "_pages_v_version_focus_keywords" USING btree ("_parent_id");
  CREATE INDEX "posts_focus_keywords_order_idx" ON "posts_focus_keywords" USING btree ("_order");
  CREATE INDEX "posts_focus_keywords_parent_id_idx" ON "posts_focus_keywords" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_focus_keywords_order_idx" ON "_posts_v_version_focus_keywords" USING btree ("_order");
  CREATE INDEX "_posts_v_version_focus_keywords_parent_id_idx" ON "_posts_v_version_focus_keywords" USING btree ("_parent_id");
  CREATE INDEX "seo_score_history_document_id_idx" ON "seo_score_history" USING btree ("document_id");
  CREATE INDEX "seo_score_history_collection_idx" ON "seo_score_history" USING btree ("collection");
  CREATE INDEX "seo_score_history_snapshot_date_idx" ON "seo_score_history" USING btree ("snapshot_date");
  CREATE INDEX "seo_settings_ignored_slugs_order_idx" ON "seo_settings_ignored_slugs" USING btree ("_order");
  CREATE INDEX "seo_settings_ignored_slugs_parent_id_idx" ON "seo_settings_ignored_slugs" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_disabled_rules_order_idx" ON "seo_settings_disabled_rules" USING btree ("order");
  CREATE INDEX "seo_settings_disabled_rules_parent_idx" ON "seo_settings_disabled_rules" USING btree ("parent_id");
  CREATE INDEX "seo_settings_sitemap_excluded_slugs_order_idx" ON "seo_settings_sitemap_excluded_slugs" USING btree ("_order");
  CREATE INDEX "seo_settings_sitemap_excluded_slugs_parent_id_idx" ON "seo_settings_sitemap_excluded_slugs" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_sitemap_priority_overrides_order_idx" ON "seo_settings_sitemap_priority_overrides" USING btree ("_order");
  CREATE INDEX "seo_settings_sitemap_priority_overrides_parent_id_idx" ON "seo_settings_sitemap_priority_overrides" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_updated_at_idx" ON "seo_settings" USING btree ("updated_at");
  CREATE INDEX "seo_settings_created_at_idx" ON "seo_settings" USING btree ("created_at");
  CREATE INDEX "seo_redirects_from_idx" ON "seo_redirects" USING btree ("from");
  CREATE INDEX "seo_redirects_updated_at_idx" ON "seo_redirects" USING btree ("updated_at");
  CREATE INDEX "seo_redirects_created_at_idx" ON "seo_redirects" USING btree ("created_at");
  CREATE INDEX "seo_performance_url_idx" ON "seo_performance" USING btree ("url");
  CREATE INDEX "seo_performance_query_idx" ON "seo_performance" USING btree ("query");
  CREATE INDEX "seo_performance_date_idx" ON "seo_performance" USING btree ("date");
  CREATE INDEX "seo_logs_url_idx" ON "seo_logs" USING btree ("url");
  CREATE INDEX "seo_logs_updated_at_idx" ON "seo_logs" USING btree ("updated_at");
  CREATE INDEX "seo_logs_created_at_idx" ON "seo_logs" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_seo_score_history_fk" FOREIGN KEY ("seo_score_history_id") REFERENCES "public"."seo_score_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_seo_settings_fk" FOREIGN KEY ("seo_settings_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_seo_redirects_fk" FOREIGN KEY ("seo_redirects_id") REFERENCES "public"."seo_redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_seo_performance_fk" FOREIGN KEY ("seo_performance_id") REFERENCES "public"."seo_performance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_seo_logs_fk" FOREIGN KEY ("seo_logs_id") REFERENCES "public"."seo_logs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_seo_score_history_id_idx" ON "payload_locked_documents_rels" USING btree ("seo_score_history_id");
  CREATE INDEX "payload_locked_documents_rels_seo_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("seo_settings_id");
  CREATE INDEX "payload_locked_documents_rels_seo_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("seo_redirects_id");
  CREATE INDEX "payload_locked_documents_rels_seo_performance_id_idx" ON "payload_locked_documents_rels" USING btree ("seo_performance_id");
  CREATE INDEX "payload_locked_documents_rels_seo_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("seo_logs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_focus_keywords" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_focus_keywords" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_focus_keywords" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_focus_keywords" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_score_history" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings_ignored_slugs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings_disabled_rules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings_sitemap_excluded_slugs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings_sitemap_priority_overrides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_redirects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_performance" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_logs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_focus_keywords" CASCADE;
  DROP TABLE "_pages_v_version_focus_keywords" CASCADE;
  DROP TABLE "posts_focus_keywords" CASCADE;
  DROP TABLE "_posts_v_version_focus_keywords" CASCADE;
  DROP TABLE "seo_score_history" CASCADE;
  DROP TABLE "seo_settings_ignored_slugs" CASCADE;
  DROP TABLE "seo_settings_disabled_rules" CASCADE;
  DROP TABLE "seo_settings_sitemap_excluded_slugs" CASCADE;
  DROP TABLE "seo_settings_sitemap_priority_overrides" CASCADE;
  DROP TABLE "seo_settings" CASCADE;
  DROP TABLE "seo_redirects" CASCADE;
  DROP TABLE "seo_performance" CASCADE;
  DROP TABLE "seo_logs" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_seo_score_history_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_seo_settings_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_seo_redirects_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_seo_performance_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_seo_logs_fk";
  
  DROP INDEX "payload_locked_documents_rels_seo_score_history_id_idx";
  DROP INDEX "payload_locked_documents_rels_seo_settings_id_idx";
  DROP INDEX "payload_locked_documents_rels_seo_redirects_id_idx";
  DROP INDEX "payload_locked_documents_rels_seo_performance_id_idx";
  DROP INDEX "payload_locked_documents_rels_seo_logs_id_idx";
  ALTER TABLE "pages" DROP COLUMN "is_cornerstone";
  ALTER TABLE "pages" DROP COLUMN "focus_keyword";
  ALTER TABLE "_pages_v" DROP COLUMN "version_is_cornerstone";
  ALTER TABLE "_pages_v" DROP COLUMN "version_focus_keyword";
  ALTER TABLE "posts" DROP COLUMN "is_cornerstone";
  ALTER TABLE "posts" DROP COLUMN "focus_keyword";
  ALTER TABLE "_posts_v" DROP COLUMN "version_is_cornerstone";
  ALTER TABLE "_posts_v" DROP COLUMN "version_focus_keyword";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "seo_score_history_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "seo_settings_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "seo_redirects_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "seo_performance_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "seo_logs_id";
  DROP TYPE "public"."enum_seo_settings_disabled_rules";
  DROP TYPE "public"."enum_seo_settings_sitemap_priority_overrides_changefreq";
  DROP TYPE "public"."enum_seo_settings_sitemap_default_changefreq";
  DROP TYPE "public"."enum_seo_settings_breadcrumb_separator";
  DROP TYPE "public"."enum_seo_redirects_type";
  DROP TYPE "public"."enum_seo_performance_source";
  DROP TYPE "public"."enum_seo_logs_type";`)
}
