## Program description for the customer, detailed description for the company
### During the design of the software, the following functionality was assumed:
•	New user registration and login system,<br>
•	Storing the encrypted password in the database, this uses a special 30- character key that is generated when creating a user account, each user has their own unique key this allows to increase the security of password encryption,<br>
•	Role system: USER (basic operations), ADMIN (modifying, adding and deleting objects from the database),<br>
•	Search for movies, category, actor, director,<br>
•	A system for booking a movie for a date specified by the user, this uses a tyrant algorithm that makes sure that the first user to book a movie can confirm the fulfillment of their order. It is also assumed that each movie may have a different quantity, our system takes into account the current number of rented movies on a given day and downloads the number of available movies, for this purpose the algorithm knows whether it can let you rent a movie for a given date,<br>
•	Deletion of a user account is implemented from the My Accounts tab, the user is required to enter the current password,<br>
•	Modification of the user's password is possible only after entering the current password,<br>
•	Displaying reservations that need to be confirmed.<br>

![Main](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG1yM3F5bTB4ZnZyMWU5M3N2dWdlN2h5OGhjZ3Y4MWd4czdsa3BrayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/t7nBCUNLGdoNoRw887/giphy.gif)


## Description of implementation
### Before implementation:
You should install the Java JDK from the software developer's website (https://www.oracle.com/pl/java/technologies/downloads/). Then create a JAVA_HOME System Variable and assign to it the directory where you installed the Java JDK:<br>
•	for Windows - https://confluence.atlassian.com/doc/setting-the-java_home-variable-in- windows-8895.html <br>
•	for macOS - https://mkyong.com/java/how-to-set-java_home-environment-variable-on- mac-os-x/ <br>
•	for Linux - https://stackoverflow.com/questions/24641536/how-to-set-java-home-in-linux- for-all-users <br>
Install NodeJS from the software developer's website (https://nodejs.org) in the LTS version. <br>
After downloading and extracting the project files: <br>
Install the PostgreSQL database (https://www.postgresql.org/download/) and create the database according to the data in the [location_project]/backend/src/main/resources/application.properties file taking into account the first three properties: <br>
```
spring.datasource.url=jdbc:postgresql://localhost:5432/mrdb 
spring.datasource.username=postgres 
spring.datasource.password=123
```

You need to create two windows in the terminal. One window for the frontend the other for the backend. To run the backend, go to the backend directory in the first terminal window:
```
cd [location_project]/backend
```
Before launching the environment, make sure that the local port 8080 is not in use, and then launch the environment using the Maven runtime file:
```
./mvnw spring-boot:run
```
To start the frontend, go to the frontend directory in the second terminal window:
```
cd [location_project]/frontend
```
 
Install npm packages with the command:
```
npm install
```
Before starting the environment, make sure that the local port 3000 is not in use, and then start the environment with the command:
```
npm start
```
Once up and running, the frontend and backend will be accessible under ports 3000 (frontend) and 8080 (backend).

## Tests performed
To test the software, 3 types of tests were performed: unit, mutation and function tests. Unit tests were performed to verify the developed software in terms of single actions, e.g.:<br>
•	Adding objects to the database,<br>
•	modification of objects in the database,<br>
•	removing objects from the database,<br>
•	user login verification,<br>
•	User password change (encryption verification),<br>
•	creation of an artificial queue (test tyrant algorithm),<br>
•	Correct conversion of image to byte[],<br>
•	overall application performance.<br>
