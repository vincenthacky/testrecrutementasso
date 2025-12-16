import {
  IsPositive,
  IsEnum,
  IsInt,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionStatus } from '../../../common/constants/transaction-status.enum';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Montant de la transaction',
    example: 100.5,
    minimum: 0.01,
  })
  @IsPositive()
  montant: number;

  @ApiProperty({
    description: 'Statut de la transaction',
    enum: TransactionStatus,
    example: TransactionStatus.EN_ATTENTE,
  })
  @IsEnum(TransactionStatus)
  statut: TransactionStatus;

  @ApiProperty({
    description: "ID de l'utilisateur associé à la transaction",
    example: 1,
  })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({
    description: 'Date de la transaction (optionnel, par défaut maintenant)',
    example: '2024-01-15T10:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  date?: string;
}
