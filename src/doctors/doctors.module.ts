import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService],
  imports: [CommonModule],
  exports: [DoctorsService],
})
export class DoctorsModule {}
