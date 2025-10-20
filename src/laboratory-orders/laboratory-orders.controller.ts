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
  LaboratoryOrdersService,
  PaginatedLaboratoryOrders,
} from './laboratory-orders.service';
import { CreateLaboratoryOrderDto, UpdateLaboratoryOrderDto } from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { LaboratoryOrderEntity } from './entities/laboratory-order.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RoleProtected } from 'src/auth/decorator/role-protected.decorator';
import { Role } from '@prisma/client';
import { GetCurrentUserId, GetCurrentUserRole } from 'src/common/decorators';

@Controller('laboratory-orders')
@ApiTags('laboratory-orders')
@RoleProtected(Role.ADMIN, Role.DOCTOR)
@ApiBearerAuth()
export class LaboratoryOrdersController {
  constructor(
    private readonly laboratoryOrdersService: LaboratoryOrdersService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una orden de laboratorio',
    description: 'Crear una nueva orden de laboratorio para un paciente',
  })
  @ApiCreatedResponse({ type: LaboratoryOrderEntity })
  async create(
    @Body() dto: CreateLaboratoryOrderDto,
  ): Promise<LaboratoryOrderEntity> {
    return new LaboratoryOrderEntity(
      await this.laboratoryOrdersService.create(dto),
    );
  }

  @Get()
  @RoleProtected(Role.ADMIN, Role.DOCTOR, Role.INTERN)
  @ApiOperation({
    summary: 'Obtener todas las órdenes de laboratorio',
    description:
      'Obtener todas las órdenes de laboratorio con filtros opcionales y paginación',
  })
  @ApiOkResponse({ type: LaboratoryOrderEntity, isArray: true })
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
    data: LaboratoryOrderEntity[];
  }> {
    let result: PaginatedLaboratoryOrders;

    if (userId) {
      result = await this.laboratoryOrdersService.findByUser(
        parseInt(userId),
        paginationDto,
        currentUserRole,
        currentUserId,
      );
    } else if (patientId) {
      result = await this.laboratoryOrdersService.findByPatient(
        parseInt(patientId),
        paginationDto,
        currentUserRole,
        currentUserId,
      );
    } else if (status) {
      result = await this.laboratoryOrdersService.findByStatus(
        status,
        paginationDto,
        currentUserRole,
        currentUserId,
      );
    } else {
      result = await this.laboratoryOrdersService.findAll(
        paginationDto,
        currentUserRole,
        currentUserId,
      );
    }

    return {
      pagination: result.pagination,
      data: result.data.map((order) => new LaboratoryOrderEntity(order)),
    };
  }

  @Get(':id')
  @RoleProtected(Role.ADMIN, Role.DOCTOR, Role.INTERN)
  @ApiOperation({
    summary: 'Obtener una orden de laboratorio',
    description: 'Obtener una orden de laboratorio específica por ID',
  })
  @ApiOkResponse({ type: LaboratoryOrderEntity })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetCurrentUserId() currentUserId?: number,
    @GetCurrentUserRole() currentUserRole?: Role,
  ): Promise<LaboratoryOrderEntity> {
    return new LaboratoryOrderEntity(
      await this.laboratoryOrdersService.findOne(
        id,
        currentUserRole,
        currentUserId,
      ),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una orden de laboratorio',
    description: 'Actualizar una orden de laboratorio existente',
  })
  @ApiOkResponse({ type: LaboratoryOrderEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLaboratoryOrderDto,
  ): Promise<LaboratoryOrderEntity> {
    return new LaboratoryOrderEntity(
      await this.laboratoryOrdersService.update(id, dto),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una orden de laboratorio',
    description: 'Eliminar una orden de laboratorio existente',
  })
  @ApiOkResponse({ type: LaboratoryOrderEntity })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LaboratoryOrderEntity> {
    return new LaboratoryOrderEntity(
      await this.laboratoryOrdersService.remove(id),
    );
  }
}
