'use client'

import { createYamlConfig } from "@/actions";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

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
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return <Button variant="contained" type="submit" color="primary" disabled={pending}>Submit</Button>;
};

export default function YamlConfigOverview() {

  const [state, formAction] = useFormState(createYamlConfig, initialState);

  const [controlledValues, setControlledValues] = useState({
    created: dayjs(initialState.created),
    last_modified: dayjs(initialState.last_modified),
    provenance_source_access_date: dayjs(initialState.provenance_source_access_date),
  });

  return (
    <main>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {"errors" in state && <Typography color="error">Something went wrong</Typography> }
        <form action={formAction}>
          <Stack spacing={2} marginBlockEnd={2}>

            <TextField name="study_name" label="Study Name" defaultValue={initialState.study_name} error={"errors" in state && state.errors.study_name !== undefined } helperText={"errors" in state && state.errors.study_name} />
            <TextField name="alias" label="Alias" defaultValue={initialState.alias} error={"errors" in state && state.errors.alias !== undefined } helperText={"errors" in state && state.errors.alias} />
            <TextField name="url" label="URL" defaultValue={initialState.url} error={"errors" in state && state.errors.url !== undefined } helperText={"errors" in state && state.errors.url} />

            <DateTimePicker
              label="Created" value={controlledValues.created} onChange={(date: Dayjs | null) => date !== null && setControlledValues({ ...controlledValues, created: date })}
              slotProps={{
                textField: {
                  error: "errors" in state && state.errors.created !== undefined ,
                  helperText: "errors" in state && state.errors.created ,
                },
              }}
            />
            <input type="hidden" name="created" value={controlledValues.created.toISOString()} />
            
            <DateTimePicker
              label="Last Modified" value={controlledValues.last_modified} onChange={(date: Dayjs | null) => date !== null && setControlledValues({ ...controlledValues, last_modified: date })}
              slotProps={{
                textField: {
                  error: "errors" in state && state.errors.last_modified !== undefined ,
                  helperText: "errors" in state && state.errors.last_modified ,
                },
              }}
            />
            <input type="hidden" name="last_modified" value={controlledValues.last_modified.toISOString()} />

            <TextField name="version" aria-label="Version" placeholder="Version" defaultValue={initialState.version} error={"errors" in state && state.errors.version !== undefined } helperText={"errors" in state && state.errors.version} />

            <Typography variant="h6">Provenance</Typography>
            <TextField name="provenance_baseline_source" label="Source" defaultValue={initialState.provenance_baseline_source} />
            <DatePicker
              name="provenance_source_access_date" label="Source Access or Creation Date" views={['year']} value={controlledValues.provenance_source_access_date} onChange={(date: Dayjs | null) => date !== null && setControlledValues({ ...controlledValues, provenance_source_access_date: date })}
              slotProps={{
                textField: {
                  error: "errors" in state && state.errors.provenance_source_access_date !== undefined ,
                  helperText: "errors" in state && state.errors.provenance_source_access_date ,
                },
              }}
            />
            <input type="hidden" name="provenance_source_access_date" value={controlledValues.provenance_source_access_date.toISOString()} />

          </Stack>
          <Stack spacing={2}>
            <SubmitButton />
          </Stack>
        </form>
      </LocalizationProvider>
    </main>
  );
}
