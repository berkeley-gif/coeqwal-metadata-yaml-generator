'use client'

import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';
import CustomNumberInput from "@/components/NumberInput";
import { YamlConfigFrontend } from "@/model/YamlConfig";

export default function YamlConfigOverview() {

  const [formValues, setFormValues] = useState<YamlConfigFrontend>({
    id: "",
    createdAt: dayjs(),
    updatedAt: dayjs(),
    study_name: "",
    alias: "",
    url: "",
    created: dayjs(),
    last_modified: dayjs(),
    version: 1,
    provenance_source: "",
    provenance_source_access_or_creation_date: dayjs(),
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('Form submitted', formValues);
    event.preventDefault();
    try {
      const result = await (await fetch('/api/yaml-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      })).json();
      console.log('Result', result);
      // client-side redirect
      window.location.href = '/yaml-config';

    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <main>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form method="post" onSubmit={handleFormSubmit} action="">
          <Stack spacing={2} marginBlockEnd={2}>
            <TextField label="Study Name" value={formValues.study_name} onChange={(e) => setFormValues({ ...formValues, study_name: e.target.value })} />
            <TextField label="Alias" value={formValues.alias} onChange={(e) => setFormValues({ ...formValues, alias: e.target.value })} />
            <TextField label="URL" value={formValues.url} onChange={(e) => setFormValues({ ...formValues, url: e.target.value })} />
            <DateTimePicker label="Created" value={formValues.created} onChange={(date: Dayjs | null) => date !== null && setFormValues({ ...formValues, created: date })} />
            <DateTimePicker label="Last Modified" value={formValues.last_modified} onChange={(date: Dayjs | null) => date !== null && setFormValues({ ...formValues, last_modified: date })} />
            <CustomNumberInput aria-label="Version" placeholder="Version" value={formValues.version} onChange={(event, value) => value !== null && setFormValues({ ...formValues, version: value })} />

            <Typography variant="h6">Provenance</Typography>
            <TextField label="Source" value={formValues.provenance_source} onChange={(e) => setFormValues({ ...formValues, provenance_source: e.target.value })} />
            <DatePicker label="Source Access or Creation Date" views={['year']} value={formValues.provenance_source_access_or_creation_date} onChange={(date: Dayjs | null) => date !== null && setFormValues({ ...formValues, provenance_source_access_or_creation_date: date })} />
          </Stack>
          <Stack spacing={2}>
            <Button variant="contained" type="submit" color="primary">Submit</Button>
          </Stack>
        </form>
      </LocalizationProvider>
    </main>
  );
}
