// ===== STARK HUD ICON LIBRARY =====
const STARK_ICONS = {
  calendar: `<svg viewBox="0 0 24 24" class="stark-icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  phone: `<svg viewBox="0 0 24 24" class="stark-icon"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
  lightbulb: `<svg viewBox="0 0 24 24" class="stark-icon"><path d="M9 21h6"></path><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2v1"></path><path d="M5 12H4"></path><path d="M20 12h-1"></path><path d="M18.36 5.64l-.7.7"></path><path d="M6.34 17.66l-.7.7"></path><path d="M5.64 5.64l.7.7"></path><path d="M17.66 17.66l.7.7"></path><path d="M12 5a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3.5 5.5h7c2-1 3.5-3 3.5-5.5a7 7 0 0 0-7-7z"></path></svg>`,
  chart: `<svg viewBox="0 0 24 24" class="stark-icon"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
  news: `<svg viewBox="0 0 24 24" class="stark-icon"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6z"></path></svg>`,
  pen: `<svg viewBox="0 0 24 24" class="stark-icon"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l5 5"></path><path d="M9.5 14.5L16 8"></path></svg>`,
  gear: `<svg viewBox="0 0 24 24" class="stark-icon"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
  bot: `<svg viewBox="0 0 24 24" class="stark-icon"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>`,
  bicep: `<svg viewBox="0 0 24 24" class="stark-icon"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path><path d="M2 20h20"></path><path d="M14 12l-2 2-2-2"></path></svg>`,
  script: `<svg viewBox="0 0 24 24" class="stark-icon"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>`,
  hammer: `<svg viewBox="0 0 24 24" class="stark-icon"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
  live: `<svg viewBox="0 0 24 24" class="stark-icon"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>`,
  lock: `<svg viewBox="0 0 24 24" class="stark-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  crown: `<svg viewBox="0 0 24 24" class="stark-icon"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"></path></svg>`,
  star: `<svg viewBox="0 0 24 24" class="stark-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  search: `<svg viewBox="0 0 24 24" class="stark-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  clapper: `<svg viewBox="0 0 24 24" class="stark-icon"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M7 4v16"></path><path d="M17 4v16"></path><path d="M2 8h20"></path><path d="M2 14h20"></path></svg>`,
  scissors: `<svg viewBox="0 0 24 24" class="stark-icon"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>`,
  image: `<svg viewBox="0 0 24 24" class="stark-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
  target: `<svg viewBox="0 0 24 24" class="stark-icon"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
  book: `<svg viewBox="0 0 24 24" class="stark-icon"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
  play: `<svg viewBox="0 0 24 24" class="stark-icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
  arrowL: `<svg viewBox="0 0 24 24" class="stark-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
  arrowR: `<svg viewBox="0 0 24 24" class="stark-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  x: `<svg viewBox="0 0 24 24" class="stark-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" class="stark-icon"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L21 11.5Z"></path></svg>`,
};

function getStarkIcon(key, color, size) {
  size = size || "32px";
  const icon = STARK_ICONS[key] || STARK_ICONS['gear'];
  const accent = color || "#00f0ff";
  const glow = accent + "44";
  return `
    <div class="icon-wrap" style="width:${size}; height:${size}; --accent-color: ${accent}; --accent-glow: ${glow}; color: ${accent};">
      ${icon}
      <div class="hud-bracket-tl"></div>
      <div class="hud-bracket-br"></div>
    </div>
  `;
}

// ===== MY WORK — DATA + RENDER ENGINE =====
const WA = "https://wa.me/91XXXXXXXXXX";
const WA_GENERAL = WA + "?text=Hi%20Affan%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20connect.";
const WA_BRAND   = WA + "?text=Hi%20Affan%2C%20I%27d%20like%20to%20discuss%20a%20brand%20collaboration.";
const WA_AUTO    = WA + "?text=Hi%20Affan%2C%20I%27m%20interested%20in%20your%20automation%20services.";
const WA_SCRIPT  = WA + "?text=Hi%20Affan%2C%20I%27d%20like%20a%20free%20content%20trial%20%E2%80%94%20topic%20finding%2C%20script%20%26%20direction.";
const WA_BRAND2  = WA + "?text=Hi%20Affan%2C%20I%27d%20like%20to%20discuss%20branding%20%2F%20logo%20work.";
const WA_PRIV    = WA + "?text=Hi%20Affan%2C%20I%27d%20like%20to%20see%20your%20private%20portfolio%20work.";

