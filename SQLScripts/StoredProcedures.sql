CREATE PROCEDURE [LoLDB].[InsertGameAndTeams]
    @StartDateTime DATETIMEOFFSET,
    @Duration TIME,
    @WinningTeamID INT,
    @LosingTeamID INT
AS
BEGIN
    BEGIN TRAN
        BEGIN TRY
            INSERT INTO LoLDB.Game(StartDateTime, Duration)
            VALUES (@StartDateTime, @Duration);

            DECLARE @GameID INT;
            SET @GameID = SCOPE_IDENTITY();

            INSERT INTO LoLDB.TeamGame (TeamID, GameID, Won)
            VALUES
                (@WinningTeamID, @GameID, 1),
                (@LosingTeamID, @GameID, 0);
                
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

CREATE PROCEDURE [LoLDB].[GetNamedTeams] AS
SELECT G.GameID, MIN(T.Name) + ' vs ' + MAX(T.Name) + ' on ' + CONVERT(NVARCHAR, G.StartDateTime, 0) AS [Name]
FROM LoLDB.Game G
    JOIN LoLDB.TeamGame TG ON G.GameID = TG.GameID
    JOIN LoLDB.Team T ON TG.TeamID = T.TeamID
GROUP BY G.GameID, G.StartDateTime
GO

CREATE PROCEDURE [LoLDB].[GetPlayersFromGame]
    @GameID INT
AS
SELECT PlayerID, P.Name
FROM LoLDB.Game G
    JOIN LoLDB.TeamGame TG ON G.GameID = TG.GameID
    JOIN LoLDB.Team T ON TG.TeamID = T.TeamID
    JOIN LoLDB.Player P ON T.TeamID = P.TeamID
WHERE G.GameID = @GameID
GO

CREATE PROCEDURE [LoLDB].[GetTeamsFromGame]
    @GameID INT
AS
SELECT T.TeamID, T.Name, T.RegionID, T.LogoLink, T.NameAbbreviation
FROM LoLDB.Game G
    JOIN LoLDB.TeamGame TG ON G.GameID = TG.GameID
    JOIN LoLDB.Team T ON TG.TeamID = T.TeamID
WHERE G.GameID = @GameID
GO

CREATE PROCEDURE [LoLDB].[InsertPlayerGameStatsAndRunes]
    @ChampionID INT,
    @GameID INT,
    @PlayerID INT,
    @CreepScore INT,
    @VisionScore INT,
    @TenMinuteGold INT,
    @FifteenMinuteGold INT,
    @EndGold INT,
    @KeystoneRuneID INT,
    @PrimaryRunePathRune1ID INT,
    @PrimaryRunePathRune2ID INT,
    @PrimaryRunePathRune3ID INT,
    @SecondaryRunePathID INT,
    @SecondaryRunePathRune1ID INT,
    @SecondaryRunePathRune2ID INT,
    @ShardRune1ID INT,
    @ShardRune2ID INT,
    @ShardRune3ID INT
AS
BEGIN
    BEGIN TRAN
        BEGIN TRY
            INSERT INTO LoLDB.PlayerGameStats(ChampionID, GameID, PlayerID, CreepScore, VisionScore, TenMinuteGold, FifteenMinuteGold, EndGold, KeystoneRuneID, SecondaryRunePathID)
            VALUES (@ChampionID, @GameID, @PlayerID, @CreepScore, @VisionScore, @TenMinuteGold, @FifteenMinuteGold, @EndGold, @KeystoneRuneID, @SecondaryRunePathID);

            DECLARE @PlayerGameStatsID INT;
            SET @PlayerGameStatsID = SCOPE_IDENTITY();

            INSERT INTO LoLDB.PlayerSecondaryRune(PlayerGameStatsID, SecondaryRuneID)
            VALUES
                (@PlayerGameStatsID, @PrimaryRunePathRune1ID),
                (@PlayerGameStatsID, @PrimaryRunePathRune2ID),
                (@PlayerGameStatsID, @PrimaryRunePathRune3ID),
                (@PlayerGameStatsID, @SecondaryRunePathRune1ID),
                (@PlayerGameStatsID, @SecondaryRunePathRune2ID);

            INSERT INTO LoLDB.PlayerShard(PlayerGameStatsID, ShardRuneID)
            VALUES
                (@PlayerGameStatsID, @ShardRune1ID),
                (@PlayerGameStatsID, @ShardRune2ID),
                (@PlayerGameStatsID, @ShardRune3ID);
                
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

CREATE PROCEDURE [LoLDB].[GetKillsPerGamePlayer]
    @GameID INT,
    @PlayerID INT
AS
SELECT K.KillID,
       K.LocationID,
       P.[Name] + ' killed ' + PV.[Name] + ' at ' + CONVERT(NVARCHAR, K.Time, 0) AS [Name]
FROM LoLDB.Player P
    JOIN LoLDB.[Kill] K ON P.PlayerID = K.KillerID
    JOIN LoLDB.Player PV ON K.VictimID = PV.PlayerID
WHERE P.PlayerID = @PlayerID 
    AND K.GameID = @GameID
GO


-- Report Queries
CREATE PROCEDURE [LoLDB].[GetMostPlayedChampions]
    @Limit BIGINT = 9223372036854775807,
    @StartDate DATETIMEOFFSET,
    @EndDate DATETIMEOFFSET
