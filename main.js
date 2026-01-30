const audioFiles = [
	"AIN'T NO WAY.mp3",
	"anatomy lesson.mp3",
	"banned from twitch.mp3",
	"bazinga (1).mp3",
	"bazinga (2).mp3",
	"bazinga (3).mp3",
	"bazinga (4).mp3",
	"bazinga (5).mp3",
	"bazinga (6).mp3",
	"bombs (1).mp3",
	"bombs (2).mp3",
	"Borat my wife.mp3",
	"bozo (1).mp3",
	"bozo (2).mp3",
	"busting a nut.mp3",
	"chat giggling.mp3",
	"Clench my ass.mp3",
	"cocka.mp3",
	"Come on mario.mp3",
	"crushed by king whomp.mp3",
	"edging.mp3",
	"eheh.mp3",
	"FRIENDS ross.mp3",
	"fuck a fan canceled (1).mp3",
	"fuck a fan canceled (2).mp3",
	"fuck a fan is back on (1).mp3",
	"fuck a fan is back on (2).mp3",
	"fun on the internet.mp3",
	"goated (1).mp3",
	"goated (2).mp3",
	"GULP.mp3",
	"I am going to cum.mp3",
	"I fuck with you heavy (1).mp3",
	"I fuck with you heavy (2).mp3",
	"I fuck with you heavy (3).mp3",
	"I'm-a going to cum.mp3",
	"IRS.mp3",
	"Jerma confirms Squeex is awesome.mp3",
	"JOI.wav",
	"kiss.mp3",
	"koopas (1).mp3",
	"koopas (2).mp3",
	"koopas (3).mp3",
	"kramer jerry.mp3",
	"late_night_squeexin.mp3",
	"let's go brandon.mp3",
	"let's go brandon (2).mp3",
	"Make your bed in the morning (1).mp3",
	"Make your bed in the morning (2).mp3",
	"marker bit eraser.mp3",
	"marker bit.mp3",
	"master gave dobby a sock.mp3",
	"meow.mp3",
	"might be wondering (1).mp3",
	"might be wondering (2).mp3",
	"might be wondering (3).mp3",
	"minecraft punching trees.mp3",
	"minecraft villager.mp3",
	"More at 7 (1).mp3",
	"More at 7 (2).mp3",
	"More at 7 (3).mp3",
	"More at 7 (4).mp3",
	"More at 7 (5).mp3",
	"nightmare.mp3",
	"no cap.mp3",
	"obama sasha malia (1).mp3",
	"obama sasha malia (2).mp3",
	"obama stimulate your economy.mp3",
	"obama y'know.mp3",
	"ohoh.mp3",
	"pamplemousse.mp3",
	"pirate ain't no way.mp3",
	"pirate oh the huge manatee.mp3",
	"pirate oh the misery.mp3",
	"quieres.mp3",
	"right behind me (1).mp3",
	"right behind me (2).mp3",
	"rock hard for whomps.mp3",
	"SAJ.mp3",
	"seinfeld kramer (1).mp3",
	"seinfeld kramer (2).mp3",
	"seinfeld speed walking.mp3",
	"seinfeld what's up with that.mp3",
	"sheesh (1).mp3",
	"sheesh (2).mp3",
	"show us your pants.mp3",
	"Spongebob O sounds.mp3",
	"squeex discovers the soundboard.mp3",
	"Squeex play minecwaf.mp3",
	"Star Wars exsqueeze me.mp3",
	"Star Wars roger roger.mp3",
	"Stardew valley harvesting berries.mp3",
	"testicles.mp3",
	"Thanks for the head.mp3",
	"that just happened (1).mp3",
	"that just happened (2).mp3",
	"This goes out to all the believers.mp3",
	"This is BBC news.mp3",
	"This is my fucking nightmare.mp3",
	"Toad awawawawa.mp3",
	"toomyah.mp3",
	"walkin (1).mp3",
	"walkin (2).mp3",
	"walkin (3).mp3",
	"Wanna go for a ride jump on my hog.mp3",
	"watch me cum.mp3",
	"welcome-2-the-kitty-litter.mp3",
	"well gary (1).mp3",
	"well gary (2).mp3",
	"well gary (3).mp3",
	"well gary (4).mp3",
	"witch A.mp3",
	"witch CINNA.mp3",
	"yoda mmm.mp3",
	"yoshi (1).mp3",
	"yoshi (2).mp3",
	"yoshi (3).mp3",
	"zany life.mp3",
	"zoop zoop zoop.mp3",
];

