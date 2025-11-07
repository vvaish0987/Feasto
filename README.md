FEASTO a modern food and grocery ordering app. It offers a seamless shopping experience with real-time inventory management and order processing.

TECH STACK
Frontend: React.js 
Backend: Firebase(authentication,firestore)
State Management: React context for cart and auth
UI: Custom CSS with responsive design

Majorly constituting of four main modules
1.USER REGISTRATION AND AUTHENTICATION: 
*Allows users for a easy sign in and login option with proper validations.
*Once logged in there is a email verification which authenticates the user.
*The firestore rules protect the privacy of the data.

2.BROWSE ITEM INVENTORY: 
*The app provides different category across food and grocery to explore.
*It has user friendly interface which makes it easy for accessing.
*has a creative way for searching items and category.
*has variety of filters to categorize between veg and non veg.

3.SELECTION BASKET/CART: 
*Allows to add items easily to the cart. more than one number of the same item.
*Has proper validations to check the stock of the products, give proper error message if product goes out of stock.
*Session persistence across page refreshes. the cart remains same even if the account is logged out.
*Allows mutiple logins from multiple devices keeping the data intact.

4.CHECKOUT: 
*A user friendly price breakdown
*Once payment is done, the user is provided with a order confirmation page with a order ID.
*Shows whether the order is delivered or not.
*Displays the order history of the user.
*Only on succesful transaction will the item be deducted from the stock.

5.SECURITY:
*Firebase Security Rules for data access control
*Input validation on forms

DB Collections:
users - User profiles
users_uid - User profiles by UID
food - Food items
grocery - Grocery items
inventory - Stock levels
orders - Order history
carts - User shopping carts

API Services:
usersService.js - User management
catalogService.js - Product catalog
mockApi.js - Order processing and inventory


# Getting Started with Create React App
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
