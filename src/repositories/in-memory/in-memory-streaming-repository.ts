import { Streaming, Prisma } from "@prisma/client";
import { StreamingsRepository } from "../streamings-repository";
import { randomInt } from "node:crypto";

export class InMemoryStreamingsRepository implements StreamingsRepository {
  public items: Streaming[] = []

  async create(data: Prisma.StreamingUncheckedCreateInput): Promise<Streaming> {
    const streaming: Streaming = {
      id: data.id ?? randomInt(100),
      name: data.name
    }

    this.items.push(streaming)

    return streaming
  }

  async findByIds(ids: number[]): Promise<Streaming[] | null> {
    const streamings: Streaming[] = []

    if (!ids || ids.length <= 0) {
      return null
    }

    for (const streamingId of ids) {
      const streaming = this.items.find(item => item.id === streamingId)

      if (streaming) {
        streamings.push(streaming)
      }
    }

    return streamings
  }
}