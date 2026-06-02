// ============================================
// EVENT DATA - CONST and LET variables
// ============================================

// Using const for event data that shouldn't change
// ============================================
// EVENT DATA - All Indian Cities
// ============================================

// Using const for event data that shouldn't change
const EVENT_CATEGORIES = {
    TECH: 'Tech',
    MUSIC: 'Music',
    WORKSHOP: 'Workshop',
    CONFERENCE: 'Conference'
};

// Using let for seats that will change dynamically
let eventSeats = {
    1: 45,
    2: 120,
    3: 28,
    4: 200,
    5: 85,
    6: 34,
    7: 75,
    8: 50
};

// Master events array - All Indian cities and future dates
let communityEvents = [
    {
        id: 1,
        name: "Bengaluru Tech Summit 2026",
        date: "2026-06-10",
        time: "10:00 AM",
        city: "Bengaluru, Karnataka",
        category: EVENT_CATEGORIES.TECH,
        description: "India's largest tech conference! Join 1000+ tech enthusiasts for a day of innovation. Keynotes from industry leaders, networking sessions, and hands-on workshops at BIEC.",
        image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
        status: "upcoming",
        availableSeats: 45,
        venue: "Bangalore International Exhibition Centre",
        speakers: ["Nandan Nilekani", "Kris Gopalakrishnan", "Rajiv Mody"]
    },
    {
        id: 2,
        name: "Goa Sunburn Music Festival",
        date: "2026-07-15",
        time: "2:00 PM",
        city: "Goa",
        category: EVENT_CATEGORIES.MUSIC,
        description: "Asia's biggest music festival! Featuring 30+ international and local artists across 4 stages. Beachside venue with food courts and camping.",
        image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
        status: "upcoming",
        availableSeats: 120,
        venue: "Vagator Beach",
        lineup: ["Alan Walker", "Nucleya", "Ritviz", "Divine"]
    },
    {
        id: 3,
        name: "Hyderabad Frontend Bootcamp",
        date: "2026-08-01",
        time: "9:00 AM",
        city: "Hyderabad, Telangana",
        category: EVENT_CATEGORIES.WORKSHOP,
        description: "3-day intensive bootcamp covering React, Vue, Angular, and modern frontend best practices at HITEX Exhibition Centre.",
        image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
        status: "upcoming",
        availableSeats: 28,
        venue: "HITEX Exhibition Centre",
        includes: ["Laptop provided", "Lunch included", "Certification"]
    },
    {
        id: 4,
        name: "Chennai AI & ML Conference",
        date: "2026-09-15",
        time: "9:30 AM",
        city: "Chennai, Tamil Nadu",
        category: EVENT_CATEGORIES.CONFERENCE,
        description: "South India's premier AI conference. Explore the future of Artificial Intelligence with 40+ expert speakers from IITs and global tech companies.",
        image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
        status: "upcoming",
        availableSeats: 200,
        venue: "Chennai Trade Centre",
        tracks: ["Machine Learning", "NLP", "Computer Vision", "AI Ethics"]
    },
    {
        id: 5,
        name: "Jaipur Jazz & Blues Festival",
        date: "2026-06-20",
        time: "7:30 PM",
        city: "Jaipur, Rajasthan",
        category: EVENT_CATEGORIES.MUSIC,
        description: "An enchanting evening of smooth jazz under the stars at Jal Mahal. Featuring Grammy-winning artists and local talent. Royal Rajasthani cuisine included.",
        image: "https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg",
        status: "upcoming",
        availableSeats: 85,
        venue: "Jal Mahal Palace",
        performers: ["Louiz Banks", "Ranji Raj", "The Raghu Dixit Project"]
    },
    {
        id: 6,
        name: "Mumbai Digital Marketing Workshop",
        date: "2026-10-25",
        time: "11:00 AM",
        city: "Mumbai, Maharashtra",
        category: EVENT_CATEGORIES.WORKSHOP,
        description: "Master SEO, social media marketing, content strategy, and analytics with India's top digital marketing experts.",
        image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg",
        status: "upcoming",
        availableSeats: 34,
        venue: "Jio World Convention Centre",
        topics: ["SEO", "Social Media", "Email Marketing", "Analytics"]
    },
    {
        id: 7,
        name: "Pune Startup Networking Mixer",
        date: "2026-06-05",
        time: "6:00 PM",
        city: "Pune, Maharashtra",
        category: EVENT_CATEGORIES.TECH,
        description: "Connect with founders, investors, and tech enthusiasts from Pune's vibrant startup ecosystem. Pitch your ideas and find funding opportunities.",
        image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
        status: "upcoming",
        availableSeats: 75,
        venue: "JW Marriott Pune",
        attendees: ["150+ Startups", "50+ Investors", "30+ Mentors"]
    },
    {
        id: 8,
        name: "Rishikesh Yoga & Wellness Retreat",
        date: "2026-05-28",
        time: "6:00 AM",
        city: "Rishikesh, Uttarakhand",
        category: EVENT_CATEGORIES.WORKSHOP,
        description: "Start your day with mindfulness and yoga by the Ganges. All levels welcome. Includes meditation sessions, healthy meals, and accommodation.",
        image: "https://images.pexels.com/photos/843655/pexels-photo-843655.jpeg",
        status: "upcoming",
        availableSeats: 50,
        venue: "Parmarth Niketan Ashram",
        instructors: ["Certified Yoga Teachers from Sivananda Ashram"]
    },
    {
        id: 9,
        name: "Delhi Blockchain & Crypto Summit",
        date: "2026-11-10",
        time: "10:00 AM",
        city: "New Delhi",
        category: EVENT_CATEGORIES.CONFERENCE,
        description: "India's largest blockchain conference. The future of decentralized finance, NFTs, and Web3 with government officials and industry pioneers.",
        image: "https://images.pexels.com/photos/7567436/pexels-photo-7567436.jpeg",
        status: "upcoming",
        availableSeats: 150,
        venue: "India Habitat Centre",
        speakers: ["Nirmala Sitharaman", "Rajesh Dhuddu", "Blockchain experts"]
    },
    {
        id: 10,
        name: "Women in Tech - Kochi Chapter",
        date: "2026-07-22",
        time: "1:00 PM",
        city: "Kochi, Kerala",
        category: EVENT_CATEGORIES.TECH,
        description: "Empowering women leaders in technology across South India. Panel discussions, mentorship sessions, and networking opportunities.",
        image: "https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg",
        status: "upcoming",
        availableSeats: 60,
        venue: "Le Meridien Kochi",
        speakers: ["Female Tech Leaders from Infosys, TCS, Google India"]
    },
    {
        id: 11,
        name: "Kolkata International Literature Festival",
        date: "2026-12-05",
        time: "11:00 AM",
        city: "Kolkata, West Bengal",
        category: EVENT_CATEGORIES.CONFERENCE,
        description: "Celebrating literature, art, and culture. Featuring renowned authors, poets, and thinkers from around the world.",
        image: "https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg",
        status: "upcoming",
        availableSeats: 200,
        venue: "Victoria Memorial Hall",
        speakers: ["Amitav Ghosh", "Jhumpa Lahiri", "Ruskin Bond"]
    },
    {
        id: 12,
        name: "Ahmedabad StartUp Expo",
        date: "2026-08-15",
        time: "9:00 AM",
        city: "Ahmedabad, Gujarat",
        category: EVENT_CATEGORIES.WORKSHOP,
        description: "Gujarat's largest startup exhibition. Pitch competitions, investor meetups, and workshops for entrepreneurs.",
        image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
        status: "upcoming",
        availableSeats: 100,
        venue: "GMDC Ground",
        features: ["Prizes worth ₹10 Lakhs", "Investor networking", "Mentorship sessions"]
    }
];

