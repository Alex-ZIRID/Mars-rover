# Mars Rover Dashboard

## Project Description
The **Mars Rover Dashboard** is a web application that displays the latest images captured by NASA's Mars Rovers, along with the **Astronomy Picture of the Day (APOD)** from NASA's API.

Users can:
- Select a Mars Rover (e.g., Curiosity or Perseverance) to view its most recent photos.
- View NASA's **Photo of the Day** by clicking a button.
- Enjoy a clean, responsive design that works across devices.

---

## Project Structure
The project uses a modular and clean architecture:

1. **Client-side** (`client.js`):  
   - Handles dynamic content rendering.
   - Fetches and displays data for Mars Rover images and APOD.
   - Updates the UI dynamically based on user interactions.

2. **Server-side** (`index.js`):  
   - Acts as a backend API proxy to fetch data from NASA's public APIs.
   - Serves static files for the frontend.

3. **Static Files**:
   - `index.html`: Contains the main layout and structure.
   - `index.css`: Provides styling for the responsive layout.
   - `render.css`: Normalizes default browser styles and ensures a consistent layout.
   - NASA’s logo is stored in `/assets/Nasa_logo.png`.

4. **APIs Used**:
   - [NASA Mars Rover Photos API](https://api.nasa.gov/)
   - [NASA APOD API](https://api.nasa.gov/planetary/apod)

---

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript (with [Immutable.js] for state management)
- **Backend**: Node.js with Express.js
- **External APIs**: NASA APIs
- **Package Management**: npm
- **Environment Management**: dotenv

---

## File Structure
start/
│
├── public/
│   ├── assets/
│   │   └── Nasa_logo.png
│   ├── stylesheets/
│   │   ├── resets.css
│   │   ├── index.css
│   │   └── render.css
│   └── index.html
│
├── server/
│   └── index.js
│
├── client.js
├── APIKey.env          #NASA API Key file
└── README.md
