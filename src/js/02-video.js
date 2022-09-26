'use strict';
import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const LOCAL_STORAGE_KEY = "videoplayer-current-time";




const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function() {
    console.log('played the video!');
    });

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});
    
const onTimeUpdate = event => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(event.seconds))
    console.log(localStorage.getItem(LOCAL_STORAGE_KEY));
}

player.on('timeupdate', throttle(onTimeUpdate, 1000))


const saveData = localStorage.getItem(LOCAL_STORAGE_KEY)

player.setCurrentTime(saveData).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
