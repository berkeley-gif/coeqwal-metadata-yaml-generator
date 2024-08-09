import { YamlConfig } from "@prisma/client";
import { z } from "zod";

// re-export YamlConfig from Prisma
export type { YamlConfig };

export const schema = z.object({
  study_name: z.string(),
  alias: z.string(),
  url: z.string(),
  created: z.date(),
  last_modified: z.date(),
  version: z.number(),
  provenance_source: z.string(),
  provenance_source_access_or_creation_date: z.date(),
});