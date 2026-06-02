// ============================================
// DOM ELEMENTS
// ============================================
const eventsContainer = document.getElementById('eventsContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const registrationForm = document.getElementById('registrationForm');
const regEventSelect = document.getElementById('regEvent');
const loadingSpinner = document.getElementById('loadingSpinner');
const prefCategory = document.getElementById('prefCategory');
const clearPrefsBtn = document.getElementById('clearPrefsBtn');

// ============================================
// PAGE LOAD ALERT & CONSOLE LOG
// ============================================
window.addEventListener('load', function() {
    console.log("🎉 Welcome to the Community Portal!");
    console.log("📋 Available events:", communityEvents.length);
    alert("✨ Welcome to the Community Event Portal! Events are ready for you. ✨");
    
    // Load saved preferences
    loadUserPreferences();
    
    // Refresh category tracker counts
    categoryTracker.refresh();
    
    // Initialize the page
    displayEvents();
    populateEventSelectors();
    
    // Log object keys and values using Object.entries()
    console.log("📊 Event Categories:");
    Object.entries(EVENT_CATEGORIES).forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
    });
    
    // Setup event listeners
    setupEventListeners();
    
    // Display registration stats
    displayRegistrationStats();
});

// ============================================
// DISPLAY REGISTRATION STATS
// ============================================
function displayRegistrationStats() {
    const allRegs = getAllRegistrations();
    console.log(`📝 Total Registrations: ${allRegs.length}`);
    const counts = categoryTracker.getCounts();
    console.log("📊 Category-wise registrations:", counts);
}

// ============================================
// SETUP EVENT LISTENERS
// ============================================
function setupEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            filterEventsByCategory();
            console.log(`🔍 Searching for: ${e.target.value}`);
        });
    }
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }
    
    // Before unload warning
    window.addEventListener('beforeunload', function(e) {
        const formData = new FormData(registrationForm);
        let hasData = false;
        for (let value of formData.values()) {
            if (value) {
                hasData = true;
                break;
            }
        }
        if (hasData) {
            e.preventDefault();
            e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
            return e.returnValue;
        }
    });
}

// ============================================
// DISPLAY EVENTS WITH CONDITIONALS & LOOP
// ============================================
function displayEvents(eventsToShow = communityEvents) {
    if (!eventsContainer) return;
    
    console.log("🎯 Displaying events, total:", eventsToShow.length);
    
    // Using filter to show only upcoming events with seats
    const validEvents = eventsToShow.filter(event => {
        // if-else to hide past or full events
        if (event.status === 'cancelled') return false;
        if (!isUpcomingEvent(event.date)) {
            console.log(`⏰ Filtering out past event: ${event.name} (${event.date})`);
            return false;
        }
        if (event.availableSeats <= 0) {
            console.log(`🎫 Filtering out full event: ${event.name} (0 seats)`);
            return false;
        }
        return true;
    });
    
    console.log(`✅ Found ${validEvents.length} valid upcoming events`);
    
    if (validEvents.length === 0) {
        eventsContainer.innerHTML = '<div class="no-events" style="text-align: center; padding: 3rem; background: white; border-radius: 16px;">🎯 No upcoming events match your criteria. Try adjusting your filters!</div>';
        return;
    }
    
    // Using forEach to loop through events
    eventsContainer.innerHTML = '';
    validEvents.forEach(event => {
        const eventCard = createEventCard(event);
        eventsContainer.appendChild(eventCard);
    });
}

