fetch("ai-topics.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    document.getElementById("main-title").textContent = data.title;
    document.getElementById("subtitle").textContent = data.subtitle;

    const container = document.getElementById("topics-container");
    if (!container) {
        console.error("Error: topics-container not found in the DOM.");
        return;
    }

    data.topics.forEach((topic, idx) => {
      const card = document.createElement("div");
      card.className = "topic-card";

      // The --clr variable is used by the button's CSS for its theme color
      const buttonColor = "#7808d0"; 

      card.innerHTML = `
        <div class="topic-title">${topic.title}</div>
        <div class="topic-desc">${topic.description}</div>
        <div class="resource-buttons">
          <button class="button" style="--clr: ${buttonColor};" data-topic-index="${idx + 1}">
            <span class="button__icon-wrapper">
              <svg class="button__icon-svg" width="10" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
              </svg>
              <svg class="button__icon-svg button__icon-svg--copy" width="10" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
              </svg>
            </span>
            Explore
          </button>
        </div>
      `;
      container.appendChild(card);
    });

    // Add click event listeners to all Explore buttons
    container.querySelectorAll('.button[data-topic-index]').forEach(btn => {
      btn.addEventListener('click', function() {
        const topicIdx = this.getAttribute('data-topic-index');
        window.location.href = `Topics/topic-${topicIdx}.html`;
      });
    });
  })
  .catch(error => {
    console.error("Error loading AI topics:", error);
    const container = document.getElementById("topics-container");
    if (container) {
        container.innerHTML = "<p style='color: red;'>Could not load AI topics. Please try again later.</p>";
    }
  });