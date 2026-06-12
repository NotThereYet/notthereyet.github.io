async function loadPost() {

    const params = new URLSearchParams(window.location.search);

    const slug = params.get("slug");

    if (!slug) {
        document.getElementById("post").innerHTML =
            "<h1>Post not found</h1>";
        return;
    }

    try {

        const response = await fetch(`./posts/${slug}.md`);

        if (!response.ok) {
            throw new Error("Article not found");
        }

        const markdown = await response.text();

        const html = marked.parse(markdown);

        document.getElementById("post").innerHTML = html;

    } catch (error) {

        console.error(error);

        document.getElementById("post").innerHTML = `
            <h1>404</h1>
            <p>Article not found.</p>
        `;
    }
}

loadPost();