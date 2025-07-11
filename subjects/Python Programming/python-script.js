fetch("python-topics.json")
  .then(res => res.json())
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
          ${topic.resources.map(res => `<button>${res}</button>`).join("")}
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error("Failed to load topics:", err));
