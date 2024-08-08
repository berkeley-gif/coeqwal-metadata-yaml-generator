'use client'

import { Button, Stack, TextField, Typography } from "@mui/material";
import styles from "./page.module.css";
import { useState } from "react";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';
import CustomNumberInput from "../components/NumberInput";

export default function Home() {

  const [formValues, setFormValues] = useState<{
    study_name: string;
    alias: string;
    url: string;
    created: Dayjs | null;
    last_modified: Dayjs | null;
    version: number | null;
    provenance: {
      source: string;
      source_access_or_creation_date: Dayjs | null;
    };
  }>({
    study_name: "",
    alias: "",
    url: "",
    created: dayjs(),
    last_modified: dayjs(),
    version: 1,
    provenance: {
      source: "",
      source_access_or_creation_date: null,
    },
  });

  return (
    <main className={styles.main}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={2} marginBlockEnd={2}>
          <TextField label="Study Name" value={formValues.study_name} onChange={(e) => setFormValues({ ...formValues, study_name: e.target.value })} />
          <TextField label="Alias" value={formValues.alias} onChange={(e) => setFormValues({ ...formValues, alias: e.target.value })} />
          <TextField label="URL" value={formValues.url} onChange={(e) => setFormValues({ ...formValues, url: e.target.value })} />
          <DateTimePicker label="Created" value={formValues.created} onChange={(date: Dayjs | null) => setFormValues({ ...formValues, created: date })} />
          <DateTimePicker label="Last Modified" value={formValues.last_modified} onChange={(date: Dayjs | null) => setFormValues({ ...formValues, last_modified: date })} />
          <CustomNumberInput aria-label="Version" placeholder="Version" value={formValues.version} onChange={(event, value) => setFormValues({ ...formValues, version: value })} />

          <Typography variant="h6">Provenance</Typography>
          <TextField label="Source" value={formValues.provenance.source} onChange={(e) => setFormValues({ ...formValues, provenance: { ...formValues.provenance, source: e.target.value } })} />
          <DatePicker label="Source Access or Creation Date" views={['year']} value={formValues.provenance.source_access_or_creation_date} onChange={(date: Dayjs | null) => setFormValues({ ...formValues, provenance: { ...formValues.provenance, source_access_or_creation_date: date } })} />
        </Stack>
        <Stack spacing={2}>
          <Button variant="contained" color="primary" onClick={() => console.log(formValues)}>Submit</Button>
        </Stack>
      </LocalizationProvider>
    </main>
  );
}
