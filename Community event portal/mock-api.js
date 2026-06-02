// ============================================
// MOCK API - ASYNC FETCH WITH PROMISES & ASYNC/AWAIT
// ============================================

const MOCK_API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Mock events endpoint
const mockEventsEndpoint = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Tech Summit 2025", type: "Tech", seats: 100 },
                { id: 2, title: "Music Festival", type: "Music", seats: 500 },
                { id: 3, title: "Coding Workshop", type: "Workshop", seats: 30 },
                { id: 4, title: "AI Conference", type: "Conference", seats: 200 }
            ]);
        }, 1500);
    });
};

// Using .then() and .catch()
function fetchEventsWithPromises() {
    console.log("🔄 Fetching events with Promises...");
    
    mockEventsEndpoint()
        .then(events => {
            console.log("✅ Events fetched successfully:", events);
            displayMockEvents(events);
        })
        .catch(error => {
            console.error("❌ Error fetching events:", error);
        });
}

// Using async/await with loading spinner
async function fetchEventsAsync() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) spinner.style.display = 'flex';
    
    console.log("🔄 Fetching events with Async/Await...");
    
    try {
        const events = await mockEventsEndpoint();
        console.log("✅ Async fetch complete:", events);
        displayMockEvents(events);
    } catch (error) {
        console.error("❌ Async error:", error);
    } finally {
        if (spinner) setTimeout(() => spinner.style.display = 'none', 500);
    }
}

function displayMockEvents(events) {
    console.log("Displaying mock events:", events.map(e => e.title).join(", "));
}

// POST registration to mock API
async function submitRegistrationToAPI(userData) {
    try {
        const response = await fetch(MOCK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("✅ Registration submitted to API:", result);
        return { success: true, data: result };
        
    } catch (error) {
        console.error("❌ API submission failed:", error);
        return { success: false, error: error.message };
    }
}

// Simulate delayed response
async function simulateDelayedRegistration(userData) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const result = await submitRegistrationToAPI(userData);
            resolve(result);
        }, 2000);
    });
}

// Load mock data on page load
window.addEventListener('load', () => {
    // Uncomment to test async features
    // fetchEventsWithPromises();
    // fetchEventsAsync();
});

// ============================================
// GEOLOCATION FUNCTION
// ============================================
function findNearbyEvents() {
    const locationDiv = document.getElementById('locationResult');
    
    if (!navigator.geolocation) {
        locationDiv.innerHTML = "❌ Geolocation is not supported by your browser.";
        return;
    }
    
    locationDiv.innerHTML = "📍 Getting your location...";
    
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };
    
    function success(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        locationDiv.innerHTML = `
            ✅ Location acquired!<br>
            📍 Latitude: ${lat.toFixed(4)}<br>
            📍 Longitude: ${lng.toFixed(4)}<br>
            🎪 Nearby events will be shown based on your location.
        `;
        
        // Suggest nearby events based on city (simulated)
        setTimeout(() => {
            locationDiv.innerHTML += "<br><strong>🎉 Suggested near you:</strong> Tech Meetup (2.3 miles), Community Yoga (0.8 miles)";
        }, 500);
    }
    
    function error(err) {
        console.error("Geolocation error:", err);
        switch(err.code) {
            case err.PERMISSION_DENIED:
                locationDiv.innerHTML = "❌ Location access denied. Please enable location services to find nearby events.";
                break;
            case err.POSITION_UNAVAILABLE:
                locationDiv.innerHTML = "❌ Location information unavailable.";
                break;
            case err.TIMEOUT:
                locationDiv.innerHTML = "⏰ Location request timed out. Please try again.";
                break;
            default:
                locationDiv.innerHTML = "❌ An unknown error occurred.";
        }
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);
}

window.findNearbyEvents = findNearbyEvents;