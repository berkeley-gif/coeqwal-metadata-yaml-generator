import { YamlConfig } from "@prisma/client";
import { z } from "zod";

// re-export YamlConfig from Prisma
export type { YamlConfig };

export const schema = z.object({
  study_name: z.string().min(1),
  alias: z.string(),
  url: z.string(),
  created: z.date(),
  last_modified: z.date(),
  version: z.string(),
  provenance_baseline_source: z.string(),
  provenance_source_access_date: z.date(),
});

export const toYAML = (yamlConfig: YamlConfig) => {
  return `study_name: ${yamlConfig.study_name}
alias: ${yamlConfig.alias}
url: ${yamlConfig.url}
created: ${yamlConfig.created.toISOString().substring(0, 10)}
last_modified: ${yamlConfig.last_modified.toISOString().substring(0, 10)}
version: ${yamlConfig.version}
provenance:
  baseline_source: ${yamlConfig.provenance_baseline_source}
  source_access_date: ${yamlConfig.provenance_source_access_date.toISOString().substring(0, 4)}
`;
};