// ============================================
// CREATE EVENT CARD WITH REDIRECT TO REGISTER PAGE
// ============================================
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'eventCard';
    card.setAttribute('data-event-id', event.id);
    card.setAttribute('data-category', event.category);
    
    // Using object destructuring to extract event details
    const { name, date, city, category, description, availableSeats } = event;
    
    // Format date nicely
    const formattedDate = new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    card.innerHTML = `
        <h3>${name}</h3>
        <span class="category">🎯 ${category}</span>
        <p>📅 ${formattedDate} | 📍 ${city}</p>
        <p>${description}</p>
        <p class="seats" style="font-size: 1.2rem; margin: 0.5rem 0;">
            🎟️ Available Seats: <strong>${availableSeats}</strong>
        </p>
        <button class="btn-primary register-btn" data-id="${event.id}" data-name="${name}">
            ✅ Register Now
        </button>
    `;
    
    const registerBtn = card.querySelector('.register-btn');
    registerBtn.onclick = function(e) {
        e.stopPropagation();
        // Redirect to registration page with event ID
        window.location.href = `register.html?eventId=${event.id}`;
    };
    
    return card;
}
// ============================================
// REGISTRATION FUNCTION WITH TRY-CATCH
// ============================================
function registerForEvent(eventId, eventName) {
    try {
        const event = communityEvents.find(e => e.id === parseInt(eventId));
        
        if (!event) {
            throw new Error("Event not found");
        }
        
        // Check if event is valid using conditionals
        if (!isUpcomingEvent(event.date)) {
            alert("❌ Cannot register: This event has already passed.");
            return;
        }
        
        if (event.availableSeats <= 0) {
            alert("❌ Sorry, this event is fully booked!");
            return;
        }
        
        // Get user details via modal prompt
        const userName = prompt("Enter your full name:", "John Doe");
        if (!userName || userName.trim() === "") {
            throw new Error("Name is required for registration");
        }
        
        const userEmail = prompt("Enter your email address:", "john@example.com");
        if (!userEmail || !userEmail.includes('@')) {
            throw new Error("Valid email is required");
        }
        
        const userPhone = prompt("Enter your phone number:", "(555) 123-4567");
        
        // Using -- to decrement seats
        event.availableSeats--;
        
        // Store registration in localStorage
        const registration = addRegistration(
            userName.trim(), 
            userEmail.trim(), 
            userPhone || 'Not provided', 
            event.id, 
            event.name, 
            event.category
        );
        
        // Track registration using closure
        categoryTracker.increment(event.category);
        
        // Update UI
        displayEvents();
        populateEventSelectors();
        
        // Show success message
        alert(`✅ Successfully registered for ${eventName}!\n\n` +
              `Name: ${userName}\n` +
              `Email: ${userEmail}\n` +
              `Remaining seats: ${event.availableSeats}\n\n` +
              `A confirmation has been sent to your email.`);
        
        console.log(`📝 Registration #${registration.id}: ${userName} -> ${eventName} (${event.category})`);
        console.log(`📊 Total registrations so far: ${getAllRegistrations().length}`);
        
        // Display updated stats
        displayRegistrationStats();
        
    } catch (error) {
        console.error("Registration error:", error.message);
        alert(`Registration failed: ${error.message}`);
    }
}

// ============================================
// FILTER EVENTS BY CATEGORY (Higher-order function)
// ============================================
function filterEventsByCategory() {
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    console.log(`🔍 Filtering - Category: ${selectedCategory}, Search: "${searchTerm}"`);
    
    // Using filter with callback for dynamic search
    let filteredEvents = communityEvents.filter(event => {
        // Category filter
        if (selectedCategory !== 'all' && event.category !== selectedCategory) {
            return false;
        }
        // Search filter
        if (searchTerm && !event.name.toLowerCase().includes(searchTerm)) {
            return false;
        }
        return true;
    });
    
    // Using map to format display
    const formattedCount = `Found ${filteredEvents.length} events matching criteria`;
    console.log(formattedCount);
    
    displayEvents(filteredEvents);
}

// ============================================
// POPULATE EVENT SELECTORS (Using .push and iteration)
// ============================================
function populateEventSelectors() {
    if (regEventSelect) {
        regEventSelect.innerHTML = '<option value="">-- Choose an event --</option>';
        
        // Using forEach to add options
        communityEvents.forEach(event => {
            if (isUpcomingEvent(event.date) && event.availableSeats > 0) {
                const option = document.createElement('option');
                option.value = event.id;
                option.textContent = `${event.name} (${event.availableSeats} seats left) - ${event.city}`;
                regEventSelect.appendChild(option);
            }
        });
        
        console.log(`📋 Populated event selector with ${regEventSelect.children.length - 1} events`);
    }
    
    // Populate feedback event select
    const feedbackEventSelect = document.getElementById('feedbackEvent');
    if (feedbackEventSelect) {
        feedbackEventSelect.innerHTML = '<option value="">-- Select an event --</option>';
        communityEvents.forEach(event => {
            const option = document.createElement('option');
            option.value = event.id;
            option.textContent = `${event.name} (${event.category})`;
            feedbackEventSelect.appendChild(option);
        });
    }
}

