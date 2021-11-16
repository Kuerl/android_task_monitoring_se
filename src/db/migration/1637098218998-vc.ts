import {MigrationInterface, QueryRunner} from "typeorm";

export class vc1637098218998 implements MigrationInterface {
    name = 'vc1637098218998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sebackend\`.\`User\` (\`pkAccount_Id\` int NOT NULL AUTO_INCREMENT, \`Username\` varchar(20) NOT NULL, \`Password\` varchar(120) NOT NULL, \`FirstName\` varchar(40) NOT NULL, \`LastName\` varchar(40) NOT NULL, \`Description\` text NULL, \`Active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_ec04e2d5ee25370b44efa55619\` (\`Username\`), PRIMARY KEY (\`pkAccount_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`TeamUser\` ADD CONSTRAINT \`FK_2e158ba2215c5b9459098a70db2\` FOREIGN KEY (\`userPkAccountId\`) REFERENCES \`sebackend\`.\`User\`(\`pkAccount_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Task\` ADD CONSTRAINT \`FK_4906391d7bfeebdac39d693423b\` FOREIGN KEY (\`userPkAccountId\`) REFERENCES \`sebackend\`.\`User\`(\`pkAccount_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Task\` ADD CONSTRAINT \`FK_7a803e632829c0120cc26c98d90\` FOREIGN KEY (\`teamPkTeamId\`) REFERENCES \`sebackend\`.\`Team\`(\`pkTeam_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Message\` ADD CONSTRAINT \`FK_3363db6c193a99656db5a6d7374\` FOREIGN KEY (\`teamPkTeamId\`) REFERENCES \`sebackend\`.\`Team\`(\`pkTeam_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Message\` ADD CONSTRAINT \`FK_fcd966fdb8438c89998db52087b\` FOREIGN KEY (\`userPkAccountId\`) REFERENCES \`sebackend\`.\`User\`(\`pkAccount_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Message\` DROP FOREIGN KEY \`FK_fcd966fdb8438c89998db52087b\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Message\` DROP FOREIGN KEY \`FK_3363db6c193a99656db5a6d7374\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Task\` DROP FOREIGN KEY \`FK_7a803e632829c0120cc26c98d90\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Task\` DROP FOREIGN KEY \`FK_4906391d7bfeebdac39d693423b\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`TeamUser\` DROP FOREIGN KEY \`FK_2e158ba2215c5b9459098a70db2\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec04e2d5ee25370b44efa55619\` ON \`sebackend\`.\`User\``);
        await queryRunner.query(`DROP TABLE \`sebackend\`.\`User\``);
    }

}
