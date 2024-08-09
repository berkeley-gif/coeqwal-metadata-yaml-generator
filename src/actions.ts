"use server";

import prisma from "./lib/prisma";
import { schema } from "./model/YamlConfig";

export async function createYamlConfig(
  prevState: unknown, 
  formData: FormData,
) {

  // fake delay
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const submittedData = {
    study_name: formData.get("study_name") as string,
    alias: formData.get("alias") as string,
    url: formData.get("url") as string,
    created: new Date(formData.get("created") as string),
    last_modified: new Date(formData.get("last_modified") as string),
    version: parseInt(formData.get("version") as string),
    provenance_source: formData.get("provenance_source") as string,
    provenance_source_access_or_creation_date: new Date(formData.get("provenance_source_access_or_creation_date") as string),
  };

  const validatedFields = schema.safeParse(submittedData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const data = validatedFields.data;

  const insertedData = await prisma.yamlConfig.create({
    data,
  });

  return insertedData;
}