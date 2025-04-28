fetch("nlp-topics.json")
  .then(response => response.json())
  .then(data => {
    document.getElementById("main-title").textContent = data.title;
    document.getElementById("subtitle").textContent = data.subtitle;

    const container = document.getElementById("topics-container");

    data.topics.forEach(topic => {
      const card = document.createElement("div");
      card.className = "topic-card";

      card.innerHTML = `
        <div class="topic-title">${topic.title}</div>
        <div class="topic-desc">${topic.description}</div>
        <div class="resource-buttons">
          ${topic.resources.map(resource => `<button>${resource}</button>`).join("")}
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error loading NLP topics:", error);
  });
