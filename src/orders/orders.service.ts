import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, Doctor, Patient } from '@prisma/client';

export type OrderWithRelations = Order & {
  doctor: Omit<Doctor, 'createdAt' | 'updatedAt'>;
  patient: Omit<Patient, 'createdAt' | 'updatedAt'>;
};

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  private getIncludeOptions() {
    return {
      doctor: {
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          phone: true,
          address: true,
          role: true,
          isActive: true,
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

  async findAll(): Promise<OrderWithRelations[]> {
    return await this.prisma.order.findMany({
      include: this.getIncludeOptions(),
      orderBy: { createdAt: 'desc' },
    });
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

  async findByDoctor(doctorId: number): Promise<OrderWithRelations[]> {
    return await this.prisma.order.findMany({
      where: { doctorId },
      include: this.getIncludeOptions(),
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByPatient(patientId: number): Promise<OrderWithRelations[]> {
    return await this.prisma.order.findMany({
      where: { patientId },
      include: this.getIncludeOptions(),
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByStatus(status: string): Promise<OrderWithRelations[]> {
    return await this.prisma.order.findMany({
      where: {
        status: status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
      },
      include: this.getIncludeOptions(),
      orderBy: { createdAt: 'desc' },
    });
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
