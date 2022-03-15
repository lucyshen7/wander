INSERT INTO todos (text, complete) 
VALUES ('Walk the dog', false),
('Write app', false);

INSERT INTO destinations (city, province, country) 
VALUES ('Miami', 'Florida', 'USA'),
('Shinjuku', 'Tokyo', 'Japan');

INSERT INTO trips (destination_id, hotel_name, hotel_address, start_date, end_date, created_at)
VALUES (1, 'W Miami', '485 Brickell Ave, Miami, FL 33131, United States', 03/20/2022, 3/27/2022, 03/14/2022),
(2, 'Hotel Granvia Kyoto', '〒600-8216 Kyoto, Shimogyo Ward, Higashishiokojicho, 901番地 内 Kyoto Station Building', 04/10/2022, 4/25/2022, 03/14/2022);

INSERT INTO activities (trip_id, date, activity_name, activity_address, type, cost)
VALUES (2, 04/12/2022, 'Fushimi Inari Shrine', '68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto', 325),
(1, 03/23/2022, 'Vizcaya Museum & Gardens', '3251 S Miami Ave, Miami, FL 33129, United States', 2821);