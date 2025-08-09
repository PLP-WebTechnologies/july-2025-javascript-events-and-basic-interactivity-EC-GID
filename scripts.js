// Wait for the DOM to load completely
document.addEventListener('DOMContentLoaded', function() {

    // === EVENT HANDLING FOR BUTTONS, INPUTS, AND LINKS ===
    
    // Handle form submission
    var form = document.getElementById('research-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        validateForm(); // Call custom validation function
    });
    
    // Handle reset button
    var resetBtn = document.getElementById('reset-btn');
    resetBtn.addEventListener('click', function() {
        clearErrors(); // Clear all error messages
    });
    
    // Handle theme toggle button
    var themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Handle add task button for progress tracker
    var addTaskBtn = document.getElementById('add-task');
    var newTaskInput = document.getElementById('new-task');
    addTaskBtn.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Handle delete task buttons (using event delegation)
    var taskList = document.getElementById('task-list');
    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-task')) {
            e.target.parentElement.remove();
        }
    });
    
    // === CUSTOM FORM VALIDATION FUNCTION ===
    
    function validateForm() {
        // Get all form elements
        var fname = document.getElementById('fname').value;
        var lname = document.getElementById('lname').value;
        var email = document.getElementById('email').value;
        var topic = document.getElementById('research-topic').value;
        var field = document.getElementById('field').value;
        var message = document.getElementById('message').value;
        var agree = document.getElementById('agree').checked;
        
        // Clear previous errors
        clearErrors();
        
        // Validation flags
        var isValid = true;
        
        // First name validation
        if (fname.trim() === '') {
            showError('fname-error', 'First name is required');
            isValid = false;
        } else if (fname.length < 2) {
            showError('fname-error', 'First name must be at least 2 characters');
            isValid = false;
        }
        
        // Last name validation
        if (lname.trim() === '') {
            showError('lname-error', 'Last name is required');
            isValid = false;
        } else if (lname.length < 2) {
            showError('lname-error', 'Last name must be at least 2 characters');
            isValid = false;
        }
        
        // Email validation
        if (email.trim() === '') {
            showError('email-error', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email-error', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Research topic validation
        if (topic.trim() === '') {
            showError('topic-error', 'Research topic is required');
            isValid = false;
        } else if (topic.length < 5) {
            showError('topic-error', 'Research topic must be at least 5 characters');
            isValid = false;
        }
        
        // Field selection validation
        if (field === '') {
            showError('field-error', 'Please select a field of interest');
            isValid = false;
        }
        
        // Message validation
        if (message.trim() === '') {
            showError('message-error', 'Message is required');
            isValid = false;
        } else if (message.length < 20) {
            showError('message-error', 'Message must be at least 20 characters');
            isValid = false;
        }
        
        // Agreement validation
        if (!agree) {
            showError('agree-error', 'You must confirm this is for academic collaboration');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            alert('Form submitted successfully! Thank you for your collaboration request.');
            form.reset(); // Reset the form
        }
        
        return isValid;
    }
    
    // Helper function to show error messages
    function showError(elementId, message) {
        document.getElementById(elementId).textContent = message;
    }
    
    // Helper function to clear all error messages
    function clearErrors() {
        var errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(function(element) {
            element.textContent = '';
        });
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // === INTERACTIVE FEATURE 1: THEME TOGGLE ===
    
    function toggleTheme() {
        var body = document.body;
        body.classList.toggle('dark-theme');
        
        // Change button text based on current theme
        if (body.classList.contains('dark-theme')) {
            themeToggle.textContent = 'Light Theme';
        } else {
            themeToggle.textContent = 'Dark Theme';
        }
    }
    
    // === INTERACTIVE FEATURE 2: PROGRESS TRACKER ===
    
    function addTask() {
        var taskInput = document.getElementById('new-task');
        var taskText = taskInput.value.trim();
        
        // Check if task text is not empty
        if (taskText !== '') {
            // Create new list item
            var li = document.createElement('li');
            li.className = 'task-item';
            
            // Create task text span
            var taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;
            
            // Create delete button
            var deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-task';
            deleteBtn.textContent = 'Delete';
            
            // Add elements to list item
            li.appendChild(taskSpan);
            li.appendChild(deleteBtn);
            
            // Add to task list
            document.getElementById('task-list').appendChild(li);
            
            // Clear input
            taskInput.value = '';
        } else {
            alert('Please enter a task!');
        }
    }
    
    // === ADDITIONAL INTERACTIVE ELEMENTS ===
    
    // Add hover effects to hobby items
    var hobbyItems = document.querySelectorAll('#hobbies-list li');
    hobbyItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#788a81';
            this.style.cursor = 'pointer';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
});