// ============================================
// FORM SUBMISSION HANDLER (preventDefault, validation)
// ============================================
function handleRegistration(e) {
    e.preventDefault();  // Prevent default form behavior
    
    console.log("📝 Processing form submission...");
    
    // Using form.elements to capture data
    const form = e.target;
    const name = form.elements['fullName']?.value;
    const email = form.elements['email']?.value;
    const phone = form.elements['phone']?.value;
    const eventId = form.elements['eventId']?.value;
    const message = form.elements['message']?.value;
    
    // Validate inputs
    let isValid = true;
    
    if (!name || name.trim().length < 2) {
        document.getElementById('nameError').textContent = "Please enter a valid name (min 2 characters)";
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = "";
    }
    
    if (!email || !email.includes('@')) {
        document.getElementById('emailError').textContent = "Please enter a valid email address";
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = "";
    }
    
    if (!eventId) {
        alert("Please select an event to register for");
        isValid = false;
    }
    
    if (isValid) {
        const selectedEvent = communityEvents.find(e => e.id === parseInt(eventId));
        if (selectedEvent && selectedEvent.availableSeats > 0) {
            // Decrement seats
            selectedEvent.availableSeats--;
            
            // Store registration
            const registration = addRegistration(name, email, phone, selectedEvent.id, selectedEvent.name, selectedEvent.category);
            categoryTracker.increment(selectedEvent.category);
            
            const output = document.getElementById('formOutput');
            output.innerHTML = `✅ Registration confirmed for ${name}!<br>
                               You're registered for "<strong>${selectedEvent.name}</strong>".<br>
                               A confirmation email has been sent to ${email}.<br>
                               Registration ID: #${registration.id}`;
            output.style.background = "#c6f6d5";
            output.style.padding = "1rem";
            output.style.borderRadius = "12px";
            
            form.reset();
            displayEvents();
            populateEventSelectors();
            
            console.log(`📝 Form registration complete! Total: ${getAllRegistrations().length}`);
            
            // Save preference to localStorage
            localStorage.setItem('preferredEventType', selectedEvent.category);
        } else {
            alert("Sorry, this event is now full!");
        }
    }
}

// ============================================
// UPDATE EVENT FEE (onchange handler)
// ============================================
function updateEventFee() {
    const eventSelect = document.getElementById('regEvent');
    const feeDisplay = document.getElementById('eventFeeDisplay');
    
    if (eventSelect && eventSelect.value) {
        const event = communityEvents.find(e => e.id === parseInt(eventSelect.value));
        if (event) {
            const fees = { Tech: "$25", Music: "$40", Workshop: "$15", Conference: "$50" };
            feeDisplay.innerHTML = `💰 Fee: ${fees[event.category] || "$20"} per person`;
            feeDisplay.style.color = "#38a169";
            feeDisplay.style.fontWeight = "bold";
        }
    } else {
        feeDisplay.innerHTML = "";
    }
}

// ============================================
// PHONE VALIDATION (onblur event)
// ============================================
function validatePhoneNumber() {
    const phoneInput = document.getElementById('regPhone');
    const phoneError = document.getElementById('phoneError');
    const phone = phoneInput?.value;
    
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    
    if (phone && phone.trim() !== "" && !phoneRegex.test(phone)) {
        phoneError.textContent = "Please enter a valid phone number (e.g., 123-456-7890)";
        return false;
    } else {
        phoneError.textContent = "";
        return true;
    }
}

// ============================================
// CHARACTER COUNT (keydown/keyup event)
// ============================================
function updateCharCount() {
    const textarea = document.getElementById('regMessage');
    const charCount = document.getElementById('charCount');
    
    if (textarea && charCount) {
        const count = textarea.value.length;
        charCount.textContent = `${count} / 500 characters`;
        
        if (count > 500) {
            charCount.style.color = "red";
            textarea.value = textarea.value.substring(0, 500);
        } else {
            charCount.style.color = "#718096";
        }
    }
}

// ============================================
// ENLARGE IMAGE (ondblclick handler)
// ============================================
function enlargeImage(imgElement) {
    console.log("🔍 Enlarging image");
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '10000';
    modal.style.cursor = 'pointer';
    
    const enlargedImg = document.createElement('img');
    enlargedImg.src = imgElement.src;
    enlargedImg.style.maxWidth = '90%';
    enlargedImg.style.maxHeight = '90%';
    enlargedImg.style.borderRadius = '12px';
    enlargedImg.style.boxShadow = '0 0 30px rgba(255,255,255,0.3)';
    
    modal.appendChild(enlargedImg);
    document.body.appendChild(modal);
    
    modal.onclick = () => modal.remove();
}

