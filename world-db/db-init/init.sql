CREATE TABLE Countries (
    dbid SERIAL PRIMARY KEY,
    id TEXT NOT NULL,
    capital TEXT NOT NULL,
    currency_code TEXT NOT NULL,
    fips_code TEXT NOT NULL,
    country_iso2 TEXT NOT NULL,
    country_iso3 TEXT NOT NULL,
    continent TEXT NOT NULL,
    country_id TEXT NOT NULL,
    country_name TEXT NOT NULL,
    currency_name TEXT NOT NULL,
    country_iso_numeric TEXT NOT NULL,
    phone_prefix TEXT NOT NULL,
    population int4 NULL
);

CREATE TABLE Airports (
    dbid SERIAL PRIMARY KEY,
    id TEXT NOT NULL,
    gmt TEXT NOT NULL,
    airport_id TEXT NOT NULL,
    iata_code TEXT NOT NULL,
    city_iata_code TEXT NOT NULL,
    icao_code TEXT NOT NULL,
    country_iso2 TEXT NOT NULL,
    geoname_id TEXT NOT NULL,
    latitude TEXT NOT NULL,
    longitude TEXT NOT NULL,
    airport_name TEXT NOT NULL,
    country_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    timezone TEXT NOT NULL
)
