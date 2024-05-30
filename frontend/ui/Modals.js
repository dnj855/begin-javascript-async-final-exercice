export const openModal = (modal) => {
  modal.style.display = "block";
  const closeButton = modal.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    closeModal(modal);
  });
};

export const closeModal = (modal) => {
  modal.style.display = "none";
};
