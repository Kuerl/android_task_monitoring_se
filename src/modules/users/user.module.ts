import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [],
  providers: [],
})
export class UserModule {}
