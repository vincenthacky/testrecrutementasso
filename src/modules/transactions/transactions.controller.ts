import { Controller, Post, Body, Get, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { QueryTransactionsDto } from './dto/query-transactions.dto';
import { TransactionStatus } from '../../common/constants/transaction-status.enum';
import { ResponseUtil } from '../../common/utils/response.util';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle transaction' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Transaction créée avec succès',
    example: {
      success: true,
      status_code: 201,
      message: 'Transaction créée avec succès',
      data: {
        id: 1,
        userId: 1,
        montant: 100.5,
        statut: 'en_attente',
        date: '2023-12-16T19:30:00Z',
        createdAt: '2023-12-16T19:30:00Z',
        updatedAt: '2023-12-16T19:30:00Z',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Utilisateur non trouvé',
    example: {
      success: false,
      status_code: 404,
      message: 'Utilisateur non trouvé',
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
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const transaction =
      await this.transactionsService.create(createTransactionDto);
    return ResponseUtil.responseSuccess(
      transaction,
      'Transaction créée avec succès',
      201,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Récupérer la liste paginée des transactions avec filtres',
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
    name: 'statut',
    required: false,
    enum: TransactionStatus,
    description: 'Filtrer par statut',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des transactions récupérée avec succès',
    example: {
      success: true,
      status_code: 200,
      message: 'Liste des transactions récupérée avec succès',
      data: [
        {
          id: 1,
          userId: 1,
          montant: 100.5,
          statut: 'en_attente',
          date: '2023-12-16T19:30:00Z',
          createdAt: '2023-12-16T19:30:00Z',
          updatedAt: '2023-12-16T19:30:00Z',
          user: {
            id: 1,
            nom: 'Jean Dupont',
            email: 'jean.dupont@example.com',
          },
        },
      ],
      pagination: {
        total: 50,
        per_page: 10,
        current_page: 1,
        last_page: 5,
        from: 1,
        to: 10,
      },
    },
  })
  async findAll(@Query() query: QueryTransactionsDto) {
    const result = await this.transactionsService.findAll(query);
    return ResponseUtil.responseSuccessPaginate(
      result.data,
      result.total,
      result.page,
      result.limit,
      'Liste des transactions récupérée avec succès',
    );
  }
}
