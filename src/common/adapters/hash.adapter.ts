import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class HashAdapter {
  constructor() {}

  async hashData(data: string): Promise<string> {
    return await argon.hash(data);
  }
}
