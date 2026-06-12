async function loadPosts() {
    try {
        const response = await fetch('./data/posts.json');
        const posts = await response.json();

        const container = document.getElementById('posts-container');

        container.innerHTML = posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(post => `
                <article class="post-card">
                    <h2>${post.title}</h2>
                    <p>${post.description}</p>
                    <small>${post.date}</small>

                    <br><br>

                    <a href="post.html?slug=${post.slug}">
                        Read Article →
                    </a>
                </article>
            `)
            .join('');

    } catch (error) {
        console.error(error);

        document.getElementById('posts-container').innerHTML = `
            <p>Failed to load posts.</p>
        `;
    }
}

loadPosts();