import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateImagingOrderDto, UpdateImagingOrderDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImagingOrder, User, Patient, Clinic, Role } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { getPaginationParams, getTotalPages } from 'src/common/utils';

export type ImagingOrderWithRelations = ImagingOrder & {
  user: Omit<User, 'createdAt' | 'updatedAt' | 'isActive' | 'password'>;
  patient: Omit<Patient, 'createdAt' | 'updatedAt'>;
  clinic: Omit<Clinic, 'createdAt' | 'updatedAt'>;
};

export type PaginatedImagingOrders = {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: ImagingOrderWithRelations[];
};

@Injectable()
export class ImagingOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private getIncludeOptions() {
    return {
      userId: false,
      patientId: false,
      clinicId: false,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          address: true,
          role: true,
        },
      },
      patient: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          address: true,
          notes: true,
        },
      },
      clinic: {
        select: {
          id: true,
          name: true,
          address: true,
          phone: true,
          email: true,
        },
      },
    } as const;
  }

  async create(dto: CreateImagingOrderDto): Promise<ImagingOrder> {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `Usuario con id "${dto.userId}" no encontrado`,
      );
    }

    const patient = await this.prisma.patient.findUnique({
      where: { id: dto.patientId },
    });
    if (!patient) {
      throw new NotFoundException(
        `Paciente con id "${dto.patientId}" no encontrado`,
      );
    }

    const clinic = await this.prisma.clinic.findUnique({
      where: { id: dto.clinicId },
    });
    if (!clinic) {
      throw new NotFoundException(
        `Clínica con id "${dto.clinicId}" no encontrada`,
      );
    }

    return await this.prisma.imagingOrder.create({
      data: dto,
    });
  }

  async findAll(
    pagination: PaginationDto,
    userRole?: Role,
    currentUserId?: number,
  ): Promise<PaginatedImagingOrders> {
    const { page, limit, skip } = getPaginationParams(pagination);

    const whereClause =
      userRole === Role.DOCTOR && currentUserId
        ? { userId: currentUserId }
        : {};

    const [data, total] = await Promise.all([
      this.prisma.imagingOrder.findMany({
        where: whereClause,
        include: this.getIncludeOptions(),
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.imagingOrder.count({ where: whereClause }),
    ]);

    const totalPages = getTotalPages(total, limit);

    return {
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
      data,
    };
  }

  async findOne(
    id: number,
    userRole?: Role,
    currentUserId?: number,
  ): Promise<ImagingOrderWithRelations> {
    const order = await this.prisma.imagingOrder.findUnique({
      where: { id },
      include: this.getIncludeOptions(),
    });

    if (!order) {
      throw new NotFoundException(
        `Orden de imagen con id "${id}" no encontrada`,
      );
    }

    if (
      userRole === Role.DOCTOR &&
      currentUserId &&
      order.userId !== currentUserId
    ) {
      throw new ForbiddenException(
        'No tienes permisos para acceder a esta orden de imagen',
      );
    }

    return order;
  }

  async findByUser(
    userId: number,
    pagination: PaginationDto,
    userRole?: Role,
    currentUserId?: number,
  ): Promise<PaginatedImagingOrders> {
    const { page, limit, skip } = getPaginationParams(pagination);

    if (userRole === Role.DOCTOR && currentUserId && userId !== currentUserId) {
      throw new ForbiddenException(
        'No tienes permisos para ver las órdenes de imagen de otros usuarios',
      );
    }

    const [data, total] = await Promise.all([
      this.prisma.imagingOrder.findMany({
        where: { userId },
        include: this.getIncludeOptions(),
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.imagingOrder.count({ where: { userId } }),
    ]);

    const totalPages = getTotalPages(total, limit);

    return {
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
      data,
    };
  }

  async findByPatient(
    patientId: number,
    pagination: PaginationDto,
    userRole?: Role,
    currentUserId?: number,
  ): Promise<PaginatedImagingOrders> {
    const { page, limit, skip } = getPaginationParams(pagination);

    const whereClause =
      userRole === Role.DOCTOR && currentUserId
        ? { patientId, userId: currentUserId }
        : { patientId };

    const [data, total] = await Promise.all([
      this.prisma.imagingOrder.findMany({
        where: whereClause,
        include: this.getIncludeOptions(),
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.imagingOrder.count({ where: whereClause }),
    ]);

    const totalPages = getTotalPages(total, limit);

    return {
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
      data,
    };
  }

  async findByStatus(
    status: string,
    pagination: PaginationDto,
    userRole?: Role,
    currentUserId?: number,
  ): Promise<PaginatedImagingOrders> {
    const { page, limit, skip } = getPaginationParams(pagination);

    const whereClause = {
      status: status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
      ...(userRole === Role.DOCTOR && currentUserId
        ? { userId: currentUserId }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.imagingOrder.findMany({
        where: whereClause,
        include: this.getIncludeOptions(),
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.imagingOrder.count({ where: whereClause }),
    ]);

    const totalPages = getTotalPages(total, limit);

    return {
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
      data,
    };
  }

  async update(
    id: number,
    dto: UpdateImagingOrderDto,
  ): Promise<ImagingOrderWithRelations> {
    await this.findOne(id);

    if (dto.userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: dto.userId },
      });
      if (!user) {
        throw new NotFoundException(
          `Usuario con id "${dto.userId}" no encontrado`,
        );
      }
    }

    if (dto.patientId) {
      const patient = await this.prisma.patient.findUnique({
        where: { id: dto.patientId },
      });
      if (!patient) {
        throw new NotFoundException(
          `Paciente con id "${dto.patientId}" no encontrado`,
        );
      }
    }

    if (dto.clinicId) {
      const clinic = await this.prisma.clinic.findUnique({
        where: { id: dto.clinicId },
      });
      if (!clinic) {
        throw new NotFoundException(
          `Clínica con id "${dto.clinicId}" no encontrada`,
        );
      }
    }

    return await this.prisma.imagingOrder.update({
      where: { id },
      data: dto,
      include: this.getIncludeOptions(),
    });
  }

  async remove(id: number): Promise<ImagingOrderWithRelations> {
    await this.findOne(id);

    return await this.prisma.imagingOrder.delete({
      where: { id },
      include: this.getIncludeOptions(),
    });
  }
}
