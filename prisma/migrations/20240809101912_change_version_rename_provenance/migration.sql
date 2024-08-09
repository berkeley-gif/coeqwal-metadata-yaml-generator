-- AlterTable
ALTER TABLE "YamlConfig" ALTER COLUMN "version" SET DEFAULT '',
ALTER COLUMN "version" SET DATA TYPE TEXT;

ALTER TABLE "YamlConfig" RENAME COLUMN "provenance_source" TO "provenance_baseline_source";
ALTER TABLE "YamlConfig" RENAME COLUMN "provenance_source_access_or_creation_date" TO "provenance_source_access_date";