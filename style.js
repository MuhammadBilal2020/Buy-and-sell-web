document.getElementById('profileImage').addEventListener('click', ()=> {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// window.addEventListener('click', (event)=> {
//     const dropdown = document.getElementById('dropdownMenu');
//     const profileImage = document.getElementById('profileImage');
//     if (event.target !== profileImage && !profileImage.contains(event.target)) {
//         dropdown.style.display = 'none';
//     }
// });
