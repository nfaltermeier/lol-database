CREATE SCHEMA LoLDB;
GO

CREATE TABLE LoLDB.Region (
    RegionID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE LoLDB.Champion (
    ChampionID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE LoLDB.Position (
    PositionID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(64) NOT NULL UNIQUE,
    LogoLink VARCHAR(256) NOT NULL,
);

CREATE TABLE LoLDB.Team (
    TeamID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    RegionID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Region(RegionID),
    [Name] NVARCHAR(64) NOT NULL UNIQUE,
    LogoLink VARCHAR(256) NOT NULL,
    NameAbbreviation NVARCHAR(64) NOT NULL,
);

CREATE TABLE LoLDB.Player (
    PlayerID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(64) NOT NULL,
    PositionID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Position(PositionID),
    TeamID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Team(TeamID),

    UNIQUE (
        PositionID,
        TeamID
    )
);

CREATE TABLE LoLDB.Game (
    GameID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    StartDateTime DATETIMEOFFSET NOT NULL,
    Duration TIME NOT NULL
);

CREATE TABLE LoLDB.TeamGame (
    TeamID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Team(TeamID),
    GameID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Game(GameID),
    Won BIT NOT NULL,

    PRIMARY KEY (TeamID, GameID),
    UNIQUE (GameID, Won)
);

CREATE TABLE LoLDB.RunePath (
    RunePathID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(64) NOT NULL UNIQUE,
    LogoLink VARCHAR(256) NOT NULL,
);

CREATE TABLE LoLDB.KeystoneRune (
    KeystoneRuneID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(64) NOT NULL UNIQUE,
    LogoLink VARCHAR(256) NOT NULL,
    RunePathID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.RunePath(RunePathID)
);

CREATE TABLE LoLDB.SecondaryRune (
    SecondaryRuneID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(64) NOT NULL UNIQUE,
    LogoLink VARCHAR(256) NOT NULL,
    Slot TINYINT NOT NULL CHECK(Slot BETWEEN 1 AND 3),
    RunePathID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.RunePath(RunePathID)
);

CREATE TABLE LoLDB.ShardRune (
    ShardRuneID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(64) NOT NULL,
    LogoLink VARCHAR(256) NOT NULL,
    Slot TINYINT NOT NULL CHECK(Slot BETWEEN 1 AND 3)

    UNIQUE([Name], Slot)
);

CREATE TABLE LoLDB.PlayerGameStats (
    PlayerGameStatsID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    ChampionID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Champion(ChampionID),
    GameID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Game(GameID),
    PlayerID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Player(PlayerID),
    CreepScore INT NOT NULL,
    VisionScore INT NOT NULL,
    TenMinuteGold INT,
    FifteenMinuteGold INT,
    EndGold INT NOT NULL,
    KeystoneRuneID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.KeystoneRune(KeystoneRuneID),
    SecondaryRunePathID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.RunePath(RunePathID),

    UNIQUE (GameID, PlayerID),
    UNIQUE (GameID, ChampionID)
);

CREATE TABLE LoLDB.PlayerSecondaryRune (
    PlayerGameStatsID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.PlayerGameStats(PlayerGameStatsID),
    SecondaryRuneID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.SecondaryRune(SecondaryRuneID),

    PRIMARY KEY (PlayerGameStatsID, SecondaryRuneID)
);

CREATE TABLE LoLDB.PlayerShard (
    PlayerGameStatsID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.PlayerGameStats(PlayerGameStatsID),
    ShardRuneID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.ShardRune(ShardRuneID),

    PRIMARY KEY (PlayerGameStatsID, ShardRuneID)
);

CREATE TABLE LoLDB.Location (
    LocationID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE LoLDB.[Kill] (
    KillID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    GameID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Game(GameID),
    KillerID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Player(PlayerID),
    VictimID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Player(PlayerID),
    [Time] TIME NOT NULL,
    LocationID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Location(LocationID)
);

CREATE TABLE LoLDB.KillAssistant (
    KillID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.[Kill](KillID),
    PlayerID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Player(PlayerID),

    PRIMARY KEY (
        KillID,
        PlayerID
    )
);

CREATE TABLE LoLDB.ItemQuality (
    ItemQualityID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE LoLDB.Item (
    ItemID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(64) NOT NULL UNIQUE,
    ItemQualityID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.ItemQuality(ItemQualityID),
    LogoLink NVARCHAR(256) NOT NULL
);

CREATE TABLE LoLDB.ItemAcquisition (
    PlayerID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Player(PlayerID),
    GameID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Game(GameID),
    ItemID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Item(ItemID),
    TimeOfAcquisition TIME NOT NULL,

    PRIMARY KEY (
        PlayerID,
        GameID,
        ItemID
    )
);

CREATE TABLE LoLDB.Objective (
    ObjectiveID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(64) NOT NULL UNIQUE,
    LogoLink NVARCHAR(256) NOT NULL
);

CREATE TABLE LoLDB.ObjectiveStat (
    ObjectiveStatID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    ObjectiveID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Objective(ObjectiveID),
    GameID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Game(GameID),
    TeamID INT NOT NULL FOREIGN KEY REFERENCES LoLDB.Team(TeamID),
    TimeOfCapture TIME NOT NULL
);