const CONTAINER = document.getElementById('list-container');
const TEMPLATE = document.getElementById('template');
const AUDIO_DIR = 'audio';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function drawWaveform(canvas, audioBuffer, color) {
	const ctx = canvas.getContext('2d');
	const width = canvas.width;
	const height = canvas.height;
	const data = audioBuffer.getChannelData(0);

	const step = Math.ceil(data.length / width);
	const amp = height / 2;

	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = color;

	for (let i = 0; i < width; i++) {
		let min = 1.0, max = -1.0;
		for (let j = 0; j < step; j++) {
			const datum = data[(i * step) + j];
			if (datum < min) min = datum;
			if (datum > max) max = datum;
		}
		const barHeight = Math.max(2, (max - min) * amp);
		const y = (1 + min) * amp;
		ctx.fillRect(i, y, 1, barHeight);
	}
}

audioFiles.forEach(filename => {
	const node = TEMPLATE.content.cloneNode(true).firstElementChild;

	const label = node.querySelector('.label');
	const audio = node.querySelector('audio');
	const source = node.querySelector('source');

	const waveWrap = document.createElement('div');
	waveWrap.className = 'waveform-wrap';

	const waveform = document.createElement('canvas');
	waveform.className = 'waveform';
	waveform.width = 200;
	waveform.height = 50;

	const progressOverlay = document.createElement('div');
	progressOverlay.className = 'progress-overlay';

	const progress = document.createElement('div');
	progress.className = 'progress';

	waveWrap.appendChild(waveform);
	waveWrap.appendChild(progressOverlay);
	waveWrap.appendChild(progress);
	node.appendChild(waveWrap);

	const originalTitle = filename.split('.')[0];
	node.dataset.clipId = originalTitle;

	let displayTitle = originalTitle;
	const dupMatch = originalTitle.match(/\s*\((\d+)\)$/);
	if (dupMatch) {
		displayTitle = originalTitle.replace(/\s*\(\d+\)$/, '');
		const dots = document.createElement('span');
		dots.className = 'dup-dots';
		dots.textContent = '•'.repeat(parseInt(dupMatch[1]));
		node.appendChild(dots);
	}
	label.textContent = displayTitle;

	const ext = filename.split('.').pop().toLowerCase();
	const type = ext === 'mp3' ? 'audio/mpeg' : ext === 'wav' ? 'audio/wav' : '';
	const filePath = AUDIO_DIR + '/' + encodeURIComponent(filename);
	source.setAttribute('src', filePath);
	source.setAttribute('type', type);

	const duration = document.createElement('span');
	duration.className = 'duration';
	node.appendChild(duration);

	// Load and draw waveform
	fetch(filePath)
		.then(res => res.arrayBuffer())
		.then(buf => audioCtx.decodeAudioData(buf))
		.then(audioBuffer => {
			drawWaveform(waveform, audioBuffer, '#007aff');
			const secs = Math.round(audioBuffer.duration);
			const mins = Math.floor(secs / 60);
			const remainder = secs % 60;
			duration.textContent = mins > 0
				? `${mins}:${remainder.toString().padStart(2, '0')}`
				: `0:${remainder.toString().padStart(2, '0')}`;
		})
		.catch(() => {});

	let animationId = null;

	function updateProgress() {
		if (!node.classList.contains('playing')) return;

		const percent = (audio.currentTime / audio.duration) * 100;
		progress.style.width = percent + '%';
		progressOverlay.style.width = percent + '%';

		animationId = requestAnimationFrame(updateProgress);
	}

	node.startProgress = updateProgress;

	let holdTimeout = null;
	let isHolding = false;

	function stopAudio() {
		audio.pause();
		audio.currentTime = 0;
		audio.playbackRate = 1;
		node.classList.remove('playing', 'fast');
		progress.style.width = '0%';
		progressOverlay.style.width = '0%';
		cancelAnimationFrame(animationId);
		updateURL();
	}

	function startHold() {
		audioCtx.resume();
		isHolding = true;
		audio.playbackRate = 2;
		audio.play();
		node.classList.add('playing', 'fast');
		updateProgress();
		updateURL();
	}

	function endHold() {
		if (isHolding) {
			setTimeout(() => { isHolding = false; }, 10);
		}
	}

	node.addEventListener('mousedown', () => {
		holdTimeout = setTimeout(startHold, 200);
	});

	node.addEventListener('mouseup', () => {
		clearTimeout(holdTimeout);
		endHold();
	});

	node.addEventListener('mouseleave', () => {
		clearTimeout(holdTimeout);
		endHold();
	});

	node.addEventListener('touchstart', (e) => {
		holdTimeout = setTimeout(startHold, 200);
	}, { passive: true });

	node.addEventListener('touchend', () => {
		clearTimeout(holdTimeout);
		endHold();
	});

	node.addEventListener('click', () => {
		if (isHolding) return;
		audioCtx.resume();
		node.classList.remove('pending');

		if (node.classList.contains('playing')) {
			stopAudio();
		} else {
			audio.playbackRate = 1;
			audio.loop = loopEnabled;
			audio.play();
			node.classList.add('playing');
			updateProgress();
			updateURL();
		}
	});

	audio.addEventListener('ended', () => {
		audio.playbackRate = 1;
		node.classList.remove('playing', 'fast');
		progress.style.width = '0%';
		progressOverlay.style.width = '0%';
		cancelAnimationFrame(animationId);
		updateURL();
	});

	node.addEventListener('contextmenu', (e) => {
		e.preventDefault();
		showContextMenu(e.clientX, e.clientY, node, audio);
	});

	CONTAINER.appendChild(node);
});

