import { Streaming, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { StreamingsRepository } from "../streamings-repository";

export class PrismaStreamingsRepository implements StreamingsRepository {
  async create(data: Prisma.StreamingUncheckedCreateInput): Promise<Streaming> {
    const streaming = await prisma.streaming.create({
      data,
    })
    
    return streaming
  }

  async findByIds(ids: number[]): Promise<Streaming[] | null> {
    const streamings = await prisma.streaming.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    return streamings
  }
}