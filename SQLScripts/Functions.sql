CREATE FUNCTION [LoLDB].[MostChosenShard] (
    @PlayerID INT, 
    @SlotIndex INT,
    @StartDateTime DATETIMEOFFSET,
    @EndDateTime DATETIMEOFFSET
)
RETURNS INT
AS
BEGIN 
RETURN (
    SELECT TOP 1 PS.ShardRuneID AS MostChosenShard
    FROM LoLDB.PlayerGameStats PGS 
        JOIN LoLDB.PlayerShard PS ON PS.PlayerGameStatsID = PGS.PlayerGameStatsID
        JOIN LoLDB.ShardRune SR ON SR.ShardRuneID = PS.ShardRuneID
        JOIN LoLDB.Game G ON G.GameID = PGS.GameID
    WHERE PGS.PlayerID = @PlayerID AND
          SR.Slot = @SlotIndex AND
          G.StartDateTime BETWEEN @StartDateTime AND @EndDateTime
    GROUP BY PS.ShardRuneID
    ORDER BY COUNT(PS.ShardRuneID) DESC
)
END
GO

CREATE FUNCTION [LoLDB].[MostPlayedChampion] (
    @PlayerID INT,
    @StartDateTime DATETIMEOFFSET,
    @EndDateTime DATETIMEOFFSET
)
RETURNS INT
AS
BEGIN
RETURN (
    SELECT TOP 1 PGS.ChampionID 
    FROM LoLDB.PlayerGameStats PGS
        JOIN LoLDB.Game G ON G.GameID = PGS.GameID
    WHERE PGS.PlayerID = @PlayerID AND
          G.StartDateTime BETWEEN @StartDateTime AND @EndDateTime
    GROUP BY PGS.ChampionID
    ORDER BY COUNT(PGS.ChampionID) DESC
)
END
GO

CREATE FUNCTION [LoLDB].[TopTeamKiller] (
    @TeamID INT,
    @StartDateTime DATETIMEOFFSET,
    @EndDateTime DATETIMEOFFSET
)
RETURNS INT
AS 
BEGIN
RETURN (
    SELECT TOP 1 P.PlayerID
    FROM LoLDB.Player P
        JOIN LoLDB.[Kill] K ON K.KillerID = P.PlayerID
        JOIN LoLDB.Game G ON G.GameID = K.GameID
    WHERE P.TeamID = @TeamID AND 
          G.StartDateTime BETWEEN @StartDateTime AND @EndDateTime
    GROUP BY P.PlayerID
    ORDER BY COUNT(K.KillID) DESC
)
END
GO