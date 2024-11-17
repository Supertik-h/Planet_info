/**
 * Planets Module
 * Handles planet information display and interaction
 */

// Planet data with basic information and detailed SVG images
const planetsData = [
    {
        name: "Mercury",
        distance_from_earth: 77.3,
        climate: "Extreme (-180°C to 430°C)",
        description: "Closest planet to the Sun with extreme temperature variations",
        imageUrl: "data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='150' cy='150' r='140' fill='%23a6a6a6'/%3E%3Ccircle cx='100' cy='120' r='20' fill='%23808080'/%3E%3Ccircle cx='180' cy='170' r='30' fill='%23808080'/%3E%3Ccircle cx='150' cy='90' r='15' fill='%23808080'/%3E%3Cellipse cx='120' cy='200' rx='25' ry='20' fill='%23808080'/%3E%3C/svg%3E"
    },
    {
        name: "Venus",
        distance_from_earth: 38.2,
        climate: "Hot (462°C)",
        description: "Similar in size to Earth but with toxic atmosphere",
        imageUrl: "data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='150' cy='150' r='140' fill='%23e6b800'/%3E%3Cpath d='M50,150 Q150,50 250,150 Q150,250 50,150' fill='rgba(255,255,255,0.2)'/%3E%3Cpath d='M70,100 Q150,170 230,100' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='10'/%3E%3Cpath d='M70,200 Q150,130 230,200' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='10'/%3E%3C/svg%3E"
    },
    {
        name: "Mars",
        distance_from_earth: 225.0,
        climate: "Cold (-63°C)",
        description: "Red planet with potential for future colonization",
        imageUrl: "data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='150' cy='150' r='140' fill='%23cc3300'/%3E%3Cpath d='M50,150 Q150,50 250,150' fill='%23b32d00' stroke='none'/%3E%3Cellipse cx='180' cy='120' rx='40' ry='30' fill='%23992600'/%3E%3Cellipse cx='100' cy='180' rx='35' ry='25' fill='%23992600'/%3E%3C/svg%3E"
    },
    {
        name: "Jupiter",
        distance_from_earth: 628.7,
        climate: "Gas Giant (-110°C)",
        description: "Largest planet in our solar system",
        imageUrl: "data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='150' cy='150' r='140' fill='%23cc9966'/%3E%3Cpath d='M10,150 L290,150' stroke='%23b37700' stroke-width='40'/%3E%3Cpath d='M10,100 L290,100' stroke='%23995c00' stroke-width='20'/%3E%3Cpath d='M10,200 L290,200' stroke='%23995c00' stroke-width='20'/%3E%3Cellipse cx='200' cy='150' rx='30' ry='25' fill='%23ff1a1a'/%3E%3C/svg%3E"
    },
    {
        name: "Saturn",
        distance_from_earth: 1277.4,
        climate: "Gas Giant (-178°C)",
        description: "Known for its spectacular ring system",
        imageUrl: "data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='150' cy='150' rx='140' ry='140' fill='%23d4aa00'/%3E%3Cellipse cx='150' cy='150' rx='180' ry='30' fill='none' stroke='%23c2a64d' stroke-width='10'/%3E%3Cellipse cx='150' cy='150' rx='160' ry='25' fill='none' stroke='%23b38f00' stroke-width='8'/%3E%3Cellipse cx='150' cy='150' rx='200' ry='35' fill='none' stroke='%23997a00' stroke-width='4'/%3E%3C/svg%3E"
    },
    {
        name: "Uranus",
        distance_from_earth: 2719.7,
        climate: "Ice Giant (-224°C)",
        description: "Tilted on its side with unique rotation",
        imageUrl: "data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='150' cy='150' r='140' fill='%2380b3ff'/%3E%3Cpath d='M10,120 L290,120' stroke='%234d94ff' stroke-width='20'/%3E%3Cpath d='M10,180 L290,180' stroke='%234d94ff' stroke-width='20'/%3E%3Cpath d='M10,150 L290,150' stroke='%234d94ff' stroke-width='30'/%3E%3C/svg%3E"
    },
    {
        name: "Neptune",
        distance_from_earth: 4347.4,
        climate: "Ice Giant (-214°C)",
        description: "Windiest planet with strong storms",
        imageUrl: "data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='150' cy='150' r='140' fill='%233366cc'/%3E%3Cpath d='M100,100 Q150,150 200,100' fill='%23264d99' stroke='%23264d99' stroke-width='20'/%3E%3Cpath d='M80,180 Q150,220 220,180' fill='%23264d99' stroke='%23264d99' stroke-width='20'/%3E%3Ccircle cx='180' cy='130' r='30' fill='%23264d99'/%3E%3C/svg%3E"
    }
];


// Add planets to dropdown menu
function populatePlanetDropdown() {
    const dropdown = document.getElementById('planet-dropdown');
    //if dropdown has nothing, hence not dropdown, then returns and does nothing. else runs the rest of the function
    if (!dropdown) return;

    planetsData.forEach(planet => {
        const option = document.createElement('option');
        option.value = planet.name;
        option.textContent = planet.name;
        //fills the dropdown with the next option
        dropdown.appendChild(option);
    });
}


// Create HTML for planet information display
//idk
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
