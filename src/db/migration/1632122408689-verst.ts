import {MigrationInterface, QueryRunner} from "typeorm";

export class verst1632122408689 implements MigrationInterface {
    name = 'verst1632122408689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sebackend\`.\`Task\` (\`pkTask_Id\` int NOT NULL AUTO_INCREMENT, \`Title\` varchar(32) NULL, \`Content\` varchar(32) NULL, \`TaskRole\` enum ('Task', 'Important', 'Flag', 'Plan') NOT NULL, \`Start\` datetime NOT NULL, \`Due\` datetime NOT NULL, \`TaskType\` enum ('Personal', 'Team') NOT NULL, \`teamPkTeamId\` varchar(255) NULL, INDEX \`IDX_3554333edd8fc7da5d0efdca51\` (\`TaskType\`), PRIMARY KEY (\`pkTask_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sebackend\`.\`User\` (\`pkAccount_Id\` int NOT NULL AUTO_INCREMENT, \`Username\` varchar(20) NOT NULL, \`Password\` varchar(120) NOT NULL, \`FirstName\` varchar(40) NOT NULL, \`LastName\` varchar(40) NOT NULL, \`Description\` text NULL, \`Active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_ec04e2d5ee25370b44efa55619\` (\`Username\`), PRIMARY KEY (\`pkAccount_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sebackend\`.\`Team_User\` (\`team_user_Id\` int NOT NULL AUTO_INCREMENT, \`MemberRole\` enum ('Admin', 'Moderator', 'Member') NOT NULL, \`teamPkTeamId\` varchar(255) NULL, \`userPkAccountId\` int NULL, PRIMARY KEY (\`team_user_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sebackend\`.\`Team\` (\`pkTeam_Id\` varchar(255) NOT NULL, \`TeamName\` varchar(32) NOT NULL, PRIMARY KEY (\`pkTeam_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sebackend\`.\`Message\` (\`pkMessage_Id\` int NOT NULL AUTO_INCREMENT, \`Message\` text NOT NULL, \`Flag\` tinyint NOT NULL DEFAULT 0, \`create_up\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`teamPkTeamId\` varchar(255) NULL, \`userPkAccountId\` int NULL, PRIMARY KEY (\`pkMessage_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Task\` ADD CONSTRAINT \`FK_7a803e632829c0120cc26c98d90\` FOREIGN KEY (\`teamPkTeamId\`) REFERENCES \`sebackend\`.\`Team\`(\`pkTeam_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team_User\` ADD CONSTRAINT \`FK_197a6cac4f1db393eb433dee591\` FOREIGN KEY (\`teamPkTeamId\`) REFERENCES \`sebackend\`.\`Team\`(\`pkTeam_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team_User\` ADD CONSTRAINT \`FK_fff1c035d94d3e1b296fc1c81e4\` FOREIGN KEY (\`userPkAccountId\`) REFERENCES \`sebackend\`.\`User\`(\`pkAccount_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Message\` ADD CONSTRAINT \`FK_3363db6c193a99656db5a6d7374\` FOREIGN KEY (\`teamPkTeamId\`) REFERENCES \`sebackend\`.\`Team\`(\`pkTeam_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Message\` ADD CONSTRAINT \`FK_fcd966fdb8438c89998db52087b\` FOREIGN KEY (\`userPkAccountId\`) REFERENCES \`sebackend\`.\`User\`(\`pkAccount_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Message\` DROP FOREIGN KEY \`FK_fcd966fdb8438c89998db52087b\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Message\` DROP FOREIGN KEY \`FK_3363db6c193a99656db5a6d7374\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team_User\` DROP FOREIGN KEY \`FK_fff1c035d94d3e1b296fc1c81e4\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team_User\` DROP FOREIGN KEY \`FK_197a6cac4f1db393eb433dee591\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Task\` DROP FOREIGN KEY \`FK_7a803e632829c0120cc26c98d90\``);
        await queryRunner.query(`DROP TABLE \`sebackend\`.\`Message\``);
        await queryRunner.query(`DROP TABLE \`sebackend\`.\`Team\``);
        await queryRunner.query(`DROP TABLE \`sebackend\`.\`Team_User\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec04e2d5ee25370b44efa55619\` ON \`sebackend\`.\`User\``);
        await queryRunner.query(`DROP TABLE \`sebackend\`.\`User\``);
        await queryRunner.query(`DROP INDEX \`IDX_3554333edd8fc7da5d0efdca51\` ON \`sebackend\`.\`Task\``);
        await queryRunner.query(`DROP TABLE \`sebackend\`.\`Task\``);
    }

}