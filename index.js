const radioButtons = document.getElementsByName('options');
const wrappers = document.querySelectorAll('.checkbox-wrapper');

radioButtons.forEach((radio, index) => {
  radio.addEventListener('change', function () {
    wrappers.forEach(wrapper => {
      wrapper.style.border = '1px solid hsl(203, 41%, 72%)';
    });
    if (radio.checked) {
      wrappers[index].style.border = '1px solid hsl(61, 70%, 52%)';
    }
  });
});
