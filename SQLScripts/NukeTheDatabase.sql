EXEC sp_MSforeachtable
  @command1 = 'DROP TABLE ?'
, @whereand = 'AND SCHEMA_NAME(schema_id) = ''LoLDB'' '

EXEC sp_MSforeachtable
  @command1 = 'DROP TABLE ?'
, @whereand = 'AND SCHEMA_NAME(schema_id) = ''LoLDB'' '

EXEC sp_MSforeachtable
  @command1 = 'DROP TABLE ?'
, @whereand = 'AND SCHEMA_NAME(schema_id) = ''LoLDB'' '

EXEC sp_MSforeachtable
  @command1 = 'DROP TABLE ?'
, @whereand = 'AND SCHEMA_NAME(schema_id) = ''LoLDB'' '

EXEC sp_MSforeachtable
  @command1 = 'DROP TABLE ?'
, @whereand = 'AND SCHEMA_NAME(schema_id) = ''LoLDB'' '

DROP FUNCTION IF EXISTS [LoLDB].[MostChosenShard]

DROP PROCEDURE IF EXISTS [LoLDB].[InsertGameAndTeams]
DROP PROCEDURE IF EXISTS [LoLDB].[GetNamedTeams]
DROP PROCEDURE IF EXISTS [LoLDB].[GetPlayersFromGame]
DROP PROCEDURE IF EXISTS [LoLDB].[InsertPlayerGameStatsAndRunes]
DROP PROCEDURE IF EXISTS [LoLDB].[GetTeamsFromGame]
DROP PROCEDURE IF EXISTS [LoLDB].[GetKillsPerGamePlayer]
DROP PROCEDURE IF EXISTS [LoLDB].[GetTeamRankings]
DROP PROCEDURE IF EXISTS [LoLDB].[GetMostPlayedChampions]
DROP PROCEDURE IF EXISTS [LoLDB].[SelectivePlayerStatistics]

DROP SCHEMA LoLDB
