import { Controller, Post, Body, Get, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { ResponseUtil } from '../../common/utils/response.util';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Utilisateur créé avec succès',
    example: {
      success: true,
      status_code: 201,
      message: 'Utilisateur créé avec succès',
      data: {
        id: 1,
        nom: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        telephone: '+33123456789',
        createdAt: '2023-12-16T19:30:00Z',
        updatedAt: '2023-12-16T19:30:00Z',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Un utilisateur avec cet email existe déjà',
    example: {
      success: false,
      status_code: 409,
      message: 'Un utilisateur avec cet email existe déjà',
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Données d'entrée invalides",
    example: {
      success: false,
      status_code: 400,
      message: 'Données fournies invalides',
    },
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return ResponseUtil.responseSuccess(
      user,
      'Utilisateur créé avec succès',
      201,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Récupérer la liste paginée des utilisateurs avec filtres',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Numéro de page (défaut: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Éléments par page (défaut: 10)',
  })
  @ApiQuery({
    name: 'nom',
    required: false,
    type: String,
    description: 'Filtrer par nom',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    type: String,
    description: 'Filtrer par email',
  })
  @ApiQuery({
    name: 'telephone',
    required: false,
    type: String,
    description: 'Filtrer par téléphone',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des utilisateurs récupérée avec succès',
    example: {
      success: true,
      status_code: 200,
      message: 'Liste des utilisateurs récupérée avec succès',
      data: [
        {
          id: 1,
          nom: 'Jean Dupont',
          email: 'jean.dupont@example.com',
          telephone: '+33123456789',
          createdAt: '2023-12-16T19:30:00Z',
          updatedAt: '2023-12-16T19:30:00Z',
        },
      ],
      pagination: {
        total: 25,
        per_page: 10,
        current_page: 1,
        last_page: 3,
        from: 1,
        to: 10,
      },
    },
  })
  async findAll(@Query() query: QueryUsersDto) {
    const result = await this.usersService.findAll(query);
    return ResponseUtil.responseSuccessPaginate(
      result.data,
      result.total,
      result.page,
      result.limit,
      'Liste des utilisateurs récupérée avec succès',
    );
  }
}
