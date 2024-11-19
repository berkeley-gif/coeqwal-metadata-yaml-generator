import YamlConfigForm from "@/components/YamlConfigForm";
import prisma from "@/lib/prisma";

const initialState = {
  id: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  study_name: "",
  alias: "",
  url: "",
  created: new Date(),
  last_modified: new Date(),
  version: "0.0.1",
  provenance_baseline_source: "",
  provenance_source_access_date: new Date(),
  dependencies: [],
};

export default async function YamlConfigOverview() {

  const dependencies = await prisma.dependency.findMany();
  const assumptionKinds = await prisma.assumptionKind.findMany();

  return (
    <main>
      <YamlConfigForm
        config={initialState}
        dependencies={dependencies}
        assumptionKinds={assumptionKinds}
      />
    </main>
  );
}
