fetch("dl-topics.json")
  .then(response => response.json())
  .then(data => {
    document.getElementById("main-title").textContent = data.title;
    document.getElementById("subtitle").textContent = data.subtitle;

    const container = document.getElementById("topics-container");

    data.topics.forEach((topic, idx) => {
      const card = document.createElement("div");
      card.className = "topic-card";

      // Card Number Badge
      const badge = document.createElement("div");
      badge.className = "card-number-badge";
      badge.textContent = idx + 1;
      card.appendChild(badge);

      // Topic Title
      const title = document.createElement("div");
      title.className = "topic-title";
      title.textContent = topic.title;
      card.appendChild(title);

      // Topic Description
      const desc = document.createElement("div");
      desc.className = "topic-desc";
      desc.textContent = topic.description;
      card.appendChild(desc);

      // Subtopics (if present)
      if (topic.subtopics && Array.isArray(topic.subtopics) && topic.subtopics.length > 0) {
        const subtopicList = document.createElement("ul");
        subtopicList.style.margin = "8px 0 10px 0";
        subtopicList.style.paddingLeft = "18px";
        subtopicList.style.fontSize = "13px";
        subtopicList.style.color = "#555";
        topic.subtopics.forEach(sub => {
          const li = document.createElement("li");
          li.textContent = sub;
          subtopicList.appendChild(li);
        });
        card.appendChild(subtopicList);
      }

      // Explore Button
      const exploreBtn = document.createElement("button");
      exploreBtn.className = "explore-btn";
      exploreBtn.innerHTML = `
        <span>Explore</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            d="M5 12h14M13 6l6 6-6 6"/>
        </svg>
      `;
      exploreBtn.onclick = () => {
        window.location.href = `Topics/topic-${idx + 1}.html`;
      };
      card.appendChild(exploreBtn);

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error loading DLD topics:", error);
  });
