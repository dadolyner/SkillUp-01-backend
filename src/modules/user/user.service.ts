//User/Quote Service
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from '../../entities/quote.entity';
import { UserRepository } from './user.repository';
import { User } from '../../entities/user.entity';
import { AuthLoginCredentialsDto } from 'src/modules/auth/dto/auth-credentials-login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  //return all quotes
  getQuotes(): Promise<Quote[]> {
    return this.userRepository.getQuotes();
  }

  //return one specific quote
  async getQuoteById(user: User): Promise<Quote> {
    const found = await this.userRepository.findOne({ where: { user } });

    if (!found) {
      throw new NotFoundException(
        `User "${user.username}" does not have a quote.`,
      );
    }

    return found;
  }

  //create a new quote
  async createQuote(
    createQuoteDto: CreateQuoteDto,
    user: User,
  ): Promise<Quote> {
    return this.userRepository.createQuote(createQuoteDto, user);
  }

  //delete an existing quote
  async deleteQuote(user: User): Promise<void> {
    const result = await this.userRepository.delete({ user });

    if (result.affected === 0) {
      throw new NotFoundException(
        `User "${user.username}" does not have a quote.`,
      );
    }
  }

  //update user created quote
  async updateQuote(quote: string, user: User): Promise<Quote> {
    const myQuote = await this.getQuoteById(user);
    myQuote.quote = Object.values(quote)[0];
    myQuote.user = user;
    await myQuote.save();

    if (!myQuote) {
      throw new NotFoundException(`Unable to edit Quote for user "${user}".`);
    }

    return myQuote;
  }

  //updates user password
  async updatePassword(
    authCredentialsDto: AuthLoginCredentialsDto,
  ): Promise<void> {
    return this.userRepository.updatePassword(authCredentialsDto);
  }

  //outputs user info without sensitive data
  async getUserInfo(user: User) {
    return this.userRepository.getUser(user);
  }
}