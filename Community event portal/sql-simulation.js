// ============================================
// SQL SIMULATION - Pure JavaScript Implementation
// No actual SQL database needed!
// Demonstrates SQL concepts using JavaScript arrays
// ============================================

// ============================================
// DATABASE TABLES (JavaScript Arrays)
// ============================================

// Table: Users (like SQL Users table)
let db_users = [];

// Table: Events (like SQL Events table)  
let db_events = [];

// Table: Registrations (like SQL Registrations table)
let db_registrations = [];

// ============================================
// INITIALIZE DATABASE WITH SAMPLE DATA
// ============================================
function initSQLSimulation() {
    console.log("🗄️ Initializing SQL Simulation (Pure JavaScript)...");
    
    // Load from localStorage if exists
    const storedUsers = localStorage.getItem('sql_users');
    const storedEvents = localStorage.getItem('sql_events');
    const storedRegistrations = localStorage.getItem('sql_registrations');
    
    if (storedUsers) db_users = JSON.parse(storedUsers);
    if (storedEvents) db_events = JSON.parse(storedEvents);
    if (storedRegistrations) db_registrations = JSON.parse(storedRegistrations);
    
    // Seed events if empty
    if (db_events.length === 0) {
        seedEvents();
    }
    
    console.log(`✅ SQL Simulation Ready: ${db_users.length} Users, ${db_events.length} Events, ${db_registrations.length} Registrations`);
}

// Seed events data
function seedEvents() {
    db_events = [
        { event_id: 1, title: "Bengaluru Tech Summit", city: "Bengaluru", event_date: "2026-06-10", category: "Tech", available_seats: 45 },
        { event_id: 2, title: "Goa Music Festival", city: "Goa", event_date: "2026-07-15", category: "Music", available_seats: 120 },
        { event_id: 3, title: "Hyderabad Frontend Bootcamp", city: "Hyderabad", event_date: "2026-08-01", category: "Workshop", available_seats: 28 },
        { event_id: 4, title: "Chennai AI Conference", city: "Chennai", event_date: "2026-09-15", category: "Conference", available_seats: 200 },
        { event_id: 5, title: "Mumbai Digital Workshop", city: "Mumbai", event_date: "2026-10-25", category: "Workshop", available_seats: 34 },
        { event_id: 6, title: "Pune Startup Mixer", city: "Pune", event_date: "2026-06-05", category: "Tech", available_seats: 75 }
    ];
    saveToStorage();
}

// Save to localStorage
function saveToStorage() {
    localStorage.setItem('sql_users', JSON.stringify(db_users));
    localStorage.setItem('sql_events', JSON.stringify(db_events));
    localStorage.setItem('sql_registrations', JSON.stringify(db_registrations));
}

// ============================================
// SQL OPERATIONS (Implemented in JavaScript)
// ============================================

// 1. INSERT INTO users (like SQL INSERT)
function INSERT_INTO_users(full_name, email, city) {
    const newUser = {
        user_id: db_users.length + 1,
        full_name: full_name,
        email: email,
        city: city,
        registration_date: new Date().toISOString()
    };
    db_users.push(newUser);
    saveToStorage();
    console.log(`✅ INSERT INTO users: ${full_name}`);
    return newUser;
}

// 2. INSERT INTO registrations (like SQL INSERT)
function INSERT_INTO_registrations(user_id, event_id) {
    const newReg = {
        registration_id: db_registrations.length + 1,
        user_id: user_id,
        event_id: event_id,
        registration_date: new Date().toISOString()
    };
    db_registrations.push(newReg);
    
    // Update available seats
    const event = db_events.find(e => e.event_id === event_id);
    if (event) event.available_seats--;
    
    saveToStorage();
    console.log(`✅ INSERT INTO registrations: User ${user_id} -> Event ${event_id}`);
    return newReg;
}

