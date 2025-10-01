import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto, UpdateDoctorDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Doctor } from '@prisma/client';
import { HashAdapter } from 'src/common/adapters/hash.adapter';

@Injectable()
export class DoctorsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashAdapter,
  ) {}

  async create(dto: CreateDoctorDto): Promise<Doctor> {
    dto.password = await this.hash.hashData(dto.password);

    return await this.prisma.doctor.create({
      data: dto,
    });
  }

  async findAll(): Promise<Doctor[]> {
    return await this.prisma.doctor.findMany({
      where: { isActive: true },
    });
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor con id "${id}" no encontrado`);
    }

    return doctor;
  }

  async findByEmail(email: string): Promise<Doctor | null> {
    return await this.prisma.doctor.findUnique({
      where: { email },
    });
  }

  async update(id: number, dto: UpdateDoctorDto): Promise<Doctor> {
    await this.findOne(id);

    if (dto.password) {
      dto.password = await this.hash.hashData(dto.password);
    }

    return await this.prisma.doctor.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<Doctor> {
    await this.findOne(id);

    return await this.prisma.doctor.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
