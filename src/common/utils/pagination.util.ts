import { PaginationDto } from '../dto/pagination.dto';

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export function getPaginationParams(
  pagination: PaginationDto = {
    page: 1,
    limit: 10,
  },
): PaginationParams {
  const page = Number(pagination.page) || 1;
  const limit = Number(pagination.limit) || 10;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function getTotalPages(total: number, limit: number): number {
  return Math.ceil(total / limit);
}
