import { PartialType } from '@nestjs/swagger';
import { CreateImagingOrderDto } from './create-imaging-order.dto';

export class UpdateImagingOrderDto extends PartialType(CreateImagingOrderDto) {}