const search = document.querySelector('input[type="search"]');
const tags = document.querySelectorAll('.tag');
const loopToggle = document.getElementById('loop-toggle');

let loopEnabled = false;

function updateURL() {
	const params = new URLSearchParams();
	if (search.value) params.set('q', search.value);
	if (loopEnabled) params.set('loop', '1');
	const playingClips = document.querySelectorAll('.audio-clip.playing');
	if (playingClips.length > 0) {
		const ids = Array.from(playingClips).map(c => c.dataset.clipId).join(',');
		params.set('play', ids);
	}

	const newURL = params.toString()
		? `${window.location.pathname}?${params}`
		: window.location.pathname;
	history.replaceState(null, '', newURL);
}

function getClipURL(clipId) {
	const params = new URLSearchParams();
	params.set('play', clipId);
	if (loopEnabled) params.set('loop', '1');
	return `${window.location.origin}${window.location.pathname}?${params}`;
}

function showToast(message) {
	const existing = document.querySelector('.toast');
	if (existing) existing.remove();

	const toast = document.createElement('div');
	toast.className = 'toast';
	toast.textContent = message;
	document.body.appendChild(toast);

	setTimeout(() => toast.classList.add('show'), 10);
	setTimeout(() => {
		toast.classList.remove('show');
		setTimeout(() => toast.remove(), 200);
	}, 1500);
}

const contextMenu = document.getElementById('context-menu');
let contextTarget = null;
let contextAudio = null;

function showContextMenu(x, y, node, audio) {
	contextTarget = node;
	contextAudio = audio;

	const isPlaying = node.classList.contains('playing');
	contextMenu.querySelector('[data-action="play"]').hidden = isPlaying;
	contextMenu.querySelector('[data-action="play2x"]').hidden = isPlaying;
	contextMenu.querySelector('[data-action="stop"]').hidden = !isPlaying;

	contextMenu.style.left = x + 'px';
	contextMenu.style.top = y + 'px';
	contextMenu.hidden = false;

	// Adjust if off-screen
	const rect = contextMenu.getBoundingClientRect();
	if (rect.right > window.innerWidth) {
		contextMenu.style.left = (x - rect.width) + 'px';
	}
	if (rect.bottom > window.innerHeight) {
		contextMenu.style.top = (y - rect.height) + 'px';
	}
}

