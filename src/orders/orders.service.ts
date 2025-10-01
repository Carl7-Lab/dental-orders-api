import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    // Verificar que el doctor existe
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: dto.doctorId },
    });
    if (!doctor) {
      throw new NotFoundException(
        `Doctor con id "${dto.doctorId}" no encontrado`,
      );
    }

    // Verificar que el paciente existe
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

  async findAll(): Promise<Order[]> {
    return await this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Orden con id "${id}" no encontrada`);
    }

    return order;
  }

  async findByDoctor(doctorId: number): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: { doctorId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByPatient(patientId: number): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByStatus(status: string): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: { status: status as any },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    await this.findOne(id);

    // Si se está actualizando el doctor, verificar que existe
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

    // Si se está actualizando el paciente, verificar que existe
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
    });
  }

  async remove(id: number): Promise<Order> {
    await this.findOne(id);

    return await this.prisma.order.delete({
      where: { id },
    });
  }
}
