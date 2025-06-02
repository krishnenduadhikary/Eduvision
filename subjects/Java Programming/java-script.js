fetch("java-topics.json")
  .then(response => response.json())
  .then(data => {
    document.getElementById("main-title").textContent = data.title;
    document.getElementById("subtitle").textContent = data.subtitle;

    const container = document.getElementById("topics-container");

    data.topics.forEach((topic, idx) => {
      const card = document.createElement("div");
      card.className = "topic-card";

      card.innerHTML = `
        <div class="topic-title">${topic.title}</div>
        <div class="topic-desc">${topic.description}</div>
        <div class="resource-buttons">
          ${topic.resources.map(resource => `<button>${resource}</button>`).join("")}
          <a href="Topics/topic-${idx + 1}.html"><button class="explore-btn">Explore</button></a>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error loading Java Programming topics:", error);
  });
