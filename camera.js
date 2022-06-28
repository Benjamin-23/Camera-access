const video = document.getElementById('camera');
const clickButton = document.getElementById('capture-image');
const imageTag = document.getElementById('image')


navigator.mediaDevices.getUserMedia({video:true, audio:false }).then((stream) => {
    video.srcObject = stream;
});

clickButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video. videoHeight;

    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL();
    imageTag.src = dataUrl;
    window.electronAPI.sendImage(dataUrl);

    new Notification('imageCaptured',{
        body:"image captured from live video"
    });
}); 
// console.log(window.eletronAPI);



 
// camera_button.addEventListener('click', async ()=>{
//     let stream = navigator.mediaDevices.getUserMedia ( { video:true});
//     video.srcObject = stream;

// })
