import prisma from "@/lib/prisma";

import { notFound } from 'next/navigation'


export default async function YamlConfigView({ params }: { params: { id: string } }) {

  const yamlConfig = await prisma.yamlConfig.findUnique({
    where: {
      id: params.id
    }
  });

  if (!yamlConfig) {
    return notFound()
  }

  return <main>
    <h1>
      YAML Config
    </h1>
    <div>
      <pre>
        {JSON.stringify(yamlConfig, null, 2)}
      </pre>
    </div>
  </main>
}