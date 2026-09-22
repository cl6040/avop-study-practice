(() => {
  const issueBaseUrl = "https://github.com/cl6040/avop-study-practice/issues/new";
  const launcher = document.querySelector("#suggestion-launcher");
  const panel = document.querySelector("#suggestion-panel");
  const closeButton = document.querySelector("#suggestion-close");
  const choicePanel = document.querySelector("#suggestion-choices");
  const form = document.querySelector("#suggestion-form");
  const kindInput = document.querySelector("#suggestion-kind");
  const questionFields = document.querySelector("#question-suggestion-fields");
  const generalFields = document.querySelector("#general-suggestion-fields");
  const conversation = document.querySelector("#suggestion-conversation");
  const status = document.querySelector("#suggestion-status");
  let selectedKind = "";

  function setPanel(open) {
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", String(open));
    if (open) closeButton.focus();
    else launcher.focus();
  }

  function addMessage(text, className) {
    const message = document.createElement("p");
    message.className = className;
    message.textContent = text;
    conversation.append(message);
  }

  function enableGroup(group, enabled) {
    group.hidden = !enabled;
    group.querySelectorAll("input, textarea").forEach((field) => { field.disabled = !enabled; });
  }

  function chooseKind(kind, initialText = "") {
    const isQuestion = kind === "question";
    selectedKind = kind;
    kindInput.value = kind;
    choicePanel.hidden = true;
    form.hidden = false;
    enableGroup(questionFields, isQuestion);
    enableGroup(generalFields, !isQuestion);
    addMessage(isQuestion ? "I want to suggest a new question." : "I have an improvement idea.", "user-message");
    addMessage(
      isQuestion
        ? "Great—include the correct answer and its source so it can be checked against the existing bank."
        : "Tell me what should change and why it would help. The owner will approve it before implementation.",
      "bot-message"
    );
    if (!isQuestion && initialText) document.querySelector("#suggested-improvement").value = initialText;
    const firstField = (isQuestion ? questionFields : generalFields).querySelector("textarea, input");
    firstField.focus();
  }

  function returnToChoices() {
    form.reset();
    selectedKind = "";
    form.hidden = true;
    choicePanel.hidden = false;
    enableGroup(questionFields, false);
    enableGroup(generalFields, false);
    status.textContent = "";
    choicePanel.querySelector("button").focus();
  }

  function questionIssue() {
    const question = document.querySelector("#suggested-question").value.trim();
    const answer = document.querySelector("#suggested-answer").value.trim();
    const choices = document.querySelector("#suggested-choices").value.trim() || "Not provided";
    const source = document.querySelector("#suggested-source").value.trim();
    return {
      title: `[Question] ${question.slice(0, 80)}`,
      body: `### Suggested question\n${question}\n\n### Correct answer\n${answer}\n\n### Other answer choices\n${choices}\n\n### Source document and page\n${source}\n\n### Submission type\nNew question for duplicate and source review.`,
    };
  }

  function generalIssue() {
    const suggestion = document.querySelector("#suggested-improvement").value.trim();
    const benefit = document.querySelector("#suggested-benefit").value.trim() || "Not provided";
    return {
      title: `[Suggestion] ${suggestion.slice(0, 75)}`,
      body: `### Suggested change\n${suggestion}\n\n### Why this would help\n${benefit}\n\n### Approval status\nPending owner approval before implementation.`,
    };
  }

  launcher.addEventListener("click", () => setPanel(panel.hidden));
  closeButton.addEventListener("click", () => setPanel(false));
  document.querySelectorAll("[data-suggestion-kind]").forEach((button) => {
    button.addEventListener("click", () => chooseKind(button.dataset.suggestionKind));
  });
  document.querySelector("#suggestion-back").addEventListener("click", returnToChoices);
  document.querySelector("#driving-suggest-open").addEventListener("click", () => {
    setPanel(true);
    if (form.hidden) chooseKind("general", "Add this Driving Exam scenario: ");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const issue = selectedKind === "question" ? questionIssue() : generalIssue();
    const issueUrl = new URL(issueBaseUrl);
    issueUrl.searchParams.set("title", issue.title);
    issueUrl.searchParams.set("body", issue.body);
    window.open(issueUrl.toString(), "_blank", "noopener,noreferrer");
    status.textContent = "Your suggestion is ready on GitHub. Sign in if needed, review it, then select Create issue.";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) setPanel(false);
  });

  enableGroup(questionFields, false);
  enableGroup(generalFields, false);
})();
