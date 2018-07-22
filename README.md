 **GTFS LAB** - Ben Thomas
===============================

## **About**

**GTFS LAB** is a data exploration project centered around GTFS (General Transit Feed Specification) data. GTFS is a common format for public transportation schedules and associated  geographic information. Before GTFS emerged out of a Google employee side project there was no de facto standard for public transit timetables. Now this feed drives static and realtime public transit data used by applications like Google Maps.

Public transit is a huge passion of mine and I created GTFS Lab to explore the space. My hope is the project can lead to insights that help us progress the puzzle of walkable, sustainable, connected cities for everyone. 

### **General Transit Feed Specification (GTFS) Resources**

* [Google Developers Reference](https://developers.google.com/transit/gtfs/reference/)
* [Transit Wiki](https://www.transitwiki.org/TransitWiki/index.php/General_Transit_Feed_Specification)
* [TransitWiki.org](https://www.transitwiki.org/TransitWiki/index.php/General_Transit_Feed_Specification)
* [TransitWiki.org](https://www.transitwiki.org/TransitWiki/index.php/General_Transit_Feed_Specification)

## **Directory Structure**

This project follows a typical node.js directory structure with application files stored in the **"src"** source folder.
The **"test"** folder holds the unit tests. The **"node_modules"** are the project dependencies. 

* **src/app.js** is the where the app is run from. It initializes an express.js web app with http routes that connect to _controllers_ that serve logic. 
* **controller/** holds the controller files that handle http api requests and perform desired action. 
* **data/** - GTFS data comes in zip file format that unzips into standardized CSVs that describe various transit functions. The **data** folder holds all the raw GTFS data used by the application, as well as the MongoDB models that describe that data and supporting scripts.  
* **routes/** contains the web routes used by the express.js application to direct requests coming into the app to designated controllers. 
* **util/** contains support methods written in support of GTFS Lab components. 

## **Tech Choices**

TBD

### **How to "Run"**

npm run dev

#### **Contributing**

Anyone is welcome to re-use the code used in this project.

#### **Tech Stack References**

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Babel](https://babeljs.io/)
* [Docker](https://www.docker.com/)

#### **Contact Me**

For any questions please email me at _bthomas2622@gmail.com_

#### **License**

The content of this repository is not licensed. 