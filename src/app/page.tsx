'use client'

import { Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        COEQWAL CalSim3 Scenario Metadata Generator
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Create and manage YAML metadata for CalSim3 model runs.
      </Typography>
      <Stack direction="row" spacing={2}>
        <Link href="/yaml-config/create" passHref>
          <Button variant="contained">Create New Config</Button>
        </Link>
        <Link href="/yaml-config" passHref>
          <Button variant="outlined">View All Configs</Button>
        </Link>
      </Stack>
    </Container>
  );
}
