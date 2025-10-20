import { PartialType } from '@nestjs/swagger';
import { CreateLaboratoryOrderDto } from './create-laboratory-order.dto';

export class UpdateLaboratoryOrderDto extends PartialType(
  CreateLaboratoryOrderDto,
) {}
