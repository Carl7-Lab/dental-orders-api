import { Module } from '@nestjs/common';
import { LaboratoryOrdersService } from './laboratory-orders.service';
import { LaboratoryOrdersController } from './laboratory-orders.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [LaboratoryOrdersController],
  providers: [LaboratoryOrdersService],
  imports: [CommonModule],
  exports: [LaboratoryOrdersService],
})
export class LaboratoryOrdersModule {}
