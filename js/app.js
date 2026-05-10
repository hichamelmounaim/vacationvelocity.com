document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Header Scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
  });

  // Budget Calculator
  const calcBtn = document.getElementById('calcBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', calculateBudget);
  }
});

function calculateBudget() {
  const destination = document.getElementById('destination').value;
  const days = parseInt(document.getElementById('days').value);
  const style = document.getElementById('style').value;
  const travelers = parseInt(document.getElementById('travelers').value);

  if (!days || days < 1 || !travelers || travelers < 1) {
    alert('Please enter valid days and travelers.');
    return;
  }

  // Base daily costs per person
  const regions = {
    europe: 120,
    asia: 50,
    namerica: 150,
    samerica: 60,
    africa: 80,
    oceania: 140
  };

  const multipliers = {
    budget: 0.6,
    standard: 1.0,
    luxury: 2.5
  };

  const baseCost = regions[destination];
  const styleMult = multipliers[style];
  
  const dailyPerPerson = baseCost * styleMult;
  const totalDaily = dailyPerPerson * travelers;
  
  // Breakdown
  const accommodation = totalDaily * 0.45;
  const food = totalDaily * 0.30;
  const activities = totalDaily * 0.25;
  
  const totalTrip = totalDaily * days;

  // Formatting
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  document.getElementById('totalCost').textContent = fmt.format(totalTrip);
  document.getElementById('costAcc').textContent = fmt.format(accommodation * days);
  document.getElementById('costFood').textContent = fmt.format(food * days);
  document.getElementById('costAct').textContent = fmt.format(activities * days);

  const panel = document.getElementById('resultPanel');
  panel.classList.add('show');
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}



// ============================================
// GLOBAL PREMIUM UX ENHANCEMENTS (Auto-Injected)
// ============================================

(function() {
  // 1. Override native alert with Premium Toast Notifications
  const originalAlert = window.alert;
  window.alert = function(message) {
    let toastContainer = document.getElementById('premium-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'premium-toast-container';
      toastContainer.style.cssText = 'position:fixed; bottom:30px; right:30px; z-index:99999; display:flex; flex-direction:column; gap:10px; pointer-events:none;';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.style.cssText = 'background: #ff4d4f; color: white; padding: 16px 24px; border-radius: 8px; box-shadow: 0 10px 25px rgba(255,77,79,0.4); font-family: system-ui, -apple-system, sans-serif; font-weight: 600; font-size: 14px; transform: translateX(120%); opacity: 0; transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); display: flex; align-items: center; gap: 12px; pointer-events:auto;';
    toast.innerHTML = '<span style="font-size:20px;">⚠️</span> ' + message;
    
    toastContainer.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });
    
    // Animate out and remove
    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

  // 2. Global Button Ripple Effect
  document.addEventListener('click', function(e) {
    const target = e.target.closest('button, .btn');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `position: absolute; background: rgba(255, 255, 255, 0.4); border-radius: 50%; transform: scale(0); animation: rippleAnim 0.6s linear; pointer-events: none; left: ${x}px; top: ${y}px; width: 100px; height: 100px; margin-left: -50px; margin-top: -50px;`;
    
    if(target.style.position === '') target.style.position = 'relative';
    target.style.overflow = 'hidden';
    target.appendChild(ripple);

    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.innerHTML = '@keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }';
      document.head.appendChild(style);
    }

    setTimeout(() => ripple.remove(), 600);
  });

  // 3. Smart Success Particle Animations for specific action buttons
  const triggerKeywords = ['calc', 'convert', 'gen', 'submit', 'estimate'];
  document.addEventListener('click', function(e) {
    const target = e.target.closest('button');
    if (!target) return;
    
    const id = (target.id || '').toLowerCase();
    const text = (target.textContent || '').toLowerCase();
    
    const isActionBtn = triggerKeywords.some(kw => id.includes(kw) || text.includes(kw));
    
    if (isActionBtn) {
      // Create a subtle loading state
      const originalText = target.innerHTML;
      target.style.opacity = '0.8';
      target.style.pointerEvents = 'none';
      target.innerHTML = '<span style="display:inline-block; width:14px; height:14px; border:2px solid currentColor; border-right-color:transparent; border-radius:50%; animation:spin 0.75s linear infinite; margin-right:8px; vertical-align:middle;"></span> Processing...';
      
      if (!document.getElementById('spin-style')) {
        const style = document.createElement('style');
        style.id = 'spin-style';
        style.innerHTML = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
      }

      setTimeout(() => {
        target.innerHTML = originalText;
        target.style.opacity = '1';
        target.style.pointerEvents = 'auto';
        
        // Fire particles from the button
        fireParticles(e.clientX, e.clientY);
      }, 600);
    }
  });

  function fireParticles(x, y) {
    const colors = ['#007bff', '#28a745', '#ffc107', '#17a2b8'];
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 8 + 4;
      
      particle.style.cssText = `position: fixed; left: ${x}px; top: ${y}px; width: ${size}px; height: ${size}px; background: ${color}; border-radius: 50%; pointer-events: none; z-index: 99999;`;
      document.body.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 100 + 50;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity - 50;

      particle.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
      ], {
        duration: Math.random() * 500 + 500,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        fill: 'forwards'
      });

      setTimeout(() => particle.remove(), 1000);
    }
  }
})();
