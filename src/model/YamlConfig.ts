import { YamlConfig } from "@prisma/client";
import { Dayjs } from "dayjs";

// re-export YamlConfig from Prisma
export type { YamlConfig };

export type YamlConfigFrontend = {
  id: string;
  createdAt: Dayjs;
  updatedAt: Dayjs;
  study_name: string;
  alias: string;
  url: string;
  created: Dayjs;
  last_modified: Dayjs;
  version: number;
  provenance_source: string;
  provenance_source_access_or_creation_date: Dayjs;
};