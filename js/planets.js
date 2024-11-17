/**
 * Planets Module
 * Handles planet information display and interaction
 */

// Planet data from CSV converted to JSON
const planetsData = [
    {
        name: "Mercury",
        distance_from_earth: 77.3,
        climate: "Extreme (-180°C to 430°C)",
        inhabitability: "No",
        description: "Closest planet to the Sun with extreme temperature variations"
    },
    {
        name: "Venus",
        distance_from_earth: 38.2,
        climate: "Hot (462°C)",
        inhabitability: "No",
        description: "Similar in size to Earth but with toxic atmosphere"
    },
    {
        name: "Mars",
        distance_from_earth: 225.0,
        climate: "Cold (-63°C)",
        inhabitability: "Potential",
        description: "Red planet with potential for future colonization"
    },
    {
        name: "Jupiter",
        distance_from_earth: 628.7,
        climate: "Gas Giant (-110°C)",
        inhabitability: "No",
        description: "Largest planet in our solar system"
    },
    {
        name: "Saturn",
        distance_from_earth: 1277.4,
        climate: "Gas Giant (-178°C)",
        inhabitability: "No",
        description: "Known for its spectacular ring system"
    },
    {
        name: "Uranus",
        distance_from_earth: 2719.7,
        climate: "Ice Giant (-224°C)",
        inhabitability: "No",
        description: "Tilted on its side with unique rotation"
    },
    {
        name: "Neptune",
        distance_from_earth: 4347.4,
        climate: "Ice Giant (-214°C)",
        inhabitability: "No",
        description: "Windiest planet with strong storms"
    }
];

/**
 * Populates the planet dropdown with options
 */
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

/**
 * Creates HTML for planet information
 * @param {Object} planet - Planet data object
 * @returns {string} HTML string for planet information
 */
function createPlanetInfoHTML(planet) {
    return `
        <h3>${planet.name}</h3>
        <p><strong>Distance from Earth:</strong> ${planet.distance_from_earth} million km</p>
        <p><strong>Climate:</strong> ${planet.climate}</p>
        <p><strong>Inhabitability:</strong> ${planet.inhabitability}</p>
        <p><strong>Description:</strong> ${planet.description}</p>
    `;
}

/**
 * Updates the planet information display
 * @param {string} planetName - Name of the selected planet
 */
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

/**
 * Initializes the planets section
 */
function initializePlanets() {
    populatePlanetDropdown();
    
    const dropdown = document.getElementById('planet-dropdown');
    if (dropdown) {
        dropdown.addEventListener('change', (e) => {
            updatePlanetInfo(e.target.value);
        });
    }
}

// Initialize planets when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePlanets);
