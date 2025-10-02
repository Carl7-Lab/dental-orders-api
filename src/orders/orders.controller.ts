import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { OrdersService, PaginatedOrders } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';

@Controller('orders')
@ApiTags('orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una orden',
    description: 'Crear una nueva orden para un paciente',
  })
  @ApiCreatedResponse({ type: OrderEntity })
  async create(@Body() dto: CreateOrderDto): Promise<OrderEntity> {
    return new OrderEntity(await this.ordersService.create(dto));
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las órdenes',
    description:
      'Obtener todas las órdenes con filtros opcionales y paginación',
  })
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  @ApiQuery({
    name: 'doctorId',
    required: false,
    description: 'Filtrar por doctor',
  })
  @ApiQuery({
    name: 'patientId',
    required: false,
    description: 'Filtrar por paciente',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrar por estado',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página (por defecto: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de elementos por página (por defecto: 10)',
  })
  async findAll(
    @Query('doctorId') doctorId?: string,
    @Query('patientId') patientId?: string,
    @Query('status') status?: string,
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ): Promise<{
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    data: OrderEntity[];
  }> {
    let result: PaginatedOrders;

    if (doctorId) {
      result = await this.ordersService.findByDoctor(parseInt(doctorId), {
        page,
        limit,
      });
    } else if (patientId) {
      result = await this.ordersService.findByPatient(parseInt(patientId), {
        page,
        limit,
      });
    } else if (status) {
      result = await this.ordersService.findByStatus(status, {
        page,
        limit,
      });
    } else {
      result = await this.ordersService.findAll({ page, limit });
    }

    return {
      pagination: result.pagination,
      data: result.data.map((order) => new OrderEntity(order)),
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una orden',
    description: 'Obtener una orden específica por ID',
  })
  @ApiOkResponse({ type: OrderEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderEntity> {
    return new OrderEntity(await this.ordersService.findOne(id));
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una orden',
    description: 'Actualizar una orden existente',
  })
  @ApiOkResponse({ type: OrderEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    return new OrderEntity(await this.ordersService.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una orden',
    description: 'Eliminar una orden existente',
  })
  @ApiOkResponse({ type: OrderEntity })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<OrderEntity> {
    return new OrderEntity(await this.ordersService.remove(id));
  }
}
