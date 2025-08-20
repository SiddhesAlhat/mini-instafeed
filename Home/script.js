function likePost(button) {
  const likesText = button.closest('.post-card').querySelector('.likes-count');
  const count = parseInt(likesText.innerText) || 0;
  const newCount = count + 1;
  likesText.innerText = `${newCount} likes`;
}