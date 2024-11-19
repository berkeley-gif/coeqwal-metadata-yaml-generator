"use server";

import { redirect } from "next/navigation";
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
    version: formData.get("version") as string,
    provenance_baseline_source: formData.get("provenance_baseline_source") as string,
    provenance_source_access_date: new Date(formData.get("provenance_source_access_date") as string),
    dependencies: JSON.parse(formData.get("dependencies") as string),
  };

  const validatedFields = schema.safeParse(submittedData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const data = validatedFields.data;

  // Ensure dependencies exist
  for (const dependency of data.dependencies) {
    await prisma.dependency.upsert({
      where: { id: dependency.id },
      update: {},
      create: { id: dependency.id, name: dependency.name },
    });
  }
  const insertedData = await prisma.yamlConfig.create({
    data: {
      ...data,
      dependencies: {
        connect: data.dependencies.map((dependency: { id: string }) => ({ id: dependency.id })),
      },
    },
  });

  if (!insertedData) {
    return {
      errors: {
      },
    };
  }

  redirect(`/yaml-config/${insertedData.id}`);
}