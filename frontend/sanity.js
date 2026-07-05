const PROJECT_ID = "dv11kdik";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const query = encodeURIComponent(`
*[_type == "book"]{
  title,
  author,
  price,
  description,
  "cover": cover.asset->url
}
`);

const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`;

async function loadBooks() {
  const res = await fetch(url);
  const data = await res.json();

  const container = document.getElementById("booksContainer");
  container.innerHTML = "";

  data.result.forEach(book => {

    container.innerHTML += `
      <div class="book-card">

        <img src="${book.cover || 'https://via.placeholder.com/300x400'}">

        <div class="book-content">
          <h3>${book.title}</h3>
          <p>${book.author || "Unknown"}</p>
          <p class="price">UGX ${book.price}</p>

          <button onclick="payWithPesapal('${book.title}', ${book.price})">
            Buy Now
          </button>
        </div>

      </div>
    `;
  });
}

loadBooks();