AS
WITH [Data] AS (
    SELECT C.Name, COUNT(*) AS TimesPlayed
    FROM LoLDB.PlayerGameStats PGS
        JOIN LoLDB.Game G ON PGS.GameID = G.GameID
        JOIN LoLDB.Champion C ON PGS.ChampionID = C.ChampionID
    WHERE G.StartDateTime BETWEEN @StartDate AND @EndDate
    GROUP BY PGS.ChampionID, C.Name
    ORDER BY TimesPlayed DESC, [Name] ASC
    OFFSET 0 ROWS
    FETCH FIRST @Limit ROWS ONLY
)
SELECT RANK() OVER(ORDER BY TimesPlayed DESC) AS [Rank], [Name], TimesPlayed
FROM [Data]
GO

CREATE PROCEDURE [LoLDB].[GetTeamRankings]
    @Limit BIGINT = 9223372036854775807,
    @StartDate DATETIMEOFFSET,
    @EndDate DATETIMEOFFSET
AS
WITH [Data] AS (
    SELECT T.Name, SUM(IIF(TG.Won = 1, 1, 0)) AS Wins, SUM(IIF(TG.Won = 0, 1, 0)) AS Losses
    FROM LoLDB.TeamGame TG
        JOIN LoLDB.Team T ON TG.TeamID = T.TeamID
        JOIN LoLDB.Game G ON TG.GameID = G.GameID
    WHERE G.StartDateTime BETWEEN @StartDate AND @EndDate
    GROUP BY TG.TeamID, T.Name
    ORDER BY Wins DESC, [Name] ASC
    OFFSET 0 ROWS
    FETCH FIRST @Limit ROWS ONLY
)
SELECT RANK() OVER(ORDER BY Wins DESC) AS [Rank], [Name], Wins, Losses, (Wins * 100.0 / (Wins + Losses)) AS WinLossRatio
FROM [Data]
GO

CREATE PROCEDURE [LoLDB].[SelectivePlayerStatistics]
    @PlayerID INT,
    @StartDateTime DATETIMEOFFSET,
    @EndDateTime DATETIMEOFFSET
AS
SELECT LoLDB.MostPlayedChampion(@PlayerID, @StartDateTime, @EndDateTime) AS MostPlayedChampionID,
       MAX(PGS.CreepScore) AS MaxCreepScore,
       AVG(CAST(PGS.CreepScore AS FLOAT)) AS AverageCreepScore,
       MAX(PGS.VisionScore) AS MaxVisionScore,
       AVG(CAST(PGS.VisionScore AS FLOAT)) AS AverageVisionScore,
       MAX(PGS.TenMinuteGold) AS Max10MinGold,
       AVG(CAST(PGS.TenMinuteGold AS FLOAT)) AS Average10MinGold,
       MAX(PGS.FifteenMinuteGold) AS Max15MinGold,
       AVG(CAST(PGS.FifteenMinuteGold AS FLOAT)) AS Average15MinGold,
       MAX(PGS.EndGold) AS MaxEndGold,
       AVG(CAST(PGS.EndGold AS FLOAT)) AS AverageEndGold,
       (SELECT TOP 1 PGS2.KeystoneRuneID 
        FROM LoLDB.PlayerGameStats PGS2
            JOIN LoLDB.Game G2 ON G2.GameID = PGS2.GameID
        WHERE PGS2.PlayerID = @PlayerID AND
            G2.StartDateTime BETWEEN @StartDateTime AND @EndDateTime
        GROUP BY PGS2.KeystoneRuneID
        ORDER BY COUNT(PGS2.KeystoneRuneID) DESC
       ) AS MostChosenRuneKeystone,
       LoLDB.MostChosenShard(@PlayerID, 1, @StartDateTime, @EndDateTime) AS MostChosenShard1,
       LoLDB.MostChosenShard(@PlayerID, 2, @StartDateTime, @EndDateTime) AS MostChosenShard2,
       LoLDB.MostChosenShard(@PlayerID, 3, @StartDateTime, @EndDateTime) AS MostChosenShard3
FROM LoLDB.PlayerGameStats PGS
    JOIN LoLDB.Game G ON G.GameID = PGS.GameID
WHERE PGS.PlayerID = @PlayerID AND
      G.StartDateTime BETWEEN @StartDateTime AND @EndDateTime
GO


CREATE PROCEDURE [LoLDB].[TopTeamPlayers]
    @StartDateTime DATETIMEOFFSET,
    @EndDateTime DATETIMEOFFSET
AS 
WITH CTE (TopTeamKillerID) AS (
    SELECT LoLDB.TopTeamKiller (T.TeamID, @StartDateTime, @EndDateTime) AS TopTeamKillerID
    FROM LoLDB.Team T
)
SELECT P.[Name] AS PlayerName,
       T.[Name] AS PlayerTeam,
       COUNT(K.KillID) AS KillCount--,
       --LoLDB.MostPlayedChampion(C.TopTeamKillerID, @StartDateTime, @EndDateTime) AS MostPlayedChampion
FROM CTE C
    JOIN LoLDB.Player P ON P.PlayerID = C.TopTeamKillerID
    JOIN LoLDB.Team T ON T.TeamID = P.TeamID
    JOIN LoLDB.[Kill] K ON K.KillerID = C.TopTeamKillerID
GROUP BY P.[Name],
         T.[Name]
GO