-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2024 at 12:23 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_call_centre`
--

-- --------------------------------------------------------

--
-- Table structure for table `calls`
--

CREATE TABLE `calls` (
  `call_id` int(11) NOT NULL,
  `call_date` datetime NOT NULL,
  `call_duration` int(11) NOT NULL,
  `call_subject` varchar(255) NOT NULL,
  `call_type` enum('Sortant','Manqué','Entrant') NOT NULL DEFAULT 'Entrant',
  `call_tickets` int(11) NOT NULL DEFAULT 0,
  `phone_number` varchar(255) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_by_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `calls`
--

INSERT INTO `calls` (`call_id`, `call_date`, `call_duration`, `call_subject`, `call_type`, `call_tickets`, `phone_number`, `deleted`, `created_by_user_id`) VALUES
(1, '2024-06-29 10:00:00', 300, 'Order Inquiry', 'Entrant', 0, '+1234567890', 0, 0),
(2, '2024-06-29 11:30:00', 450, 'Technical Support', 'Manqué', 0, '+9876543210', 0, 0),
(3, '2024-06-29 13:00:00', 200, 'Billing Issue', 'Sortant', 0, '+1112223333', 0, 0),
(4, '2024-06-30 01:00:00', 5, '', 'Entrant', 0, '+212607895652', 0, 0),
(27, '2024-06-30 01:00:00', 5, '', 'Entrant', 0, '+212607895652', 0, 0),
(28, '2024-06-30 01:00:00', 6, '', 'Entrant', 0, '+212607895652', 0, 0),
(29, '2024-06-30 01:00:00', 4, '', 'Manqué', 0, '+212607895652', 0, 0),
(30, '2024-06-30 01:00:00', 5, '', 'Manqué', 0, '+212607895652', 0, 0),
(31, '2024-06-30 01:00:00', 5, '', 'Entrant', 0, '+212607895652', 0, 0),
(32, '2024-06-30 01:00:00', 1, '', 'Manqué', 0, '+212607895652', 0, 0),
(33, '2024-06-30 01:00:00', 35, '', 'Entrant', 0, '+212 607895652', 0, 0),
(34, '2024-06-30 01:00:00', 9, '', 'Manqué', 0, '+212607895652', 0, 0),
(35, '2024-06-30 01:00:00', 5, '', 'Entrant', 0, '+212 607895652', 0, 0),
(36, '2024-06-30 01:00:00', 4, '', 'Entrant', 0, '+212607895652', 0, 0),
(37, '2024-06-30 01:00:00', 5, '', 'Entrant', 0, '+212607895652', 0, 0),
(38, '2024-06-30 01:00:00', 6, '', 'Entrant', 0, '+212607895652', 0, 0),
(39, '2024-06-30 01:00:00', 7, '', 'Entrant', 0, '+212607895652', 0, 0),
(40, '2024-06-30 01:00:00', 4, '', 'Entrant', 0, '+212607895652', 0, 0),
(41, '2024-06-30 01:00:00', 6, '', 'Manqué', 0, '+212 607895652', 0, 0),
(42, '2024-06-30 01:00:00', 6, '', 'Entrant', 0, '+212 607895652', 0, 0),
(43, '2024-06-30 01:00:00', 4, '', 'Entrant', 0, '+212 607895652', 0, 0),
(44, '2024-07-01 01:00:00', 8, '', 'Entrant', 0, '+212 607895652', 0, 0),
(45, '2024-07-01 01:00:00', 10, '', 'Entrant', 0, '+212 607895652', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `ticket_type` varchar(250) NOT NULL,
  `call_type` varchar(250) NOT NULL,
  `date` datetime NOT NULL,
  `email` varchar(250) NOT NULL,
  `subject` varchar(500) NOT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `readed` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `ticket_type`, `call_type`, `date`, `email`, `subject`, `created_by_user_id`, `readed`) VALUES
(1, 'Commentaire ticket', '', '2024-07-02 00:48:49', 'j.doe@example.com', 'John Doe a ajouté un commentaire sur le ticket ID : 1', 1, 0),
(2, 'création de ticket', '', '2024-07-02 01:40:27', 'j.doe@example.com', 'John Doe a créé un ticket pour l\'appel ID : 1', 1, 0),
(3, 'Commentaire ticket', '', '2024-07-02 02:16:53', 'j.doe@example.com', 'John Doe a ajouté un commentaire sur le ticket ID : 1', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` enum('agent','supervisor') NOT NULL DEFAULT 'agent'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'agent'),
(2, 'supervisor');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `call_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `issue_description` text NOT NULL,
  `ticket_status` enum('En cours','Résolu','Annulé') NOT NULL DEFAULT 'En cours',
  `created_by_user_id` int(11) NOT NULL,
  `assigned_to_user_id` int(11) DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`call_id`, `ticket_id`, `issue_description`, `ticket_status`, `created_by_user_id`, `assigned_to_user_id`, `creation_date`, `last_update_date`) VALUES
(1, 1, 'Customer wants to know about order status', 'Résolu', 1, 1, '2024-06-28 17:58:09', '2024-07-01 01:50:18'),
(2, 2, 'Investigate why call was missed', 'En cours', 2, 3, '2024-06-28 17:58:09', NULL),
(3, 3, 'Incorrect charge on credit card statement', 'Résolu', 1, 3, '2024-06-28 17:58:09', NULL),
(2, 100, 'Issue with network connectivity', 'Annulé', 2, NULL, '2024-06-28 21:07:50', NULL),
(2, 102, 'Issue with network connectivity', 'Annulé', 2, NULL, '2024-06-29 17:40:54', NULL),
(29, 103, 'sujet', 'En cours', 1, NULL, '2024-06-30 03:59:43', NULL),
(30, 104, 'sujet résolu', 'Résolu', 1, NULL, '2024-06-30 04:00:57', NULL),
(33, 105, 'cnx fails', 'En cours', 1, 3, '2024-06-30 04:47:49', NULL),
(34, 108, 'sujet résolu', 'Résolu', 1, NULL, '2024-06-30 04:57:22', NULL),
(38, 109, 'sujet', 'Résolu', 1, NULL, '2024-06-30 14:54:58', NULL),
(39, 110, 'sujet', 'Résolu', 1, 1, '2024-06-30 14:59:55', NULL),
(40, 111, 'sujet résolu', 'Résolu', 1, NULL, '2024-06-30 15:05:22', NULL),
(41, 112, 'sujet résolu', 'Résolu', 1, 1, '2024-06-30 17:50:55', NULL),
(44, 113, 'sujet résolu', 'Résolu', 2, NULL, '2024-07-01 01:09:36', NULL),
(45, 114, 'Incorrect charge on credit card statement', 'En cours', 2, 3, '2024-07-01 01:12:45', NULL),
(1, 115, 'Incorrect charge on credit card statement', 'Résolu', 1, 1, '2024-07-01 22:31:11', NULL),
(1, 116, 'test notif 1', 'En cours', 1, 1, '2024-07-02 01:40:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ticket_comments`
--

