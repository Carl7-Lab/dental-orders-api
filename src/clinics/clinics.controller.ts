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
import { ClinicsService, PaginatedClinics } from './clinics.service';
import { CreateClinicDto, UpdateClinicDto } from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { ClinicEntity } from './entities/clinic.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RoleProtected } from 'src/auth/decorator/role-protected.decorator';
import { Role } from '@prisma/client';

@Controller('clinics')
@ApiTags('clinics')
@RoleProtected(Role.ADMIN, Role.DOCTOR)
@ApiBearerAuth()
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una clínica',
    description: 'Crear una nueva clínica',
  })
  @ApiCreatedResponse({ type: ClinicEntity })
  async create(@Body() dto: CreateClinicDto): Promise<ClinicEntity> {
    return new ClinicEntity(await this.clinicsService.create(dto));
  }

  @Get()
  @RoleProtected(Role.ADMIN, Role.DOCTOR, Role.INTERN)
  @ApiOperation({
    summary: 'Obtener todas las clínicas',
    description: 'Obtener todas las clínicas con paginación',
  })
  @ApiOkResponse({ type: ClinicEntity, isArray: true })
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
  async findAll(@Query() paginationDto: PaginationDto): Promise<{
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    data: ClinicEntity[];
  }> {
    const result: PaginatedClinics =
      await this.clinicsService.findAll(paginationDto);

    return {
      pagination: result.pagination,
      data: result.data.map((clinic) => new ClinicEntity(clinic)),
    };
  }

  @Get(':id')
  @RoleProtected(Role.ADMIN, Role.DOCTOR, Role.INTERN)
  @ApiOperation({
    summary: 'Obtener una clínica',
    description: 'Obtener una clínica específica por ID',
  })
  @ApiOkResponse({ type: ClinicEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ClinicEntity> {
    return new ClinicEntity(await this.clinicsService.findOne(id));
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una clínica',
    description: 'Actualizar una clínica existente',
  })
  @ApiOkResponse({ type: ClinicEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClinicDto,
  ): Promise<ClinicEntity> {
    return new ClinicEntity(await this.clinicsService.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una clínica',
    description: 'Eliminar una clínica existente',
  })
  @ApiOkResponse({ type: ClinicEntity })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ClinicEntity> {
    return new ClinicEntity(await this.clinicsService.remove(id));
  }
}
