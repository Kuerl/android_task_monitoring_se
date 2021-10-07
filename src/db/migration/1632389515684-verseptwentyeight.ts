import {MigrationInterface, QueryRunner} from "typeorm";

export class verseptwentyeight1632389515684 implements MigrationInterface {
    name = 'verseptwentyeight1632389515684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sebackend\`.\`task_users_user\` (\`taskPkTaskId\` int NOT NULL, \`userPkAccountId\` int NOT NULL, INDEX \`IDX_1a0fe384c35b755d3220789e50\` (\`taskPkTaskId\`), INDEX \`IDX_80c661b36e827f890fc1027223\` (\`userPkAccountId\`), PRIMARY KEY (\`taskPkTaskId\`, \`userPkAccountId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`task_users_user\` ADD CONSTRAINT \`FK_1a0fe384c35b755d3220789e503\` FOREIGN KEY (\`taskPkTaskId\`) REFERENCES \`sebackend\`.\`Task\`(\`pkTask_Id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`task_users_user\` ADD CONSTRAINT \`FK_80c661b36e827f890fc1027223b\` FOREIGN KEY (\`userPkAccountId\`) REFERENCES \`sebackend\`.\`User\`(\`pkAccount_Id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`task_users_user\` DROP FOREIGN KEY \`FK_80c661b36e827f890fc1027223b\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`task_users_user\` DROP FOREIGN KEY \`FK_1a0fe384c35b755d3220789e503\``);
        await queryRunner.query(`DROP INDEX \`IDX_80c661b36e827f890fc1027223\` ON \`sebackend\`.\`task_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_1a0fe384c35b755d3220789e50\` ON \`sebackend\`.\`task_users_user\``);
        await queryRunner.query(`DROP TABLE \`sebackend\`.\`task_users_user\``);
    }

}
