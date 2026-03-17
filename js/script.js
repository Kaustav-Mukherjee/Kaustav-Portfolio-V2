/* cursor */
const cd = document.getElementById('cd'), cr = document.getElementById('cr');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

// Handle touch devices to hide cursor effects
const isTouchDevice = () => {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
};

if (!isTouchDevice()) {
    (function L() { rx += (mx - rx) * .13; ry += (my - ry) * .13; cd.style.left = mx + 'px'; cd.style.top = my + 'px'; cr.style.left = rx + 'px'; cr.style.top = ry + 'px'; requestAnimationFrame(L); })();
} else {
    cd.style.display = 'none';
    cr.style.display = 'none';
}

const cursorSVGs = {
    db: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path></svg>`,
    clean: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`,
    grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="14" y1="4" x2="10" y2="20"></line></svg>`
};

function initCursorEffect() {
    document.querySelectorAll('a,button,.srv,.folder,.soc-item,.tgl, .menu-tgl, .cert-row').forEach(el => {
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = "true";

        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hov');
            const img = el.getAttribute('data-cursor-img');
            const svgKey = el.getAttribute('data-cursor-svg');

            if (img) {
                cd.innerHTML = `<img src="${img}" alt="cursor icon">`;
                cd.classList.add('with-icon');
                cr.classList.add('hidden-r');
            } else if (svgKey && cursorSVGs[svgKey]) {
                cd.innerHTML = cursorSVGs[svgKey];
                cd.classList.add('with-icon');
                cr.classList.add('hidden-r');
            }
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hov');
            cd.innerHTML = '';
            cd.classList.remove('with-icon');
            cr.classList.remove('hidden-r');
        });
    });
}
initCursorEffect();

// Clear contextual cursor on scroll to prevent bleeding between sections
let cursorScrollTimeout;
window.addEventListener('scroll', () => {
    if (cd.classList.contains('with-icon')) {
        cd.innerHTML = '';
        cd.classList.remove('with-icon');
        cr.classList.remove('hidden-r');
        document.body.classList.remove('hov');
    }
}, { passive: true });

/* Giggly Cursor for Hero Name */
const heroName = document.getElementById('hero-name');
const gigglyCursor = document.getElementById('gigglyCursor');

if (heroName && gigglyCursor) {
    // Add image to cursor
    gigglyCursor.innerHTML = `<img src="assets/new curosor.png" alt="Kaustav Mukherjee">`;
    
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let isHovering = false;
    let animationId = null;
    
    // Giggly animation function with wobble effect
    function animateGiggly() {
        if (!isHovering) return;
        
        // Add some randomness/wobble
        const time = Date.now() / 100;
        const wobbleX = Math.sin(time) * 3 + Math.sin(time * 1.5) * 2;
        const wobbleY = Math.cos(time * 1.3) * 3 + Math.cos(time * 0.8) * 2;
        
        // Smooth follow with delay
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;
        
        gigglyCursor.style.left = (currentX + wobbleX) + 'px';
        gigglyCursor.style.top = (currentY + wobbleY) + 'px';
        
        animationId = requestAnimationFrame(animateGiggly);
    }
    
    heroName.addEventListener('mouseenter', () => {
        isHovering = true;
        gigglyCursor.classList.add('active');
        document.body.classList.add('hero-cursor-active');
        animateGiggly();
    });
    
    heroName.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });
    
    heroName.addEventListener('mouseleave', () => {
        isHovering = false;
        gigglyCursor.classList.remove('active');
        document.body.classList.remove('hero-cursor-active');
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
    
    // Hide custom cursor when scrolling to prevent it from bleeding into other sections
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (isHovering) {
            // Pause the cursor animation and hide it while scrolling
            gigglyCursor.classList.remove('active');
            document.body.classList.remove('hero-cursor-active');
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            // Clear previous timeout
            clearTimeout(scrollTimeout);
            
            // Resume cursor after scrolling stops
            scrollTimeout = setTimeout(() => {
                if (isHovering) {
                    gigglyCursor.classList.add('active');
                    document.body.classList.add('hero-cursor-active');
                    animateGiggly();
                }
            }, 150);
        }
    });
}

/* theme */
let dark = localStorage.getItem('theme') === 'dark';
document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');

function toggleTheme() {
    dark = !dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
}

/* mobile menu toggle */
const menuTgl = document.getElementById('menuTgl');
const navLinks = document.getElementById('nLinks');

menuTgl.addEventListener('click', () => {
    menuTgl.classList.toggle('open');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.n-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            menuTgl.classList.remove('open');
            navLinks.classList.remove('active');
        }
    });
});
/* scramble effect */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dull">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

/* Site Loader */
const siteLoader = document.getElementById('siteLoader');
const loaderText = document.getElementById('loaderText');

if (siteLoader && loaderText) {
    // Stop scrolling during loader
    document.body.style.overflow = 'hidden';
    const fx = new TextScramble(loaderText);
    
    setTimeout(() => {
        fx.setText('Kaustav Mukherjee').then(() => {
            setTimeout(() => {
                siteLoader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 800);
        });
    }, 200);
}

const logo = document.querySelector('.n-logo');
const kmText = logo ? logo.querySelector('.km-text') : null;
if (logo && kmText) {
    const fx = new TextScramble(kmText);
    logo.addEventListener('mouseenter', () => fx.setText('KAUSTAV'));
    logo.addEventListener('mouseleave', () => fx.setText('KM'));
}

// Extend to all eyebrows
document.querySelectorAll('.eyebrow').forEach(el => {
    const fx = new TextScramble(el);
    const originalText = el.innerText;
    el.addEventListener('mouseenter', () => fx.setText(originalText));
});

/* nav */
window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('stuck', scrollY > 10));

/* ── TOOLS DATA (DYNAMIC) ── */
function buildTechStack() {
    const col1 = document.getElementById('tkCol1');
    const col2 = document.getElementById('tkCol2');
    if ((!col1 && !col2) || !window.projectData || !window.projectData.techStack) return;

    const data = window.projectData.techStack;
    // Split data into two halves for two columns
    const mid = Math.ceil(data.length / 2);
    const col1Data = data.slice(0, mid);
    const col2Data = data.slice(mid);

    function buildColumn(container, items) {
        if (!container) return;
        container.innerHTML = '';
        // Triple for seamless infinite scroll
        const tripled = [...items, ...items, ...items];
        tripled.forEach((t) => {
            const item = document.createElement('div');
            item.className = 'tk-item-v';
            item.innerHTML = `
                <div class="tk-icon-box-v">
                    <img class="tk-img" src="assets/tech/${t.id}.png" alt="${t.n}" onerror="this.src='https://api.iconify.design/lucide:box.svg?color=%234754ff'">
                </div>
                <span class="tk-name">${t.n}</span>
            `;
            container.appendChild(item);
        });
    }

    buildColumn(col1, col1Data);
    buildColumn(col2, col2Data);
}

/* ── TECHNOLOGY FOLDERS (HOME PAGE) ── */
function buildFolders() {
    const fr = document.getElementById('folderRow');
    if (!fr || !window.projectData || !window.projectData.categories) return;
    fr.innerHTML = ''; // Clear existing

    window.projectData.categories.forEach((cat, idx) => {
        const n = (idx + 1).toString().padStart(2, '0');
        const a = document.createElement('a');
        a.className = 'folder rev';
        a.href = `gallery.html?cat=${cat.id}`;
        a.innerHTML = `
            <div class="f-tab">
               <div class="f-dot"></div>
            </div>
            <div class="f-body">
                <span class="f-num">${n}</span>
                <div class="f-title">${cat.n}</div>
                <span class="f-type">${cat.t}</span>
                <p class="f-summary">${cat.summary}</p>
                <div class="f-tags">
                    <span class="f-tag">${cat.count} PROJECTS</span>
                </div>
            </div>`;
        fr.appendChild(a);
        obs.observe(a); // Observe for reveal
    });
    initCursorEffect(); // Re-bind cursor for new folders
}

/* ── HELPERS ── */
async function forceDownload(url, filename) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
        console.error('Download failed:', err);
        window.open(url, '_blank');
    }
}

function getStorageUrl(path) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    
    // Normalize path: remove leading slash
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Split segments and encode each one
    const encodedSegments = cleanPath.split('/').map(seg => encodeURIComponent(seg));
    const finalPath = encodedSegments.join('/');
    
    const baseUrl = SUPABASE_CONFIG.URL;
    const finalUrl = `${baseUrl}/storage/v1/object/public/${finalPath}`;
    
    // Log to console for user debugging
    console.log('--- Supabase Path Debug ---');
    console.log('Original Path:', path);
    console.log('Final URL:', finalUrl);
    
    return finalUrl;
}

/* ── CERTIFICATIONS ── */
async function buildCertifications() {
    const cl = document.getElementById('certList'); // Keep original ID for consistency
    if (!cl) return;

    let data = [];
    if (typeof USE_SUPABASE !== 'undefined' && USE_SUPABASE) { // Check if USE_SUPABASE is defined
        const { data: certs, error } = await supabase
            .from('certifications')
            .select('*')
            .eq('is_visible', true)
            .order('sort_order', { ascending: true });
        if (!error) data = certs;
    } else if (window.projectData && window.projectData.certifications) {
        data = window.projectData.certifications;
    }

    cl.innerHTML = ''; // Clear existing
    data.forEach((c) => {
        const row = document.createElement('div');
        row.className = 'cert-row rev';
        
        // Use getStorageUrl for both the hover image and the actual certificate link
        const certImg = getStorageUrl(c.certificate_image_url);
        const verifyLink = getStorageUrl(c.verify_url);
        const hoverImg = getStorageUrl(c.img || c.certificate_image_url);

        // Build verify badge HTML if verify_url or certificate_image_url exists
        const mainLink = verifyLink || certImg || '#';
        const verifyBadge = (c.verify_url || c.certificate_image_url)
            ? `<a class="cert-verify-badge" href="${mainLink}" target="_blank">Verify <span class="arrow-45">↗</span></a>`
            : '';

        row.innerHTML = `
            <div class="cert-left">
                <span class="cert-type">${c.type}</span>
                <span class="cert-title">${c.name}</span>
            </div>
            <div class="cert-right">
                ${verifyBadge}
                <span class="cert-date" data-original="${c.date}">${c.date}</span>
            </div>
            ${hoverImg ? `<img class="cert-img-hover" src="${hoverImg}" alt="${c.name} Certificate" onerror="this.style.display='none'">` : ''}
        `;
        cl.appendChild(row);
        obs.observe(row);

        // Add text scrambling animation only to date on hover
        const dateEl = row.querySelector('.cert-date');
        const fxDate = new TextScramble(dateEl);

        row.addEventListener('mouseenter', () => {
            fxDate.setText(dateEl.dataset.original);
        });
    });
    initCursorEffect(); // Re-bind cursor for new certs
}

// Global reveal-on-scroll logic
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add(e.target.classList.contains('edu') ? 'vis' : 'in');
        }
    });
}, { threshold: .07 });

document.querySelectorAll('.rev,.edu').forEach(el => obs.observe(el));

// Footer copyright text scramble animation
const fCopy = document.getElementById('fCopy');
if (fCopy) {
    const plainText = fCopy.innerText;
    
    // Create a span inside fCopy to hold the scrambled text
    const scrambleSpan = document.createElement('span');
    scrambleSpan.className = 'f-copy-text';
    scrambleSpan.innerText = plainText;
    
    // Clear existing content and add the scramble span
    fCopy.innerHTML = '';
    fCopy.appendChild(scrambleSpan);
    
    const fx = new TextScramble(scrambleSpan);
    
    // Trigger scramble on hover
    fCopy.addEventListener('mouseenter', () => {
        fx.setText(plainText);
    });
    
    // Also trigger on page load/scroll into view
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fx.setText(plainText);
            }
        });
    }, { threshold: 0.5 });
    footerObserver.observe(fCopy);
}

// Initial build
buildTechStack();
buildCertifications();

// Fix race condition: check if already loaded, otherwise listen
function finalInit() {
    buildFolders();
    buildTechStack();
    buildCertifications();
}

if (window.projectsLoaded) {
    finalInit();
} else {
    document.addEventListener('projectsLoaded', finalInit);
}

/* education */
const edus = [
    { date: '2024 — 2026', deg: 'M.Tech Electronics and Tele-Communication Engineering', sch: 'IIEST, Shibpur · GPA ongoing', cls: 'bl', label: '● Enrolled' },
    { date: '2020 — 2024', deg: 'B.Tech Electronics and Communication Engineering', sch: 'Meghnad Saha Institute of Technology · 8.38 CGPA', cls: 'bd', label: 'Completed' },
    { date: '2020', deg: 'Higher Secondary (Science)', sch: 'Nava Nalanda High School · 81.2%', cls: 'bd', label: 'Completed' },
    { date: '2018', deg: 'Secondary Education', sch: 'Nava Nalanda High School · 87.5%', cls: 'bd', label: 'Completed' },
];
const eg = document.getElementById('egrid');
if (eg) {
    edus.forEach((e, i) => {
        const d = document.createElement('div'); d.className = 'edu'; d.style.transitionDelay = `${i * .1}s`;
        d.innerHTML = `<div class="e-date">${e.date}</div><div class="e-deg">${e.deg}</div><div class="e-sch" data-original="${e.sch}">${e.sch}</div><span class="e-badge ${e.cls}">${e.label}</span>`;
        eg.appendChild(d);
        obs.observe(d); // Observe newly created edu elements
        
        // Add text scrambling animation only to institute names on appear
        const schEl = d.querySelector('.e-sch');
        const fxSch = new TextScramble(schEl);
        
        // Trigger animation when element becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fxSch.setText(schEl.dataset.original);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(d);
    });
}

/* socials */
const socs = [
    { nm: 'Twitter / X', hd: '@kaustav6942', ic: '𝕏', url: 'https://x.com/kaustav6942' },
    { nm: 'LinkedIn', hd: '/in/kaustav-mukherjee', ic: 'in', url: 'https://www.linkedin.com/in/kaustav-mukherjee-471a21219' },
    { nm: 'GitHub', hd: '@Kaustav-Mukherjee', ic: '⌥', url: 'https://github.com/Kaustav-Mukherjee' },
    { nm: 'Email', hd: 'kaustavmukherjee2023@gmail.com', ic: '✉', url: 'mailto:kaustavmukherjee2023@gmail.com' }
];
const sl = document.getElementById('soclist');
if (sl) {
    socs.forEach(s => {
        const a = document.createElement('a'); a.className = 'soc-item'; a.href = s.url; a.target = '_blank';
        a.innerHTML = `<div class="soc-l"><span class="soc-ic">${s.ic}</span><span class="soc-nm">${s.nm}</span></div><div class="soc-r"><span class="soc-hd">${s.hd}</span><span class="soc-ar">↗</span></div>`;
        sl.appendChild(a);
    });
}


/* CLOCK */
function updateClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
    el.innerText = time;
}
setInterval(updateClock, 1000);
updateClock();
/* typewriter */
function typeWriter(el, speed = 100) {
    const text = "Kaustav\nMukherjee.";
    el.innerHTML = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            if (char === '\n') {
                el.innerHTML += '<br>';
            } else if (i >= 8) { // Start of "Mukherjee."
                if (!el.querySelector('em')) {
                    const em = document.createElement('em');
                    el.appendChild(em);
                }
                const em = el.querySelector('em');
                em.textContent += char;
            } else {
                el.innerHTML += char;
            }
            i++;
            setTimeout(type, speed);
        } else {
            el.classList.add('done');
        }
    }
    setTimeout(type, 800);
}

document.addEventListener('DOMContentLoaded', () => {
    const hName = document.querySelector('.h-name');
    if (hName) typeWriter(hName, 120);
    

    
    // Add text scrambling animation to location text
    const locText = document.querySelector('.h-loc');
    if (locText) {
        const originalText = locText.textContent.trim();
        const fx = new TextScramble(locText);
        locText.addEventListener('mouseenter', () => fx.setText('📍 Kolkata, India'));
        locText.addEventListener('mouseleave', () => fx.setText(originalText));
    }
    
    // Add text scrambling animation to buttons
    const resumeBtn = document.querySelector('.btn-p');
    if (resumeBtn) {
        const resumeText = resumeBtn.childNodes[0];
        if (resumeText && resumeText.textContent) {
            const originalText = resumeText.textContent.trim();
            const fx = new TextScramble(resumeText);
            resumeBtn.addEventListener('mouseenter', () => fx.setText('RESUME'));
            resumeBtn.addEventListener('mouseleave', () => fx.setText(originalText));
        }
    }
    
    const messageBtn = document.querySelectorAll('.btn-p')[1];
    if (messageBtn) {
        const messageText = messageBtn.childNodes[0];
        if (messageText && messageText.textContent) {
            const originalText = messageText.textContent.trim();
            const fx = new TextScramble(messageText);
            messageBtn.addEventListener('mouseenter', () => fx.setText('SEND MESSAGE'));
            messageBtn.addEventListener('mouseleave', () => fx.setText(originalText));
        }
    }
    
    // Add text scrambling animation to "Made with Framer..." text on appear
    const madeWithText = document.querySelector('.con-sub');
    if (madeWithText) {
        const originalText = madeWithText.textContent.trim();
        madeWithText.dataset.original = originalText;
        const fx = new TextScramble(madeWithText);
        
        // Trigger animation when element becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fx.setText(madeWithText.dataset.original);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(madeWithText);
    }
});
