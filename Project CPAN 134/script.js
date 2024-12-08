const toggleButton = document.getElementById('toggleButton');
const linksContainer = document.getElementById('linksContainer');

toggleButton.addEventListener('click', () => {
    if (linksContainer.style.display === 'none'){
        linksContainer.style.display = 'block'; //shows links
        toggleButton.textContent = 'Hide Links'; //changes  button text
    } else {
        linksContainer.style.display = 'none'; //hides links
        toggleButton.textContent = 'Show Links'; // reset button
    }
})