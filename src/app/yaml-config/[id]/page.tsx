import CodeCopyPaper from "@/components/CodeCopyPaper";
import prisma from "@/lib/prisma";
import { toYAML } from "@/model/YamlConfig";
import { Container, Typography } from "@mui/material";

import { notFound } from 'next/navigation';

export default async function YamlConfigView({ params }: { params: { id: string } }) {

  const yamlConfig = await prisma.yamlConfig.findUnique({
    where: {
      id: params.id
    },
    include: {
      dependencies: true
    }
  });

  if (!yamlConfig) {
    return notFound()
  }

  const yamlString = toYAML(yamlConfig);

  return <main>
    <Container>
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        COEQWAL CalSim3 Metadata
      </Typography>
      <CodeCopyPaper code={yamlString} />
    </Container>
  </main>
}