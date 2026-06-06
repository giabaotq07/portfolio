document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       TAB SWITCHING SYSTEM (MAIN SECTIONS)
       ========================================================================== */
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanels = document.querySelectorAll('.tab-panel');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items and tab panels
            navItems.forEach(nav => nav.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');
            
            // Show corresponding panel
            const tabId = `tab-${item.getAttribute('data-tab')}`;
            const targetPanel = document.getElementById(tabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                // Add fade-in-up class to re-trigger animation
                const animatedElements = targetPanel.querySelectorAll('.fade-in-up');
                animatedElements.forEach(el => {
                    el.style.animation = 'none';
                    el.offsetHeight; // Trigger reflow
                    el.style.animation = null;
                });
            }

            // Close mobile menu if open
            const sidebar = document.querySelector('.sidebar');
            if (sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
            }
        });
    });

    /* ==========================================================================
       EXERCISE NAVIGATION SYSTEM (SUB TABS)
       ========================================================================== */
    const exNavBtns = document.querySelectorAll('.ex-nav-btn');
    const exPanels = document.querySelectorAll('.ex-panel');

    exNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all sub-buttons and panels
            exNavBtns.forEach(b => b.classList.remove('active'));
            exPanels.forEach(p => p.classList.remove('active-ex-panel'));

            // Activate clicked button
            btn.classList.add('active');

            // Show corresponding panel
            const exId = `ex-${btn.getAttribute('data-ex')}`;
            const targetExPanel = document.getElementById(exId);
            if (targetExPanel) {
                targetExPanel.classList.add('active-ex-panel');
            }
        });
    });

    /* ==========================================================================
       INTERACTIVE FOLDER TREE
       ========================================================================== */
    const folderNodes = document.querySelectorAll('.tree-node:not(.leaf)');

    folderNodes.forEach(node => {
        // Find toggle span and folder name element within the current node level
        const toggleBtn = node.querySelector(':scope > .tree-toggle');
        const nodeName = node.querySelector(':scope > .node-name');
        const childrenContainer = node.querySelector(':scope > .tree-children');

        const toggleFolder = (e) => {
            e.stopPropagation(); // Prevent bubbling up to parent nodes
            if (childrenContainer) {
                const isCollapsed = childrenContainer.classList.toggle('collapsed');
                if (toggleBtn) {
                    toggleBtn.textContent = isCollapsed ? '▶' : '▼';
                }
            }
        };

        if (toggleBtn) toggleBtn.addEventListener('click', toggleFolder);
        if (nodeName) nodeName.addEventListener('click', toggleFolder);
    });

    /* ==========================================================================
       DARK / LIGHT THEME TOGGLE
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcons(newTheme);
    });

    function updateThemeIcons(theme) {
        if (theme === 'light') {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    }

    /* ==========================================================================
       MOBILE MENU TOGGLE
       ========================================================================== */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('mobile-open');
        });

        // Close sidebar if user clicks outside of it
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== mobileMenuToggle) {
                sidebar.classList.remove('mobile-open');
            }
        });
    }

    /* ==========================================================================
       SCROLL PROGRESS BAR
       ========================================================================== */
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            progressBar.style.width = scrolled + '%';
        });
    }

    /* ==========================================================================
       PRINT CV FUNCTIONALITY
       ========================================================================== */
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    /* ==========================================================================
       HYBRID VIDEO PLAYER LOADER (Offline local player vs Online YouTube embed)
       ========================================================================== */
    const videoWrapper = document.getElementById('video-wrapper');
    if (videoWrapper) {
        if (window.location.protocol === 'file:') {
            // Render local custom video player (uses the local 250MB group video file)
            videoWrapper.innerHTML = `
                <div class="video-container" id="custom-video-player">
                    <video id="main-video" class="video-media" preload="metadata" playsinline>
                        <source src="Bài tập dự án/videoBai4.mp4" type="video/mp4">
                        Trình duyệt của bạn không hỗ trợ tag video.
                    </video>
                    <div class="video-overlay" id="video-overlay">
                        <div class="video-header">
                            <span class="video-badge-live">Chế độ Offline (Gốc)</span>
                            <span class="video-time-text" id="video-time">00:00 / 00:00</span>
                        </div>
                        <div class="video-play-btn" id="video-play-btn" title="Phát video">
                            <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            <svg class="pause-icon hidden" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                        </div>
                        <div class="video-footer">
                            <div class="video-title-text">Kịch bản chi tiết & Bản dựng Video nhóm 8 - Editor: Lý Gia Bảo</div>
                            <div class="video-controls" style="margin-top: 0.5rem;">
                                <div class="video-timeline" id="video-timeline">
                                    <div class="video-timeline-progress" id="video-progress" style="width: 0%;"></div>
                                </div>
                                <button id="video-fullscreen-btn" class="video-fullscreen-btn" title="Toàn màn hình">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            initializeLocalPlayer();
        } else {
            // Render YouTube iframe player (runs online without Referrer block Error 153)
            videoWrapper.innerHTML = `
                <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 600px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color); box-shadow: var(--shadow-md); margin-top: 1.5rem;">
                    <iframe 
                        src="https://www.youtube.com/embed/__ud-eQt0_E" 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen 
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;">
                    </iframe>
                </div>
            `;
        }
    }

    function initializeLocalPlayer() {
        const video = document.getElementById('main-video');
        const playBtn = document.getElementById('video-play-btn');
        const playIcon = playBtn ? playBtn.querySelector('.play-icon') : null;
        const pauseIcon = playBtn ? playBtn.querySelector('.pause-icon') : null;
        const videoProgressBar = document.getElementById('video-progress');
        const videoTimeline = document.getElementById('video-timeline');
        const videoTimeText = document.getElementById('video-time');
        const videoContainer = document.getElementById('custom-video-player');
        const videoOverlay = document.getElementById('video-overlay');
        const fullscreenBtn = document.getElementById('video-fullscreen-btn');

        if (video && playBtn && videoContainer) {
            // Format time helper (mm:ss)
            function formatTime(seconds) {
                const m = Math.floor(seconds / 60).toString().padStart(2, '0');
                const s = Math.floor(seconds % 60).toString().padStart(2, '0');
                return `${m}:${s}`;
            }

            // Update time display when metadata loads
            video.addEventListener('loadedmetadata', () => {
                if (videoTimeText) {
                    videoTimeText.textContent = `00:00 / ${formatTime(video.duration)}`;
                }
            });

            // Fallback if metadata already loaded
            if (video.duration && videoTimeText) {
                videoTimeText.textContent = `00:00 / ${formatTime(video.duration)}`;
            }

            // Toggle Play / Pause
            function togglePlay() {
                if (video.paused) {
                    video.play();
                    videoContainer.classList.add('playing');
                    if (playIcon) playIcon.classList.add('hidden');
                    if (pauseIcon) pauseIcon.classList.remove('hidden');
                } else {
                    video.pause();
                    videoContainer.classList.remove('playing');
                    if (playIcon) playIcon.classList.remove('hidden');
                    if (pauseIcon) pauseIcon.classList.add('hidden');
                }
            }

            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                togglePlay();
            });

            // Clicking anywhere on the overlay (except controls) will play/pause
            if (videoOverlay) {
                videoOverlay.addEventListener('click', (e) => {
                    const isControlElement = e.target.closest('#video-play-btn') || 
                                             e.target.closest('#video-timeline') || 
                                             e.target.closest('#video-fullscreen-btn');
                    if (!isControlElement) {
                        togglePlay();
                    }
                });
            }

            video.addEventListener('click', (e) => {
                e.stopPropagation();
                togglePlay();
            });

            // Fullscreen functionality
            if (fullscreenBtn) {
                fullscreenBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (!document.fullscreenElement && 
                        !document.webkitFullscreenElement && 
                        !document.msFullscreenElement) {
                        if (videoContainer.requestFullscreen) {
                            videoContainer.requestFullscreen();
                        } else if (videoContainer.webkitRequestFullscreen) {
                            videoContainer.webkitRequestFullscreen();
                        } else if (videoContainer.msRequestFullscreen) {
                            videoContainer.msRequestFullscreen();
                        }
                    } else {
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                        } else if (document.msExitFullscreen) {
                            document.msExitFullscreen();
                        }
                    }
                });
            }

            // Update progress bar & time text
            video.addEventListener('timeupdate', () => {
                if (video.duration) {
                    const percentage = (video.currentTime / video.duration) * 100;
                    if (videoProgressBar) videoProgressBar.style.width = percentage + '%';
                    if (videoTimeText) {
                        videoTimeText.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
                    }
                }
            });

            // Handle video end
            video.addEventListener('ended', () => {
                videoContainer.classList.remove('playing');
                if (playIcon) playIcon.classList.remove('hidden');
                if (pauseIcon) pauseIcon.classList.add('hidden');
                if (videoProgressBar) videoProgressBar.style.width = '0%';
            });

            // Click on timeline to seek
            if (videoTimeline) {
                videoTimeline.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const rect = videoTimeline.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const width = rect.width;
                    if (width > 0 && video.duration) {
                        const newTime = (clickX / width) * video.duration;
                        video.currentTime = newTime;
                    }
                });
            }
        }
    }

});
