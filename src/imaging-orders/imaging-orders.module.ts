import { Module } from '@nestjs/common';
import { ImagingOrdersService } from './imaging-orders.service';
import { ImagingOrdersController } from './imaging-orders.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ImagingOrdersController],
  providers: [ImagingOrdersService],
  imports: [CommonModule],
  exports: [ImagingOrdersService],
})
export class ImagingOrdersModule {}
