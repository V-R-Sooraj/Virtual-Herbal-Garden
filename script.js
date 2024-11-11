// Array of taglines
const taglines = [
    "Connect with Nature, Heal Yourself.",
    "Discover the Power of Herbal Remedies.",
    "Revitalize with Yoga and Ancient Wisdom.",
    "Cultivate Health and Well-being with Plants.",
    "Nurture your mind, body, and soul with nature's wisdom.",
    "Discover the healing power of plants and ancient traditions.",
    "Embrace tranquility with the art of herbal wellness.",
    "Find balance and peace through nature’s remedies and yoga."
];

// Function to rotate the tagline
function setTagline() {
    const taglineElement = document.getElementById('tagline');
    const randomIndex = Math.floor(Math.random() * taglines.length);
    taglineElement.textContent = taglines[randomIndex];
}

// Function to switch between sections
function switchSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Combined window.onload function
window.onload = function() {
    // Display the home section by default
    switchSection('home-section');
    
    // Set the tagline
    setTagline();
};

// Event listeners for navigation links
document.getElementById('home-link').addEventListener('click', function() {
    switchSection('home-section');
});
document.getElementById('plants-link').addEventListener('click', function() {
    switchSection('plants-section');
});
document.getElementById('yoga-link').addEventListener('click', function() {
    switchSection('yogas-section');
});
document.getElementById('about-link').addEventListener('click', function() {
    switchSection('about-developer-section');
});
document.getElementById('profile-link').addEventListener('click', function() {
    switchSection('profile-section');
});

document.querySelector('.plants').addEventListener('click', function() {
    switchSection('plants-section');
});

document.querySelector('.yoga').addEventListener('click', function() {
    switchSection('yogas-section');
});

// Search Functionality for Plants
function searchPlants() {
    const searchValue = document.getElementById('plant-search-bar').value.toLowerCase();
    const plantCards = document.querySelectorAll('.plant-card');

    plantCards.forEach(card => {
        const plantName = card.querySelector('h4').textContent.toLowerCase();
        if (plantName.includes(searchValue)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


// Function to show the selected yoga category based on dropdown
function showYogaCategory() {
    const selectedCategory = document.getElementById('yoga-category').value;
    const categories = document.querySelectorAll('.yoga-category');
    
    // Hide all categories
    categories.forEach(category => {
        category.style.display = 'none';
    });
    
    // Show the selected category
    const selectedElement = document.getElementById(`yoga-${selectedCategory}`);
    if (selectedElement) {
        selectedElement.style.display = 'block';
    }
}

// Search Functionality for Yoga Asanas
function searchYoga() {
    const searchValue = document.getElementById('yoga-search-bar').value.toLowerCase();
    const yogaCards = document.querySelectorAll('.yoga-card');

    yogaCards.forEach(card => {
        const yogaName = card.querySelector('h4').textContent.toLowerCase();
        if (yogaName.includes(searchValue)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}



let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll(".mentor-slide");

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, idx) => {
        slide.style.display = idx === currentSlide ? "block" : "none";
    });
}

// Initial display
showSlide(currentSlide);


document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });



// Check if user is logged in
let isLoggedIn = false;

function openProfile() {
    if (!isLoggedIn) {
        openPopup();
    } else {
        switchSection('profile-section');
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    isLoggedIn = true;
    closePopup();
    switchSection('profile-section');
}

// Show registration form in popup
function showRegistrationForm() {
    document.getElementById('popup-title').innerText = "Register";
    document.getElementById('login-form').innerHTML = `
        <input type="text" id="username" placeholder="Username" required>
        <input type="password" id="password" placeholder="Password" required>
        <input type="password" id="confirm-password" placeholder="Confirm Password" required>
        <button type="submit" class="btn">Register</button>
    `;
}

// Open/close popup
function openPopup() {
    document.getElementById('login-popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('login-popup').style.display = 'none';
}

// Add event listener for Profile link
document.getElementById('profile-link').addEventListener('click', openProfile);





const chatbotAnswers = {
    "What is Tulsi?": "Tulsi, also known as Holy Basil, is revered in Ayurveda for its medicinal properties. It supports immune health and stress relief.",
    "What is Aloe Vera?": "Aloe Vera is known for its skin healing properties and digestive benefits. It can be used both topically and consumed in various forms.",
    "What is Neem?": "Neem has anti-inflammatory and antibacterial properties. It's used in various skin treatments and purifies the blood.",
    // Add more questions and answers...

    "What is Tadasana?": "Tadasana, or Mountain Pose, is a foundational yoga pose that promotes posture, balance, and alignment.",
    "What is Downward Dog?": "Downward Dog is an inversion pose that helps stretch the hamstrings, calves, and spine, improving overall flexibility.",
    // Add more yoga-related questions...

    // Custom response for other dynamic queries
    "What are the benefits of plants?": "Plants offer a variety of health benefits including boosting immunity, aiding digestion, and providing essential nutrients.",
    "What is yoga?": "Yoga is a practice that combines physical postures, breathing techniques, and meditation to improve flexibility, strength, and overall well-being.",
    "Tell me about yoga for relaxation": "Yoga for relaxation includes gentle poses like Child's Pose, Savasana, and Cat-Cow that help calm the mind and relieve stress.",
    "How to grow medicinal plants?": "Medicinal plants need proper sunlight, water, and soil conditions. Ensure the soil is well-drained and the plants get enough sunlight for healthy growth.",
};

// Function to display chatbot message
function displayMessage(message, sender) {
    const chatLog = document.getElementById("chat-log");
    const messageElement = document.createElement("div");

    messageElement.classList.add(sender === "bot" ? "bot-message" : "user-message");
    messageElement.textContent = message;

    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Function to process the user's input and provide a response
function getChatbotResponse(userInput) {
    // Convert user input to lowercase and remove extra spaces
    const userMessage = userInput.toLowerCase().trim();

    // Look for a match in the chatbotAnswers object
    for (const key in chatbotAnswers) {
        if (userMessage.includes(key.toLowerCase())) {  // Partial match using includes
            return chatbotAnswers[key];
        }
    }

    // If no match is found, return a default message
    return "I'm sorry, I didn't understand that. Can you ask something else related to plants or yoga?";
}

// Event listener for the 'Send' button
document.getElementById("send-btn").addEventListener("click", function () {
    const userMessage = document.getElementById("user-message").value;

    // Display the user's message
    if (userMessage.trim()) {
        displayMessage(userMessage, "user");
        document.getElementById("user-message").value = "";

        // Get chatbot's response and display it
        const botResponse = getChatbotResponse(userMessage);
        displayMessage(botResponse, "bot");
    }
});

// Optional: Handle enter key for sending message
document.getElementById("user-message").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        document.getElementById("send-btn").click();
    }
});

// Function to open the chatbot
function openChatbox() {
    document.getElementById("chatbox").style.display = "block";
    document.getElementById("chatbot-icon").style.display = "none";
}

// Function to close the chatbot
document.getElementById("close-btn").addEventListener("click", function () {
    document.getElementById("chatbox").style.display = "none";
    document.getElementById("chatbot-icon").style.display = "block";
});