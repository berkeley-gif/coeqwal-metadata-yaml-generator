'use client'
import { createYamlConfig } from "@/actions";
import { Alert, Autocomplete, Button, Chip, Collapse, Container, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AssumptionKind, Dependency } from "@prisma/client";
import dayjs, { Dayjs } from 'dayjs';
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { v4 } from "uuid";

const initialErrors = {
  study_name: undefined,
  alias: undefined,
  url: undefined,
  created: undefined,
  last_modified: undefined,
  version: undefined,
  provenance_baseline_source: undefined,
  provenance_source_access_date: undefined,
};

interface YamlConfigLike {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  study_name: string;
  alias: string;
  url: string;
  created: Date;
  last_modified: Date;
  version: string;
  provenance_baseline_source: string;
  provenance_source_access_date: Date;
  dependencies: Dependency[];
}

interface YamlConfigFormProps {
  config: YamlConfigLike;
  dependencies: Dependency[];
  assumptionKinds: AssumptionKind[];
}

export default function YamlConfigForm({ config, dependencies, assumptionKinds } : YamlConfigFormProps) {
  const [state, formAction] = useFormState(createYamlConfig, { ...config, errors: initialErrors });
  const [controlledValues, setControlledValues] = useState({
    created: dayjs(config.created),
    last_modified: dayjs(config.last_modified),
    provenance_source_access_date: dayjs(config.provenance_source_access_date),
  });
  const [selectedDependencies, setSelectedDependencies] = useState<Dependency[]>(config.dependencies || []);
  const [newDependency, setNewDependency] = useState("");
  const [dependenciesIncludingNew, setDependenciesIncludingNew] = useState(dependencies);
  const [showNewDependency, setShowNewDependency] = useState(false);

  const fieldLabels: Record<string, string> = {
    study_name: "Study Name",
    alias: "Alias",
    url: "URL",
    created: "Created",
    last_modified: "Last Modified",
    version: "Version",
    provenance_baseline_source: "Provenance Source",
    provenance_source_access_date: "Source Access Date",
    dependencies: "Dependencies",
  };
  const errorFields = ("errors" in state ? state.errors : {}) as Record<string, string[] | undefined>;
  const errorEntries = Object.entries(errorFields)
    .filter((entry): entry is [string, string[]] => Array.isArray(entry[1]) && entry[1].length > 0)
    .map(([field, messages]) => [field, messages.join(", ")] as const);

  const handleAddDependency = () => {
    if (newDependency) {
      const dependency = { id: v4(), name: newDependency };
      setDependenciesIncludingNew([...dependenciesIncludingNew, dependency]);
      setSelectedDependencies([...selectedDependencies, dependency]);
      setNewDependency("");
      setShowNewDependency(false);
    }
  };

  const handleRemoveDependency = (dependency: Dependency) => {
    setSelectedDependencies(selectedDependencies.filter(dep => dep.id !== dependency.id));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>Create YAML Config</Typography>
        {errorEntries.length > 0 && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Please fix the following before submitting:
            <ul style={{ margin: "4px 0 0", paddingInlineStart: "1.25rem" }}>
              {errorEntries.map(([field, message]) => (
                <li key={field}>{fieldLabels[field] ?? field}: {message}</li>
              ))}
            </ul>
          </Alert>
        )}
      </Container>
      <form action={formAction}>
        <Container>
          <Stack spacing={2} marginBlockEnd={2}>
            <TextField name="study_name" label="Study Name" defaultValue={config.study_name} error={"errors" in state && state.errors.study_name !== undefined } helperText={"errors" in state && state.errors.study_name} />
            <TextField name="alias" label="Alias" defaultValue={config.alias} error={"errors" in state && state.errors.alias !== undefined } helperText={"errors" in state && state.errors.alias} />
            <TextField name="url" label="URL" defaultValue={config.url} error={"errors" in state && state.errors.url !== undefined } helperText={"errors" in state && state.errors.url} />

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

            <TextField name="version" aria-label="Version" placeholder="Version" defaultValue={config.version} error={"errors" in state && state.errors.version !== undefined } helperText={"errors" in state && state.errors.version} />

            <Typography variant="h6">Provenance</Typography>
            <TextField name="provenance_baseline_source" label="Source" defaultValue={config.provenance_baseline_source} />
            <DatePicker
              label="Source Access or Creation Date" views={['year']} value={controlledValues.provenance_source_access_date} onChange={(date: Dayjs | null) => date !== null && setControlledValues({ ...controlledValues, provenance_source_access_date: date })}
              slotProps={{
                textField: {
                  error: "errors" in state && state.errors.provenance_source_access_date !== undefined ,
                  helperText: "errors" in state && state.errors.provenance_source_access_date ,
                },
              }}
            />
            <input type="hidden" name="provenance_source_access_date" value={controlledValues.provenance_source_access_date.toISOString()} />

            <Typography variant="h6">Dependencies</Typography>
            <Autocomplete
              multiple
              options={dependenciesIncludingNew}
              getOptionLabel={(option) => option.name}
              value={selectedDependencies}
              onChange={(event, newValue) => setSelectedDependencies(newValue)}
              renderInput={(params) => (
              <TextField
                {...params}
                label="Dependencies"
                placeholder="Select dependencies"
              />
              )}
              renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                label={option.name}
                {...getTagProps({ index })}
                onDelete={() => handleRemoveDependency(option)}
                key={option.id}
                />
              ))
              }
            />
            <input type="hidden" name="dependencies" value={JSON.stringify(selectedDependencies)} />

            {!showNewDependency && <Button variant="outlined" size="small" onClick={() => setShowNewDependency(!showNewDependency)}>Add Dependency...</Button>}

            <Collapse in={showNewDependency}>
              <Stack spacing={2} marginBlockEnd={2}>
                <TextField label="New Dependency" size="small" value={newDependency} onChange={(e) => setNewDependency(e.target.value)} />
                <Button variant="outlined" size="small" onClick={handleAddDependency}>Add Dependency</Button>
              </Stack>
            </Collapse>

            <Typography variant="h6">Assumptions</Typography>

          </Stack>
          <Stack spacing={2}>
            <SubmitButton />
          </Stack>
        </Container>
      </form>
    </LocalizationProvider>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return <Button variant="contained" type="submit" color="primary" disabled={pending}>Submit</Button>;
};