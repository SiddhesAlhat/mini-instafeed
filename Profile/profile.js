document.getElementById('img-upload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(ev) {
      document.getElementById('profile-img').src = ev.target.result;
    }
    reader.readAsDataURL(file);
    // TODO: Also send the image to your backend (via fetch/AJAX)
  }
});

function saveProfile() {
  const bio = document.getElementById('profile-bio').value;
  // TODO: Send bio and image to Spring Boot backend (example fetch)
  // fetch('/api/profile', {...})
  alert('Profile saved!');
}
