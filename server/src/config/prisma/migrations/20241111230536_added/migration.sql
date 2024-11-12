/*
  Warnings:

  - You are about to drop the `_TeamPlayers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TeamPlayers" DROP CONSTRAINT "_TeamPlayers_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamPlayers" DROP CONSTRAINT "_TeamPlayers_B_fkey";

-- DropTable
DROP TABLE "_TeamPlayers";

-- CreateTable
CREATE TABLE "FantasyTeamPlayer" (
    "id" SERIAL NOT NULL,
    "fantasyTeamId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "FantasyTeamPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FantasyTeamPlayer_fantasyTeamId_playerId_key" ON "FantasyTeamPlayer"("fantasyTeamId", "playerId");

-- AddForeignKey
ALTER TABLE "FantasyTeamPlayer" ADD CONSTRAINT "FantasyTeamPlayer_fantasyTeamId_fkey" FOREIGN KEY ("fantasyTeamId") REFERENCES "FantasyTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyTeamPlayer" ADD CONSTRAINT "FantasyTeamPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
