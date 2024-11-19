import prisma from "@/lib/prisma";

export async function GET() {
  // get all yaml-configs from the database
  const yamlConfigs = await prisma.yamlConfig.findMany();
  return new Response(JSON.stringify(yamlConfigs), {
    headers: { "Content-Type": "application/json" },
  });
}