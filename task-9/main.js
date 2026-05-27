const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let originalPosts = [];

async function fetchPosts() {
    const loadingElement = document.getElementById('loading');
    const gridElement = document.getElementById('postsGrid');

    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP status error: ${response.status}`);
        }

        const posts = await response.json();
        originalPosts = posts.slice(0, 6);

        gridElement.innerHTML = originalPosts.map(post => `
            <article class="post-card">
                <span class="post-id">Post #${post.id}</span>
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
                <button class="action-btn" onclick="openPostModal(${post.id})">Read Full Post</button>
            </article>
        `).join('');

        loadingElement.style.display = 'none';
        gridElement.classList.add('loaded');

    } catch (error) {
        console.error(error);
        loadingElement.innerHTML = `
            <p style="color: #ef4444; font-weight: 600;">
                Failed to load posts. Please try refreshing again.
            </p>
        `;
    }
}

function openPostModal(postId) {
    const matchedPost = originalPosts.find(post => post.id === postId);
    if (!matchedPost) return;

    document.getElementById('modalId').textContent = `Post #${matchedPost.id}`;
    document.getElementById('modalTitle').textContent = matchedPost.title;
    document.getElementById('modalBody').textContent = matchedPost.body;
    
    document.getElementById('postModal').classList.add('open');
}

document.getElementById('closeModalBtn').addEventListener('click', () => {
    document.getElementById('postModal').classList.remove('open');
});

document.getElementById('postModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('postModal')) {
        document.getElementById('postModal').classList.remove('open');
    }
});

fetchPosts();