CREATE TABLE `ticket_comments` (
  `comment_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `comment_text` text NOT NULL,
  `comment_date` datetime NOT NULL,
  `commented_by_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket_comments`
--

INSERT INTO `ticket_comments` (`comment_id`, `ticket_id`, `comment_text`, `comment_date`, `commented_by_user_id`) VALUES
(1, 1, 'Order has been shipped and tracking number is 1234567890', '2024-06-28 17:58:57', 1),
(2, 2, 'Ticket assigned to Peter Jones for investigation', '2024-06-28 17:58:57', 2),
(3, 2, 'zed', '2024-07-01 22:07:05', 1),
(4, 2, 'Working on it ', '2024-07-01 22:10:42', 1),
(5, 2, '\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime vel, harum rerum delectus impedit tenetur. Aperiam, dolor repellendus alias, voluptatem quisquam voluptatibus voluptatum totam, assumenda neque architecto quis a cum.', '2024-07-01 22:11:34', 1),
(6, 1, 'Résolu', '2024-07-01 22:13:10', 1),
(7, 115, 'Incorrect charge fixed', '2024-07-01 22:32:14', 1),
(8, 1, 'test notif', '2024-07-02 00:48:49', 1),
(9, 1, 'hhhh', '2024-07-02 02:16:53', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL DEFAULT '50',
  `last_name` varchar(255) NOT NULL DEFAULT '50',
  `email` varchar(255) NOT NULL DEFAULT '100',
  `password` varchar(255) NOT NULL DEFAULT '255',
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `role`) VALUES
(1, 'John', 'Doe', 'j.doe@example.com', 'password123', 1),
(2, 'Jane', 'Smith', 'j.smith@example.com', 'password456', 2),
(3, 'Peter', 'Jones', 'p.jones@example.com', 'password789', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `calls`
--
ALTER TABLE `calls`
  ADD PRIMARY KEY (`call_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_fk6` (`created_by_user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`ticket_id`),
  ADD KEY `tickets_fk0` (`call_id`),
  ADD KEY `tickets_fk4` (`created_by_user_id`),
  ADD KEY `tickets_fk5` (`assigned_to_user_id`);

--
-- Indexes for table `ticket_comments`
--
ALTER TABLE `ticket_comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `ticket_comments_fk1` (`ticket_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `users_fk5` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calls`
--
ALTER TABLE `calls`
  MODIFY `call_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticket_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `ticket_comments`
--
ALTER TABLE `ticket_comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
