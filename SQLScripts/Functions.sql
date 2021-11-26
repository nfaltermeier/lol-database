CREATE FUNCTION [LoLDB].[MostChosenShard] (
    @PlayerID INT, @SlotIndex INT
)
RETURNS INT
AS
BEGIN 
RETURN (
    SELECT TOP 1 PS.ShardRuneID AS MostChosenShard
    FROM LoLDB.PlayerGameStats PGS 
        JOIN LoLDB.PlayerShard PS ON PS.PlayerGameStatsID = PGS.PlayerGameStatsID
        JOIN LoLDB.ShardRune SR ON SR.ShardRuneID = PS.ShardRuneID
    WHERE PGS.PlayerID = @PlayerID AND
          SR.Slot = @SlotIndex
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