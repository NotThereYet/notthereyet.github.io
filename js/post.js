const TAG_LABELS = {
    reflexao: "Reflexão",
    aprendizado: "Aprendizado",
    recomeço: "Recomeço",
    vida: "Vida"
};

function formatDate(dateStr) {
    const date = new Date(dateStr + "T12:00:00");
    return date.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function estimateReadingTime(text) {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min de leitura`;
}

function showError(message) {
    document.title = "Artigo não encontrado — NotThereYet";
    document.getElementById("post").innerHTML = `
        <div class="error-state">
            <h2 style="font-family: var(--font-serif); margin-bottom: 0.75rem;">${message}</h2>
            <p><a href="./">← Voltar ao início</a></p>
        </div>
    `;
}

function setPageMeta(post) {
    document.title = `${post.title} — NotThereYet`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = post.description;
}

function renderHeader(post, readingTime) {
    const header = document.getElementById("post-header");
    const tagEl = document.getElementById("post-tag");
    const dateEl = document.getElementById("post-date");
    const readingEl = document.getElementById("post-reading");
    const titleEl = document.getElementById("post-title");
    const descEl = document.getElementById("post-description");

    tagEl.textContent = TAG_LABELS[post.tag] || post.tag;
    dateEl.textContent = formatDate(post.date);
    dateEl.dateTime = post.date;
    readingEl.textContent = readingTime;
    titleEl.textContent = post.title;
    descEl.textContent = post.description;

    header.hidden = false;
}

async function loadPost() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");

    if (!slug) {
        showError("Artigo não encontrado");
        return;
    }

    try {
        const [postsRes, mdRes] = await Promise.all([
            fetch("data/posts.json"),
            fetch(`posts/${slug}.md`)
        ]);

        if (!mdRes.ok) throw new Error("Artigo não encontrado");

        const posts = await postsRes.json();
        const post = posts.find(p => p.slug === slug);
        const markdown = await mdRes.text();

        const readingTime = estimateReadingTime(markdown);

        if (post) {
            setPageMeta(post);
            renderHeader(post, readingTime);
        } else {
            document.title = `${slug} — NotThereYet`;
        }

        marked.setOptions({ breaks: true, gfm: true });
        document.getElementById("post").innerHTML = marked.parse(markdown);

    } catch (error) {
        console.error(error);
        showError("Artigo não encontrado");
    }
}

loadPost();