const portfolioData = {
  media: {
    id:"media", title:"Media Content (YouTube)",
    items:[
      { channelName:"Affan Marvels", handle:"@AffanMarvels", url:"https://www.youtube.com/@AffanMarvels",
        niche:"Marvel | DC | Anime | Movies — Hindi Explanation",
        img:"https://via.placeholder.com/380x180/1a1a2e/00c3ff?text=Affan+Marvels+Banner",
        contentTypes:["Story Explanation","Character Deep Dive","Movie Breakdown","Comic Lore"],
        workDone:["Scripting","Topic Research","Content Direction","Video Editing","Thumbnail Design"],
        description:"Pop culture explanation channel covering Marvel, DC, Anime and Movies in Hindi. Full pipeline — from topic research to final edit."
      },
      { channelName:"Superior Affan", handle:"@SuperiorAffan", url:"https://www.youtube.com/@SuperiorAffan",
        niche:"[Placeholder — add channel niche]",
        img:"https://via.placeholder.com/380x180/1a1a2e/8b5cf6?text=Superior+Affan+Banner",
        contentTypes:["[Placeholder]"],
        workDone:["Scripting","Editing","Thumbnail","Direction"],
        description:"[Placeholder — describe what this channel covers]"
      },
      { channelName:"Affan Kaze", handle:"@Affan-Kaze", url:"https://www.youtube.com/@Affan-Kaze",
        niche:"[Placeholder — add channel niche]",
        img:"https://via.placeholder.com/380x180/1a1a2e/f5a623?text=Affan+Kaze+Banner",
        contentTypes:["[Placeholder]"],
        workDone:["Scripting","Editing","Content Strategy","Direction"],
        description:"[Placeholder — describe what this channel covers]"
      },
      { channelName:"Anime Kaze", handle:"@Anime-Kaze", url:"https://www.youtube.com/@Anime-Kaze",
        niche:"Anime Content — Reviews, Lore, Story Breakdowns",
        img:"https://via.placeholder.com/380x180/1a1a2e/ff6b9d?text=Anime+Kaze+Banner",
        contentTypes:["Anime Review","Story Arc Breakdown","Character Analysis","Recommendations"],
        workDone:["Scripting","Topic Research","Video Editing","Thumbnail Design","Content Direction"],
        description:"Anime-focused content channel covering story arcs, character journeys, and anime reviews."
      }
    ]
  },
  collabs: {
    id:"collabs", title:"Brand Collaboration Work",
    items:[
      { type:"public", brandName:"AdilQadri", brandType:"Indian Luxury Perfume Brand",
        note:"As seen on Shark Tank Season 3",
        img:"https://via.placeholder.com/380x180/1a1a2e/f5a623?text=AdilQadri+Logo",
        mainBrand:"https://www.instagram.com/adilqadriofficial/",
        instagramPage:"https://www.instagram.com/adilqadri_ki_sena/",
        workDone:["Video Editing","Content Direction","Scripting","Reel Production","Idea Development"],
        videosCount:"5+ Brand Videos"
      },
      { type:"locked", label:"Private Collaboration" },
      { type:"locked", label:"Private Collaboration" },
      { type:"locked", label:"Private Collaboration" }
    ]
  },
  automation: {
    id:"automation", title:"Automation Showcase",
    items:[
      {name:"Auto Post Scheduler",icon:"calendar",description:"Automatically schedules and posts content across Instagram, Facebook, YouTube — zero manual effort.",tools:["n8n","Make.com","Buffer API"],demo:"Calendar → Schedule → Auto Post"},
      {name:"Instagram Reel Auto-Publisher",icon:"phone",description:"Automated pipeline that takes a video file and publishes it as a Reel with caption, hashtags, and cover image.",tools:["n8n","Instagram Graph API"],demo:"Video → Process → Publish Reel"},
      {name:"Idea Finder Agent",icon:"lightbulb",description:"AI agent that searches trending topics in your niche and generates 10+ content ideas daily — automatically.",tools:["n8n","Groq AI","Google Trends API"],demo:"Search → Analyze → Generate Ideas"},
      {name:"Auto Trend Tracker",icon:"chart",description:"Monitors trending keywords, hashtags, and topics in real time and sends a daily digest to Telegram or email.",tools:["n8n","Google Trends","Telegram Bot"],demo:"Monitor → Trend Graph → Alert"},
      {name:"AI News Writer",icon:"news",description:"Pulls news from 15+ RSS feeds, rewrites each article with AI in your brand voice, and publishes automatically.",tools:["Python","Groq AI","WordPress REST API","GitHub Actions"],demo:"RSS Feed → AI Rewrite → Publish"},
      {name:"AI Content Writer",icon:"pen",description:"Generates SEO-optimized blog posts, captions, and scripts based on a topic or keyword — hands-free.",tools:["Groq AI","n8n","OpenAI API"],demo:"Topic → AI Draft → SEO Content"},
      {name:"AI Content Creator Pipeline",icon:"gear",description:"End-to-end content production — topic → script → voiceover → edit → publish. Full automation.",tools:["n8n","AI APIs","WordPress","Telegram"],demo:"Topic → Script → Voice → Edit → Go"},
      {name:"Telegram Approval Bot",icon:"bot",description:"AI-generated content is sent to Telegram for review. One tap Publish or Reject — no dashboard needed.",tools:["n8n","Telegram Bot API"],demo:"AI Draft → Telegram → ✅ Publish"},
      {name:"Workout Summary Agent",icon:"bicep",description:"Post-workout AI agent that logs your session, calculates progress, and sends a Telegram summary daily.",tools:["n8n","Supabase","Telegram Bot"],demo:"Log Workout → Calc → Summary"},
      {name:"Auto Script Generator",icon:"script",description:"Give it a topic — it researches, structures, and writes a full YouTube/Reel script automatically.",tools:["Groq AI","n8n"],demo:"Topic → Research → Full Script"}
    ]
  },
  websites: {
    id:"websites", title:"Website Work",
    items:[
      {name:"AffanKaze.in",description:"My personal portfolio website — currently under development. Full dark neon aesthetic, multi-page build with Services, How I Work, Portfolio, and Contact sections.",stack:"HTML / CSS / JS",status:"dev",badge:"hammer",badgeLabel:"In Development",img:"https://via.placeholder.com/380x180/1a1a2e/00c3ff?text=AffanKaze.in+Preview"},
      {name:"AffanMarvel.in",url:"https://affanmarvel.in",description:"Pop culture news and community site covering Marvel, DC, Anime, Movies, and Comics. Custom WordPress theme, automated news pipeline, social sharing, and Hype Button voting system.",stack:"WordPress, PHP, HTML/CSS/JS",features:["Custom dark neon theme","Automated news posting (15+ RSS feeds)","Groq AI article rewriter","Hype Button system"],status:"live",badge:"live",badgeLabel:"Live",img:"https://via.placeholder.com/380x180/1a1a2e/00ff88?text=AffanMarvel.in+Screenshot",btnText:"Visit Site →"},
      {name:"IronMind — Gym Trainer App",url:"https://affanmarvel.github.io/GYM-APP",description:"Personal gym trainer PWA built in React.js. Smart scheduling, progressive overload tracking, Telegram post-workout summaries, and ExerciseDB API integration.",stack:"React.js, Supabase, Vercel, ExerciseDB API",features:["Smart workout scheduling","Progressive overload tracking","Telegram agent summaries","PWA — works offline"],status:"live",badge:"live",badgeLabel:"Live",img:"https://via.placeholder.com/380x180/1a1a2e/00ff88?text=IronMind+Gym+App",btnText:"Open App →"},
      {name:"Anível Culture",description:"Pop culture apparel e-commerce brand — Marvel, DC, Anime merchandise. Custom WordPress dark luxury theme with WhatsApp order integration.",status:"private",badge:"lock",badgeLabel:"Private",img:"https://via.placeholder.com/380x180/222222/444444?text=Private+Project"}
    ]
  },
  branding: {
    id:"branding", title:"Brand Building, Logo & Naming",
    items:[
      {icon:"pen",name:"Logo Design",description:"From concept to final mark — logos built for brand recognition.",tools:["Illustrator","Figma","Canva Pro"],img:"https://via.placeholder.com/380x180/1a1a2e/8b5cf6?text=Logo+Portfolio"},
      {icon:"lightbulb",name:"Brand Naming",description:"Naming that's unique, meaningful, and available across domains & socials.",img:"https://via.placeholder.com/380x180/1a1a2e/f5a623?text=Brand+Naming+Example"},
      {icon:"crown",name:"Brand Building",description:"Logo + Name + Identity + Colors + Fonts + Guidelines — everything to launch a brand.",badge:"star",badgeLabel:"Premium Package"}
    ]
  }
};

