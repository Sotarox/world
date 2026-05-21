-- Minimal airport fixtures for integration tests (3 in US, 2 in DE).
INSERT INTO Airports (
        id, gmt, airport_id, iata_code, city_iata_code, icao_code, country_iso2, geoname_id,
        latitude, longitude, airport_name, country_name, phone_number, timezone
        ) VALUES
('3580123', '-5', '5', 'AAF', 'AAF', 'KAAF', 'US', '4146153', '29.733334', '-84.98333', 'Apalachicola Regional', 'United States', 'null', 'America/New_York'),
('3580147', '-5', '29', 'ABE', 'ABE', 'KABE', 'US', '5200013', '40.651573', '-75.434364', 'Lehigh Valley International', 'United States', 'null', 'America/New_York'),
('3580159', '-7', '41', 'ABQ', 'ABQ', 'KABQ', 'US', '5454724', '35.049625', '-106.617195', 'Albuquerque International', 'United States', '505-244-7700', 'America/Denver'),
('3580125', '1', '7', 'AAH', 'AAH', 'EDKA', 'DE', '3207669', '50.75', '6.133333', 'Aachen/Merzbruck', 'Germany', 'null', 'Europe/Berlin'),
('3590535', '1', '129', 'AGB', 'MUC', 'EDMA', 'DE', '3208383', '48.425278', '10.931667', 'Augsburg - Muehlhausen', 'Germany', 'null', 'Europe/Berlin');
