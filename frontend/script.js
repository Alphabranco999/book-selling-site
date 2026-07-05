const PROJECT_ID = "dv11kdik";
const DATASET = "production";
const API_VERSION = "2025-01-01";

// ONLY AVAILABLE BOOKS
const query = encodeURIComponent(`
  *[_type == "book" && status == "available"]{
    title,
    author,
    price,
    description,
    "cover": cover.asset->url,
    "pdf": pdf.asset->url
  }
`);

const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`;

async function loadBooks() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const booksContainer = document.getElementById("booksContainer");

    booksContainer.innerHTML = "";

    data.result.forEach(book => {
      booksContainer.innerHTML += `
        <div class="book-card">
          <img src="${book.cover}" alt="${book.title}">
          <div class="book-content">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author || "Unknown"}</p>
            <p>${book.description || ""}</p>
            <p class="price">UGX ${book.price}</p>
            <button onclick="buyBook('${book.pdf}')">Buy Now</button>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error loading books:", error);
  }
}

function buyBook(pdfUrl) {
  alert("Payment system will be added next. After payment, PDF will be unlocked.");
}

loadBooks();