// 3. SELECT with JOIN (Get user registrations with event details)
// LIKE SQL: SELECT * FROM users u JOIN registrations r ON u.user_id = r.user_id JOIN events e ON r.event_id = e.event_id
function SELECT_user_registrations(email) {
    const user = db_users.find(u => u.email === email);
    if (!user) return [];
    
    const results = db_registrations
        .filter(reg => reg.user_id === user.user_id)
        .map(reg => {
            const event = db_events.find(e => e.event_id === reg.event_id);
            return {
                user_name: user.full_name,
                user_email: user.email,
                event_title: event?.title,
                event_city: event?.city,
                event_date: event?.event_date,
                registration_date: reg.registration_date
            };
        });
    
    console.log(`🔍 SELECT with JOIN: Found ${results.length} registrations for ${email}`);
    return results;
}

// 4. SELECT with GROUP BY and COUNT (Like SQL aggregation)
// LIKE SQL: SELECT city, COUNT(*) as total_events FROM events GROUP BY city
function SELECT_events_by_city() {
    const cityStats = {};
    db_events.forEach(event => {
        cityStats[event.city] = (cityStats[event.city] || 0) + 1;
    });
    
    const results = Object.entries(cityStats).map(([city, count]) => ({ city, total_events: count }));
    console.log("📊 SELECT with GROUP BY:", results);
    return results;
}

// 5. SELECT upcoming events with available seats
// LIKE SQL: SELECT * FROM events WHERE event_date >= TODAY AND available_seats > 0 ORDER BY event_date
function SELECT_upcoming_events() {
    const today = new Date().toISOString().split('T')[0];
    const results = db_events
        .filter(event => event.event_date >= today && event.available_seats > 0)
        .sort((a, b) => a.event_date.localeCompare(b.event_date));
    
    console.log(`📅 SELECT upcoming events: ${results.length} events found`);
    return results;
}

// 6. SELECT with HAVING (Events with more than 50 registrations)
// LIKE SQL: SELECT event_id, COUNT(*) as reg_count FROM registrations GROUP BY event_id HAVING reg_count > 50
function SELECT_events_with_min_registrations(minCount = 50) {
    const regCount = {};
    db_registrations.forEach(reg => {
        regCount[reg.event_id] = (regCount[reg.event_id] || 0) + 1;
    });
    
    const results = Object.entries(regCount)
        .filter(([event_id, count]) => count >= minCount)
        .map(([event_id, count]) => {
            const event = db_events.find(e => e.event_id === parseInt(event_id));
            return { event_title: event?.title, registrations: count };
        });
    
    console.log(`📊 SELECT with HAVING (>= ${minCount} registrations):`, results);
    return results;
}

// 7. SELECT with ORDER BY and LIMIT (Top 3 cities by events)
// LIKE SQL: SELECT city, COUNT(*) as total FROM events GROUP BY city ORDER BY total DESC LIMIT 3
function SELECT_top_cities(limit = 3) {
    const cityCount = {};
    db_events.forEach(event => {
        cityCount[event.city] = (cityCount[event.city] || 0) + 1;
    });
    
    const results = Object.entries(cityCount)
        .map(([city, count]) => ({ city, total_events: count }))
        .sort((a, b) => b.total_events - a.total_events)
        .slice(0, limit);
    
    console.log(`🏙️ SELECT with ORDER BY & LIMIT ${limit}:`, results);
    return results;
}

// 8. UPDATE available seats (Like SQL UPDATE)
// LIKE SQL: UPDATE events SET available_seats = available_seats - 1 WHERE event_id = ?
function UPDATE_event_seats(event_id, seatsToDecrease = 1) {
    const event = db_events.find(e => e.event_id === event_id);
    if (event && event.available_seats >= seatsToDecrease) {
        event.available_seats -= seatsToDecrease;
        saveToStorage();
        console.log(`🔄 UPDATE events: ${event.title} now has ${event.available_seats} seats`);
        return true;
    }
    return false;
}

// 9. DELETE registration (Like SQL DELETE)
// LIKE SQL: DELETE FROM registrations WHERE registration_id = ?
function DELETE_registration(registration_id) {
    const index = db_registrations.findIndex(r => r.registration_id === registration_id);
    if (index !== -1) {
        const deleted = db_registrations.splice(index, 1)[0];
        saveToStorage();
        console.log(`🗑️ DELETE FROM registrations: ID ${registration_id}`);
        return deleted;
    }
    return null;
}

