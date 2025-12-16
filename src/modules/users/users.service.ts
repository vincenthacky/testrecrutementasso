import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(query: QueryUsersDto): Promise<{
    data: User[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = 10, nom, email, telephone } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.createdAt', 'DESC');

    // Ajout des filtres
    if (nom) {
      queryBuilder.andWhere('user.nom ILIKE :nom', { nom: `%${nom}%` });
    }

    if (email) {
      queryBuilder.andWhere('user.email ILIKE :email', { email: `%${email}%` });
    }

    if (telephone) {
      queryBuilder.andWhere('user.telephone ILIKE :telephone', {
        telephone: `%${telephone}%`,
      });
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

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
