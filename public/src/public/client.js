const { Map, List } = Immutable;

// ------------------- Application State -------------------
let store = Map({
    user: Map({ name: "Student" }),
    rovers: List(['Curiosity', 'Perseverance']),
    selectedRover: "Curiosity",
    roverPhotos: List([]),
    apod: Map({}),
    showAPOD: false, // Toggle between APOD and Rover Gallery
});

// ------------------- DOM Elements -------------------
const root = document.getElementById('root');
const roverSelect = document.getElementById('roverSelect');
const apodBtn = document.getElementById('apod-btn');

// ------------------- State Management -------------------
const updateStore = (state, newState) => state.merge(newState);

// ------------------- Rendering -------------------
const render = (state) => {
    root.innerHTML = ""; // Clear existing content
    const showAPOD = state.get("showAPOD");

    if (showAPOD) {
        root.appendChild(createAPODComponent(state.get("apod")));
    } else {
        root.appendChild(createRoverGallery(state.get("roverPhotos")));
    }
};

// ------------------- Components -------------------
// Create APOD Component
const createAPODComponent = (apod) => {
    const container = document.createElement("div");
    container.id = "apod-content";

    if (!apod || apod.size === 0) {
        container.innerHTML = `<p>Loading Astronomy Picture of the Day...</p>`;
        return container;
    }

    container.innerHTML = `
        <img src="${apod.get("url")}" alt="${apod.get("title")}" />
        <h3>${apod.get("title")}</h3>
        <p>${apod.get("explanation")}</p>
    `;
    return container;
};

// Create Rover Gallery Component
const createRoverGallery = (photos) => {
    const container = document.createElement("div");
    container.className = "gallery";

    if (!photos || photos.size === 0) {
        container.innerHTML = `<p>No photos available or still loading...</p>`;
        return container;
    }

    photos.forEach(photo => {
        const photoItem = document.createElement("div");
        photoItem.className = "photo-item";
        photoItem.innerHTML = `
            <img src="${photo.get("img_src")}" alt="Rover Photo" />
            <p>Earth Date: ${photo.get("earth_date")}</p>
            <p>Camera: ${photo.getIn(["camera", "full_name"])}</p>
        `;
        container.appendChild(photoItem);
    });
    return container;
};

// Populate Rover Selector Dropdown
const populateRoverSelector = (rovers, selectedRover) => {
    roverSelect.innerHTML = ""; // Clear existing options

    rovers.forEach(rover => {
        const option = document.createElement("option");
        option.value = rover;
        option.textContent = rover;
        if (rover === selectedRover) option.selected = true;
        roverSelect.appendChild(option);
    });
};

// ------------------- API Calls -------------------
// Fetch Rover Data
const fetchRoverData = (roverName) => {
    fetch(`/api/rover/${roverName.toLowerCase()}`)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                const immutablePhotos = List(result.data.latest_photos.map(photo => Map(photo)));
                store = updateStore(store, Map({
                    selectedRover: roverName,
                    roverPhotos: immutablePhotos,
                    showAPOD: false,
                }));
                render(store);
            } else {
                console.error("Error fetching rover data:", result.message);
            }
        })
        .catch(err => console.error("Fetch error:", err));
};

// Fetch APOD Data
const fetchAPOD = () => {
    fetch("/api/apod")
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                const newAPOD = Map(result.data);
                store = updateStore(store, Map({
                    apod: newAPOD,
                    showAPOD: true,
                }));
                render(store);
            } else {
                console.error("Error fetching APOD:", result.message);
            }
        })
        .catch(err => console.error("Fetch error:", err));
};

// ------------------- Event Listeners -------------------
document.addEventListener("DOMContentLoaded", () => {
    const initialRover = store.get("selectedRover");

    // Initialize rover data and selector
    fetchRoverData(initialRover);
    populateRoverSelector(store.get("rovers").toJS(), initialRover);

    // Handle rover selection change
    roverSelect.addEventListener("change", (e) => {
        fetchRoverData(e.target.value);
    });

    // Handle APOD button click
    apodBtn.addEventListener("click", fetchAPOD);
});