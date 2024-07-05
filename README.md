## Handmade Goods Marketplace
# Project Description
The Handmade Goods Marketplace is an online platform where users can buy and sell handmade products.
This application allows users to register as either buyers or sellers. 
Sellers can list their handmade items in various categories such as jewelry, home decor, art & crafts,
clay murtis, paintings, and ceramics. Buyers can browse, search, and purchase these items.

# Tech Stack
Frontend
HTML: Structure of the web pages.
CSS: Styling of the web pages.
Handlebars.js (HBS): Templating engine to create dynamic web pages.
# Backend
Node.js: JavaScript runtime environment for building the server-side application.
Express.js: Web framework for Node.js to handle routing and middleware.
MongoDB: NoSQL database for storing user and product data.
Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
bcryptjs: Library for hashing passwords.
jsonwebtoken: Library for generating and verifying JSON Web Tokens (JWT) for authentication.
dotenv: Module to load environment variables from a .env file.
# Other Tools
nodemon: Utility to monitor for changes in the application and automatically restart the server.
cookie-parser: Middleware to parse cookies attached to client requests.
# Features
User Registration and Authentication: Users can sign up as buyers or sellers. Passwords are hashed for security, and JWT is used for session management.
Product Listing and Categorization: Sellers can list products under various categories. Each product has a title, description, category, price, and image URL.
Product Search: Users can search for products using keywords.
Protected Routes: Certain routes are protected and require authentication to access. Middleware functions (auth, isseller, and isbuyer) ensure only authorized users can access these routes.
Responsive Design: The front-end design ensures compatibility with various screen sizes.
# Future Scope
Order Management: Implement features for order processing, tracking, and history.
Payment Integration: Integrate payment gateways to facilitate online transactions.
User Profiles: Enhance user profiles with more details, purchase history, and seller ratings.
Reviews and Ratings: Allow buyers to leave reviews and ratings for products and sellers.
Notifications: Implement notification system for order status updates, new product listings, etc.
Admin Panel: Develop an admin panel to manage users, products, and site content.
