<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Click To Copy Variants</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(to bottom right, #f9fafb, #eff6ff);
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
      margin: auto;
    }
    h1 {
      text-align: center;
      font-size: 2.5rem;
      font-weight: bold;
      color: #1f2937;
    }
    p {
      text-align: center;
      color: #4b5563;
      margin-bottom: 40px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    .card {
      background: white;
      padding: 20px;
      border-radius: 16px;
      border: 1px solid #f3f4f6;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .btn {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: 0.2s;
      border: none;
      outline: none;
    }
    .btn span {
      font-size: 0.9rem;
    }
    /* Example variants */
    .simple {background:#3b82f6;color:white;padding:10px 16px;border-radius:8px;}
    .simple:hover {background:#2563eb;transform:scale(1.05);}
    
    .card-btn {background:#fff;border:2px solid #e5e7eb;padding:12px;border-radius:12px;}
    .card-btn:hover {border-color:#60a5fa;box-shadow:0 2px 6px rgba(0,0,0,0.1);}
    
    .code {background:#111827;color:#10b981;padding:8px 12px;border-radius:8px;font-family:monospace;font-size:0.85rem;}
    .code:hover {background:#1f2937;}
    
    .pill {background:#ede9fe;color:#6d28d9;padding:10px 20px;border-radius:9999px;}
    .pill:hover {background:#ddd6fe;transform:scale(1.05);}
    
    .gradient {background:linear-gradient(to right,#ec4899,#f97316);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,0.1);}
    .gradient:hover {background:linear-gradient(to right,#db2777,#ea580c);box-shadow:0 6px 12px rgba(0,0,0,0.15);}
    
    .outlined {border:2px solid #3b82f6;color:#3b82f6;padding:8px 16px;border-radius:8px;}
    .outlined:hover {background:#3b82f6;color:white;}
    
    .badge {background:#10b981;color:white;padding:4px 10px;border-radius:9999px;font-size:0.75rem;font-weight:600;}
    .badge:hover {background:#059669;transform:scale(1.05);}
    
    .neon {background:#000;color:#22d3ee;border:1px solid #22d3ee;padding:10px 16px;border-radius:8px;}
    .neon:hover {box-shadow:0 0 12px #22d3ee;color:#67e8f9;}
    
    .retro {background:#facc15;color:black;padding:10px 16px;border:4px solid black;font-weight:bold;box-shadow:4px 4px 0 black;}
    .retro:hover {box-shadow:2px 2px 0 black;}
    
    .threed {background:#ef4444;color:white;padding:12px 16px;border-radius:8px;box-shadow:0 6px 0 #b91c1c;}
    .threed:hover {transform:translateY(3px);box-shadow:0 3px 0 #b91c1c;}
    
    .animated {position:relative;background:white;color:#1f2937;padding:12px 16px;border-radius:8px;overflow:hidden;border:2px solid transparent;}
    .animated::before {content:"";position:absolute;inset:0;background:linear-gradient(to right,#8b5cf6,#ec4899);opacity:0;transition:0.3s;border-radius:8px;z-index:0;}
    .animated:hover::before {opacity:1;}
    .animated span {position:relative;z-index:1;}
    
    .copied-text {
      font-size: 0.8rem;
      color: #10b981;
      margin-top: 8px;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Click To Copy Variants</h1>
    <p>Explore 10 different styles of click-to-copy interfaces, each with unique animations and design patterns.</p>

    <div class="grid">
      <div class="card">
        <div class="label">Simple Button</div>
        <button class="btn simple" data-text="user@example.com"><span>user@example.com</span></button>
        <div class="copied-text" id="simple-copy"></div>
      </div>

      <div class="card">
        <div class="label">Card Style</div>
        <button class="btn card-btn" data-text="https://myawesome-portfolio.com"><span>myawesome-portfolio.com</span></button>
        <div class="copied-text" id="card-copy"></div>
      </div>

      <div class="card">
        <div class="label">Code Block</div>
        <button class="btn code" data-text="npm install awesome-package"><span>npm install awesome-package</span></button>
        <div class="copied-text" id="code-copy"></div>
      </div>

      <div class="card">
        <div class="label">Pill Shape</div>
        <button class="btn pill" data-text="+1 (555) 123-4567"><span>+1 (555) 123-4567</span></button>
        <div class="copied-text" id="pill-copy"></div>
      </div>

      <div class="card">
        <div class="label">Gradient Style</div>
        <button class="btn gradient" data-text="promo-code-2024"><span>promo-code-2024</span></button>
        <div class="copied-text" id="gradient-copy"></div>
      </div>

      <div class="card">
        <div class="label">Outlined</div>
        <button class="btn outlined" data-text="secret-api-key-xyz789"><span>secret-api-key-xyz789</span></button>
        <div class="copied-text" id="outlined-copy"></div>
      </div>

      <div class="card">
        <div class="label">Badge Style</div>
        <button class="btn badge" data-text="v2.1.4-beta"><span>v2.1.4-beta</span></button>
        <div class="copied-text" id="badge-copy"></div>
      </div>

      <div class="card">
        <div class="label">Neon Glow</div>
        <button class="btn neon" data-text="neon.glow@future.tech"><span>neon.glow@future.tech</span></button>
        <div class="copied-text" id="neon-copy"></div>
      </div>

      <div class="card">
        <div class="label">Retro Style</div>
        <button class="btn retro" data-text="retro.vibes@80s.com"><span>retro.vibes@80s.com</span></button>
        <div class="copied-text" id="retro-copy"></div>
      </div>

      <div class="card">
        <div class="label">3D Effect</div>
        <button class="btn threed" data-text="contact@3d-studio.com"><span>contact@3d-studio.com</span></button>
        <div class="copied-text" id="threed-copy"></div>
      </div>

      <div class="card">
        <div class="label">Animated Border</div>
        <button class="btn animated" data-text="animated@borders.io"><span>animated@borders.io</span></button>
        <div class="copied-text" id="animated-copy"></div>
      </div>
    </div>
  </div>

  <script>
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", async () => {
        const text = btn.getAttribute("data-text");
        try {
          await navigator.clipboard.writeText(text);
          const copyDiv = btn.parentElement.querySelector(".copied-text");
          copyDiv.textContent = "Copied!";
          setTimeout(() => copyDiv.textContent = "", 2000);
        } catch (err) {
          alert("Failed to copy: " + err);
        }
      });
    });
  </script>
</body>
</html>
