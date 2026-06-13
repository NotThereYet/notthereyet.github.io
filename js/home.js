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

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

async function loadPosts() {
    const container = document.getElementById("posts-container");
    const countEl = document.getElementById("posts-count");

    try {
        const response = await fetch("data/posts.json");
        if (!response.ok) throw new Error("Falha ao carregar posts");

        const posts = await response.json();
        const sorted = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (countEl) {
            countEl.textContent = `${sorted.length} ${sorted.length === 1 ? "artigo" : "artigos"}`;
        }

        if (sorted.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Nenhum artigo publicado ainda. Em breve, novas histórias por aqui.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = sorted.map(post => {
            const tag = TAG_LABELS[post.tag] || post.tag;
            return `
                <article class="post-card">
                    <div class="post-card__meta">
                        <span class="post-card__tag">${escapeHtml(tag)}</span>
                        <time class="post-card__date">${formatDate(post.date)}</time>
                        <span class="post-card__reading">${post.readingTime || ""}</span>
                    </div>
                    <h2 class="post-card__title">
                        <a href="post.html?slug=${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}</a>
                    </h2>
                    <p class="post-card__description">${escapeHtml(post.description)}</p>
                    <a class="post-card__link" href="post.html?slug=${encodeURIComponent(post.slug)}">
                        Ler artigo →
                    </a>
                </article>
            `;
        }).join("");

    } catch (error) {
        console.error(error);
        container.innerHTML = `
            <div class="error-state">
                <p>Não foi possível carregar os artigos. Tente novamente mais tarde.</p>
            </div>
        `;
    }
}

loadPosts();
