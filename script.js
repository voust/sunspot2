const postsContainer = document.getElementById('posts');
const postForm = document.getElementById('post-form');
const postContent = document.getElementById('post-content');

// Load existing posts (if any) from local storage
let posts = JSON.parse(localStorage.getItem('posts')) || [];
displayPosts();

// Handle form submission
postForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newPost = {
    content: postContent.value,
    timestamp: Date.now()
  };

  posts.push(newPost);
  localStorage.setItem('posts', JSON.stringify(posts));
  displayPosts();
  postContent.value = ''; // Clear the input field
});

// Function to display posts
function displayPosts() {
  postsContainer.innerHTML = ''; // Clear existing posts

  posts.forEach((post) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <p>${post.content}</p>
      <p class="timestamp">${new Date(post.timestamp).toLocaleString()}</p>
    `;
    postsContainer.appendChild(postElement);
  });
}