// ===== RENDER HELPERS =====
function afkPills(arr){
  if(!arr||!arr.length)return'';
  return '<div class="afk-work-pills">'+arr.map(function(t){return'<span class="afk-work-pill">'+t+'</span>';}).join('')+'</div>';
}
function afkSliderWrap(id,cards){
  return '<div class="afk-work-slider-wrap"><button class="afk-work-arrow afk-work-arrow-l" onclick="afkSlide(\''+id+'\',-1)">'+STARK_ICONS.arrowL+'</button><div class="afk-work-slider" id="'+id+'">'+cards+'</div><button class="afk-work-arrow afk-work-arrow-r" onclick="afkSlide(\''+id+'\',1)">'+STARK_ICONS.arrowR+'</button></div>';
}
window.afkSlide=function(id,dir){
  var el=document.getElementById(id);
  el.scrollBy({left:dir*340,behavior:'smooth'});
};

// ===== CARD BUILDERS =====
function getProjPaths(name) {
  var clean = (name || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return {
    banner: '../Image/projects/' + clean + '-banner.jpg',
    logo: '../Image/projects/' + clean + '-logo.jpg'
  };
}

// Channel accent colors indexed by position
var YT_COLORS = ['#00c3ff','#8b5cf6','#f5a623','#ff6b9d'];

function cardYT(item, idx){
  var color = YT_COLORS[idx % YT_COLORS.length];
  var glow = color.replace('#','');
  // Styled header with icon and handle — no broken external images
  var cardImg = '<div class="afk-auto-icon-header" style="background:linear-gradient(135deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.95) 100%);border-bottom:1px solid '+color+'33;">'
    + getStarkIcon('play', color, '56px')
    + '<div style="position:absolute;bottom:14px;left:20px;font-family:Orbitron,sans-serif;font-size:0.58rem;letter-spacing:2px;color:'+color+';text-transform:uppercase;">'+item.handle+'</div>'
    + '</div>';
  return '<div class="afk-work-card" style="border-top-color:'+color+';">'+'<div class="afk-work-card-img">'+cardImg+'</div><div class="afk-work-card-body"><div class="afk-work-card-niche">'+item.niche+'</div><h3 class="afk-work-card-title">'+item.channelName+'</h3>'+afkPills(item.workDone.slice(0,4))+'<button class="afk-work-btn" style="border-color:'+color+';color:'+color+';" onclick="afkOpenYT('+idx+')">View Details</button></div></div>';
}
function cardCollab(item){
  if(item.type==='locked'){
    return '<div class="afk-work-card afk-work-blur-card"><div class="afk-work-card-img"><img src="https://via.placeholder.com/380x180/222222/333333?text=." alt="Confidential Brand" loading="lazy"/></div><div class="afk-work-lock-icon">'+getStarkIcon('lock','#ff3366','64px')+'</div><div class="afk-work-card-body" style="text-align:center;justify-content:center;"><div class="afk-work-shimmer"></div><h3 class="afk-work-card-title afk-work-blur-title">Confidential Brand</h3><p class="afk-work-card-desc">Brand name &amp; details are confidential.</p><span class="afk-work-pill" style="margin:0 auto 15px;display:inline-block;">'+item.label+'</span><a href="'+WA_BRAND+'" target="_blank" class="afk-work-btn afk-work-btn-locked">Connect With Us →</a></div></div>';
  }
  var paths = getProjPaths(item.brandName);
  return '<div class="afk-work-card"><div class="afk-work-card-img"><img src="'+paths.banner+'" onerror="this.src=\''+item.img+'\'" alt="'+item.brandName+' Banner" loading="lazy"/><div class="fallback-logo"><img src="'+paths.logo+'" onerror="this.parentElement.style.display=\'none\'"></div></div><div class="afk-work-badge afk-work-badge-shark">'+item.note+'</div><div class="afk-work-card-body"><h3 class="afk-work-card-title">'+item.brandName+'</h3><div class="afk-work-card-niche">'+item.brandType+'</div><p class="afk-work-card-desc"><strong>Work:</strong> '+item.workDone.join(', ')+'</p><p class="afk-work-card-handle">'+item.videosCount+'</p><span class="afk-work-pill" style="margin-bottom:15px;">Community Page Management</span><a href="'+item.mainBrand+'" target="_blank" class="afk-work-btn">View Brand →</a></div></div>';
}
function cardAuto(item){
  // Show HUD icon instead of broken placeholder image
  var iconHtml = getStarkIcon(item.icon, '#00f0ff', '64px');
  var cardImg = '<div class="afk-auto-icon-header">' + iconHtml + '</div>';
  return '<div class="afk-work-card"><div class="afk-work-card-img">'+cardImg+'</div><div class="afk-work-card-body"><h3 class="afk-work-card-title" style="font-size:1.1rem;">'+item.name+'</h3><div class="afk-work-auto-demo">⚡ '+item.demo+'</div><p class="afk-work-card-desc">'+item.description+'</p>'+afkPills(item.tools)+'<span class="afk-work-pill" style="border-color:#00c3ff;color:#00c3ff;align-self:flex-start;margin-top:auto;">Live Demo Available</span></div></div>';
}
function cardWeb(item){
  if(item.status==='private'){
    return '<div class="afk-work-card afk-work-blur-card"><div class="afk-work-card-img"><img src="'+item.img+'" alt="'+item.name+' - Private" loading="lazy" style="filter:blur(5px);"/></div><div class="afk-work-badge afk-work-badge-priv">'+item.badgeLabel+'</div><div class="afk-work-lock-icon">'+getStarkIcon('lock','#ff3366','64px')+'</div><div class="afk-work-card-body"><h3 class="afk-work-card-title">'+item.name+'</h3><p class="afk-work-card-desc">'+item.description+'</p><button class="afk-work-btn afk-work-btn-locked" onclick="afkOpenModal(\'afkContactOverlay\')">Request Access →</button></div></div>';
  }
  var paths = getProjPaths(item.name);
  var bc=item.status==='live'?'afk-work-badge-live':'afk-work-badge-dev';
  var btn=item.url?'<a href="'+item.url+'" target="_blank" class="afk-work-btn">'+(item.btnText||'Visit Site →')+'</a>':'';
  return '<div class="afk-work-card"><div class="afk-work-card-img"><img src="'+paths.banner+'" onerror="this.src=\''+item.img+'\'" alt="'+item.name+' Banner" loading="lazy"/><div class="fallback-logo"><img src="'+paths.logo+'" onerror="this.parentElement.style.display=\'none\'"></div></div><div class="afk-work-badge '+bc+'">'+item.badgeLabel+'</div><div class="afk-work-card-body"><h3 class="afk-work-card-title">'+item.name+'</h3><div class="afk-work-card-niche">'+item.stack+'</div><p class="afk-work-card-desc">'+item.description+'</p>'+(item.features?afkPills(item.features):'')+btn+'</div></div>';
}
function cardBrand(item){
  var paths = getProjPaths(item.name);
  var fallbackImg = item.img || 'https://via.placeholder.com/380x180/1a1a2e/f5a623?text=Brand';
  var badgeBlock = item.badge ? '<span class="afk-work-pill" style="border-color:#f5a623;color:#f5a623;margin-bottom:15px;">'+item.badgeLabel+'</span>' : '';
  // Use icon header for branding cards without real images
  var imgArea;
  if(item.icon && !item.img){
    imgArea = '<div class="afk-auto-icon-header" style="background:linear-gradient(135deg,rgba(245,166,35,0.07) 0%,rgba(0,0,0,0.95) 100%);">' + getStarkIcon(item.icon,'#f5a623','60px') + '</div>';
  } else {
    imgArea = '<img src="'+paths.banner+'" onerror="this.src=\''+fallbackImg+'\'" alt="'+item.name+' Banner" loading="lazy"/><div class="fallback-logo"><img src="'+paths.logo+'" onerror="this.parentElement.style.display=\'none\'"></div>';
  }
  return '<div class="afk-work-card"><div class="afk-work-card-img">'+imgArea+'</div><div class="afk-work-card-body"><h3 class="afk-work-card-title">'+item.name+'</h3><p class="afk-work-card-desc">'+item.description+'</p>'+(item.tools?afkPills(item.tools):'')+badgeBlock+'<a href="'+WA_BRAND2+'" target="_blank" class="afk-work-btn">Connect With Us →</a></div></div>';
}

// ===== SECTION BUILDERS =====
function buildSection(key){
  var d=portfolioData[key];
  var cards='';
  d.items.forEach(function(item,i){
    if(key==='media') cards+=cardYT(item,i);
    else if(key==='collabs') cards+=cardCollab(item);
    else if(key==='automation') cards+=cardAuto(item);
    else if(key==='websites') cards+=cardWeb(item);
    else if(key==='branding') cards+=cardBrand(item);
  });
  var html='<div class="afk-work-cat-section" data-section="'+key+'"><h2 class="afk-work-cat-title">'+d.title+'</h2>'+afkSliderWrap('slider-'+key,cards);
  // summaries
  if(key==='collabs') html+='<div class="afk-work-summary"><p class="afk-work-big-num">5+</p><h3>Brand Collaborations</h3><p>Video production, content direction &amp; social media work for real brands.</p><a href="'+WA_BRAND+'" target="_blank" class="afk-work-btn afk-work-btn-gold">Work With Your Brand →</a></div>';
  if(key==='automation') html+='<div class="afk-work-summary"><h3>Want These Automations For Your Brand?</h3><p>Scripts, ideas, posting, news — all automated. I build custom pipelines.</p><a href="'+WA_AUTO+'" target="_blank" class="afk-work-btn">Let\'s Automate →</a></div>';
  if(key==='branding') html+='<div class="afk-work-summary"><h3>Ready to Build Your Brand?</h3><p>From naming to identity — I\'ll build it right.</p><a href="'+WA_BRAND2+'" target="_blank" class="afk-work-btn afk-work-btn-gold">Let\'s Build Together →</a></div>';
  html+='</div>';
  return html;
}
function buildScripts(){
  return '<div class="afk-work-cat-section" data-section="scripts"><div class="afk-work-cta-full"><div class="afk-work-locked-label" style="margin-bottom:15px">CONTENT INTELLIGENCE</div><h2 class="afk-work-card-title" style="font-size:2.8rem;margin-bottom:15px">Scripts. Ideas. Direction.</h2><p class="afk-work-card-desc" style="max-width:650px;margin:0 auto 35px;font-size:1.15rem">I find the topics, write the scripts, plan the direction, and map the content — so you focus purely on creation.</p><div class="afk-work-pills" style="justify-content:center;margin-bottom:45px;"><span class="afk-work-pill">🔍 Topic Research</span><span class="afk-work-pill">📝 Script Writing</span><span class="afk-work-pill">🎯 Content Direction</span><span class="afk-work-pill">💡 Idea Generation</span><span class="afk-work-pill">📅 Content Calendar</span><span class="afk-work-pill">📊 Strategy Planning</span><span class="afk-work-pill">🎬 Video Structure</span><span class="afk-work-pill">📱 Platform-Specific Planning</span></div><div class="afk-work-summary"><h3>Want me to plan your content?</h3><p>Get a FREE trial — I\'ll find topics, write a script, and map a direction for you.</p><a href="'+WA_SCRIPT+'" target="_blank" class="afk-work-btn" style="max-width:300px;margin:0 auto">Get Free Trial →</a><p style="font-size:.8rem;color:#444;margin-top:20px;letter-spacing:1px;font-family:\'Orbitron\',sans-serif">LIMITED FREE TRIALS AVAILABLE • CONNECT NOW</p></div></div></div>';
}
function buildLocked(){
  var c='';
  var labels=["Private Client Project","NDA Brand Work","Confidential Collaboration"];
  labels.forEach(function(l){
    c+='<div class="afk-work-card afk-work-blur-card"><div class="afk-work-card-img"><img src="https://via.placeholder.com/380x180/08080a/111?text=." alt="Private Work" loading="lazy"/></div><div class="afk-work-lock-icon">'+getStarkIcon('lock','#ff3366','64px')+'</div><div class="afk-work-card-body" style="text-align:center;justify-content:center;"><div class="afk-work-shimmer"></div><h3 class="afk-work-card-title afk-work-blur-title">Classified Data</h3><span class="afk-work-pill" style="margin:0 auto;border-color:#ff3366;color:#ff3366">'+l+'</span></div></div>';
  });
  return '<div class="afk-work-locked-section"><div class="afk-work-locked-label">🔒 CLASSIFIED ARCHIVE</div><h2 class="afk-work-card-title" style="font-size:2.4rem;margin:15px 0">There\'s More. Much More.</h2><p class="afk-work-card-desc" style="max-width:650px;margin-bottom:35px">Some client work, brand projects, and collaborations are kept private by agreement. Behind this lock is more videos, more brands, more builds.</p>'+afkSliderWrap('slider-locked',c)+'<div class="afk-work-summary" style="background:transparent;border:none;padding:20px 0;box-shadow:none"><h3>Interested in Seeing More?</h3><p>Connect with me directly. If relevant to your project, I\'ll share details.</p><a href="'+WA_PRIV+'" target="_blank" class="afk-work-btn" style="max-width:300px;margin:0 auto">Request Access →</a></div></div>';
}

// ===== MAIN RENDER =====
var afkContainer=document.getElementById('afkContent');
function afkRenderAll(){
  afkContainer.innerHTML=buildSection('media')+buildSection('collabs')+buildSection('automation')+buildSection('websites')+buildScripts()+buildSection('branding')+buildLocked();
  afkObserve();
}
function afkRenderOne(key){
  if(key==='scripts') afkContainer.innerHTML=buildScripts()+buildLocked();
  else afkContainer.innerHTML=buildSection(key)+buildLocked();
  afkObserve();
}
afkRenderAll();

// ===== TABS =====
document.querySelectorAll('.afk-work-tab').forEach(function(tab){
  tab.addEventListener('click',function(){
    document.querySelectorAll('.afk-work-tab').forEach(function(t){t.classList.remove('active');});
    tab.classList.add('active');
    var t=tab.dataset.target;
    if(t==='all') afkRenderAll(); else afkRenderOne(t);
  });
});

// ===== MODALS =====
window.afkOpenYT=function(idx){
  var item=portfolioData.media.items[idx];
  var allSkills=['📝 Scripting','🔍 Research','💡 Ideas','🎬 Direction','✂️ Editing','🖼️ Thumbnails','📊 Strategy','🎯 Planning','📱 Reels','📖 Storytelling'];
  var hStyle = 'font-family:\'Orbitron\',sans-serif;color:#fff;font-size:.85rem;letter-spacing:1.5px;text-transform:uppercase;margin:25px 0 12px;border-left:3px solid #00c3ff;padding-left:10px';
  document.getElementById('afkDetailBody').innerHTML='<h3 class="afk-work-card-title" style="font-size:1.8rem;margin-bottom:8px">'+item.channelName+'</h3><p class="afk-work-card-handle" style="font-size:1.1rem;margin-bottom:25px">'+item.handle+'</p><p class="afk-work-card-desc" style="font-size:1.1rem;margin-bottom:30px">'+item.description+'</p><h4 style="'+hStyle+'">Content Verticals</h4>'+afkPills(item.contentTypes)+'<h4 style="'+hStyle+'">Execution Scope</h4>'+afkPills(item.workDone)+'<h4 style="'+hStyle+'">Content Architecture</h4>'+afkPills(allSkills)+'<div style="margin-top:40px;"><a href="'+item.url+'" target="_blank" class="afk-work-btn" style="max-width:280px">Visit Official Channel →</a></div>';
  afkOpenModal('afkDetailOverlay');
};
window.afkOpenModal=function(id){document.getElementById(id).classList.add('active');document.body.style.overflow='hidden';};
window.afkCloseModal=function(id){document.getElementById(id).classList.remove('active');document.body.style.overflow='';};
// close on overlay click
document.querySelectorAll('.afk-work-overlay').forEach(function(ov){
  ov.addEventListener('click',function(e){if(e.target===ov){ov.classList.remove('active');document.body.style.overflow='';}});
});
// close on Escape
document.addEventListener('keydown',function(e){
  if(e.key==='Escape') document.querySelectorAll('.afk-work-overlay.active').forEach(function(ov){ov.classList.remove('active');document.body.style.overflow='';});
});

// ===== CONTACT FORM =====
window.afkSubmitContact=function(e){
  e.preventDefault();
  var f=document.getElementById('afkContactForm');
  var d=new FormData(f);
  // fallback to WhatsApp
  var msg="Hi Affan, I'd like access to your private portfolio. Name: "+d.get('name')+" Email: "+d.get('email');
  if(d.get('whatsapp')) msg+=" WhatsApp: "+d.get('whatsapp');
  if(d.get('reason')) msg+=" Reason: "+d.get('reason');
  window.open(WA+"?text="+encodeURIComponent(msg),'_blank');
  f.style.display='none';
  document.getElementById('afkContactSuccess').style.display='block';
  setTimeout(function(){afkCloseModal('afkContactOverlay');f.style.display='flex';f.reset();document.getElementById('afkContactSuccess').style.display='none';},3000);
};

// ===== INTERSECTION OBSERVER =====
function afkObserve(){
  var sections=document.querySelectorAll('.afk-work-cat-section,.afk-work-locked-section');
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('afk-visible');obs.unobserve(e.target);}});
  },{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
  sections.forEach(function(s){obs.observe(s);});
}
afkObserve();

// ===== TOUCH SWIPE =====
document.querySelectorAll('.afk-work-slider').forEach(function(slider){
  var startX,scrollL;
  slider.addEventListener('touchstart',function(e){startX=e.touches[0].pageX;scrollL=slider.scrollLeft;},{passive:true});
  slider.addEventListener('touchmove',function(e){if(!startX)return;var diff=e.touches[0].pageX-startX;slider.scrollLeft=scrollL-diff;},{passive:true});
  slider.addEventListener('touchend',function(){startX=null;},{passive:true});
});
