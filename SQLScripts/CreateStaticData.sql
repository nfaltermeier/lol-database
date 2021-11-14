DELETE FROM LoLDB.Position;
DBCC CHECKIDENT ('LoLDB.Position', RESEED, 1);
DELETE FROM LoLDB.Champion;
DBCC CHECKIDENT ('LoLDB.Champion', RESEED, 1);
DELETE FROM LoLDB.SecondaryRune;
DBCC CHECKIDENT ('LoLDB.SecondaryRune', RESEED, 1);
DELETE FROM LoLDB.KeystoneRune;
DBCC CHECKIDENT ('LoLDB.KeystoneRune', RESEED, 1);
DELETE FROM LoLDB.RunePath;
DBCC CHECKIDENT ('LoLDB.RunePath', RESEED, 1);
DELETE FROM LoLDB.ShardRune;
DBCC CHECKIDENT ('LoLDB.ShardRune', RESEED, 1);
DELETE FROM LoLDB.Region;
DBCC CHECKIDENT ('LoLDB.Region', RESEED, 1);

INSERT INTO LoLDB.Region([Name])
VALUES
    ('North America'), ('Europe');

INSERT INTO LoLDB.RunePath([Name], LogoLink)
VALUES
    ('Precision', 'https://static.wikia.nocookie.net/leagueoflegends/images/2/26/Precision_icon.png/revision/latest/'),
    ('Domination', 'https://static.wikia.nocookie.net/leagueoflegends/images/1/1e/Domination_icon.png/revision/latest'),
    ('Sorcery', 'https://static.wikia.nocookie.net/leagueoflegends/images/c/cd/Sorcery_icon.png/revision/latest/'),
    ('Resolve', 'https://static.wikia.nocookie.net/leagueoflegends/images/f/fa/Resolve_icon.png/revision/latest/'),
    ('Inspiration', 'https://static.wikia.nocookie.net/leagueoflegends/images/0/0d/Inspiration_icon.png/revision/latest/');

INSERT INTO LoLDB.KeystoneRune([Name], LogoLink, RunePathID)
SELECT D.[Name], D.LogoLink, RunePathID
FROM (
    VALUES ('Press the Attack', 'Precision', 'link-add-later'),
        ('Lethal Tempo', 'Precision', 'link-add-later'),
        ('Electrocute', 'Domination', 'link-add-later')
) D([Name], RunePathName, LogoLink)
JOIN LoLDB.RunePath RP ON D.RunePathName = RP.Name;

INSERT INTO LoLDB.SecondaryRune([Name], Slot, LogoLink, RunePathID)
SELECT D.[Name], Slot, D.LogoLink, RunePathID
FROM (
    VALUES ('Overheal', 'Precision', 1, 'link-add-later'),
        ('Legend: Alacrity', 'Precision', 2, 'link-add-later'),
        ('Coup De Grace', 'Precision', 3, 'link-add-later'),
        ('Cheap Shot', 'Domination', 1, 'link-add-later'),
        ('Zombie Ward', 'Domination', 2, 'link-add-later'),
        ('Ravenous Hunter', 'Domination', 3, 'link-add-later')
) D([Name], RunePathName, Slot, LogoLink)
JOIN LoLDB.RunePath RP ON D.RunePathName = RP.Name;

INSERT INTO LoLDB.ShardRune([Name], Slot, LogoLink)
VALUES
    ('Attack Damage', 1, 'link-add-later'),
    ('Attack Speed', 1, 'link-add-later'),
    ('Attack Damage', 2, 'link-add-later'),
    ('Health', 3, 'link-add-later');

INSERT INTO LoLDB.Position([Name], LogoLink)
VALUES
    ('Top', 'no'),
    ('Mid', 'why'),
    ('Support', 'are'),
    ('ADC', 'there'),
    ('Jungle', 'links'),
    ('Coach', 'here');

INSERT INTO LoLDB.Champion([Name])
VALUES
    ('Aatrox'),
    ('Ahri'),
    ('Akali'),
    ('Akshan');