// ============================================
// VIDEO READY MESSAGE (oncanplay event)
// ============================================
function showVideoReadyMessage() {
    const msgDiv = document.getElementById('videoMsg');
    if (msgDiv) {
        msgDiv.innerHTML = "🎥 Video is ready to play! Click play to watch our event highlights.";
        msgDiv.style.color = "#48bb78";
        msgDiv.style.fontWeight = "bold";
        setTimeout(() => {
            msgDiv.style.opacity = "0";
            setTimeout(() => msgDiv.innerHTML = "", 2000);
        }, 3000);
    }
}

// ============================================
// USER PREFERENCES (localStorage)
// ============================================
function loadUserPreferences() {
    const savedCategory = localStorage.getItem('preferredEventType');
    if (savedCategory && prefCategory) {
        prefCategory.value = savedCategory;
        console.log("📌 Loaded preference:", savedCategory);
    }
    
    // Also load session storage
    const sessionPref = sessionStorage.getItem('lastViewedCategory');
    if (sessionPref && categoryFilter) {
        categoryFilter.value = sessionPref;
        filterEventsByCategory();
    }
}

function savePreferences() {
    if (prefCategory && prefCategory.value) {
        localStorage.setItem('preferredEventType', prefCategory.value);
        if (categoryFilter) {
            categoryFilter.value = prefCategory.value;
            filterEventsByCategory();
            sessionStorage.setItem('lastViewedCategory', prefCategory.value);
        }
        alert(`✅ Preferences saved! Now filtering by "${prefCategory.value}"`);
        console.log(`💾 Saved preference: ${prefCategory.value}`);
    }
}

if (prefCategory) {
    prefCategory.addEventListener('change', savePreferences);
}

if (clearPrefsBtn) {
    clearPrefsBtn.addEventListener('click', function() {
        localStorage.removeItem('preferredEventType');
        localStorage.removeItem('eventRegistrations');
        sessionStorage.removeItem('lastViewedCategory');
        if (prefCategory) prefCategory.value = '';
        if (categoryFilter) {
            categoryFilter.value = 'all';
            filterEventsByCategory();
        }
        alert("All preferences and registration data cleared!");
        console.log("🗑️ Cleared localStorage and sessionStorage");
        location.reload(); // Reload to reset state
    });
}

