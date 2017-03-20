SET NAMES UTF8;
#DROP DATABASE IF EXISTS ecar;
#CREATE DATABASE ecar CHARSET=UTF8;
#USE ecar;

CREATE TABLE e_car(
    did INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128),
    source VARCHAR(64),
    price VARCHAR(8),
    img_sm VARCHAR(64),
    img_lg VARCHAR(64),
    detail VARCHAR(2048),
    applyer VARCHAR(20)
);
INSERT INTO e_car(did,name,source,price,img_sm,img_lg,detail,applyer) VALUES
(null,'福特 蒙迪欧 2013款 2.0L GTDi200豪华型','重庆-重庆市','17.18万','1.1.jpg','1.jpg','一键启动、双电动座椅、薄片换挡、2.0T无火烧、无水泡、当时办完23万多、可议价','认证车辆'),
(null,'奥迪A3 2016款 Limousine 35 TFSI 进取型','江苏-常州市','22.00万','1.2.jpg','2.jpg','一键启动、双电动座椅、薄片换挡、2.0T无火烧、无水泡、当时办完23万多、可议价','认证车辆'),
(null,'比亚迪 M6 2016款 2.4L 自动豪华型','广东-珠海市','12.30万','1.3.jpg','3.jpg','一键启动、双电动座椅、薄片换挡、2.0T无火烧、无水泡','个人'),
(null,'福特 蒙迪欧 2013款 2.0L GTDi200豪华型','重庆-重庆市','17.18万','1.4.jpg','4.jpg','一键启动、双电动座椅、薄片换挡、2.0T无火烧、无水泡、当时办完23万多、可议价','认证车辆'),
(null,'奥迪A3 2016款 Limousine 35 TFSI 进取型','江苏-常州市','22.00万','1.5.jpg','5.jpg','一键启动、双电动座椅、薄片换挡、2.0T无火烧、无水泡、当时办完23万多、可议价','认证车辆'),
(null,'比亚迪 M6 2016款 2.4L 自动豪华型','广东-珠海市','12.30万','1.3.jpg','3.jpg','一键启动、双电动座椅、薄片换挡、2.0T无火烧、无水泡','个人'),
(null,'比亚迪 M6 2016款 2.4L 自动豪华型','广东-珠海市','12.30万','1.1.jpg','1.jpg','一键启动、双电动座椅、薄片换挡、2.0T无火烧、无水泡','个人')