fetch("compiler-design-topics.json")
  .then(response => response.json())
  .then(data => {
    document.getElementById("main-title").textContent = data.title;
    document.getElementById("subtitle").textContent = data.subtitle;

    const container = document.getElementById("topics-container");

    data.topics.forEach((topic, index) => {
      const card = document.createElement("div");
      card.className = "topic-card";

      card.innerHTML = `
        <div class="topic-title">${topic.title}</div>
        <div class="topic-desc">${topic.description}</div>
        <div class="resource-buttons">
          ${topic.resources.map(resource => `<button>${resource}</button>`).join("")}
          <button onclick="location.href='Topics/topic-${index + 1}.html'">Explore</button>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error loading Compiler Design topics:", error);
  });
