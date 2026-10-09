# ShowCase Product Gallery

ShowCase is a MERN product gallery with image upload support. The React frontend lets users view products, add new items, edit existing ones, and delete products. The Express API stores product data in MongoDB Atlas.

## Project Structure

```text
showcase-gallery/
  client/   React + Vite + Tailwind website
  server/   Node.js + Express + MongoDB API
```

## Setup

1. Install dependencies.

```bash
npm install
npm run install:all
```

2. Create `server/.env` from `server/.env.example` and add your MongoDB Atlas connection string.

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/showcase_gallery
PORT=5000
```

3. Start the API and website together.

```bash
npm run dev
```

The website runs on `http://localhost:5173` and proxies API requests to `http://localhost:5000`.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

## Deployment Notes

- Deploy the API on Render and add `MONGODB_URI` as an environment variable.
- Deploy the frontend on Vercel and set `VITE_API_URL` to the Render API URL.
