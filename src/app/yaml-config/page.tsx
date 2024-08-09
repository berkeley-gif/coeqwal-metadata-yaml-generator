import prisma from "@/lib/prisma";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default async function YamlConfigOverview() {

  const yamlConfigs = await prisma.yamlConfig.findMany();

  return <main>
    <Container>
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        YAML Configs
      </Typography>
      <div>
        <Link href="/yaml-config/create" passHref><Button variant="contained">Create New Config</Button></Link>
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
    </Container>
  </main>
}