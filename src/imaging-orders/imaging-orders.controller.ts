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
import {
  ImagingOrdersService,
  PaginatedImagingOrders,
} from './imaging-orders.service';
import { CreateImagingOrderDto, UpdateImagingOrderDto } from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { ImagingOrderEntity } from './entities/imaging-order.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RoleProtected } from 'src/auth/decorator/role-protected.decorator';
import { Role } from '@prisma/client';
import { GetCurrentUserId, GetCurrentUserRole } from 'src/common/decorators';

@Controller('imaging-orders')
@ApiTags('imaging-orders')
@RoleProtected(Role.ADMIN, Role.DOCTOR)
@ApiBearerAuth()
export class ImagingOrdersController {
  constructor(private readonly imagingOrdersService: ImagingOrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una orden de imagen',
    description: 'Crear una nueva orden de imagen para un paciente',
  })
  @ApiCreatedResponse({ type: ImagingOrderEntity })
  async create(
    @Body() dto: CreateImagingOrderDto,
  ): Promise<ImagingOrderEntity> {
    return new ImagingOrderEntity(await this.imagingOrdersService.create(dto));
  }

  @Get()
  @RoleProtected(Role.ADMIN, Role.DOCTOR, Role.INTERN)
  @ApiOperation({
    summary: 'Obtener todas las órdenes de imagen',
    description:
      'Obtener todas las órdenes de imagen con filtros opcionales y paginación',
  })
  @ApiOkResponse({ type: ImagingOrderEntity, isArray: true })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filtrar por usuario',
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
    @Query() paginationDto: PaginationDto,
    @Query('userId') userId?: string,
    @Query('patientId') patientId?: string,
    @Query('status') status?: string,
    @GetCurrentUserId() currentUserId?: number,
    @GetCurrentUserRole() currentUserRole?: Role,
  ): Promise<{
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    data: ImagingOrderEntity[];
  }> {
    let result: PaginatedImagingOrders;

    if (userId) {
      result = await this.imagingOrdersService.findByUser(
        parseInt(userId),
        paginationDto,
        currentUserRole,
        currentUserId,
      );
    } else if (patientId) {
      result = await this.imagingOrdersService.findByPatient(
        parseInt(patientId),
        paginationDto,
        currentUserRole,
        currentUserId,
      );
    } else if (status) {
      result = await this.imagingOrdersService.findByStatus(
        status,
        paginationDto,
        currentUserRole,
        currentUserId,
      );
    } else {
      result = await this.imagingOrdersService.findAll(
        paginationDto,
        currentUserRole,
        currentUserId,
      );
    }

    return {
      pagination: result.pagination,
      data: result.data.map((order) => new ImagingOrderEntity(order)),
    };
  }

  @Get(':id')
  @RoleProtected(Role.ADMIN, Role.DOCTOR, Role.INTERN)
  @ApiOperation({
    summary: 'Obtener una orden de imagen',
    description: 'Obtener una orden de imagen específica por ID',
  })
  @ApiOkResponse({ type: ImagingOrderEntity })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetCurrentUserId() currentUserId?: number,
    @GetCurrentUserRole() currentUserRole?: Role,
  ): Promise<ImagingOrderEntity> {
    return new ImagingOrderEntity(
      await this.imagingOrdersService.findOne(
        id,
        currentUserRole,
        currentUserId,
      ),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una orden de imagen',
    description: 'Actualizar una orden de imagen existente',
  })
  @ApiOkResponse({ type: ImagingOrderEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateImagingOrderDto,
  ): Promise<ImagingOrderEntity> {
    return new ImagingOrderEntity(
      await this.imagingOrdersService.update(id, dto),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una orden de imagen',
    description: 'Eliminar una orden de imagen existente',
  })
  @ApiOkResponse({ type: ImagingOrderEntity })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ImagingOrderEntity> {
    return new ImagingOrderEntity(await this.imagingOrdersService.remove(id));
  }
}
