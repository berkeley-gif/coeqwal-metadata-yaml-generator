import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function YamlConfigOverview() {

  const yamlConfigs = await prisma.yamlConfig.findMany();

  return <main>
    <h1>
      YAML Configs
    </h1>
    <div>
      <Link href="/yaml-config/create">Create New Config</Link>
    </div>
    <ul>
      {yamlConfigs.map((yamlConfig) => (
        <li key={yamlConfig.id}>
          {yamlConfig.id}
          {" "}
          <Link href={`/yaml-config/${yamlConfig.id}`}>view</Link>
        </li>
      ))}
    </ul>
  </main>
}