// ============================================
// FEEDBACK FORM HANDLER with rating stars
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('ratingValue');
    
    if (stars.length) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.dataset.rating);
                ratingInput.value = rating;
                
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.add('active');
                        s.style.color = '#f6ad55';
                    } else {
                        s.classList.remove('active');
                        s.style.color = '#cbd5e0';
                    }
                });
            });
        });
    }
    
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('feedbackName')?.value || 'Anonymous';
            const rating = ratingInput?.value;
            const comments = document.getElementById('feedbackComments')?.value;
            
            if (!rating || rating === '0') {
                alert("Please select a rating!");
                return;
            }
            
            // Save feedback to localStorage
            const feedbacks = JSON.parse(localStorage.getItem('eventFeedbacks') || '[]');
            feedbacks.push({
                id: Date.now(),
                name: name,
                rating: parseInt(rating),
                comments: comments,
                date: new Date().toISOString()
            });
            localStorage.setItem('eventFeedbacks', JSON.stringify(feedbacks));
            
            alert(`⭐ Thank you ${name} for your ${rating}-star rating!\n\nFeedback submitted successfully.`);
            console.log("📝 Feedback saved:", { name, rating, comments });
            feedbackForm.reset();
            if (ratingInput) ratingInput.value = '0';
            stars.forEach(s => {
                s.classList.remove('active');
                s.style.color = '#cbd5e0';
            });
        });
    }
});
// ============================================
// GEOLOCATION FUNCTION - Indian Cities
// ============================================
function findNearbyEvents() {
    const locationDiv = document.getElementById('locationResult');
    
    if (!navigator.geolocation) {
        locationDiv.innerHTML = "❌ Geolocation is not supported by your browser.";
        return;
    }
    
    locationDiv.innerHTML = "📍 Getting your location in India...";
    
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };
    
    function success(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Determine which Indian city based on coordinates (simplified)
        let nearbyEventsList = [];
        
        // Approximate coordinates for Indian cities
        const cities = [
            { name: "Bengaluru", lat: 12.9716, lng: 77.5946, events: ["Bengaluru Tech Summit", "Startup Meetup"] },
            { name: "Mumbai", lat: 19.0760, lng: 72.8777, events: ["Digital Marketing Workshop", "Charity Marathon"] },
            { name: "Delhi", lat: 28.6139, lng: 77.2090, events: ["Blockchain Summit", "Literature Festival"] },
            { name: "Chennai", lat: 13.0827, lng: 80.2707, events: ["AI & ML Conference", "Tech Meetup"] },
            { name: "Kolkata", lat: 22.5726, lng: 88.3639, events: ["Literature Festival", "Cultural Event"] },
            { name: "Pune", lat: 18.5204, lng: 73.8567, events: ["Startup Mixer", "Tech Workshop"] },
            { name: "Hyderabad", lat: 17.3850, lng: 78.4867, events: ["Frontend Bootcamp", "Tech Summit"] },
            { name: "Jaipur", lat: 26.9124, lng: 75.7873, events: ["Jazz Festival", "Heritage Walk"] }
        ];
        
        // Find nearest city
        let nearestCity = null;
        let minDistance = Infinity;
        
        cities.forEach(city => {
            const distance = Math.sqrt(Math.pow(lat - city.lat, 2) + Math.pow(lng - city.lng, 2));
            if (distance < minDistance) {
                minDistance = distance;
                nearestCity = city;
            }
        });
        
        if (nearestCity) {
            nearbyEventsList = nearestCity.events;
            locationDiv.innerHTML = `
                <div style="background: #e8f5e9; padding: 1rem; border-radius: 12px;">
                    <h3>📍 Location Acquired!</h3>
                    <p><strong>Latitude:</strong> ${lat.toFixed(4)}°<br>
                    <strong>Longitude:</strong> ${lng.toFixed(4)}°</p>
                    <p><strong>📍 Nearest City:</strong> ${nearestCity.name}</p>
                    <p><strong>🎉 Upcoming Events Near You:</strong></p>
                    <ul style="margin-left: 1rem;">
                        ${nearbyEventsList.map(event => `<li>${event}</li>`).join('')}
                    </ul>
                    <p style="margin-top: 0.5rem;"><strong>🎟️ Register now!</strong> Use the registration form to book your spot.</p>
                </div>
            `;
        } else {
            locationDiv.innerHTML = `
                <div style="background: #e8f5e9; padding: 1rem; border-radius: 12px;">
                    <h3>✅ Location Acquired!</h3>
                    <p>📍 Coordinates: ${lat.toFixed(4)}°, ${lng.toFixed(4)}°</p>
                    <p>🎪 Check out our <strong>Upcoming Events</strong> section for events across India!</p>
                    <p>🌟 Featured events in: Bengaluru, Mumbai, Delhi, Chennai, and more!</p>
                </div>
            `;
        }
    }
    
    function error(err) {
        console.error("Geolocation error:", err);
        switch(err.code) {
            case err.PERMISSION_DENIED:
                locationDiv.innerHTML = `
                    <div style="background: #fff3e0; padding: 1rem; border-radius: 12px;">
                        ❌ Location access denied.<br>
                        🎪 Don't worry! Check out our featured events in major Indian cities:<br>
                        <strong>Bengaluru, Mumbai, Delhi, Chennai, Hyderabad, Pune, Kolkata, Jaipur</strong>
                    </div>
                `;
                break;
            case err.POSITION_UNAVAILABLE:
                locationDiv.innerHTML = "❌ Location information unavailable. Showing top events in Bengaluru, Mumbai, and Delhi instead!";
                break;
            case err.TIMEOUT:
                locationDiv.innerHTML = "⏰ Location request timed out. Please check your connection and try again.";
                break;
            default:
                locationDiv.innerHTML = "❌ An unknown error occurred. Please explore our upcoming events above!";
        }
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);
}

window.findNearbyEvents = findNearbyEvents;

// ============================================
// VIEW ALL REGISTRATIONS (Debug function)
// ============================================
function viewAllRegistrations() {
    const allRegs = getAllRegistrations();
    if (allRegs.length === 0) {
        console.log("No registrations yet.");
        alert("📋 No registrations found. Register for an event first!");
    } else {
        console.table(allRegs);
        let message = `📋 Total Registrations: ${allRegs.length}\n\n`;
        allRegs.forEach(reg => {
            message += `• ${reg.userName} -> ${reg.eventName} (${reg.registrationDate.slice(0,10)})\n`;
        });
        alert(message);
    }
}

// Make functions available globally
window.filterEventsByCategory = filterEventsByCategory;
window.updateEventFee = updateEventFee;
window.validatePhoneNumber = validatePhoneNumber;
window.updateCharCount = updateCharCount;
window.enlargeImage = enlargeImage;
window.showVideoReadyMessage = showVideoReadyMessage;
window.viewAllRegistrations = viewAllRegistrations;