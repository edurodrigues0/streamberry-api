import { Prisma, Streaming } from "@prisma/client";

export interface StreamingsRepository {
  create(data: Prisma.StreamingUncheckedCreateInput): Promise<Streaming>;
  findByIds(ids?: number[]): Promise<Streaming[] | null>;
}