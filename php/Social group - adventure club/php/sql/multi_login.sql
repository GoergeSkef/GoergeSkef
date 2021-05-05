-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2021 at 08:27 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `multi_login`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `actdate` varchar(12) NOT NULL,
  `acttype` varchar(100) NOT NULL,
  `location` varchar(200) NOT NULL,
  `descript` varchar(200) NOT NULL,
  `contact` varchar(200) NOT NULL,
  `activityid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`actdate`, `acttype`, `location`, `descript`, `contact`, `activityid`) VALUES
('2017-11-19', 'Rowing', 'Big Lake - meet up at 14:35', '45 minute rowing with exercise', 'John J 553-43-56-76', 6),
('2017-11-19', 'Mountain Bike', 'Club house - meet up at 14:35', '5 km trail in the woods, advanced level. ', 'Julia Smith 554-23-443-', 7),
('2017-11-19', 'Cycling', 'Club house - meet up at 15:00', '15 km road cycling, high tempo ', 'Jeremy Svensson 534-23-343', 8),
('2017-11-20', 'Rowing', 'Big Lake - meet up at 12:35', '45 minute rowing with exercise', 'John J 553-43-56-76', 9),
('2017-11-20', 'Mountain Bike', 'Club house - meet up at 13:35', '3 km trail in the woods, beginners level. ', 'Julia Smith 554-23-443-', 10),
('2017-11-20', 'Cycling', 'Club house - meet up at 19:00', '10 km road cycling\r\n', 'Jeremy Svensson 534-23-343', 11);

-- --------------------------------------------------------

--
-- Table structure for table `equipmentlist`
--

CREATE TABLE `equipmentlist` (
  `equipmentid` int(10) NOT NULL,
  `season` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `model` varchar(600) NOT NULL,
  `description` varchar(600) NOT NULL,
  `onloan` tinyint(1) NOT NULL,
  `bookingref` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equipmentlist`
--

INSERT INTO `equipmentlist` (`equipmentid`, `season`, `type`, `model`, `description`, `onloan`, `bookingref`) VALUES
(1, 'Summer', 'Mountain Bike ', 'Sott Spark 940 - 26\"', 'Fully equipped top of the line MTB. ', 1, '554678'),
(18, 'Summer', 'Canoe', 'Riot 1200', 'Canoe suiting 4 people.', 1, '1312'),
(19, 'Summer', 'Canoe', 'Riot 1200', 'Canoe suiting 4 people.', 1, '1412'),
(20, 'Summer', 'Kayak', 'Sevlo 34X', 'Perfect kayak for streamy water', 1, '1313'),
(21, 'Summer', 'Kayak', 'Sevlo 34X', 'Perfect kayak for streamy water', 0, '1413'),
(22, 'Winter', 'Slalom skis', 'Atomic 143Tr', 'Slalom skis in size 13', 0, '1432'),
(23, 'Winter', 'Slalom skis', 'Atomic 143Tr', 'Slalom skis in size 13', 0, '1532'),
(24, 'Winter', 'XC skis ', 'Fischer 2000', 'Ultimate XC skis in size for 12\"', 0, '10012'),
(25, 'Winter', 'XC skis ', 'Fischer 2000', 'Ultimate XC skis in size for 12\"', 0, '1012'),
(26, 'Winter', 'Snowboard', 'Forum', '156 cm ', 0, '1315'),
(27, 'Winter', 'Snowboard', 'Forum', '156 cm ', 0, '1515');

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `dateof` varchar(20) NOT NULL,
  `activity` varchar(300) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `infotxt` varchar(300) NOT NULL,
  `contact` varchar(300) NOT NULL,
  `tripid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`dateof`, `activity`, `destination`, `infotxt`, `contact`, `tripid`) VALUES
('2017-11-29', 'MTB trip', 'Whistler, Canada', '2 Week MTB trip to Whistler. Two spots in the car left, staying in tent.', 'For more information contact: John@john.com', 2),
('2017-11-29', 'MTB trip', 'Whistler, Canada', '2 Week MTB trip to Whistler. Two spots in the car left, staying in tent.', 'For more information contact: John@john.com', 3),
('2017-11-29', 'MTB trip', 'Whistler, Canada', '2 Week MTB trip to Whistler. Two spots in the car left, staying in tent.', 'For more information contact: John@john.com', 4),
('2017-11-29', 'MTB trip', 'Whistler, Canada', '2 Week MTB trip to Whistler. Two spots in the car left, staying in tent.', 'For more information contact: John@john.com', 5),
('2017-11-29', 'MTB trip', 'Whistler, Canada', '2 Week MTB trip to Whistler. Two spots in the car left, staying in tent.', 'For more information contact: John@john.com', 6),
('2017-11-29', 'MTB trip', 'Whistler, Canada', '2 Week MTB trip to Whistler. Two spots in the car left, staying in tent.', 'For more information contact: John@john.com', 7),
('2017-11-30', 'Advanced off-pist skiing', 'Mount Everest, Tibet', 'Two week trip to M.E, daily off-pist skiing and possibilty for heli-skiing. Living in a 12 bed house. Estimated cost per person: $2000. ', 'For more information or questions, contact Johan - johan@adventureclub.com', 8),
('2017-11-30', 'Advanced off-pist skiing', 'Mount Everest, Tibet', 'Two week trip to M.E, daily off-pist skiing and possibilty for heli-skiing. Living in a 12 bed house. Estimated cost per person: $2000. ', 'For more information or questions, contact Johan - johan@adventureclub.com', 9),
('2017-11-30', 'Advanced off-pist skiing', 'Mount Everest, Tibet', 'Two week trip to M.E, daily off-pist skiing and possibilty for heli-skiing. Living in a 12 bed house. Estimated cost per person: $2000. ', 'For more information or questions, contact Johan - johan@adventureclub.com', 10),
('2017-11-30', 'Advanced off-pist skiing', 'Mount Everest, Tibet', 'Two week trip to M.E, daily off-pist skiing and possibilty for heli-skiing. Living in a 12 bed house. Estimated cost per person: $2000. ', 'For more information or questions, contact Johan - johan@adventureclub.com', 11);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `user_type` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `user_type`, `password`) VALUES
(1, 'george', 'Georgeskef@outlook.com', 'admin', 'f0578f1e7174b1a41c4ea8c6e17f7a8a3b88c92a'),
(2, 'client', 'someone@gmail.com', 'user', 'f0578f1e7174b1a41c4ea8c6e17f7a8a3b88c92a');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`activityid`);

--
-- Indexes for table `equipmentlist`
--
ALTER TABLE `equipmentlist`
  ADD PRIMARY KEY (`equipmentid`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`tripid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `activityid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `equipmentlist`
--
ALTER TABLE `equipmentlist`
  MODIFY `equipmentid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `tripid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
