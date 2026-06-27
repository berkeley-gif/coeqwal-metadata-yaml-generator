import prisma from "@/lib/prisma";
import { Button, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import Link from "next/link";

export default async function YamlConfigOverview() {

  const yamlConfigs = await prisma.yamlConfig.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <main>
    <Container>
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        Scenario Metadata
      </Typography>
      <div>
        <Link href="/yaml-config/create" passHref><Button variant="contained">Create New Config</Button></Link>
      </div>
      {yamlConfigs.length === 0 ? (
        <Typography sx={{ mt: 3 }} color="text.secondary">
          No configurations yet. Create one to get started.
        </Typography>
      ) : (
        <List sx={{ mt: 2 }}>
          {yamlConfigs.map((yamlConfig) => (
            <ListItem
              key={yamlConfig.id}
              divider
              secondaryAction={
                <Link href={`/yaml-config/${yamlConfig.id}`} passHref>
                  <Button size="small">View</Button>
                </Link>
              }
            >
              <ListItemText
                primary={yamlConfig.study_name || yamlConfig.alias || "(untitled)"}
                secondary={yamlConfig.version ? `Version ${yamlConfig.version} (${yamlConfig.id})` : yamlConfig.id}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  </main>
}
