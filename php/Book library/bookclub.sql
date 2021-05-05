-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 12, 2018 at 08:43 AM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

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
  `socialNumber` int(11) DEFAULT NULL,
  `birtyYear` int(11) DEFAULT NULL,
  `moreInfo` varchar(500) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `firstName`, `lastName`, `socialNumber`, `birtyYear`, `moreInfo`) VALUES
(1, 'Paulo', 'Coelho', NULL, NULL, NULL),
(2, 'Ken', 'Follett', NULL, NULL, NULL),
(3, 'Marcel', 'Proust', NULL, NULL, NULL),
(4, 'Homer', '-', NULL, NULL, NULL),
(5, 'Lev', 'Tolstoy', NULL, NULL, NULL),
(6, 'Herman', 'Melville', NULL, NULL, NULL),
(7, 'New', 'Author', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `bookid` int(11) NOT NULL,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `onloan` tinyint(1) DEFAULT '0',
  `author` varchar(100) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `duedate` date DEFAULT NULL
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
-- Table structure for table `book_authors`
--

CREATE TABLE `book_authors` (
  `book_author_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `book_authors`
--

INSERT INTO `book_authors` (`book_author_id`, `book_id`, `author_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 6, 7);

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
-- Indexes for table `book_authors`
--
ALTER TABLE `book_authors`
  ADD PRIMARY KEY (`book_author_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `bookid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `book_authors`
--
ALTER TABLE `book_authors`
  MODIFY `book_author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
