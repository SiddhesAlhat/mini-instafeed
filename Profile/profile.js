document.addEventListener('DOMContentLoaded', function() {
  // Image upload functionality
  document.getElementById('img-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = function(ev) {
        const img = document.getElementById('profile-img');
        img.src = ev.target.result;
        
        // Add loading animation
        img.style.opacity = '0.5';
        img.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
          img.style.transition = 'all 0.3s ease';
        }, 300);
      }
      reader.readAsDataURL(file);
      
      // TODO: Send the image to your backend
      // uploadImage(file);
    }
  });

  // Profile form submission
  const profileForm = document.querySelector('.profile-form');
  profileForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      username: document.getElementById('profile-username-input').value,
      email: document.getElementById('profile-email-input').value,
      bio: document.getElementById('profile-bio').value,
      skills: document.getElementById('profile-skills').value,
      location: document.getElementById('profile-location').value
    };
    
    // Validate form
    if (!formData.username || !formData.email) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    // Show loading state
    const saveBtn = document.querySelector('.save-btn');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      // Update profile display
      updateProfileDisplay(formData);
      
      // Show success message
      showNotification('Profile updated successfully!', 'success');
      
      // Reset button
      saveBtn.textContent = 'Saved!';
      saveBtn.style.background = 'var(--success-gradient)';
      
      setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
        saveBtn.style.background = 'var(--primary-gradient)';
      }, 2000);
      
      // TODO: Send to backend
      // saveProfileToBackend(formData);
    }, 1500);
  });

  // Add interactive animations
  addAnimations();
  
  // Initialize profile stats with animation
  animateStats();
});

function updateProfileDisplay(data) {
  document.getElementById('profile-username').textContent = data.username;
  document.getElementById('profile-email').textContent = data.email;
  document.getElementById('profile-bio-text').textContent = data.bio;
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? 'var(--success-gradient)' : type === 'error' ? 'var(--secondary-gradient)' : 'var(--primary-gradient)'};
    color: white;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-primary);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

function addAnimations() {
  // Animate cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  const cards = document.querySelectorAll('.edit-card, .activity-card, .posts-section');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
}

function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const finalValue = stat.textContent;
    const isK = finalValue.includes('k');
    const numericValue = parseInt(finalValue.replace('k', ''));
    
    stat.textContent = '0';
    
    let currentValue = 0;
    const increment = numericValue / 50;
    
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= numericValue) {
        stat.textContent = isK ? numericValue + 'k' : numericValue.toString();
        clearInterval(timer);
      } else {
        stat.textContent = isK ? Math.floor(currentValue) + 'k' : Math.floor(currentValue).toString();
      }
    }, 30);
  });
}

// Add hover effects to post items
document.addEventListener('DOMContentLoaded', function() {
  const postItems = document.querySelectorAll('.post-item');
  postItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });
  
  // Add click handler for add post
  const addPost = document.querySelector('.add-post');
  if (addPost) {
    addPost.addEventListener('click', function() {
      showNotification('Redirecting to create post...', 'info');
      setTimeout(() => {
        window.location.href = '../CodeIn/create-post.html';
      }, 1000);
    });
  }
});
