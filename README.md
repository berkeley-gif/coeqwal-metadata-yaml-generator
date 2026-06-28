# COEQWAL Metadata Generator (YAML Config Generator)

A web app for authoring COEQWAL study metadata and generating a YAML configuration from it. Modelers fill in a form (study name, provenance, dependencies, assumptions, etc.), the entry is stored in a database, and the app produces a copy-paste-ready YAML config.

Built with [Next.js 14](https://nextjs.org/) (App Router), React 18, [MUI 5](https://mui.com/), and [Prisma 5](https://www.prisma.io/) on PostgreSQL.

## Screenshots

Overview, lists saved configurations:

![Overview of saved scenario metadata configurations](docs/screenshots/overview.png)

---

Create a config, the metadata form:

![Create YAML Config form](docs/screenshots/create-form.png)

---

Generated YAML, with one-click copy:

![Generated YAML output with copy button](docs/screenshots/yaml-output.png)

---

## Target metadata format

We had created the shape of the metadata, `data/sample_metadata_CalSim_run_JMGeditsv01.yaml`:

```yaml
study_name: coeqwal_c2035TaiESM1H_baseline {coeqwal}_{cs3}_{operationsID}_{climate_scen}_{slr##}_{version#}
alias: cqwl_c2035TaiESM1_bl # shortened version of study_name
url: # Google Drive location - parent directory
created: 2024-07-18
last_modified: 2024-07-18
version: 0.1.0
collection: COEQWAL CalSim 3 complete model run files
project_web_site: coeqwal.org
provenance:
  baseline_filename:
  baseline_source:
  version:
  date:
  description: Developed for COEQWAL Using DWR DCR 2023 Hist Adj as base, modified hydrology to reflect TaiESM1 VIC hydrology centered on 2035
  source_access_date: 2024
dependencies:
  - WRIMS 2, release 2024-01-29
modeler_contact:
  name: J
  organization: NOAA Southwest Fisheries Science Center
  project: COEQWAL, Collaboratory for Equity in Water Allocation
  funding: University of California Climate Action Initiative
coverage: California Central Valley
description: >-
  Near term hydrologic change applied as period change factors using quantile mapping and 2021-2050 VIC hydrology from TaiESM1 LOCA2; applied to DWR DCR HistAdj baseline
version_detail: >-
  Description of code changes for this version
time_series_input:
  file_name: {SV filename}
  type: historical, climate adjusted hydrology (with climate scenario)
  version: 3.0
  description: 2023 DWR HistAdj quantile-mapped to reflect 2021-2050 VIC hydrology from TaiESM1 LOCA2
  file_location:
operations:
  alias: DWR Baseline 2023
  infrastructure:
    delta_conveyance: False
    sites: False
    los_vaqueros_enlargement: False
  general_regulatory_environment:
    - 2019 BiOp
    - 2020 ITP
    - 2018 COA Addendum
  priority_allocations:
    - M&I top priority
    - CVP Equal Cuts
  minimum_flows:
    sacramento: 0   # 0: baseline, 1, 2, 3, ... correspond to other options
    feather: 0
    yuba: 0
    american: 0
    stanislaus: 0
    tuolumne: 0
    merced: 0
    sanjoaquin: 0
assumptions:
  - name: 2020 LOD
    kind: land_use
    source:
    source_access_date:
    version: 3.0
    description: 2020 Land Use and Urban Demands
    file:
    impact_on_demands: San Joaquin Ag Reduced 10%
  - name: 15cm
    kind: slr
    version: 3.0
    description: 15cm slr
    file: Ann7inp_CS3_2040_SLR15cm_20230428_OneAPIx64.dll
ancillary_output:
  groundwater: {filenames}
postprocessing:
  performance_metrics:
    method:
    version: 3.0
    file:
keywords:
  - CalSim 3
  - water allocation
  - California
  - hydrology
  - water resources
  - adjusted hydroclimate
  - Central Valley
  - climate change
usage:
  license: CC BY 4.0
  citation: COEQWAL (2024). CalSim Water Allocation Dataset. Version 1.0. Retrieved from [URL]
  limitations: Data is simulated and may not perfectly represent real-world allocations.
quality:
  accuracy: Model accuracy assessed through comparison with historical observed data
  validation: Validated using independent datasets for selected years
  issues: Some minor discrepancies observed in regions with sparse data
scenarios_supported:
  - name: Future Delta Outflows
    origin: COEQWAL Advisory Cohort
    objective: maintain delta outflows to support critical species under near term climate change regime
    region: Delta
    relevant_supporting_operations:
    selected_variables_file:
```

The app currently generates a subset of this format (see Project status).

## Project status

The core flow works end to end: create a config in the form, it saves to PostgreSQL, and the detail page renders the generated YAML with a copy-to-clipboard button.

What the generated YAML covers today, mapped against the target format above:

| Target section | Status |
|----------------|--------|
| `study_name`, `alias`, `url`, `created`, `last_modified`, `version` | Implemented (captured, saved, emitted) |
| `dependencies` | Implemented (select existing or add new; emitted as a name list) |
| `provenance` | Partial: only `baseline_source` and `source_access_date` are captured; `baseline_filename`, `version`, `date`, `description` are not yet |
| `assumptions` | In progress: DB models (`YamlConfigAssumption`, `AssumptionKind`) and form plumbing exist, but form inputs, validation, save, and YAML output are unfinished |
| `collection`, `project_web_site`, `coverage`, `description`, `version_detail`, `keywords` | Not yet implemented |
| `modeler_contact` | Not yet implemented |
| `time_series_input` | Not yet implemented |
| `operations` (`infrastructure`, `general_regulatory_environment`, `priority_allocations`, `minimum_flows`) | Not yet implemented |
| `ancillary_output`, `postprocessing` | Not yet implemented |
| `usage`, `quality`, `scenarios_supported` | Not yet implemented |

Application-level status:

- **Create + persist:** working (server action writes to Postgres via Prisma).
- **Generate + copy YAML:** working, for the implemented fields above.
- **Read APIs:** `GET /api/yaml-config` returns all records as JSON.
- **List view (`/yaml-config`):** minimal, lists record IDs with view links only (no study name, edit, or delete).
- **Edit existing records:** not implemented. The form always creates a new record, and `/yaml-config/[id]` is a read-only YAML view.

## Tech stack

- **Framework:** Next.js 14 (App Router), TypeScript
- **UI:** MUI 5 + MUI X Date Pickers, Emotion
- **Data:** Prisma 5 ORM, PostgreSQL
- **Server logic:** Next.js server actions (`src/actions.ts`) and an API route (`src/app/api/yaml-config/route.ts`)
- **Validation / utils:** zod, dayjs, uuid

## Data model

Defined in `prisma/schema.prisma`:

- **`YamlConfig`** - a study metadata record: `study_name`, `alias`, `url`, `version`, `created`/`last_modified`, and provenance fields. Has many `Dependency` and `YamlConfigAssumption`.
- **`Dependency`** - named dependency, linked to configs (many-to-many).
- **`YamlConfigAssumption`** - an assumption with `source`, `version`, `description`, `file`, and a `kind`.
- **`AssumptionKind`** - lookup table categorizing assumptions.

## Prerequisites

- **Node.js 18.17+** (Node 20 LTS recommended)
- **Docker** (for running PostgreSQL locally), or any reachable PostgreSQL instance

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Start a local PostgreSQL database (requires Docker Desktop running):

```bash
npm run docker   # docker compose up -d, Postgres on localhost:5432
```

3. Ensure `.env.local` contains the database URL:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
```

4. Apply the database migrations:

```bash
npx prisma migrate deploy
```

5. Start the dev server:

```bash
npm run dev      # http://localhost:3000
```

> Note: the repo ships with a `postgres-data/` directory from previous local runs. If you reuse it, the database may already contain the schema and data. If you want a clean start, stop the container and remove `postgres-data/` before `npm run docker`.

## Routes

With the app running at `http://localhost:3000`:

- `/` - home
- `/yaml-config` - list saved configurations
- `/yaml-config/create` - create a new configuration
- `/yaml-config/[id]` - view/edit a configuration
- `/api/yaml-config` - returns all YAML configurations from the database (JSON)

## Changing the database schema

Use Prisma migrations:

1. Edit `prisma/schema.prisma`.
2. Generate and apply a migration:

```bash
npx prisma migrate dev --name your_migration_name
```

To generate a migration without applying it, add `--create-only`, then later run `npx prisma migrate deploy`.

## Project structure

```
src/
  actions.ts                      Server actions (create/update/link records)
  app/
    page.tsx                      Home
    yaml-config/page.tsx          List view
    yaml-config/create/page.tsx   Create form
    yaml-config/[id]/page.tsx     Edit form
    api/yaml-config/route.ts      JSON API (all configs)
  components/
    YamlConfigForm.tsx            Main metadata form
    CodeCopyPaper.tsx             Renders copy-paste YAML output
    NumberInput.tsx
  lib/prisma.ts                   Prisma client singleton
  model/YamlConfig.ts             App-side types
  theme.ts                        MUI theme
prisma/
  schema.prisma                   Data model
  migrations/                     Migration history
docker-compose.yml                Local PostgreSQL service
```
