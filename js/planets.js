/**
 * Planets Module
 * Handles planet information display and interaction
 */

// Planet data with basic information and image URLs
const planetsData = [
    {
        name: "Mercury",
        distance_from_earth: 77.3,
        climate: "Extreme (-180°C to 430°C)",
        description: "Closest planet to the Sun with extreme temperature variations",
        imageUrl: "data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23a6a6a6'/%3E%3C/svg%3E"
    },
    {
        name: "Venus",
        distance_from_earth: 38.2,
        climate: "Hot (462°C)",
        description: "Similar in size to Earth but with toxic atmosphere",
        imageUrl: "data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23e6b800'/%3E%3C/svg%3E"
    },
    {
        name: "Mars",
        distance_from_earth: 225.0,
        climate: "Cold (-63°C)",
        description: "Red planet with potential for future colonization",
        imageUrl: "data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23cc3300'/%3E%3C/svg%3E"
    },
    {
        name: "Jupiter",
        distance_from_earth: 628.7,
        climate: "Gas Giant (-110°C)",
        description: "Largest planet in our solar system",
        imageUrl: "data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23cc9966'/%3E%3C/svg%3E"
    },
    {
        name: "Saturn",
        distance_from_earth: 1277.4,
        climate: "Gas Giant (-178°C)",
        description: "Known for its spectacular ring system",
        imageUrl: "data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23d4aa00'/%3E%3C/svg%3E"
    },
    {
        name: "Uranus",
        distance_from_earth: 2719.7,
        climate: "Ice Giant (-224°C)",
        description: "Tilted on its side with unique rotation",
        imageUrl: "data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='90' fill='%2380b3ff'/%3E%3C/svg%3E"
    },
    {
        name: "Neptune",
        distance_from_earth: 4347.4,
        climate: "Ice Giant (-214°C)",
        description: "Windiest planet with strong storms",
        imageUrl: "data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='90' fill='%233366cc'/%3E%3C/svg%3E"
    }
];

// Add planets to dropdown menu
function populatePlanetDropdown() {
    const dropdown = document.getElementById('planet-dropdown');
    if (!dropdown) return;

    planetsData.forEach(planet => {
        const option = document.createElement('option');
        option.value = planet.name;
        option.textContent = planet.name;
        dropdown.appendChild(option);
    });
}

// Create HTML for planet information display
function createPlanetInfoHTML(planet) {
    return `
        <div class="planet-display">
            <img src="${planet.imageUrl}" alt="${planet.name}" class="planet-image">
            <div class="planet-details">
                <h3>${planet.name}</h3>
                <p>Distance from Earth: ${planet.distance_from_earth} million km</p>
                <p>Climate: ${planet.climate}</p>
                <p>${planet.description}</p>
            </div>
        </div>
    `;
}

// Update planet information when selection changes
function updatePlanetInfo(planetName) {
    const planetInfoContainer = document.getElementById('planet-info');
    if (!planetInfoContainer) return;

    const planet = planetsData.find(p => p.name === planetName);
    if (planet) {
        planetInfoContainer.innerHTML = createPlanetInfoHTML(planet);
    } else {
        planetInfoContainer.innerHTML = '<p>Please select a planet</p>';
    }
}

// Initialize the planet section
function initializePlanets() {
    populatePlanetDropdown();
    
    const dropdown = document.getElementById('planet-dropdown');
    if (dropdown) {
        dropdown.addEventListener('change', (e) => {
            updatePlanetInfo(e.target.value);
        });
    }
}

// Start when page loads
document.addEventListener('DOMContentLoaded', initializePlanets);