// ... (rest of the events-data.js remains the same, including all registration functions)

// ============================================
// REGISTRATIONS STORAGE (using localStorage)
// ============================================
let registrations = [];

// Load existing registrations from localStorage
function loadRegistrations() {
    const stored = localStorage.getItem('eventRegistrations');
    if (stored) {
        registrations = JSON.parse(stored);
        console.log(`📋 Loaded ${registrations.length} registrations from storage`);
    } else {
        registrations = [];
        console.log("📋 No existing registrations found");
    }
}

// Save registrations to localStorage
function saveRegistrations() {
    localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
    console.log(`💾 Saved ${registrations.length} registrations to storage`);
}

// Get all registrations
function getAllRegistrations() {
    return registrations;
}

// Get registrations for a specific event
function getRegistrationsByEvent(eventId) {
    return registrations.filter(r => r.eventId === parseInt(eventId));
}

// Get registrations by user email
function getRegistrationsByEmail(email) {
    return registrations.filter(r => r.userEmail === email);
}

// Add a new registration
function addRegistration(userName, userEmail, userPhone, eventId, eventName, eventCategory) {
    const registration = {
        id: Date.now(),
        registrationNumber: 'REG' + Date.now().toString().slice(-8),
        userName: userName,
        userEmail: userEmail,
        userPhone: userPhone,
        eventId: parseInt(eventId),
        eventName: eventName,
        eventCategory: eventCategory,
        registrationDate: new Date().toISOString(),
        status: 'confirmed'
    };
    registrations.push(registration);
    saveRegistrations();
    console.log(`✅ New registration added: ${registration.registrationNumber} for ${eventName}`);
    return registration;
}

