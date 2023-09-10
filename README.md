[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/mzxBmZy_)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11713901&assignment_repo_type=AssignmentRepo)
![](http://143.42.108.232/pvt/Noroff-64.png)
# Noroff
# Back-end Development Year 1
### Databases - Course Assignment 1 <sup>V4</sup>

Startup code for Noroff back-end development 1 - Front-end Technologies course.

Instruction for the course assignment is in the LMS (Moodle) system of Noroff.
[https://lms.noroff.no](https://lms.noroff.no)

![](http://143.42.108.232/pvt/important.png)

You will not be able to make any submission after the deadline of the course assignment. Make sure to make all your commit **BEFORE** the deadline

![](http://143.42.108.232/pvt/help_small.png)

If you are unsure of any instructions for the course assignment, contact out to your teacher on **Microsoft Teams**.

**REMEMBER** Your Moodle LMS submission must have your repository link **AND** your Github username in the text file.

---

# Application Installation and Usage Instructions

# Environment Variables

ADMIN_USERNAME = "SystemAdmin"
ADMIN_PASSWORD = "admin1234"
DATABASE_NAME = "adoptiondb"
DIALECT = "mysql"
DIALECTMODEL = "mysql2"
PORT = "3000"
HOST = "localhost"

# Additional Libraries/Packages
Sequelize version 6.28.0
MySQL version 2.18.1
MySQL2 version 3.1.0

# NodeJS Version Used

v18.16.0

# DATABASE

CREATE DATABASE adoptiondb;

# DATAINSERTS


# DATABASEACCESS

CREATE USER 'dabcaowner'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dabca1234';

GRANT ALL PRIVILEGES ON adoptiondb.* TO 'dabcaowner'@'localhost';

# DATABASEQUERIES