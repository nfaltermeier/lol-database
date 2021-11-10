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
