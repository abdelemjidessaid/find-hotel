# Find-Hotel

This project was created for learning and enhancing skills. We are assigned at ALX School to create front-end, back-end, or full-stack projects to examine. We have created this full-stack website to find and book hotels online. And to serve hoteliers by publishing their services as well. It is a simple clone of the "booking.com" website, but our website does not cover all the edges like it. because we just want to apply what we learned before at ALX School, like MongoDB, Node.js, authentication systems, and more.

## Table of Content

- [Installation](#installation)
- [Run-The-Project](#run-the-project)
- [UI-Tests](#ui-tests)
- [Technologies](#technologies)
- [Authors](#authors)

## Installation

Firstly, you need to clone our repository by the command below:

```sh
git clone git@github.com:abdelemjidessaid/find-hotel.git
```

Secondly, you need to change directory to the frontend and install its packages:

```sh
cd find-hotel/frontend
npm install
```

Thirdly, change directory to the backend and install its packages:

```sh
cd ../backend
npm install
```

Fourthly, change directory to the e2e and install its packages:

```sh
cd ../e2e-tests
npm install
```

**You should create your own api-keys to make the project works correctly**
Create new api-keys for:

- [MongoDB](https://mongodb.com)
- [Cloudinary](https://cloudinary.com)
- [Stripe](https://stripe.com)

change mines with yours in the next files:

- `find-hotel/frontend/.env`
- `find-hotel/backend/.env`
- `find-hotel/backend/.env.e2e`

## Run the Project

Run the frontend:

```sh
cd find-hotel/frontend
npm run dev
```

Run the backend server:

```sh
cd find-hotel/backend
npm run dev
```

Open this link on your browser: http://localhost:5173/

## UI Tests

To test the functionality of the website using the automation you should install the next:

- install PlayWright extension on the VSCode

- open the project on it by:

  ```sh
  cd find-hotel && code .
  ```

- you will see a flask icon on the right side of VSCode click on it and start you tests

## Technologies

The project is a MERN-Stack website

- MongoDB:

  is a popular NoSQL (Not Only SQL) database management system that provides a flexible and scalable solution for storing, retrieving, and managing structured and unstructured data.

- Express:

  is a popular web application framework for Node.js that simplifies the process of building web applications and APIs. Its main role is to provide a lightweight and flexible foundation for creating server-side applications, handling HTTP requests, managing routes, and enabling middleware functionality.

- React:

  is a JavaScript library for building user interfaces, primarily for web applications. Its main role is to provide a flexible and efficient way to create reusable and interactive UI components. React follows a component-based architecture, where the UI is divided into small, self-contained pieces called components.

- NodeJS:

  is a runtime environment that allows developers to run JavaScript code on the server-side. Its main role is to enable the creation of scalable and efficient network applications. Node.js is built on the V8 JavaScript engine from Google Chrome and provides a non-blocking, event-driven architecture.

- Cloudinary:

  is a cloud-based media management platform that offers a range of services for storing, optimizing, and delivering images, videos, and other media assets. Its primary role is to simplify the management and delivery of media content for websites and applications.

- Stripe:

  is a widely used as payment processing platform that enables businesses to accept and manage online payments. It provides a suite of tools and APIs that simplify the process of integrating payment functionality into websites and applications.

- Playwright:

  its primary role is to facilitate browser automation, enabling developers to write scripts or tests that interact with web applications programmatically.

## Authors

- [Abdelemjid Essaid](https://github.com/abdelemjidessaid)
