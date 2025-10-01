import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
import { HashAdapter } from './adapters/hash.adapter';

@Module({
  providers: [AxiosAdapter, HashAdapter],
  exports: [AxiosAdapter, HashAdapter],
})
export class CommonModule {}
