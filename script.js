/* ═══════════════════════════════════════════════════════════════
   HRZNS Studio™ — JavaScript Interactions & Animations
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Custom Cursor ─────────────────────────────────────────
    const customCursor = document.getElementById('customCursor');
    let cursorX = 0, cursorY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;

        // Detect dark backgrounds for cursor color switch
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el) {
            const isDark = el.closest('.menu-overlay-panel, .project-detail-panel, .footer, .project-card');
            if (isDark) {
                customCursor.classList.add('cursor-light');
            } else {
                customCursor.classList.remove('cursor-light');
            }
        }
    });

    function updateCursor() {
        currentX += (cursorX - currentX) * 0.15;
        currentY += (cursorY - currentY) * 0.15;
        customCursor.style.transform = `translate(${currentX - 10}px, ${currentY - 10}px)`;
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    document.addEventListener('mousedown', () => {
        customCursor.classList.add('active');
    });

    document.addEventListener('mouseup', () => {
        setTimeout(() => {
            customCursor.classList.remove('active');
        }, 150);
    });

    // ─── Elements ──────────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const projectCards = document.querySelectorAll('.project-card');
    const seeAllWorks = document.getElementById('seeAllWorks');
    const footer = document.querySelector('.footer');

    // ─── Navbar Scroll Effect ──────────────────────────────────
    let lastScroll = 0;

    function handleNavbarScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = scrollY;
    }

    // ─── Navbar Color Inversion on Works Section ────────────────
    const projectsSection = document.getElementById('works');
    if (projectsSection) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navbar.classList.add('nav-inverted');
                } else {
                    navbar.classList.remove('nav-inverted');
                }
            });
        }, {
            rootMargin: '-1px 0px -95% 0px'
        });
        navObserver.observe(projectsSection);
    }

    // ─── Menu Overlay ──────────────────────────────────────────
    function openMenu() {
        menuOverlay.classList.add('active');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    menuBackdrop.addEventListener('click', closeMenu);

    // Close menu on nav link click
    document.querySelectorAll('.menu-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (projectDetailOverlay && projectDetailOverlay.classList.contains('active')) {
                closeProjectDetail();
            } else if (menuOverlay.classList.contains('active')) {
                closeMenu();
            }
        }
    });

    // ─── Project Detail Panel ──────────────────────────────────
    const projectDetailOverlay = document.getElementById('projectDetailOverlay');
    const projectDetailClose = document.getElementById('projectDetailClose');
    const projectDetailTitle = document.getElementById('projectDetailTitle');
    const projectDetailTools = document.getElementById('projectDetailTools');
    const projectDetailDescription = document.getElementById('projectDetailDescription');
    const projectDetailCategory = document.getElementById('projectDetailCategory');
    const projectDetailYear = document.getElementById('projectDetailYear');
    const projectDetailRole = document.getElementById('projectDetailRole');
    const projectDetailGallery = document.getElementById('projectDetailGallery');

    // Project data — customize your content here
    const projectData = {
        kairo: {
            title: 'Shift',
            category: 'Magazine',
            year: '2025',
            role: 'Art Direction',
            description: 'Shift was born as an editorial space dedicated to gathering and giving visibility to conceptual projects that push the boundaries of design and contemporary art. Each page is built as a piece in itself, where typography, imagery, and white space dialogue with equal intensity. As Art Director, the aesthetic vision pursues an experimental minimalism fused with the nostalgia of analogue technology, creating a deliberate contrast between the digital and the tangible. The result is a publication that does not merely document but provokes, inviting the reader to question what they understand by design and to discover new ways of seeing the everyday.',
            bgColor: '#2f2d2d',
            tools: ['Photoshop', 'Illustrator', 'Figma', 'InDesign'],
            images: [
                'assets/img/gifshift.mp4',
                'assets/img/shift/mockup1.jpg',
                'assets/img/shift/Mockup2.jpg',
                'assets/img/shift/mockup3.jpg'
            ]
        },
        aurum: {
            title: 'Hoffie',
            category: 'Branding',
            year: '2025',
            role: 'Brand Design',
            description: 'Hoffie is conceived as a quiet refuge from the noise and speed of the city. A place where coffee is just the excuse to pause, breathe, and find calm again. The space guarantees privacy and attentive care, free from outside distractions, designed for those seeking something more than a quick drink. The visual identity translates that philosophy into every detail: a warm palette that invites you to stay, soft shapes that convey trust, and a tone of voice that feels close without losing elegance. Every brand element, from the signage to the packaging, reinforces the idea that Hoffie is not just a café but a complete sensory experience where product quality and the warmth of the surroundings merge into a single gesture.',
            bgColor: '#de5030',
            tools: ['Photoshop', 'Illustrator', 'Figma'],
            images: [
                'assets/img/hoffie/hoffiegif2.mp4',
                'assets/img/hoffie/Coffee_Cup_Mockup_1.jpg',
                'assets/img/hoffie/A-Stand_Mockup.jpg',
                'assets/img/hoffie/Poster_on_Concrete_Background_Mockup_1.jpg',
                'assets/img/hoffie/Single_Poster_Mockup.jpg',
                'assets/img/hoffie/logo_reverse.jpg',
                'assets/img/hoffie/hoffie sticker 1.jpg',
                'assets/img/hoffie/taza.jpg',
                'assets/img/hoffie/taza 2.jpg',
                'assets/img/hoffie/muchos juntos 1.jpg'
            ]
        },
        strobe: {
            title: 'Becher',
            category: 'Editorial',
            year: '2025',
            role: 'Creative Direction',
            description: 'Becher is an experimental publication that traces the cup as a symbol across time, exploring four meanings it has carried through human history: fertility, union, triumph, and abundance. An everyday object that, when looked at closely, reveals layers of meaning accumulated over centuries. Created alongside my classmates Walter López and Selena Prada, I took on the role of creative director, shaping a visual language built on abstraction and transparency. Each spread works as an independent composition where images overlap, fragment, and dialogue with one another, inviting the reader to see through the object and uncover its deeper significance. The result is a work that moves between the art book and the visual essay, challenging linear reading and proposing an experience where each person finds their own path.',
            bgColor: '#223baa',
            tools: ['Figma', 'Photoshop', 'InDesign', 'Illustrator', 'After Effects'],
            images: [
                'assets/img/becher/bechergif.mp4',
                'assets/img/becher/img_becher1.jpg',
                'assets/img/becher/img_becher2.jpg',
                'assets/img/becher/img_becher3.jpg',
                'assets/img/becher/img_becher4.jpg',
                'assets/img/becher/img_becher5.jpg',
                'assets/img/becher/img_becher6.jpg'
            ]
        },
        forma: {
            title: 'Cesida',
            category: 'Rebranding',
            year: '2025',
            role: 'Identity Design',
            description: 'Cesida is a state organisation based in Madrid that fights to end the stigma surrounding people living with HIV. Its work goes far beyond information: it is about changing the way society looks at and treats those who live with this reality. In this project, my team and I developed a complete redesign for the association, creating a renewed identity, a new website, motion graphics pieces, and a full communication campaign. The goal was to build an image that conveyed closeness and strength in equal measure, moving away from the clinical tone that usually accompanies these subjects. Every visual decision, from the colour palette to the typography, was made to break barriers and bring the message closer to an audience that too often prefers not to listen. The result is a brand that speaks clearly, directly, and without fear.',
            bgColor: '#ffbf00',
            textColor: '#ffffffff',
            tools: ['Figma', 'Photoshop', 'InDesign', 'Illustrator', 'After Effects'],
            images: [
                'assets/img/cesida/cesidavideoresumen.mp4',
                'assets/img/cesida/imgcesida1.jpg',
                'assets/img/cesida/imgcesida2.jpg',
                'assets/img/cesida/imgcesida3.jpg',
                'assets/img/cesida/imgcesida4.jpg',
                'assets/img/cesida/imgcesida4.5.jpg',
                'assets/img/cesida/imgcesida5.jpg'
            ]
        },
        nordika: {
            title: 'Dentcob',
            category: 'Web Design',
            year: '2026',
            role: 'UI/UX Design',
            description: 'A web design project focused on creating an attractive and intuitive digital presence for a dental clinic located in Madrid, Spain. The design combines a modern aesthetic with clear navigation, conveying trust and professionalism at first glance. The content management system was custom-built using HTML, CSS and JavaScript, allowing the team to manage content independently.',
            link: 'https://clinicadentcob.com/index.html',
            bgColor: '#00c96b',
            textColor: '#ffffffff',
            tools: ['Google Antigravity', 'VSCode', 'Claude Code', 'Diseño de Prompts'],
            images: [
                'assets/videos/dentcobvideo.mp4'
            ]
        },
        personal: {
            title: 'Archive',
            category: 'Freelance & Personal Projects',
            year: '2024–2026',
            role: 'Creative Direction',
            description: 'Archive is a collection of personal explorations spanning illustration, 3D, motion graphics, and experimental design. These are works born from creative freedom, with no brief and no client, where the only rule is curiosity. Each piece responds to a different impulse: a texture that caught the eye, an idea that did not fit any professional project, or simply the desire to try something new without fear of getting it wrong. This archive does not aim to be a tidy portfolio but rather a visual diary in constant evolution, a space where mistakes and discoveries coexist with equal ease. Here you see what happens when design stops being a commission and becomes a personal drive, a way of understanding the world and testing your own limits with no pressure other than the need to keep creating.',
            bgColor: '#d10018',
            textColor: '#ffffffff',
            tools: ['Cinema 4D', 'After Effects', 'Photoshop', 'InDesign', 'Illustrator'],
            images: [
                'assets/img/archive/flame.jpg',
                'assets/img/archive/ASCII.mp4',
                'assets/img/archive/summer.jpg',
                'assets/img/archive/desire final pt.jpg',
                'assets/img/archive/i see you baby boi.jpg',
                'assets/img/archive/sunsun.jpg',
                'assets/img/archive/centralcee.jpg',
                'assets/img/archive/helio.jpg',
                'assets/img/archive/nintendo_camara3_1.jpg'
            ]
        }
    };

    // Helper: create a media element (image or video) or a placeholder
    function createMediaElement(src, sizeClass) {
        if (!src) {
            // Placeholder slot for missing images
            const placeholder = document.createElement('div');
            placeholder.className = 'project-gallery-img ' + sizeClass + ' gallery-placeholder-slot';
            placeholder.innerHTML = '<span>Image placeholder</span>';
            return placeholder;
        }

        const isVideo = src.match(/\.(mp4|webm|mov)$/i);
        let el;

        if (isVideo) {
            el = document.createElement('video');
            el.src = src;
            el.autoplay = true;
            el.loop = true;
            el.muted = true;
            el.playsInline = true;
        } else {
            el = document.createElement('img');
            el.src = src;
            el.alt = 'Project image';
            el.loading = 'lazy';
        }

        el.className = 'project-gallery-img ' + sizeClass;
        return el;
    }

    // Helper: create a text paragraph block for inside the gallery
    function createGalleryText(text) {
        const div = document.createElement('div');
        div.className = 'gallery-text';
        const p = document.createElement('p');
        p.textContent = text;
        div.appendChild(p);
        return div;
    }

    // Split a description into two roughly equal paragraph halves
    function splitDescription(description) {
        if (!description) return ['', ''];
        const sentences = description.split(/(?<=\.)\s+/);
        if (sentences.length <= 1) return [description, ''];
        const midPoint = Math.ceil(sentences.length / 2);
        return [
            sentences.slice(0, midPoint).join(' '),
            sentences.slice(midPoint).join(' ')
        ];
    }

    function buildGallery(images, description, projectId) {
        projectDetailGallery.innerHTML = '';

        if (images.length === 0) {
            const placeholder = document.createElement('div');
            placeholder.className = 'project-gallery-placeholder';
            placeholder.innerHTML = '<span>Coming soon</span>';
            projectDetailGallery.appendChild(placeholder);
            return;
        }

        // Dentcob (nordika) — keep original layout
        if (projectId === 'nordika') {
            images.forEach((src, i) => {
                const posInCycle = i % 3;
                let isFull = (posInCycle === 0);
                if (i === images.length - 1 && posInCycle === 1) isFull = true;
                const sizeClass = isFull ? 'gallery-full' : 'gallery-half';
                projectDetailGallery.appendChild(createMediaElement(src, sizeClass));
            });
            return;
        }

        // ─── Gallery Layout ────────────────────────────────────
        // First image/video is full-width hero, rest are 2-col pairs
        // Text paragraphs break up the pairs for editorial rhythm
        const [desc1, desc2] = splitDescription(description);

        for (let i = 0; i < images.length; i++) {
            // Insert text paragraph 1 after 1st pair (after index 2)
            if (i === 3 && desc1) {
                projectDetailGallery.appendChild(createGalleryText(desc1));
            }
            // Insert text paragraph 2 after 3rd pair (after index 6)
            if (i === 7 && desc2) {
                projectDetailGallery.appendChild(createGalleryText(desc2));
            }
            // First image = full width, rest = half (2 per row)
            const sizeClass = (i === 0) ? 'gallery-full' : 'gallery-half';
            projectDetailGallery.appendChild(createMediaElement(images[i], sizeClass));
        }

        // If desc2 wasn't inserted inside the loop, append it at the bottom
        if (desc2 && images.length < 8) {
            projectDetailGallery.appendChild(createGalleryText(desc2));
        }
    }

    function openProjectDetail(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        // Update content
        projectDetailTitle.textContent = data.title;
        projectDetailCategory.textContent = data.category;
        projectDetailYear.textContent = data.year;
        projectDetailRole.textContent = data.role;
        document.getElementById('projectDetailMetaRight').textContent = data.year + ', ' + data.category;

        // Show description only for projects using legacy layout (e.g. Dentcob)
        if (projectDetailDescription) {
            if (projectId === 'nordika') {
                projectDetailDescription.textContent = data.description;
                projectDetailDescription.style.display = 'block';
            } else {
                projectDetailDescription.style.display = 'none';
            }
        }

        // Render tools table
        if (projectDetailTools) {
            projectDetailTools.innerHTML = '';
            const tools = data.tools || [];
            if (tools.length > 0) {
                tools.forEach((tool, i) => {
                    const row = document.createElement('div');
                    row.className = 'tool-row';
                    row.innerHTML = `<span class="tool-number">${String(i + 1).padStart(2, '0')}</span><span class="tool-name">${tool}</span>`;
                    projectDetailTools.appendChild(row);
                });
            } else {
                projectDetailTools.innerHTML = '<div class="tool-row tool-empty"><span class="tool-name">—</span></div>';
            }
        }

        // Apply project background color
        const panel = document.getElementById('projectDetailPanel');
        if (panel && data.bgColor) {
            panel.style.backgroundColor = data.bgColor;
        } else if (panel) {
            panel.style.backgroundColor = '#0d0d0d';
        }

        // Apply text color (black for bright backgrounds)
        if (panel) {
            panel.style.color = data.textColor || '#FCFCF7';
        }

        // Build image gallery
        buildGallery(data.images || [], data.description || '', projectId);

        // Show/hide project link
        const projectLink = document.getElementById('projectDetailLink');
        if (projectLink) {
            if (data.link) {
                projectLink.href = data.link;
                projectLink.style.display = 'inline-flex';
            } else {
                projectLink.style.display = 'none';
            }
        }

        // Scroll panel to top
        if (panel) panel.scrollTop = 0;

        // Open overlay
        projectDetailOverlay.classList.add('active');
        document.body.classList.add('menu-open');
    }

    function closeProjectDetail() {
        projectDetailOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Click handlers for project icons
    document.querySelectorAll('.project-icon-wrapper[data-project]').forEach(wrapper => {
        wrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = wrapper.getAttribute('data-project');
            openProjectDetail(projectId);
        });
    });

    // ─── Hover Video Play/Pause ────────────────────────────────
    document.querySelectorAll('.project-icon-wrapper.has-hover-video').forEach(wrapper => {
        const video = wrapper.querySelector('.project-video-hover');
        if (!video) return;

        // Force muted + inline for autoplay policy compliance
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.load();

        let isHovering = false;
        let playPromise = null;

        wrapper.addEventListener('mouseenter', () => {
            isHovering = true;
            video.currentTime = 0;
            video.muted = true;
            playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    playPromise = null;
                }).catch(() => {
                    playPromise = null;
                });
            }
        });

        wrapper.addEventListener('mouseleave', () => {
            isHovering = false;
            if (playPromise !== null) {
                // Wait for play() to resolve before pausing
                playPromise.then(() => {
                    if (!isHovering) {
                        video.pause();
                        video.currentTime = 0;
                    }
                }).catch(() => { });
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    });

    // Close handlers
    if (projectDetailClose) {
        projectDetailClose.addEventListener('click', closeProjectDetail);
    }

    // ─── Project Cards — Scroll-Triggered Visibility ──────────
    function handleProjectVisibility() {
        const viewportHeight = window.innerHeight;

        projectCards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const threshold = viewportHeight * 0.6;

            if (cardCenter > 0 && cardCenter < threshold) {
                card.classList.add('visible');
            } else if (rect.top > viewportHeight || rect.bottom < 0) {
                card.classList.remove('visible');
            }
        });
    }

    // ─── Project Cards — Parallax on BG & Icon ────────────────
    function handleProjectParallax() {
        const viewportHeight = window.innerHeight;

        projectCards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const progress = 1 - (rect.top / viewportHeight);
            const clampedProgress = Math.max(0, Math.min(1, progress));

            const bg = card.querySelector('.project-bg');
            const icon = card.querySelector('.project-icon-wrapper');

            if (bg) {
                // Keep gradient backgrounds at full opacity, no scale
                bg.style.transform = 'scale(1)';
                bg.style.opacity = 1;
            }

            if (icon) {
                const iconY = (1 - clampedProgress) * 20 - 10;
                const iconScale = 0.95 + clampedProgress * 0.05;
                icon.style.transform = `scale(${iconScale}) translateY(${iconY}px)`;
            }
        });
    }

    // ─── See All Works — IntersectionObserver ──────────────────
    const seeAllObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.3 }
    );

    if (seeAllWorks) {
        seeAllObserver.observe(seeAllWorks);
    }

    // ─── Footer — IntersectionObserver ─────────────────────────
    const footerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.2 }
    );

    if (footer) {
        footerObserver.observe(footer);
    }

    // ─── Smooth Scroll for All Anchors ─────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ─── Scroll Event Listeners ────────────────────────────────
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                handleProjectVisibility();
                handleProjectParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ─── Initial State ─────────────────────────────────────────
    handleNavbarScroll();
    handleProjectVisibility();
    handleProjectParallax();

    // ─── Cursor Trail Effect (subtle) ──────────────────────────
    const cursorTrail = document.createElement('div');
    cursorTrail.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,0.15);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease-out, opacity 0.15s ease;
        mix-blend-mode: difference;
        opacity: 0;
    `;
    document.body.appendChild(cursorTrail);

    let cursorVisible = false;

    document.addEventListener('mousemove', (e) => {
        cursorTrail.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
        if (!cursorVisible) {
            cursorVisible = true;
            cursorTrail.style.opacity = '1';
        }
    });

    document.addEventListener('mouseleave', () => {
        cursorVisible = false;
        cursorTrail.style.opacity = '0';
    });

    // Scale cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorTrail.style.width = '40px';
            cursorTrail.style.height = '40px';
            cursorTrail.style.transform = `translate(${parseInt(cursorTrail.style.transform.split('(')[1]) - 10}px, ${parseInt(cursorTrail.style.transform.split(',')[1]) - 10}px)`;
            cursorTrail.style.borderColor = 'rgba(255,255,255,0.3)';
        });
        el.addEventListener('mouseleave', () => {
            cursorTrail.style.width = '20px';
            cursorTrail.style.height = '20px';
            cursorTrail.style.borderColor = 'rgba(255,255,255,0.15)';
        });
    });

    // ─── Intro Video ───────────────────────────────────────────
    const introOverlay = document.getElementById('introOverlay');
    const introVideo = document.getElementById('introVideo');

    if (introOverlay && introVideo) {
        // Lock scroll during intro
        document.body.classList.add('intro-active');
        document.body.style.opacity = '1';

        // When video ends → fade out overlay, reveal landing
        introVideo.addEventListener('ended', () => {
            introOverlay.classList.add('fade-out');
            document.body.classList.remove('intro-active');

            // Remove overlay from DOM after fade transition
            setTimeout(() => {
                introOverlay.classList.add('hidden');
            }, 2000);
        });

        // Click to skip intro
        introOverlay.addEventListener('click', () => {
            introVideo.pause();
            introOverlay.classList.add('fade-out');
            document.body.classList.remove('intro-active');

            setTimeout(() => {
                introOverlay.classList.add('hidden');
            }, 2000);
        });

        // Fallback: if video fails to load, remove overlay
        introVideo.addEventListener('error', () => {
            introOverlay.classList.add('hidden');
            document.body.classList.remove('intro-active');
        });
    } else {
        // No intro video → normal fade in
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });
    }

    // ─── Hero ASCII Dots Animation ──────────────────────────────
    const heroWaveCanvas = document.getElementById('heroWaveCanvas');
    if (heroWaveCanvas) {
        const ctx = heroWaveCanvas.getContext('2d');
        let asciiAnimId = null;
        let asciiTime = 0;
        let isHeroVisible = true;
        let lastFrameTime = 0;

        const GRID_SIZE = 60;
        const CHARS = '⠁⠂⠄⠈⠐⠠⡀⢀⠃⠅⠘⠨⠊⠋⠌⠍⠎⠏';
        const BG_COLOR = '#FCFCF7';

        // Mouse tracking
        const asciiMouse = { x: 0, y: 0 };

        // Wave sources (positions as 0-1 ratios, scaled to grid each frame)
        const waves = [];
        for (let i = 0; i < 3; i++) {
            waves.push({
                rx: 0.25 + Math.random() * 0.5,
                ry: 0.25 + Math.random() * 0.5,
                frequency: 0.2 + Math.random() * 0.3,
                amplitude: 0.5 + Math.random() * 0.5,
                phase: Math.random() * Math.PI * 2,
                speed: 0.5 + Math.random() * 0.5,
            });
        }

        function resizeAscii() {
            const rect = heroWaveCanvas.parentElement.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            heroWaveCanvas.width = rect.width * dpr;
            heroWaveCanvas.height = rect.height * dpr;
            heroWaveCanvas.style.width = rect.width + 'px';
            heroWaveCanvas.style.height = rect.height + 'px';
            ctx.scale(dpr, dpr);
            ctx.font = '18px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
        }

        resizeAscii();
        window.addEventListener('resize', resizeAscii);

        heroWaveCanvas.parentElement.addEventListener('mousemove', (e) => {
            const rect = heroWaveCanvas.getBoundingClientRect();
            asciiMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            asciiMouse.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        });

        // Pause when off-screen
        const asciiObserver = new IntersectionObserver((entries) => {
            isHeroVisible = entries[0].isIntersecting;
            if (isHeroVisible && !asciiAnimId) {
                lastFrameTime = performance.now();
                asciiAnimId = requestAnimationFrame(animateAscii);
            }
        }, { threshold: 0.05 });
        asciiObserver.observe(heroWaveCanvas.parentElement);

        function animateAscii(timestamp) {
            if (!isHeroVisible) { asciiAnimId = null; return; }

            const delta = Math.min((timestamp - lastFrameTime) / 1000, 0.1);
            lastFrameTime = timestamp;
            asciiTime += delta * 0.75;

            const rect = heroWaveCanvas.parentElement.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            // Dynamic grid proportional to viewport
            const CELL_SIZE = 10;
            const cols = Math.floor(w / CELL_SIZE);
            const rows = Math.floor(h / CELL_SIZE);

            // Mouse wave source (proportional to grid)
            const mouseX = (asciiMouse.x + 1) * cols / 2;
            const mouseY = (1 - asciiMouse.y) * rows / 2;
            const mouseWave = {
                x: mouseX, y: mouseY,
                frequency: 0.3, amplitude: 1,
                phase: asciiTime * 2, speed: 1,
            };

            const allWaves = waves.map(wv => ({
                x: wv.rx * cols, y: wv.ry * rows,
                frequency: wv.frequency, amplitude: wv.amplitude,
                phase: wv.phase, speed: wv.speed,
            }));
            allWaves.push(mouseWave);

            // Clear
            ctx.fillStyle = BG_COLOR;
            ctx.fillRect(0, 0, w, h);

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    let totalWave = 0;

                    for (let i = 0; i < allWaves.length; i++) {
                        const wv = allWaves[i];
                        const dx = x - wv.x;
                        const dy = y - wv.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const falloff = 1 / (1 + dist * 0.1);
                        totalWave += Math.sin(
                            dist * wv.frequency - asciiTime * wv.speed + wv.phase
                        ) * wv.amplitude * falloff;
                    }

                    if (Math.abs(totalWave) > 0.2) {
                        const normalized = (totalWave + 2) / 4;
                        const intensity = Math.min(1.0, Math.max(0, normalized));
                        const radius = 0.8 + intensity * 3;
                        const opacity = 0.5 + intensity * 0.5;
                        const cx = x * CELL_SIZE + CELL_SIZE / 2;
                        const cy = y * CELL_SIZE + CELL_SIZE / 2;

                        ctx.beginPath();
                        ctx.arc(cx, cy, radius, 0, Math.PI * 2);

                        if (intensity > 0.65) {
                            // High intensity → stroke only (outline)
                            ctx.strokeStyle = `rgba(0, 47, 255, ${opacity})`;
                            ctx.lineWidth = 1.8;
                            ctx.stroke();
                        } else {
                            // Normal → filled
                            ctx.fillStyle = `rgba(0, 47, 255, ${opacity})`;
                            ctx.fill();
                        }
                    }
                }
            }

            asciiAnimId = requestAnimationFrame(animateAscii);
        }

        lastFrameTime = performance.now();
        asciiAnimId = requestAnimationFrame(animateAscii);
    }

    // ─── Hero Image Trail Effect ────────────────────────────────
    const heroSection = document.getElementById('hero');
    const heroImageTrail = document.getElementById('heroImageTrail');

    if (heroSection && heroImageTrail) {
        let heroImages = [];
        let lastTrailTime = 0;
        let lastTrailX = 0;
        let lastTrailY = 0;
        let currentImageIndex = 0;
        const TRAIL_INTERVAL = 100;   // ms between images
        const MIN_DISTANCE = 25;       // min px cursor must move
        const MAX_TRAIL_IMAGES = 15;   // max visible at once
        const IMAGE_LIFETIME = 2100;   // ms before removal

        // Load image list from manifest (sorted alphabetically)
        fetch('assets/img/heroimg/images.json')
            .then(res => res.json())
            .then(images => {
                images.sort();
                heroImages = images.map(name => `assets/img/heroimg/${name}`);
                // Preload images
                heroImages.forEach(src => {
                    const img = new Image();
                    img.src = src;
                });
            })
            .catch(() => {
                console.warn('Could not load hero images manifest.');
            });

        heroSection.addEventListener('mousemove', (e) => {
            if (heroImages.length === 0) return;

            const now = Date.now();
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Check time and distance threshold
            const dx = x - lastTrailX;
            const dy = y - lastTrailY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (now - lastTrailTime < TRAIL_INTERVAL || dist < MIN_DISTANCE) return;

            lastTrailTime = now;
            lastTrailX = x;
            lastTrailY = y;

            // Pick next image in order, cycle back
            const src = heroImages[currentImageIndex];
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;

            // Create image element
            const img = document.createElement('img');
            img.src = src;
            img.className = 'trail-image';
            img.style.left = `${x - 100}px`;  // center the 200px image
            img.style.top = `${y - 140}px`;   // center the 280px image

            heroImageTrail.appendChild(img);

            // Limit max visible images
            const trailImages = heroImageTrail.querySelectorAll('.trail-image');
            if (trailImages.length > MAX_TRAIL_IMAGES) {
                trailImages[0].remove();
            }

            // Remove after animation completes
            setTimeout(() => {
                if (img.parentNode) img.remove();
            }, IMAGE_LIFETIME);
        });
    }

});
