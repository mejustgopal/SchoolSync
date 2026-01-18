# MERN School Management System - Frontend

This is the frontend client for the School Management System, built with React, Redux, and Material UI.

## Configuration

Before running the application, ensure you have a `.env` file in the `frontend` directory with the following variable:

```env
REACT_APP_BASE_URL=http://localhost:5000
```

-   **Development**: Set to `http://localhost:5000` (or wherever your backend is running).
-   **Production**: Set to your deployed backend URL (e.g., `https://your-backend.onrender.com`).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Deployment

This frontend is configured to be easily deployed on **Vercel** or **Netlify**.

1.  Push your code to a GitHub repository.
2.  Import the repository into Vercel/Netlify.
3.  Set the **Root Directory** to `frontend`.
4.  Add the `REACT_APP_BASE_URL` environment variable in the deployment settings.
5.  Deploy!

## Folder Structure

-   `src/pages`: Contains all the page components (Admin, Teacher, Student views).
-   `src/redux`: Contains Redux slices and thunks for state management.
-   `src/components`: Reusable UI components.
