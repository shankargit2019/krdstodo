CREATE DATABASE api_db;

CREATE TABLE `todotbl` (
 `todoId` int(11) NOT NULL AUTO_INCREMENT,
 `todoTxt` varchar(200) NOT NULL,
 `todo_isDone` tinyint(1) NOT NULL DEFAULT '0',
 `todoCreatedDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`todoId`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=latin1



CREATE TABLE `todousers` (
 `userId` int(11) NOT NULL AUTO_INCREMENT,
 `tokenId` tinytext NOT NULL,
 `emailid` varchar(100) NOT NULL,
 `name` varchar(100) NOT NULL,
 `userLogged` int(11) NOT NULL,
 `userCreatedDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1