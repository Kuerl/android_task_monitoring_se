import {MigrationInterface, QueryRunner} from "typeorm";

export class firstver1631962526849 implements MigrationInterface {
    name = 'firstver1631962526849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sebackend\`.\`Account\` (\`pkAccount_Id\` int NOT NULL AUTO_INCREMENT, \`Username\` varchar(20) NOT NULL, \`Password\` varchar(120) NOT NULL, \`FirstName\` varchar(40) NOT NULL, \`LastName\` varchar(40) NOT NULL, \`PhoneNumber\` varchar(10) NOT NULL, \`Email\` varchar(40) NOT NULL, \`Description\` text NULL, UNIQUE INDEX \`IDX_412a2768f8054c28b160cca18f\` (\`Username\`), UNIQUE INDEX \`IDX_b9ad9a70f4f2af5f98c27413d2\` (\`PhoneNumber\`), UNIQUE INDEX \`IDX_3c86ef34cc3c239edf499feb7d\` (\`Email\`), PRIMARY KEY (\`pkAccount_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sebackend\`.\`Task\` (\`pkTask_Id\` int NOT NULL AUTO_INCREMENT, \`Title\` varchar(32) NULL, \`Content\` varchar(32) NULL, \`TaskRole\` enum ('Task', 'Important', 'Flag', 'Plan') NOT NULL, \`Start\` datetime NOT NULL, \`Due\` datetime NOT NULL, \`TaskType\` enum ('Personal', 'Team') NOT NULL, \`teamPkTeamId\` int NULL, INDEX \`IDX_3554333edd8fc7da5d0efdca51\` (\`TaskType\`), PRIMARY KEY (\`pkTask_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sebackend\`.\`Team\` (\`pkTeam_Id\` int NOT NULL AUTO_INCREMENT, \`MemberRole\` enum ('Admin', 'Moderator', 'Member') NOT NULL, \`userPkAccountId\` int NULL, PRIMARY KEY (\`pkTeam_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sebackend\`.\`Message\` (\`pkMessage_Id\` int NOT NULL AUTO_INCREMENT, \`Message\` text NOT NULL, \`Flag\` tinyint NOT NULL DEFAULT 0, \`create_up\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`teamPkTeamId\` int NULL, \`userPkAccountId\` int NULL, PRIMARY KEY (\`pkMessage_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` CHANGE \`pkAccount_Id\` \`pkAccount_Id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` DROP COLUMN \`pkAccount_Id\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` ADD \`pkAccount_Id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` ADD \`PkAccount_Id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` CHANGE \`PkAccount_Id\` \`pkAccount_Id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` ADD PRIMARY KEY (\`pkAccount_Id\`, \`PkAccount_Id\`)`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` CHANGE \`pkAccount_Id\` \`PkAccount_Id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` DROP INDEX \`IDX_412a2768f8054c28b160cca18f\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` DROP INDEX \`IDX_b9ad9a70f4f2af5f98c27413d2\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` DROP INDEX \`IDX_3c86ef34cc3c239edf499feb7d\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_412a2768f8054c28b160cca18f\` ON \`sebackend\`.\`Account\` (\`Username\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_b9ad9a70f4f2af5f98c27413d2\` ON \`sebackend\`.\`Account\` (\`PhoneNumber\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_3c86ef34cc3c239edf499feb7d\` ON \`sebackend\`.\`Account\` (\`Email\`)`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Task\` ADD CONSTRAINT \`FK_7a803e632829c0120cc26c98d90\` FOREIGN KEY (\`teamPkTeamId\`) REFERENCES \`sebackend\`.\`Team\`(\`pkTeam_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team\` ADD CONSTRAINT \`FK_a55fb953a4d1f90faf3b664f3eb\` FOREIGN KEY (\`userPkAccountId\`) REFERENCES \`sebackend\`.\`Account\`(\`pkAccount_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Message\` ADD CONSTRAINT \`FK_3363db6c193a99656db5a6d7374\` FOREIGN KEY (\`teamPkTeamId\`) REFERENCES \`sebackend\`.\`Team\`(\`pkTeam_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Message\` ADD CONSTRAINT \`FK_fcd966fdb8438c89998db52087b\` FOREIGN KEY (\`userPkAccountId\`) REFERENCES \`sebackend\`.\`Account\`(\`pkAccount_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Message\` DROP FOREIGN KEY \`FK_fcd966fdb8438c89998db52087b\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Message\` DROP FOREIGN KEY \`FK_3363db6c193a99656db5a6d7374\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team\` DROP FOREIGN KEY \`FK_a55fb953a4d1f90faf3b664f3eb\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Task\` DROP FOREIGN KEY \`FK_7a803e632829c0120cc26c98d90\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c86ef34cc3c239edf499feb7d\` ON \`sebackend\`.\`Account\``);
        await queryRunner.query(`DROP INDEX \`IDX_b9ad9a70f4f2af5f98c27413d2\` ON \`sebackend\`.\`Account\``);
        await queryRunner.query(`DROP INDEX \`IDX_412a2768f8054c28b160cca18f\` ON \`sebackend\`.\`Account\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` ADD UNIQUE INDEX \`IDX_3c86ef34cc3c239edf499feb7d\` (\`Email\`)`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` ADD UNIQUE INDEX \`IDX_b9ad9a70f4f2af5f98c27413d2\` (\`PhoneNumber\`)`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` ADD UNIQUE INDEX \`IDX_412a2768f8054c28b160cca18f\` (\`Username\`)`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` CHANGE \`PkAccount_Id\` \`pkAccount_Id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` ADD PRIMARY KEY (\`pkAccount_Id\`)`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` CHANGE \`pkAccount_Id\` \`PkAccount_Id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` DROP COLUMN \`PkAccount_Id\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` DROP COLUMN \`pkAccount_Id\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` ADD \`pkAccount_Id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` ADD PRIMARY KEY (\`pkAccount_Id\`)`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Account\` CHANGE \`pkAccount_Id\` \`pkAccount_Id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`DROP TABLE \`sebackend\`.\`Message\``);
        await queryRunner.query(`DROP TABLE \`sebackend\`.\`Team\``);
        await queryRunner.query(`DROP INDEX \`IDX_3554333edd8fc7da5d0efdca51\` ON \`sebackend\`.\`Task\``);
        await queryRunner.query(`DROP TABLE \`sebackend\`.\`Task\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c86ef34cc3c239edf499feb7d\` ON \`sebackend\`.\`Account\``);
        await queryRunner.query(`DROP INDEX \`IDX_b9ad9a70f4f2af5f98c27413d2\` ON \`sebackend\`.\`Account\``);
        await queryRunner.query(`DROP INDEX \`IDX_412a2768f8054c28b160cca18f\` ON \`sebackend\`.\`Account\``);
        await queryRunner.query(`DROP TABLE \`sebackend\`.\`Account\``);
    }

}
