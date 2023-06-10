// Sample card data
const cards = [
  { owner_id: "user1", type: "burner", expiry: "2025-12-30" },
  { owner_id: "user2", type: "subscription", limit: 10 },
];

let visibleCards = [];
let startIndex = 0; 

// Show cards based on the selected tab
function showCards(tab) {
  let filteredCards = cards;
  if (tab === "your") {
    const ownerId = "user1";
    filteredCards = cards.filter(card => card.owner_id === ownerId);
  } else if (tab === "blocked") {
    filteredCards = cards.filter(card => card.blocked);
  }

  visibleCards = filteredCards.slice(0, 10);
  startIndex = 10;

  renderCards(visibleCards);
}

// Render the card list
function renderCards(cards) {
  const cardList = document.getElementById("card-list");
  cardList.innerHTML = ""; // Clear previous cards

  cards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const typeElement = document.createElement("div");
    typeElement.classList.add("type");
    typeElement.innerText = card.type;
    cardElement.appendChild(typeElement);

    if (card.type === "burner") {
      const expiryElement = document.createElement("div");
      expiryElement.classList.add("expiry");
      expiryElement.innerText = `Expiry: ${card.expiry}`;
      cardElement.appendChild(expiryElement);
    } else if (card.type === "subscription") {
      const limitElement = document.createElement("div");
      limitElement.classList.add("limit");
      limitElement.innerText = `Limit: ${card.limit}`;
      cardElement.appendChild(limitElement);
    }

    cardList.appendChild(cardElement);
  });
}

// Load more cards on scroll
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    visibleCards.length < cards.length
  ) {
    const remainingCards = cards.slice(startIndex, startIndex + 10);
    visibleCards = [...visibleCards, ...remainingCards];
    startIndex += 10;
    renderCards(visibleCards);
  }
});

// Initialize with default tab
showCards("your");
