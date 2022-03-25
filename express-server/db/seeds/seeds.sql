INSERT INTO destinations (city, province, country, photo) 
VALUES ('Miami', 'Florida', 'USA', 'https://www.planetware.com/wpimages/2020/06/florida-miami-best-time-to-visit-best-month-to-visit.jpg'),
('Shinjuku', 'Tokyo', 'Japan', 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002533/img/basic/a0002533_main.jpg?20210122155600&q=80&rw=750&rh=536'),
('San Francisco', 'California', 'USA', 'https://s.hdnux.com/photos/01/22/22/16/21570469/3/rawImage.jpg');

INSERT INTO trips (destination_id, hotel_name, hotel_address, start_date, end_date, flight_cost, hotel_cost, created_at)
VALUES (1, 'W Miami', '485 Brickell Ave, Miami, FL 33131, United States', '03-20-2022', '03-27-2022', 120000, 70000, '03-05-2022'),
(2, 'Shinjuku Granbell Hotel', '2 Chome-14-5 Kabukicho, Shinjuku City, Tokyo 160-0021, Japan', '04-10-2022', '04-25-2022', 80000, 100000, '03-14-2022');

INSERT INTO activities (trip_id, date, activity_name, activity_address, type, cost)
VALUES (2, '03-29-2022', 'Fushimi Inari Shrine', '68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto', 'Shrine', 325),
(1, '03-30-2022', 'Vizcaya Museum & Gardens', '3251 S Miami Ave, Miami, FL 33129, United States', 'Museum', 2821);