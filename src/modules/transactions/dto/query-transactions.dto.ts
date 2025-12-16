import { IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionStatus } from '../../../common/constants/transaction-status.enum';

export class QueryTransactionsDto {
  @ApiProperty({
    description: 'Numéro de page pour la pagination',
    example: 1,
    minimum: 1,
    required: false,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: "Nombre d'éléments par page",
    example: 10,
    minimum: 1,
    maximum: 100,
    required: false,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({
    description: 'Filtrer par statut de transaction',
    enum: TransactionStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(TransactionStatus)
  statut?: TransactionStatus;
}
