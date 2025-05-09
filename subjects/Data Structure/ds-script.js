fetch("ds-topics.json")
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    document.getElementById("main-title").textContent = data.title;
    document.getElementById("subtitle").textContent = data.subtitle;

    const container = document.getElementById("topics-container");
    if (!container) {
      console.error("Error: Topics container not found!");
      return;
    }

    data.topics.forEach((topic, idx) => {
      const card = document.createElement("div");
      card.className = "topic-card";

      // Card Number Badge (top-right corner)
      const cardNumberBadge = document.createElement('span');
      cardNumberBadge.className = 'card-number-badge';
      cardNumberBadge.textContent = idx + 1;
      card.appendChild(cardNumberBadge);

      // Topic Icon
      const topicIcon = document.createElement('div');
      topicIcon.className = 'topic-icon';
      topicIcon.innerHTML = `
        <div class="icon-graphic"></div>`;
      card.appendChild(topicIcon);

      // Topic Title
      const topicTitle = document.createElement('h3');
      topicTitle.className = 'topic-title';
      topicTitle.textContent = topic.title;
      card.appendChild(topicTitle);

      // Topic Description
      const topicDesc = document.createElement('p');
      topicDesc.className = 'topic-desc';
      topicDesc.textContent = topic.description;
      card.appendChild(topicDesc);

      // Topic Resources (skip common ones)
      if (topic.resources && topic.resources.length > 0) {
        const resourcesContainer = document.createElement('div');
        resourcesContainer.className = 'topic-resources';
        topic.resources
          .filter(resourceText =>
            !["Diagram", "Notes", "Examples", "Video", "Videos", "Practice"].includes(resourceText)
          )
          .forEach(resourceText => {
            const resourceTag = document.createElement('span');
            resourceTag.className = 'resource-tag';
            resourceTag.textContent = resourceText;
            resourcesContainer.appendChild(resourceTag);
          });
        if (resourcesContainer.childNodes.length > 0) {
          card.appendChild(resourcesContainer);
        }
      }

      // Explore Button
      const exploreButton = document.createElement('button');
      exploreButton.className = 'explore-btn';
      exploreButton.setAttribute('aria-label', `Explore ${topic.title}`);
      exploreButton.innerHTML = `
        <span>Explore</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
        </svg>`;
      exploreButton.addEventListener('click', () => {
        window.location.href = `Topics/topic-${idx + 1}.html`;
      });
      card.appendChild(exploreButton);

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Failed to load or process topics:", err);
    const container = document.getElementById("topics-container");
    if (container) {
      container.innerHTML = "<p style='color: red; text-align: center;'>Sorry, we couldn't load the topics. Please try refreshing the page.</p>";
    }
  });
