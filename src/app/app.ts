import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // --- APP STATE ---
  stage: 'START' | 'ASK' | 'REASONS' | 'MEMORIES' | 'FINAL' = 'START';
  
  // --- TIMER SETTINGS ---
  // Locked to your anniversary: October 28, 2021
  startDate = new Date('2021-10-28'); 
  timeTogether: any = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  timerInterval: any;

  // --- INTERACTIVE VISUALS ---
  trailHearts: any[] = [];
  confettiPieces: any[] = [];
  floatingElements: any[] = [];
  photoDecorations: any[] = []; // Decorative elements for the Memories stage

  // --- BUTTON MECHANICS ---
  noBtnStyle: any = { position: 'static' };
  noBtnText = "No 💔";
  yesScale = 1;
  noTexts = [
    "No? 🥺", "Don't do this!", "Think again!", "I'll cry...", 
    "Pretty please?", "Last chance!", "You can't catch me! 🏃‍♂️"
  ];

  // --- ROMANTIC CONTENT ---
  currentReasonIndex = 0;
  reasons = [
    "Because you have the cutest smile I have ever seen. 😊",
    "Because you make my bad days disappear just by being there. ☁️",
    "Because you are beautiful, smart, and kind. 🎁",
    "Because I love the way your eyes light up when you're happy. ✨",
    "Because even doing nothing with you feels like everything. 🛋️",
    "Because you are my best friend and my favorite person. 👫"
  ];

  // --- PHOTO GALLERY ---
  currentPhotoIndex = 0;
  photos = [
    { 
      url: '/assets/1.jpg', 
      caption: "You look absolutely stunning in yellow! 💛✨" 
    },
    { 
      url: '/assets/2.jpg', 
      caption: "Awww! Look at this little cutie pie 🥰🎒" 
    },
    { 
      url: '/assets/3.jpg', 
      caption: "My biker queen! Swag level: 100 😎🏍️" 
    },
    { 
      url: '/assets/4.jpg', 
      caption: "Just you, me, and a lifetime to go. 👫❤️" 
    }
  ];

  ngOnInit() {
    this.createFloatingElements();
    this.startTimer();
    this.preloadPhotos();  
    this.createPhotoDecorations();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // --- LOGIC: PRELOAD & DECORATE ---
  preloadPhotos() {
    this.photos.forEach(photo => {
      const img = new Image();
      img.src = photo.url;
    });
  }

  createPhotoDecorations() {
    const icons = ['✨', '🌸', '🧸', '☁️', '🎈', '💖'];
    for (let i = 0; i < 20; i++) {
      this.photoDecorations.push({
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        icon: icons[Math.floor(Math.random() * icons.length)],
        delay: Math.random() * 5 + 's',
        size: (Math.random() * 1.5 + 1) + 'rem'
      });
    }
  }

  // --- LOGIC: INTERACTIVE MOUSE TRAIL ---
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (Math.random() > 0.88) { // Spawn rate control
      const heart = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random()
      };
      this.trailHearts.push(heart);

      setTimeout(() => {
        this.trailHearts = this.trailHearts.filter(h => h.id !== heart.id);
      }, 1000);
    }
  }

  // --- LOGIC: TIMER ---
  startTimer() {
    this.timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const start = this.startDate.getTime();
      const diff = now - start;

      this.timeTogether = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      };
    }, 1000);
  }

  // --- NAVIGATION & FLOW ---
  startApp() { 
    this.stage = 'ASK'; 
  }

  moveNoButton() {
    this.yesScale += 0.25; // "Yes" button grows each time "No" is chased
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    this.noBtnStyle = { 
      position: 'absolute', 
      left: `${x}px`, 
      top: `${y}px`, 
      transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
    };
    this.noBtnText = this.noTexts[Math.floor(Math.random() * this.noTexts.length)];
  }

  handleYes() {
    this.triggerConfetti();
    this.stage = 'REASONS';
  }

  nextReason() {
    if (this.currentReasonIndex < this.reasons.length - 1) {
      this.currentReasonIndex++;
    } else {
      this.stage = 'MEMORIES';
    }
  }

  nextPhoto() {
    if (this.currentPhotoIndex < this.photos.length - 1) {
      this.currentPhotoIndex++;
    } else {
      this.stage = 'FINAL';
    }
  }

  // --- VISUAL GENERATORS ---
  createFloatingElements() {
    const icons = ['❤️', '🌸', '💖', '💌', '🧸', '✨'];
    for (let i = 0; i < 35; i++) {
      this.floatingElements.push({
        left: Math.random() * 100 + 'vw',
        animationDuration: (Math.random() * 4 + 6) + 's',
        delay: (Math.random() * 5) + 's',
        icon: icons[Math.floor(Math.random() * icons.length)],
        size: (Math.random() * 1.5 + 1) + 'rem',
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  triggerConfetti() {
    const emojis = ['🧸', '❤️', '💖', '😍', '💕', '🌹', '✨', '😻', '💝', '🍫', '🍭'];
    for (let i = 0; i < 150; i++) {
      this.confettiPieces.push({
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        style: {
          left: (Math.random() * 100) + 'vw',
          animationDuration: (Math.random() * 2 + 2) + 's',
          animationDelay: (Math.random() * 1.5) + 's',
          fontSize: (Math.random() * 15 + 20) + 'px'
        }
      });
    }
  }
}