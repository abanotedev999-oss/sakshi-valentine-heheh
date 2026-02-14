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
  // Stages
  stage: 'START' | 'ASK' | 'REASONS' | 'MEMORIES' | 'FINAL' = 'START';
  
  // --- TIMER SETTINGS (UPDATED) ---
  startDate = new Date('2021-10-28'); // Your date: Oct 28, 2021 (4 years!)
  timeTogether: any = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  timerInterval: any;

  // --- MOUSE TRAIL VARIABLES ---
  trailHearts: any[] = [];

  // --- CONFETTI VARIABLES ---
  confettiPieces: any[] = [];

  // --- BUTTON VARIABLES ---
  noBtnStyle: any = { position: 'static' };
  noBtnText = "No 💔";
  yesScale = 1;
  noTexts = ["No? 🥺", "Don't do this!", "Think again!", "I'll cry...", "Pretty please?", "Last chance!", "You can't catch me! 🏃‍♂️"];

  // --- REASONS LIST ---
  currentReasonIndex = 0;
  reasons = [
    "Because you have the cutest smile I have ever seen. 😊",
    "Because you make my bad days disappear just by being there. ☁️",
    "Because you are beautiful, smart, and kind. 🎁",
    "Because I love the way your eyes light up when you're happy. ✨",
    "Because even doing nothing with you feels like everything. 🛋️",
    "Because you are my best friend and my favorite person. 👫"
  ];

  // --- PHOTOS LIST ---
  // ... inside AppComponent class ...

  // PHOTOS LIST (Updated for your specific pics!)
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

  // ... rest of the code ...

  // --- BACKGROUND ICONS ---
  floatingElements: any[] = [];

  ngOnInit() {
    this.createFloatingElements();
    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  // --- MOUSE TRAIL LOGIC (NEW!) ---
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    // Only spawn a heart occasionally (every ~5th frame) to keep it fast
    if (Math.random() > 0.85) {
      const heart = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random() // Unique ID
      };
      this.trailHearts.push(heart);

      // Remove heart after 1 second
      setTimeout(() => {
        this.trailHearts = this.trailHearts.filter(h => h.id !== heart.id);
      }, 1000);
    }
  }

  // --- TIMER LOGIC ---
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

  // --- GAMEPLAY FLOW ---
  startApp() { this.stage = 'ASK'; }

  moveNoButton() {
    this.yesScale += 0.2;
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    this.noBtnStyle = { position: 'absolute', left: `${x}px`, top: `${y}px`, transition: 'all 0.2s ease-out' };
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

  // --- VISUALS ---
  createFloatingElements() {
    const icons = ['❤️', '🌸', '💖', '💌', '🧸', '✨'];
    for (let i = 0; i < 30; i++) {
      this.floatingElements.push({
        left: Math.random() * 100 + 'vw',
        animationDuration: Math.random() * 5 + 6 + 's',
        delay: Math.random() * 5 + 's',
        icon: icons[Math.floor(Math.random() * icons.length)],
        size: Math.random() * 2 + 1 + 'rem',
        opacity: Math.random() * 0.6 + 0.2
      });
    }
  }

  triggerConfetti() {
    const emojis = ['🧸', '❤️', '💖', '😍', '💕', '🌹', '✨', '😻', '💝', '🍫', '🍭'];
    for (let i = 0; i < 150; i++) {
      this.confettiPieces.push({
        left: Math.random() * 100 + 'vw',
        animationDelay: Math.random() * 2 + 's',
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        style: {
          left: Math.random() * 100 + 'vw',
          animationDuration: (Math.random() * 3 + 2) + 's',
          fontSize: (Math.random() * 20 + 20) + 'px'
        }
      });
    }
  }
}