// Cancel a registration
function cancelRegistration(registrationId) {
    const index = registrations.findIndex(r => r.id === registrationId);
    if (index !== -1) {
        const cancelled = registrations[index];
        registrations.splice(index, 1);
        saveRegistrations();
        
        // Add seat back to event
        const event = communityEvents.find(e => e.id === cancelled.eventId);
        if (event) {
            event.availableSeats++;
        }
        
        console.log(`❌ Registration cancelled: ${cancelled.registrationNumber}`);
        return true;
    }
    return false;
}

// Update event seats from registrations
function syncEventSeats() {
    communityEvents.forEach(event => {
        const registeredCount = getRegistrationsByEvent(event.id).length;
        // Don't exceed original capacity
        const originalSeats = eventSeats[event.id] || event.availableSeats + registeredCount;
        event.availableSeats = Math.max(0, originalSeats - registeredCount);
    });
    console.log("🔄 Event seats synced with registrations");
}

// ============================================
// CLOSURE - Track registrations per category
// ============================================
function createCategoryTracker() {
    let categoryRegistrationCount = {
        Tech: 0,
        Music: 0,
        Workshop: 0,
        Conference: 0
    };
    
    // Load existing counts from registrations
    function refreshCounts() {
        categoryRegistrationCount = {
            Tech: 0,
            Music: 0,
            Workshop: 0,
            Conference: 0
        };
        registrations.forEach(reg => {
            if (categoryRegistrationCount[reg.eventCategory] !== undefined) {
                categoryRegistrationCount[reg.eventCategory]++;
            }
        });
        console.log("📊 Category counts refreshed:", categoryRegistrationCount);
    }
    
    refreshCounts();
    
    return {
        increment: function(category) {
            if (categoryRegistrationCount[category] !== undefined) {
                categoryRegistrationCount[category]++;
                console.log(`📊 ${category} registrations: ${categoryRegistrationCount[category]}`);
            }
            return categoryRegistrationCount;
        },
        getCounts: function() {
            return { ...categoryRegistrationCount };
        },
        getTotal: function() {
            return Object.values(categoryRegistrationCount).reduce((a,b) => a + b, 0);
        },
        refresh: refreshCounts
    };
}

// Create the closure instance
const categoryTracker = createCategoryTracker();

// ============================================
// EVENT CONSTRUCTOR / CLASS
// ============================================
class Event {
    constructor(id, name, date, city, category, description, availableSeats) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.city = city;
        this.category = category;
        this.description = description;
        this.availableSeats = availableSeats;
        this.registeredUsers = [];
    }
    
    // Method to check availability
    checkAvailability() {
        return this.availableSeats > 0;
    }
    
    // Register a user (using -- operator)
    registerUser(userName, userEmail) {
        if (this.checkAvailability()) {
            this.registeredUsers.push({ 
                name: userName, 
                email: userEmail, 
                date: new Date(),
                registrationId: Date.now()
            });
            this.availableSeats--;  // Using decrement operator
            return true;
        }
        return false;
    }
    
    // Cancel registration (using ++ to add seat back)
    cancelRegistration(userName) {
        const index = this.registeredUsers.findIndex(u => u.name === userName);
        if (index !== -1) {
            this.registeredUsers.splice(index, 1);
            this.availableSeats++;  // Using increment operator
            return true;
        }
        return false;
    }
    
    // Get registered users count
    getRegisteredCount() {
        return this.registeredUsers.length;
    }
    
    // Get all registered users
    getRegisteredUsers() {
        return [...this.registeredUsers];
    }
}

// Convert events to Event objects
let eventObjects = communityEvents.map(e => new Event(
    e.id, e.name, e.date, e.city, e.category, e.description, e.availableSeats
));

// ============================================
// HELPER FUNCTIONS
// ============================================
function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function isUpcomingEvent(eventDate) {
    // Compare dates properly
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDateObj = new Date(eventDate);
    eventDateObj.setHours(0, 0, 0, 0);
    return eventDateObj >= today;
}

function getEventById(eventId) {
    return communityEvents.find(e => e.id === parseInt(eventId));
}

function updateEventSeats(eventId, newSeatCount) {
    const event = communityEvents.find(e => e.id === parseInt(eventId));
    if (event) {
        event.availableSeats = newSeatCount;
        console.log(`🪑 Updated seats for ${event.name}: ${newSeatCount}`);
    }
}

