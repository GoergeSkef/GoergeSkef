-- phpMyAdmin SQL Dump
-- version 4.7.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 10, 2017 at 02:30 PM
-- Server version: 5.6.35
-- PHP Version: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `bookclub`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `lastName` varchar(50) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `socialNumber` int(11) NOT NULL,
  `birtyYear` int(11) NOT NULL,
  `moreInfo` varchar(500) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `bookid` int(11) NOT NULL,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `onloan` tinyint(1) DEFAULT '0',
  `author` varchar(100) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `duedate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`bookid`, `title`, `onloan`, `author`, `duedate`) VALUES
(1, 'The Alchemist', 1, 'Paulo Coelho', '0000-00-00'),
(2, 'The Pillars of the Earth', 0, 'Ken Follett', '0000-00-00'),
(3, 'In Search of Lost Time', 1, 'Marcel Proust', '0000-00-00'),
(4, 'The Odyssey', 0, 'Homer', '0000-00-00'),
(5, 'War and Peace', 0, 'Lev Tolstoy', '0000-00-00'),
(6, 'Moby Dick', 0, 'Herman Melville', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`) VALUES
('bogdana', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`bookid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
