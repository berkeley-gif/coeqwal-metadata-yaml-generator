import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const data = await prisma.yamlConfig.findMany();
  return Response.json(data);
};

// create an item using post, returning a 201 status code on success and the item created
// return a 400 status code on failure
export async function POST(req: Request) {
  const body = await req.json();
  // generate a uuid for the id
  body.id = uuidv4();
  // todo: validate body
  try {
    const data = await prisma.yamlConfig.create({
      data: {
        ...body,
      },
    });
    return Response.json(data, { status: 201 });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
};