// Get upcoming events only
function getUpcomingEvents() {
    return communityEvents.filter(event => {
        return isUpcomingEvent(event.date) && event.availableSeats > 0 && event.status === 'upcoming';
    });
}

// Get events by category
function getEventsByCategory(category) {
    return communityEvents.filter(event => event.category === category);
}

// Search events by name
function searchEvents(searchTerm) {
    const term = searchTerm.toLowerCase();
    return communityEvents.filter(event => 
        event.name.toLowerCase().includes(term) || 
        event.description.toLowerCase().includes(term)
    );
}

// ============================================
// FEEDBACK STORAGE
// ============================================
let feedbacks = [];

function loadFeedbacks() {
    const stored = localStorage.getItem('eventFeedbacks');
    if (stored) {
        feedbacks = JSON.parse(stored);
        console.log(`⭐ Loaded ${feedbacks.length} feedbacks from storage`);
    }
}

function saveFeedbacks() {
    localStorage.setItem('eventFeedbacks', JSON.stringify(feedbacks));
}

function addFeedback(userName, eventId, eventName, rating, comments) {
    const feedback = {
        id: Date.now(),
        userName: userName,
        eventId: parseInt(eventId),
        eventName: eventName,
        rating: parseInt(rating),
        comments: comments,
        date: new Date().toISOString()
    };
    feedbacks.push(feedback);
    saveFeedbacks();
    console.log(`⭐ New feedback added for ${eventName} - Rating: ${rating}/5`);
    return feedback;
}

function getFeedbacksByEvent(eventId) {
    return feedbacks.filter(f => f.eventId === parseInt(eventId));
}

function getAverageRatingByEvent(eventId) {
    const eventFeedbacks = getFeedbacksByEvent(eventId);
    if (eventFeedbacks.length === 0) return 0;
    const sum = eventFeedbacks.reduce((total, f) => total + f.rating, 0);
    return (sum / eventFeedbacks.length).toFixed(1);
}

// ============================================
// STATISTICS FUNCTIONS
// ============================================
function getRegistrationStats() {
    const stats = {
        totalRegistrations: registrations.length,
        byCategory: categoryTracker.getCounts(),
        byEvent: {},
        recentRegistrations: [...registrations].reverse().slice(0, 5)
    };
    
    communityEvents.forEach(event => {
        stats.byEvent[event.name] = getRegistrationsByEvent(event.id).length;
    });
    
    return stats;
}

function displayStats() {
    const stats = getRegistrationStats();
    console.log("📊 === REGISTRATION STATISTICS ===");
    console.log(`Total Registrations: ${stats.totalRegistrations}`);
    console.log("By Category:", stats.byCategory);
    console.log("Recent Registrations:", stats.recentRegistrations);
    return stats;
}

// ============================================
// EXPORT FUNCTIONS TO WINDOW (for console access)
// ============================================
window.communityEvents = communityEvents;
window.registrations = registrations;
window.getAllRegistrations = getAllRegistrations;
window.addRegistration = addRegistration;
window.cancelRegistration = cancelRegistration;
window.getEventById = getEventById;
window.getUpcomingEvents = getUpcomingEvents;
window.searchEvents = searchEvents;
window.getEventsByCategory = getEventsByCategory;
window.categoryTracker = categoryTracker;
window.getRegistrationStats = getRegistrationStats;
window.displayStats = displayStats;
window.addFeedback = addFeedback;
window.getAverageRatingByEvent = getAverageRatingByEvent;
window.syncEventSeats = syncEventSeats;

// ============================================
// INITIALIZE DATA ON LOAD
// ============================================
// Load existing data
loadRegistrations();
loadFeedbacks();

// Sync event seats based on registrations
syncEventSeats();

// Refresh category tracker
categoryTracker.refresh();

console.log("🎪 Community Event Portal Data Initialized!");
console.log(`📅 Total Events: ${communityEvents.length}`);
console.log(`🎟️ Upcoming Events: ${getUpcomingEvents().length}`);
console.log(`📝 Existing Registrations: ${registrations.length}`);
console.log(`⭐ Existing Feedbacks: ${feedbacks.length}`);

// Display object keys and values using Object.entries()
console.log("📋 Event Categories (Object.entries example):");
Object.entries(EVENT_CATEGORIES).forEach(([key, value], index) => {
    console.log(`  ${index + 1}. ${key}: ${value}`);
});

console.log("📋 First Event Details (Object.entries example):");
if (communityEvents[0]) {
    Object.entries(communityEvents[0]).forEach(([key, value]) => {
        if (typeof value !== 'object') {
            console.log(`  ${key}: ${value}`);
        }
    });
}