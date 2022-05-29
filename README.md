# SoPra Group 03 FS22 - myPark (Client)

## Introduction

To date, there is no uniform system for reservation and digital check-in in parking garages in Zurich.
We have all been to Zurich before and were looking for a parking space. On the one hand, it was unknown
where exactly the next parking garage was, and on the other hand, it was often already full when you
wanted to check in. In addition, the search for an empty parking space not only strains the nerves of motorists
but also leads to increased traffic congestion and ecologically undesirable pollution.
<br />

Our application - called **MyPark** - tackles this problem by providing a web-based user interface that allows registered users to see
in real-time which car parks have free parking spaces. These car parks can be explored either on an interactive map or
in tabular form. MyPark not only allows users to check-in into a car park (and thereby avoiding queuing) but also
to reserve a parking space in advance at the car park of their choice.
<br />

The necessary data for this project is provided by [Parkleitsystem Stadt Zürich (PLS)](https://www.pls-zh.ch/info.jsp) and can
be accessed via an [RSS feed](https://www.pls-zh.ch/plsFeed/rss). PLS tracks the empty parking spaces in the city of Zurich and
updates the number of empty parking spaces in real-time. In addition, we use Leaflet (OpenStreetMap) API
to show the car parkings on an interactive map.


## Technologies

We used React for frontend development. Styling was done using scss. Communication with backend uses REST interface. As additional libraries we used React Bootstrap for the Navbar. 

## High-Level Components

We identify the [Map](src/components/views/Map.js), the [Billing page](src/components/views/Billing.js) and the [Reservation page](src/components/views/Reservation.js) as the tree most important classes of the client.
- the Map is the key component for the user to find a relevant parking space. Usually a user knows very well where he/she wants to go. With our map feature, one can quickly zoom into the map of Zurich, identify the location one wants to go to and select the nearest parking space nearby. And even more than that: With our Map, the user can click on the nearest parking space and get redirected to the detailed page of the parking lot, where one can find additional information regarding the parking. One can also directly check-in or reserve a parking spot in the future, which leads us to the next very important feature of the app:
- The reservation page can be used to check, whether the reservation of the parking space has worked. If so, one can also identify possible mistakes in the specification of date or time, one made earlier during reservation. Further it is very simple to edit the reservation or to delete it, if it is no longer needed, offering the user a lot of flexibiltity. With an increasing number of reservations done in the past, it is very hard to keep track of all of them. But the reservation page has the users back: All the reservations are systematically listed below each other, giving the user a good overview of current reservations. Paying the reserved parking space in advance is also possible. For that simply navigate to the billing page:
- The billing page can be used to pay for reserved parking spots, or for past usages of parking spaces. One can also choose to split the bill with a buddy, leading to flexibility among the users. Want to know how much you payed for parking spaces in Zurich until now? No problem, simply sum up all the amounts of the listed reservations and real-time check-ins. Tle tabular design of the listings makes it very easy for the users to track their past payments and the upcoming costs.


## Getting Started

Read and go through these Tutorials. It will make your life easier!

- Read the React [Docs](https://reactjs.org/docs/getting-started.html)
- Do this React [Getting Started](https://reactjs.org/tutorial/tutorial.html) Tutorial (it doesn’t assume any existing React knowledge)
- Get an Understanding of [CSS](https://www.w3schools.com/Css/), [SCSS](https://sass-lang.com/documentation/syntax), and [HTML](https://www.w3schools.com/html/html_intro.asp)!

Next, there are two other technologies that you should look at:

* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) offers declarative routing for React. It is a collection of navigational components that fit nicely with the application. 
* [react-hooks](https://reactrouter.com/web/api/Hooks) let you access the router's state and perform navigation from inside your components.
### Launch & Deployment

For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React, get installed with:

```npm install```

Run this command before you start your application for the first time. Next, you can start the app with:

```npm run dev```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Notice that the page will reload if you make any edits. You will also see any lint errors in the console (use Google Chrome).

## Walkthrough & Illustrations

After the registration/login is completed successfully, users are redirected to the tabular overview which provides a complete list of available carparks in Zurich, their current capacity and the per-hour tariff.

![Screenshot](screenshots/overview.png)
<p align = "center">
<em>Carpark Overview</em>
</p>

In case this simple overview should not be sufficient for certain users, we additionally developed a carpark map, which is essentially a 2D-map version of the tabular overview page.

![Screenshot](screenshots/map.png)
<p align = "center">
<em>Carpark Map</em>
</p>

From either the carpark map or the tabular overview users can access the carpark pages by clicking on the carpark name, or the carpark icon respectively. This carpark page provides further information about the carpark and allows the user to perform the real-time check-in and to reserve a parking spot in the future.

![Screenshot](screenshots/carpark.png)
<p align = "center">
<em>Detailed Carpark Page</em>
</p>

After a user checks out from a carpark the respective fee will show up in their billing section with the option to pay or split the bill. Paying the bill is straightforward, however in case the user for example brought some friends over for a few drinks after a tough day working on a project, it is possible to send a split request to the remaining car users. Should the other user accept the split request, the bill is divided between the two users. Otherwise the initial bill will again show up as "outstanding" for the first user.

![Screenshot](screenshots/billing.png)
<p align = "center">
<em>Billing Page</em>
</p>

Once a user sends a split request to another user, a prompt will inform the second user that a notification is waiting in their notification section. Indeed, upon accepting the prompt (or simply clicking on the notification tab), the user can view their unanswered notifications and answer them on the spot.

![Screenshot](screenshots/notifications.png)
<p align = "center">
<em>Notifications Page</em>
</p>

Further functionalities include:
- a profile page where users can view and edit their own profile
- the reservations page where upcoming reservations can be viewed and edited
- the "myPark" home button and the logout button

## Roadmap

- Establish a connection of this prototype to the city of Zurich / to the actual carparks
- Implement a real payment system (most probably also including Twint as a payment method)
- Develop a mobile application such that users can easily check-in into carparks via mobile app 

## Authors & Acknowledgements

-   [Noah Mamie](https://github.com/nmamie)
-   [Elias Schuhmacher](https://github.com/e-schuh)
-   [Kilian Sennrich](https://github.com/ksennr)
-   [Richard Specker](https://github.com/rspecker)

Supervised by:
-   [Kyrill Hux](https://github.com/realChesta)

## License

[Apache License, 2.0](./LICENSE)
