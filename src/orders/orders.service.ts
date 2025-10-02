import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, Doctor, Patient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { getPaginationParams, getTotalPages } from 'src/common/utils';

export type OrderWithRelations = Order & {
  doctor: Omit<Doctor, 'createdAt' | 'updatedAt' | 'isActive' | 'password'>;
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
      doctorId: false,
      patientId: false,
      doctor: {
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
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: dto.doctorId },
    });
    if (!doctor) {
      throw new NotFoundException(
        `Doctor con id "${dto.doctorId}" no encontrado`,
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

  async findAll(pagination: PaginationDto = {}): Promise<PaginatedOrders> {
    const { page, limit, skip } = getPaginationParams(pagination);

    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        include: this.getIncludeOptions(),
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.order.count(),
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

  async findOne(id: number): Promise<OrderWithRelations> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: this.getIncludeOptions(),
    });

    if (!order) {
      throw new NotFoundException(`Orden con id "${id}" no encontrada`);
    }

    return order;
  }

  async findByDoctor(
    doctorId: number,
    pagination: PaginationDto = {},
  ): Promise<PaginatedOrders> {
    const { page, limit, skip } = getPaginationParams(pagination);

    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { doctorId },
        include: this.getIncludeOptions(),
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.order.count({ where: { doctorId } }),
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
    pagination: PaginationDto = {},
  ): Promise<PaginatedOrders> {
    const { page, limit, skip } = getPaginationParams(pagination);

    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { patientId },
        include: this.getIncludeOptions(),
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.order.count({ where: { patientId } }),
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
    pagination: PaginationDto = {},
  ): Promise<PaginatedOrders> {
    const { page, limit, skip } = getPaginationParams(pagination);

    const whereClause = {
      status: status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
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

    if (dto.doctorId) {
      const doctor = await this.prisma.doctor.findUnique({
        where: { id: dto.doctorId },
      });
      if (!doctor) {
        throw new NotFoundException(
          `Doctor con id "${dto.doctorId}" no encontrado`,
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
