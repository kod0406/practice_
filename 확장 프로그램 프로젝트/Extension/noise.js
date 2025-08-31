// noise.js - Continuous Ocean Wave Sound with Web Audio API

let audioContext;
let noiseNode, gainNode, filterNode;
let isPlaying = false;
let userVolume = 0.5; // Default volume, controlled by the user
let currentModulatedVolume = 0.2; // Current volume modulation for wave effect

// Create white noise
const createWhiteNoise = (audioContext) => {
    const bufferSize = 2 * audioContext.sampleRate;
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Fill buffer with random white noise
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const whiteNoiseNode = audioContext.createBufferSource();
    whiteNoiseNode.buffer = noiseBuffer;
    whiteNoiseNode.loop = true; // Loop the white noise for continuous sound

    return whiteNoiseNode;
};

// Initialize the audio context and create the ocean wave effect
const initAudio = async () => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create white noise node
    noiseNode = createWhiteNoise(audioContext);

    // Create a low-pass filter to smooth the noise
    filterNode = audioContext.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.value = 1000; // Adjust frequency for smoother sound

    // Create a gain node to control the volume
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0; // Start muted

    // Connect the nodes
    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
};

// Function to modulate the amplitude to mimic the wave rise and fall
const modulateWaves = () => {
    if (!isPlaying) return; // Don't modulate if not playing

    const now = audioContext.currentTime;

    // Smooth continuous gain modulation over time for seamless looping
    gainNode.gain.cancelScheduledValues(now); // Cancel any previously scheduled changes

    // Wave pattern modulation: slow rise and fall to simulate ocean waves
    currentModulatedVolume = 0.2; // Start at a lower volume
    gainNode.gain.setValueAtTime(currentModulatedVolume * userVolume, now); // Apply user volume as a multiplier
    gainNode.gain.linearRampToValueAtTime(0.6 * userVolume, now + 2); // Rise in 2 seconds, scaled by user volume
    gainNode.gain.linearRampToValueAtTime(0.2 * userVolume, now + 5); // Fall in 3 seconds, scaled by user volume

    // Update current modulated volume for setVolume function
    setTimeout(() => {
        currentModulatedVolume = 0.6; // Peak volume
    }, 2000);

    setTimeout(() => {
        currentModulatedVolume = 0.2; // Back to low volume
    }, 5000);

    // Loop modulation seamlessly
    setTimeout(modulateWaves, 5000); // Restart modulation after 5 seconds
};

// Toggle wave sound on/off
const toggleWaves = () => {
    if (!isPlaying) {
        audioContext.resume().then(() => {
            noiseNode.start();
            modulateWaves(); // Start modulating the volume like waves
        });
        isPlaying = true;
    } else {
        audioContext.suspend();
        isPlaying = false;
    }
};

// Set volume dynamically and adjust gain node immediately
const setVolume = (value) => {
    userVolume = value; // Update the global volume multiplier

    if (isPlaying && gainNode) {
        // Apply user-controlled volume immediately
        const now = audioContext.currentTime;
        gainNode.gain.cancelScheduledValues(now); // Cancel any scheduled changes
        gainNode.gain.setValueAtTime(currentModulatedVolume * userVolume, now); // Apply current volume with user adjustment

        // Restart wave modulation with new volume
        setTimeout(() => {
            modulateWaves();
        }, 100);
    }
};

// Event listeners for controls
document.getElementById('toggleNoiseBtn').addEventListener('click', toggleWaves);

document.getElementById('volumeControl').addEventListener('input', (event) => {
    const volume = parseFloat(event.target.value);
    setVolume(volume); // Set user volume instantly
});

// Initialize audio on page load
initAudio();
