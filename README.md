# Shopping Web

A simple shopping website. Users can see products, search them, filter by category, add them to a cart and place orders. An admin can add, edit and delete products. The website is hosted on AWS.

## Built with

- React (Vite) for the website
- Node.js and Express for the backend
- MongoDB for the database
- Nginx and PM2 on AWS (Amazon Linux)

## Folders

```
shopping-web/
  backend/     Express server and MongoDB code
  frontend/    React website
```

## Features

- Product list with name, image and price
- Category filter (tick one or many) and search bar
- Product pop up with a bigger image and quantity
- Cart saved in the browser
- Register, login and logout
- Place orders and see your own orders
- Admin only actions for products

## What you need first

- Node.js
- MongoDB Community Server, running on port 27017
- Git

## Run on your own computer

1. Download the project

```
git clone "https://github.com/LPLRai/shopping-web.git"
cd shopping-web
```

2. Start the backend

```
cd backend
npm install
node index.js
```

You should see "Connected to MongoDB". The backend runs at http://localhost:8000

3. Start the frontend (open a second terminal)

```
cd frontend
npm install
npm run dev
```

Open the link it shows, usually http://localhost:5173

## Admin

The first person who registers becomes the admin. Register yourself first. After that, the admin can add products with Postman (see below).

## Main API routes

| Method | Route | What it does | Login needed |
|---|---|---|---|
| POST | /user/register | Create an account | No |
| POST | /user/login | Login and get a token | No |
| GET | /product | See all products | No |
| GET | /product/:id | See one product | No |
| POST | /product | Add a product | Admin |
| PATCH | /product/:id | Edit a product | Admin |
| DELETE | /product/:id | Delete a product | Admin |
| POST | /order | Place an order | Yes |
| GET | /order/mine | See my orders | Yes |

For routes that need login, send the token in the header: `Authorization: Bearer YOUR_TOKEN`

Example body to add a product:

```
[
{
  "name": "Mouse",
  "price": 1200,
  "quantity": 20,
  "category": "Electronics",
  "image": "https://picsum.photos/300"
}
]
```

## Putting it on AWS (short version)

1. Launch an EC2 server (Amazon Linux). Open ports 22 and 80 only.
2. Install Node.js, Nginx, PM2 and MongoDB on the server.
3. Upload the backend, run `npm install`, then `pm2 start index.js --name shopping-api`.
4. Run `npm run build` in the frontend and copy the `dist` folder to `/var/www/shopping-web`.
5. Set up Nginx so that `/api` goes to port 8000 and everything else shows the React website.
6. In Postman, use `http://YOUR_SERVER_IP/api/...` instead of localhost.

## Notes

- Change the text in `backend/src/secret.js` before using this for real, and do not share the real one.
- Do not open port 8000 or 27017 on AWS.
- The database on AWS is separate from the one on your computer, so add products again on the server.
- If the server restarts, the public IP can change. An Elastic IP keeps it fixed.
