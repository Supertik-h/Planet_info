/**
 * Missions Module
 * Handles mission management and timeline display
 */

// Store missions in localStorage
const STORAGE_KEY = 'space_missions';

/**
 * Mission class represents a single mission
 */
class Mission {
    constructor(name, date, description) {
        this.name = name;
        this.date = date;
        this.description = description;
        this.completed = false;
        this.id = Date.now().toString();
    }
}

/**
 * MissionManager class handles mission operations
 */
class MissionManager {
    constructor() {
        this.missions = this.loadMissions();
    }

    /**
     * Loads missions from localStorage
     * @returns {Array} Array of missions
     */
    loadMissions() {
        const savedMissions = localStorage.getItem(STORAGE_KEY);
        return savedMissions ? JSON.parse(savedMissions) : [];
    }

    /**
     * Saves missions to localStorage
     */
    saveMissions() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.missions));
    }

    /**
     * Adds a new mission
     * @param {string} name - Mission name
     * @param {string} date - Mission date
     * @param {string} description - Mission description
     */
    addMission(name, date, description) {
        const mission = new Mission(name, date, description);
        this.missions.push(mission);
        this.saveMissions();
        this.renderMissions();
    }

    /**
     * Toggles mission completion status
     * @param {string} id - Mission ID
     */
    toggleMissionComplete(id) {
        const mission = this.missions.find(m => m.id === id);
        if (mission) {
            mission.completed = !mission.completed;
            this.saveMissions();
            this.renderMissions();
        }
    }

    /**
     * Creates HTML for a single mission
     * @param {Object} mission - Mission object
     * @returns {string} HTML string for the mission
     */
    createMissionHTML(mission) {
        return `
            <div class="mission-item ${mission.completed ? 'completed' : ''}" data-id="${mission.id}">
                <h3>${mission.name}</h3>
                <p><strong>Date:</strong> ${new Date(mission.date).toLocaleDateString()}</p>
                <p>${mission.description}</p>
                <label>
                    <input type="checkbox" 
                           ${mission.completed ? 'checked' : ''} 
                           onchange="missionManager.toggleMissionComplete('${mission.id}')">
                    Complete
                </label>
            </div>
        `;
    }

    /**
     * Renders all missions to the DOM
     */
    renderMissions() {
        const container = document.getElementById('missions-list');
        if (!container) return;

        // Sort missions by date
        const sortedMissions = [...this.missions].sort((a, b) => 
            new Date(a.date) - new Date(b.date)
        );

        container.innerHTML = sortedMissions.length > 0
            ? sortedMissions.map(mission => this.createMissionHTML(mission)).join('')
            : '<p>No missions added yet.</p>';

        this.renderTimeline();
    }

    /**
     * Renders the timeline visualization
     */
    renderTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container || this.missions.length === 0) return;

        // Create a simple timeline visualization
        const timelineHTML = `
            <div class="timeline">
                ${this.missions
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map(mission => `
                        <div class="timeline-item ${mission.completed ? 'completed' : ''}">
                            <div class="timeline-date">${new Date(mission.date).toLocaleDateString()}</div>
                            <div class="timeline-name">${mission.name}</div>
                        </div>
                    `).join('')}
            </div>
        `;
        
        container.innerHTML = timelineHTML;
    }
}

// Initialize mission manager
let missionManager;

/**
 * Initializes the missions section
 */
function initializeMissions() {
    missionManager = new MissionManager();
    
    const form = document.getElementById('mission-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('mission-name').value;
            const date = document.getElementById('mission-date').value;
            const description = document.getElementById('mission-description').value;

            if (name && date && description) {
                missionManager.addMission(name, date, description);
                form.reset();
            }
        });
    }

    // Initial render
    missionManager.renderMissions();
}

// Initialize missions when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMissions);
