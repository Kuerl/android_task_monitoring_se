import {MigrationInterface, QueryRunner} from "typeorm";

export class fixpersonaltask1633591115721 implements MigrationInterface {
    name = 'fixpersonaltask1633591115721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Task\` ADD \`userPkAccountId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Task\` ADD CONSTRAINT \`FK_4906391d7bfeebdac39d693423b\` FOREIGN KEY (\`userPkAccountId\`) REFERENCES \`sebackend\`.\`User\`(\`pkAccount_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Task\` DROP FOREIGN KEY \`FK_4906391d7bfeebdac39d693423b\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Task\` DROP COLUMN \`userPkAccountId\``);
    }

}
