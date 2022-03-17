INSERT INTO todos (text, complete) 
VALUES ('Walk the dog', false),
('Write app', false);

INSERT INTO destinations (city, province, country, photo) 
VALUES ('Miami', 'Florida', 'USA', 'https://www.planetware.com/wpimages/2020/06/florida-miami-best-time-to-visit-best-month-to-visit.jpg'),
('Shinjuku', 'Tokyo', 'Japan', 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002533/img/basic/a0002533_main.jpg?20210122155600&q=80&rw=750&rh=536');

INSERT INTO trips (destination_id, hotel_name, hotel_address, start_date, end_date, created_at)
VALUES (1, 'W Miami', '485 Brickell Ave, Miami, FL 33131, United States', '03-20-2022', '03-27-2022', '03-05-2022'),
(2, 'Hotel Granvia Kyoto', '〒600-8216 Kyoto, Shimogyo Ward, Higashishiokojicho, 901番地 内 Kyoto Station Building', '04-10-2022', '04-25-2022', '03-14-2022');

INSERT INTO activities (trip_id, date, activity_name, activity_address, type, cost)
VALUES (2, '04-12-2022', 'Fushimi Inari Shrine', '68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto', 'Shrine', 325),
(1, '03-23-2022', 'Vizcaya Museum & Gardens', '3251 S Miami Ave, Miami, FL 33129, United States', 'Museum', 2821);