import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QueryUsersDto {
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
    description: 'Filtrer par nom',
    required: false,
    example: 'asso',
  })
  @IsOptional()
  nom?: string;

  @ApiProperty({
    description: 'Filtrer par email',
    required: false,
    example: 'asso@gmail.com',
  })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Filtrer par téléphone',
    required: false,
    example: '+225 0566013534',
  })
  @IsOptional()
  telephone?: string;
}
