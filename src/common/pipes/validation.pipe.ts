import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(
    value: unknown,
    { metatype }: ArgumentMetadata,
  ): Promise<unknown> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(
      metatype,
      value as Record<string, unknown>,
    ) as object;
    const errors = await validate(object);
    if (errors.length > 0) {
      const messages = errors
        .map((error) => Object.values(error.constraints || {}).join(', '))
        .join('; ');
      throw new BadRequestException(`Validation échouée: ${messages}`);
    }
    return value;
  }

  private toValidate(
    metatype: abstract new (...args: unknown[]) => unknown,
  ): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype as never);
  }
}