function hideContextMenu() {
	contextMenu.hidden = true;
	contextTarget = null;
	contextAudio = null;
}

document.addEventListener('click', hideContextMenu);
document.addEventListener('contextmenu', (e) => {
	if (!e.target.closest('.audio-clip')) {
		hideContextMenu();
	}
});

contextMenu.addEventListener('click', (e) => {
	const action = e.target.dataset.action;
	if (!action || !contextTarget) return;

	if (action === 'copy') {
		const url = getClipURL(contextTarget.dataset.clipId);
		navigator.clipboard.writeText(url).then(() => {
			showToast('Link copied!');
		});
	} else if (action === 'play') {
		contextTarget.click();
	} else if (action === 'play2x') {
		audioCtx.resume();
		contextAudio.playbackRate = 2;
		contextAudio.loop = loopEnabled;
		contextAudio.play();
		contextTarget.classList.add('playing', 'fast');
		updateURL();
	} else if (action === 'stop') {
		contextTarget.click();
	}

	hideContextMenu();
});

loopToggle.addEventListener('click', () => {
	loopEnabled = !loopEnabled;
	loopToggle.classList.toggle('active', loopEnabled);

	// Update all audio elements
	document.querySelectorAll('.audio-clip audio').forEach(audio => {
		audio.loop = loopEnabled;
	});
	updateURL();
});

function filterClips() {
	const query = search.value.toLowerCase();
	const clips = document.querySelectorAll('.audio-clip');
	clips.forEach(clip => {
		const title = clip.querySelector('.label').textContent.toLowerCase();
		clip.hidden = !title.includes(query);
	});
}

search.addEventListener('input', () => {
	tags.forEach(t => t.classList.remove('active'));
	filterClips();
	updateURL();
});

tags.forEach(tag => {
	tag.addEventListener('click', () => {
		const isActive = tag.classList.contains('active');
		tags.forEach(t => t.classList.remove('active'));

		if (isActive) {
			search.value = '';
		} else {
			search.value = tag.dataset.query;
			tag.classList.add('active');
		}
		filterClips();
		updateURL();
		search.focus();
	});
});

// Restore state from URL params
const params = new URLSearchParams(window.location.search);

const qParam = params.get('q');
if (qParam) {
	search.value = qParam;
	filterClips();
	// Activate matching tag if exists
	tags.forEach(tag => {
		if (tag.dataset.query === qParam) {
			tag.classList.add('active');
		}
	});
}

const loopParam = params.get('loop');
if (loopParam === '1') {
	loopEnabled = true;
	loopToggle.classList.add('active');
}

const playParam = params.get('play');
if (playParam) {
	const clipIds = playParam.split(',');
	const clips = document.querySelectorAll('.audio-clip');
	const targets = [];

	clipIds.forEach(id => {
		const target = Array.from(clips).find(clip => {
			const clipId = clip.dataset.clipId.toLowerCase();
			return clipId === id.toLowerCase() || clipId.includes(id.toLowerCase());
		});
		if (target) targets.push(target);
	});

	if (targets.length > 0) {
		targets[0].scrollIntoView({ behavior: 'smooth', block: 'center' });

		let autoplayBlocked = false;
		targets.forEach(target => {
			target.classList.add('pending');
			const audio = target.querySelector('audio');
			audioCtx.resume().then(() => {
				audio.loop = loopEnabled;
				audio.play().then(() => {
					target.classList.remove('pending');
					target.classList.add('playing');
					target.startProgress();
					updateURL();
				}).catch(() => {
					autoplayBlocked = true;
				});
			});
		});

		setTimeout(() => {
			if (autoplayBlocked) showToast('Click the clips to play');
		}, 100);
	}
}
