import { Module } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { ClinicsController } from './clinics.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ClinicsController],
  providers: [ClinicsService],
  imports: [CommonModule],
  exports: [ClinicsService],
})
export class ClinicsModule {}
