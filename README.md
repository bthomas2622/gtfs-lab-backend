 **GTFS LAB (BACKEND)** - Ben Thomas
===============================

## **About**

**GTFS LAB** is a data exploration project centered around GTFS (General Transit Feed Specification) data. Public transit is a huge passion of mine and I created GTFS Lab to explore the space. My hope is the project can lead to insights that help us progress the puzzle of walkable, sustainable, connected cities for everyone. 

GTFS Overview from [TransitWiki.org](https://www.transitwiki.org/TransitWiki/index.php/General_Transit_Feed_Specification)

> The General Transit Feed Specification (GTFS) defines a common format for public transportation schedules and associated geographic information. GTFS "feeds" allow public transit agencies to publish their transit data and developers to use that data to write applications. The feeds are represented in a series of text files that are compressed into a ZIP file, and include information such as fixed-route schedules, routes, and bus stop data. GTFS datasets are used in a variety of types of applications, including trip planners such as Google Maps, mobile applications, timetable generation software, tools for transit planning and operations analysis, and other categories of applications...

[Google Developers GTFS Reference](https://developers.google.com/transit/gtfs/reference/)

## **Directory Structure**

This project follows a typical node.js directory structure with application files stored in the **"src"** source folder.
The **"test"** folder holds the unit tests. The **"node_modules"** are the project dependencies. 

* **src/app.js** is the where the app is run from. It initializes an express.js web app with http routes that connect to _controllers_ that serve logic. 
* **controller/** holds the controller files that handle http api requests and perform desired action. 
* **data/** - GTFS data comes in zip file format that unzips into standardized CSVs that describe various transit functions. The **data** folder holds all the raw GTFS data used by the application, as well as the MongoDB models that describe that data and supporting scripts.  
* **routes/** contains the web routes used by the express.js application to direct requests coming into the app to designated controllers. 
* **util/** contains support methods written in support of GTFS Lab components. 

## **Tech Choices**

* **MongoDB** - The only NoSQL db I had experience with before this project was CassandraDB which was a mostly positive experience. MongoDB is a unique NoSQL option that gets a decent about of buzz as part of a JS stack. I do not believe it is the best db choice for this project but I chose it because it was a technology I wanted to explore.  
* **Node.js** - My personal favorite webapp backbone. I love how lightweight it is, adore NPM, and dig ECMA2018. It also made sense to go with JS for the MongoDB db choice. 
* **Expressjs** - The leading web app framework for Node.js    
* **Docker** - Containerization is one of the most exciting evolutions in tech right now. I have had great experience utilizing docker to stabilize deployments, streamline CI/CD, and scale apps. 
* **Google Cloud Platform** - The cloud platform I have the most experience with. Features that made a good fit for my project: free trial, container image repository, app engine, and stackdriver logging. 

### **How to "Run"**

npm run dev

#### **Contributing**

Anyone is welcome to re-use the code used in this project.

#### **Tech Stack References**

* [Node.js](https://nodejs.org/en/)
* [Expressjs](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Babel](https://babeljs.io/)
* [Docker](https://www.docker.com/)

#### **Contact Me**

For any questions please email me at _benthomasdeveloper@gmail.com_

#### **License**

The content of this repository is not licensed. 