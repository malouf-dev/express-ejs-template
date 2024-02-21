const promo_video = document.getElementById('promo-video');
const volume_button = document.getElementById('volume-button');

volume_button.onclick = function() {
    volume_button.classList.toggle('active');
    promo_video.muted = (!volume_button.classList.contains('active'));
};