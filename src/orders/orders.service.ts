import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, User, Patient, Role } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { getPaginationParams, getTotalPages } from 'src/common/utils';

export type OrderWithRelations = Order & {
  user: Omit<User, 'createdAt' | 'updatedAt' | 'isActive' | 'password'>;
  patient: Omit<Patient, 'createdAt' | 'updatedAt'>;
};

export type PaginatedOrders = {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: OrderWithRelations[];
};

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private getIncludeOptions() {
    return {
      userId: false,
      patientId: false,
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
    } as const;
  }

  async create(dto: CreateOrderDto): Promise<Order> {
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

    return await this.prisma.order.create({
      data: dto,
    });
  }

  async findAll(
    pagination: PaginationDto,
    userRole?: Role,
    currentUserId?: number,
  ): Promise<PaginatedOrders> {
    const { page, limit, skip } = getPaginationParams(pagination);

    const whereClause =
      userRole === Role.DOCTOR && currentUserId
        ? { userId: currentUserId }
        : {};

    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where: whereClause,
        include: this.getIncludeOptions(),
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.order.count({ where: whereClause }),
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
  ): Promise<OrderWithRelations> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: this.getIncludeOptions(),
    });

    if (!order) {
      throw new NotFoundException(`Orden con id "${id}" no encontrada`);
    }

    if (
      userRole === Role.DOCTOR &&
      currentUserId &&
      order.userId !== currentUserId
    ) {
      throw new ForbiddenException(
        'No tienes permisos para acceder a esta orden',
      );
    }

    return order;
  }

  async findByUser(
    userId: number,
    pagination: PaginationDto,
    userRole?: Role,
    currentUserId?: number,
  ): Promise<PaginatedOrders> {
    const { page, limit, skip } = getPaginationParams(pagination);

    if (userRole === Role.DOCTOR && currentUserId && userId !== currentUserId) {
      throw new ForbiddenException(
        'No tienes permisos para ver las órdenes de otros usuarios',
      );
    }

    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { userId },
        include: this.getIncludeOptions(),
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.order.count({ where: { userId } }),
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
  ): Promise<PaginatedOrders> {
    const { page, limit, skip } = getPaginationParams(pagination);

    const whereClause =
      userRole === Role.DOCTOR && currentUserId
        ? { patientId, userId: currentUserId }
        : { patientId };

    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where: whereClause,
        include: this.getIncludeOptions(),
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.order.count({ where: whereClause }),
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
  ): Promise<PaginatedOrders> {
    const { page, limit, skip } = getPaginationParams(pagination);

    const whereClause = {
      status: status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
      ...(userRole === Role.DOCTOR && currentUserId
        ? { userId: currentUserId }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where: whereClause,
        include: this.getIncludeOptions(),
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.order.count({ where: whereClause }),
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

  async update(id: number, dto: UpdateOrderDto): Promise<OrderWithRelations> {
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

    return await this.prisma.order.update({
      where: { id },
      data: dto,
      include: this.getIncludeOptions(),
    });
  }

  async remove(id: number): Promise<OrderWithRelations> {
    await this.findOne(id);

    return await this.prisma.order.delete({
      where: { id },
      include: this.getIncludeOptions(),
    });
  }
}
