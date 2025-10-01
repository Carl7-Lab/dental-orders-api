import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    const url = configService.get<string>('databaseUrl');

    super({
      datasources: {
        db: {
          url,
        },
      },
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  // async cleanDatabase(): Promise<void> {
  //   if (process.env.NODE_ENV === 'production') return;

  //   await Promise.all([this.user.deleteMany()]);
  // }
}
