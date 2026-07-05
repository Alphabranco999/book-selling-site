const PROJECT_ID = "dv11kdik";
const DATASET = "production";
const API_VERSION = "2025-01-01";

// FETCH ONLY COMING SOON BOOKS
const query = encodeURIComponent(`
  *[_type == "book" && status == "coming-soon"]{
    title,
    author,
    price,
    description,
    "cover": cover.asset->url
  }
`);

const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`;

// LOAD BOOKS INTO PAGE
async function loadBooks() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const container = document.getElementById("comingSoonContainer");

    if (!container) {
      console.error("comingSoonContainer not found in HTML");
      return;
    }

    container.innerHTML = "";

    if (!data.result || data.result.length === 0) {
      container.innerHTML = "<p>No coming soon books yet.</p>";
      return;
    }

    data.result.forEach(book => {

      // ✅ FIX: fallback image
      const coverImage = book.cover 
        ? book.cover 
        : "https://via.placeholder.com/300x400?text=No+Cover";

      container.innerHTML += `
        <div class="book-box">

          <div class="cover">
            <img src="${coverImage}" alt="${book.title}">
          </div>

          <h3>${book.title}</h3>

          <p>${book.author || "Unknown Author"}</p>

          <p>${book.description || ""}</p>

          <p class="price">UGX ${book.price}</p>

          <button disabled>Coming Soon</button>

        </div>
      `;
    });

  } catch (error) {
    console.error("Error loading coming soon books:", error);
  }
}

loadBooks();