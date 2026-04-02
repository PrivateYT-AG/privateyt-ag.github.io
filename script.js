const dialog = document.querySelectorAll('dialog');
const showModal = document.querySelectorAll('.showModal');
const closeModal = document.querySelectorAll('.closeModal');

showModal.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.dialog;
    const dialog = document.getElementById(id);
    if (dialog) {dialog.showModal()}
  })
})

closeModal.forEach(btn => {
  btn.addEventListener('click', () => {
    const dialog = btn.closest('dialog');
    if (dialog) {
      dialog.classList.add('closing');
      setTimeout(() => {
        dialog.close();
        dialog.classList.remove('closing');
      }, 200)
    }
  })
})