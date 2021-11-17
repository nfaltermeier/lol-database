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