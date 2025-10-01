import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Patient } from '@prisma/client';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePatientDto): Promise<Patient> {
    return await this.prisma.patient.create({
      data: dto,
    });
  }

  async findAll(): Promise<Patient[]> {
    return await this.prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException(`Paciente con id "${id}" no encontrado`);
    }

    return patient;
  }

  async update(id: number, dto: UpdatePatientDto): Promise<Patient> {
    await this.findOne(id);

    return await this.prisma.patient.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<Patient> {
    await this.findOne(id);

    return await this.prisma.patient.delete({
      where: { id },
    });
  }
}
