import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: "Nom de l'utilisateur",
    example: 'Jean Dupont',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nom: string;

  @ApiProperty({
    description: "Adresse email unique de l'utilisateur",
    example: 'jean.dupont@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "Numéro de téléphone de l'utilisateur",
    example: '+33123456789',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  telephone: string;
}
