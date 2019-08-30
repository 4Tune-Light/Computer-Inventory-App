-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 31, 2019 at 01:08 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.1.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `computer_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(40) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'CPU', '2019-08-26 23:41:48', '2019-08-26 23:41:48'),
(2, 'GPU', '2019-08-26 23:41:48', '2019-08-26 23:41:48'),
(3, 'Motherboard', '2019-08-26 23:41:48', '2019-08-26 23:41:48'),
(6, 'Name Category', '2019-08-30 18:59:07', '2019-08-30 18:59:07');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(8) NOT NULL,
  `name` varchar(40) CHARACTER SET latin1 NOT NULL,
  `description` text COLLATE utf8_bin NOT NULL,
  `image` varchar(300) COLLATE utf8_bin NOT NULL,
  `id_category` int(8) NOT NULL,
  `quantity` int(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `id_category`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 'AMD Ryzen 3600', 'Cores: 6\r\nThreads: 12\r\nBase Clock: 3.6GHz\r\nBoost Clock: 4.2GHz\r\nL1 Cache: 64KB\r\nL2 Cache: 3MB\r\nL3 Cache: 32MB\r\nUnlocked: Yes\r\nCMOS: TSMC 7nm FinFET\r\nPackage: AM4\r\nPCI Express® Version: PCIe 4.0 x16\r\nThermal Solution: Wraith Stealth\r\nDefault TDP / TDP: 65W\r\nMax Temps: 95°C', 'https://www.amd.com/system/files/styles/992px/private/2019-06/238593-ryzen-5-pib-left-facing-1260x709.png?itok=umdtyaSy', 1, 11, '2019-08-26 17:58:46', '2019-08-30 23:02:56'),
(2, 'AMD Ryzen 3700X', 'CPU Cores: 8\r\nThreads: 16\r\nBase Clock: 3.6GHz\r\nBoost Clock: 4.4GHz\r\nL1 Cache: 64KB\r\nL2 Cache: 4MB\r\nL3 Cache: 32MB\r\nUnlocked: Yes\r\nCMOS: TSMC 7nm FinFET\r\nPackage: AM4\r\nPCI Express® Version: PCIe 4.0 x16\r\nThermal Solution: Wraith Prism with RGB LED\r\nDefault TDP / TDP: 65W\r\nMax Temps: 95°C', 'https://www.amd.com/system/files/styles/992px/private/2019-06/238593-ryzen-7-pib-left-facing-1260x709.png?itok=ACRb3hX0', 1, 15, '2019-08-26 17:55:26', '2019-08-26 07:00:00'),
(3, 'AMD Ryzen 3800X', 'CPU Cores: 8\r\nThreads: 16\r\nBase Clock: 3.9GHz\r\nBoost Clock: 4.5GHz\r\nL1 Cache: 64KB\r\nL2 Cache: 4MB\r\nL3 Cache: 32MB\r\nUnlocked: Yes\r\nCMOS: TSMC 7nm FinFET\r\nPackage: AM4\r\nPCI Express® Version: PCIe 4.0 x16\r\nThermal Solution: Wraith Prism with RGB LED\r\nDefault TDP / TDP: 105W\r\nMax Temps: 95°C', 'https://www.amd.com/system/files/styles/992px/private/2019-06/238593-ryzen-7-pib-left-facing-1260x709.png?itok=ACRb3hX0', 1, 7, '2019-08-26 17:58:14', '2019-08-26 07:00:00'),
(4, 'AMD RX 5700', 'Compute Units: 36\r\nBase Frequency: 1465 MHz\r\nBoost Frequency: Up to 1725 MHz\r\nGame Frequency: 1625 MHz\r\nPeak Pixel Fill-Rate: Up to 110.4 GP/s\r\nPeak Texture Fill-Rate: Up to 248.4 GT/s\r\nPeak Half Precision Compute Performance\r\n15.9 TFLOPs\r\nPeak Single Precision Compute Performance: 7.95 TFLOPs\r\nROPs: 64\r\nStream Processors: 2304\r\nTexture Units: 144\r\nTransistor Count: 10.3 B', 'https://www.amd.com/system/files/2019-06/237107-rx5700-gpu-gallery2-1260x709.png', 2, 12, '2019-08-26 18:06:05', '2019-08-26 07:00:00'),
(5, 'AMD RX 5700XT', 'Compute Units: 40\r\nBase Frequency: 1605 MHz\r\nBoost Frequency: Up to 1905 MHz\r\nGame Frequency: 1755 MHz\r\nPeak Pixel Fill-Rate: Up to 121.9 GP/s\r\nPeak Texture Fill-Rate: Up to 304.8 GT/s\r\nPeak Half Precision Compute Performance: 19.51 TFLOPs\r\nPeak Single Precision Compute Performance: 9.75 TFLOPs\r\nROPs: 64\r\nStream Processors: 2560\r\nTexture Units: 160\r\nTransistor Count: 10.3 B', 'https://www.amd.com/system/files/2019-06/237107-rx5700xt-gpu-gallery2-1260x709.png', 2, 15, '2019-08-26 18:05:41', '2019-08-26 07:00:00'),
(6, 'MSI B450 Tomahawk', '1. Flash BIOS Button\r\n2. PS/2 Combo Port\r\n3. DVI-D Port\r\n4. USB 3.1 Gen2 (Type A+C)\r\n5. HD Audio Connectors\r\n6. Heavy plated gaming heatsinks \r\n7. DDR4 Boost \r\n8. PCI-E Steel Armor\r\n9. Turbo M.2\r\n10. Audio Boost \r\n11. Extended Heatsink Design \r\n12. Arsenal Sticker Area\r\n', 'https://storage-asset.msi.com/global/picture/features/MB/Gaming/B450/B450Tomahawk/b450-Tomahwk-light_cover.png', 3, 10, '2019-08-26 18:14:25', '2019-08-26 07:00:00'),
(7, 'MSI X470 GAMING PLUS', '1. High-res HDMI Port\r\n2. AMD Turbo USB 3.1 Gen2\r\n3. Gaming Device Port\r\n4. GAMING LAN\r\n5. Golden Audio Jacks with S/PDIF\r\n6. 2x Power connectors\r\n7. Gaming heatsinks\r\n8. DDR4 Boost\r\n9. AMD X470 Chipset\r\n10. PCI-E Steel Armor\r\n11. Audio Boost \r\n12. 2x M.2', 'https://storage-asset.msi.com/global/picture/features/MB/Gaming/X470/msi-x470-gaming-plus-mask.png', 3, 6, '2019-08-26 18:17:29', '2019-08-26 07:00:00'),
(9, 'Contoh Nama Product', 'Contoh Deskripsi Product', 'Contoh Link Image', 2, 7, '2019-08-26 22:29:40', '2019-08-27 02:38:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(40) COLLATE utf8_bin NOT NULL,
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  `email` varchar(60) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES
(51, 'rizky', '$2b$12$SyjUnkxrGHYYT9YDXyHgA.gdFLsuVeb7Cd6HbBotu.LEZZII0sNb2', 'rizky@gmail.com'),
(52, 'newuser', '$2b$12$KPR78Oj36RXN5nVbpUoELuKAt2Mk.IT3G1paVJ5G70JZVzXqFJVP.', 'new.user@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
