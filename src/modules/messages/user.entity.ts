import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Account')
export class AccountEntity {
  @PrimaryGeneratedColumn()
  PkAccount_Id: number;

  @Column({ name: 'Username', type: 'varchar', length: 20, nullable: false })
  username: string;

  @Column({ name: 'Password', type: 'varchar', length: 120, nullable: false })
  password: string;

  @Column({ name: 'FirstName', type: 'varchar', length: 40, nullable: false })
  firstName: string;

  @Column({ name: 'LastName', type: 'varchar', length: 40, nullable: false })
  lastName: string;

  @Column({ name: 'PhoneNumber', type: 'varchar', length: 10, nullable: false })
  phoneNumber: string;

  @Column({ name: 'Email', type: 'varchar', length: 40, nullable: false })
  email: string;

  @Column({ name: 'Description', type: 'text', nullable: true })
  description: string;
}
