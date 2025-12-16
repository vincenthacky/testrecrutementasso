import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { User } from '../users/entities/user.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { QueryTransactionsDto } from './dto/query-transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const user = await this.userRepository.findOne({
      where: { id: createTransactionDto.userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    if (createTransactionDto.montant <= 0) {
      throw new BadRequestException('Le montant doit être supérieur à 0');
    }

    const transaction = this.transactionRepository.create({
      ...createTransactionDto,
      date: createTransactionDto.date
        ? new Date(createTransactionDto.date)
        : new Date(),
    });

    return await this.transactionRepository.save(transaction);
  }

  async findAll(query: QueryTransactionsDto): Promise<{
    data: Transaction[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = 10, statut } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.user', 'user')
      .orderBy('transaction.createdAt', 'DESC');

    if (statut) {
      queryBuilder.where('transaction.statut = :statut', { statut });
    }

    const [data, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<Transaction | null> {
    return await this.transactionRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
}