// 10. COMPLEX QUERY: Most active users (users with most registrations)
// LIKE SQL: SELECT u.full_name, COUNT(r.registration_id) as total FROM users u JOIN registrations r ON u.user_id = r.user_id GROUP BY u.user_id ORDER BY total DESC
function SELECT_most_active_users(limit = 5) {
    const userRegCount = {};
    db_registrations.forEach(reg => {
        userRegCount[reg.user_id] = (userRegCount[reg.user_id] || 0) + 1;
    });
    
    const results = Object.entries(userRegCount)
        .map(([user_id, count]) => {
            const user = db_users.find(u => u.user_id === parseInt(user_id));
            return { user_name: user?.full_name, email: user?.email, registrations: count };
        })
        .sort((a, b) => b.registrations - a.registrations)
        .slice(0, limit);
    
    console.log(`🏆 Most Active Users (TOP ${limit}):`, results);
    return results;
}

// ============================================
// INTEGRATION WITH YOUR REGISTRATION SYSTEM
// ============================================
function registerWithSQL(full_name, email, city, event_id) {
    // Check if user exists
    let user = db_users.find(u => u.email === email);
    
    if (!user) {
        // INSERT new user
        user = INSERT_INTO_users(full_name, email, city);
    }
    
    // INSERT registration
    const registration = INSERT_INTO_registrations(user.user_id, event_id);
    
    // UPDATE event seats
    UPDATE_event_seats(event_id);
    
    return {
        success: true,
        message: `✅ Registered ${full_name} for event ID ${event_id}`,
        user: user,
        registration: registration
    };
}

// ============================================
// DISPLAY ALL SQL DATA (For Console)
// ============================================
function showSQLTables() {
    console.log("\n🗄️ ===== SQL TABLES (JavaScript Simulation) =====");
    console.log("\n📋 USERS TABLE:");
    console.table(db_users);
    console.log("\n📋 EVENTS TABLE:");
    console.table(db_events);
    console.log("\n📋 REGISTRATIONS TABLE:");
    console.table(db_registrations);
}

function runAllSQLQueries() {
    console.log("\n🗄️ ===== RUNNING ALL SQL QUERIES =====");
    console.log("\n1️⃣ SELECT upcoming events:");
    console.table(SELECT_upcoming_events());
    
    console.log("\n2️⃣ SELECT events by city (GROUP BY):");
    console.table(SELECT_events_by_city());
    
    console.log("\n3️⃣ SELECT top cities (ORDER BY + LIMIT):");
    console.table(SELECT_top_cities(3));
    
    console.log("\n4️⃣ SELECT events with HAVING (min 1 registration):");
    console.table(SELECT_events_with_min_registrations(1));
    
    console.log("\n5️⃣ SELECT most active users:");
    console.table(SELECT_most_active_users(5));
}

// ============================================
// EXPORT TO WINDOW FOR CONSOLE ACCESS
// ============================================
window.initSQLSimulation = initSQLSimulation;
window.registerWithSQL = registerWithSQL;
window.SELECT_upcoming_events = SELECT_upcoming_events;
window.SELECT_user_registrations = SELECT_user_registrations;
window.SELECT_events_by_city = SELECT_events_by_city;
window.SELECT_top_cities = SELECT_top_cities;
window.SELECT_events_with_min_registrations = SELECT_events_with_min_registrations;
window.SELECT_most_active_users = SELECT_most_active_users;
window.UPDATE_event_seats = UPDATE_event_seats;
window.DELETE_registration = DELETE_registration;
window.showSQLTables = showSQLTables;
window.runAllSQLQueries = runAllSQLQueries;

// Initialize on load
initSQLSimulation();

console.log("🗄️ SQL Simulation Ready! Try these commands in console:");
console.log("  📌 runAllSQLQueries() - Run all SQL queries");
console.log("  📌 showSQLTables() - View all tables");
console.log("  📌 SELECT_upcoming_events() - Get upcoming events");
console.log("  📌 SELECT_top_cities(5) - Top 5 cities by events");
console.log("  📌 registerWithSQL('Name', 'email@test.com', 'City', eventId)");