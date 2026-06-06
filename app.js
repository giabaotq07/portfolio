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





});
