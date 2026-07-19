document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const welcomeScreen = document.querySelector('.wrapper'); 
    const authForm = document.querySelector('.auth-form');
    const tumblerLogin = document.getElementById('tumblerLogin');
    const tumblerRegistr = document.getElementById('tumblerRegistr');
    const authTitle = document.getElementById('authTittle');
    const authSubtitle = document.getElementById('authSubtittle');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const authSubmitBtn = document.querySelector('.auth-submit-btn');
    const mainPage = document.getElementById('mainPage');
    const tasksPage = document.getElementById('tasksPage');
    const profilePage = document.getElementById('profilePage');
    const allFundsPage = document.getElementById('allFundsPage');
    const globalBottomNav = document.getElementById('globalBottomNav');
    const userGreeting = document.getElementById('userGreeting');
    const profileUsername = document.getElementById('profileUsername');
    const profileEmail = document.getElementById('profileEmail');
    const profileAvatar = document.getElementById('profileAvatar');
    const logoutBtn = document.getElementById('profileLogoutBtn');
    const navHomeBtn = document.getElementById('navHomeBtn');
    const navTasksBtn = document.getElementById('navTasksBtn');
    const navProfileBtn = document.getElementById('navProfileBtn');
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    const myTasksBtn = document.getElementById('myTasksBtn');
    const myFundsBtn = document.getElementById('myFundsBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const taskCards = document.querySelectorAll('.task-card');
    const bannerBtn = document.getElementById('bannerBtn');
    const showAllFundsLink = document.querySelector('.show-all');
    const backFromFunds = document.getElementById('backFromFunds');
    const progressCount = document.querySelector('.progress-count');
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const completedTasksEl = document.getElementById('completedTasks');
    const totalMoneyEl = document.getElementById('totalMoney');
    const remainingTasksEl = document.getElementById('remainingTasks');
    let loggedInName = '';
    let loggedInEmail = '';
    let appState = JSON.parse(localStorage.getItem('pawHope_stats')) || {
        completedToday: 0,
        maxDailyTasks: 6,
        totalMoney: 0,
        totalTasksCompleted: 0
    };
    function getAvatarLetter(name) {
        return name && name.length > 0 ? name.charAt(0).toUpperCase() : 'U';
    }
    function updateStatsUI() {
        if (progressCount) progressCount.textContent = `${appState.completedToday}/${appState.maxDailyTasks}`;
        if (progressBarFill) {
            const percentage = (appState.completedToday / appState.maxDailyTasks) * 100;
            progressBarFill.style.width = `${percentage}%`;
        }
        if (completedTasksEl) completedTasksEl.textContent = appState.totalTasksCompleted;
        if (totalMoneyEl) totalMoneyEl.textContent = `₽ ${appState.totalMoney.toLocaleString('ru-RU')}`;
        if (remainingTasksEl) remainingTasksEl.textContent = appState.maxDailyTasks - appState.completedToday;
    }
    function saveState() {
        localStorage.setItem('pawHope_stats', JSON.stringify(appState));
    }
    function switchPage(toPage) {
        const activePage = document.querySelector('.main-page.active') || 
                           document.querySelector('.profile-page.active') || 
                           document.querySelector('.tasks-page.active') ||
                           document.querySelector('.all-funds-page.active');
        
        if (activePage && activePage !== toPage) {
            activePage.classList.add('page-exit');
            setTimeout(() => {
                activePage.classList.remove('active', 'page-exit');
                toPage.classList.add('active', 'page-enter');
                setTimeout(() => {
                    toPage.classList.remove('page-enter');
                }, 500);
            }, 400);
        } else if (!activePage) {
            toPage.classList.add('active', 'page-enter');
            setTimeout(() => {
                toPage.classList.remove('page-enter');
            }, 500);
        }
    }
    updateStatsUI();
    if (startBtn && welcomeScreen && authForm) {
        startBtn.addEventListener('click', () => {
            welcomeScreen.classList.add('page-exit');
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                welcomeScreen.classList.remove('active');
                authForm.style.display = 'block';
                authForm.classList.add('active', 'page-enter');
                setTimeout(() => {
                    authForm.classList.remove('page-enter');
                }, 500);
            }, 400);
        });
    }
    if (tumblerLogin && tumblerRegistr) {
        tumblerLogin.addEventListener('click', () => {
            tumblerLogin.classList.add('active');
            tumblerRegistr.classList.remove('active');
            if (nameInput) nameInput.classList.add('hidden');
            authTitle.textContent = 'Вход в аккаунт';
            authSubtitle.textContent = 'Войдите, чтобы продолжить выполнять задания и следить за прогрессом.';
            authSubmitBtn.textContent = 'Войти';
        });
        tumblerRegistr.addEventListener('click', () => {
            tumblerRegistr.classList.add('active');
            tumblerLogin.classList.remove('active');
            if (nameInput) nameInput.classList.remove('hidden');
            authTitle.textContent = 'Создать аккаунт';
            authSubtitle.textContent = 'Зарегистрируйтесь, чтобы начать выполнять задания.';
            authSubmitBtn.textContent = 'Зарегистрироваться';
        });
    }
    if (authSubmitBtn && authForm && mainPage) {
        authSubmitBtn.addEventListener('click', () => {
            const emailValue = emailInput ? emailInput.value.trim() : '';
            const isRegMode = tumblerRegistr.classList.contains('active');
            let finalName = 'Пользователь'; 
            loggedInEmail = emailValue;
            if (isRegMode) {
                const enteredName = nameInput ? nameInput.value.trim() : '';
                if (enteredName) {
                    finalName = enteredName;
                    if (emailValue) {
                        localStorage.setItem(`user_name_${emailValue.toLowerCase()}`, finalName);
                    }
                }
            } else {
                if (emailValue) {
                    const savedName = localStorage.getItem(`user_name_${emailValue.toLowerCase()}`);
                    if (savedName) {
                        finalName = savedName; 
                    } else if (emailValue.includes('@')) {
                        const partBeforeAt = emailValue.split('@')[0];
                        finalName = partBeforeAt.charAt(0).toUpperCase() + partBeforeAt.slice(1);
                    }
                }
            }
            loggedInName = finalName;
            if (userGreeting) userGreeting.textContent = `Добро пожаловать, ${loggedInName}`;
            if (profileUsername) profileUsername.textContent = loggedInName;
            if (profileEmail) profileEmail.textContent = loggedInEmail || 'email@example.com';
            if (profileAvatar) profileAvatar.textContent = getAvatarLetter(loggedInName);
            authForm.classList.add('page-exit');
            setTimeout(() => {
                authForm.style.display = 'none';
                authForm.classList.remove('active', 'page-exit');
                mainPage.classList.add('active', 'page-enter');
                if (globalBottomNav) globalBottomNav.classList.remove('hidden');
                navItems.forEach(nav => nav.classList.remove('active'));
                if (navHomeBtn) navHomeBtn.classList.add('active');
                setTimeout(() => {
                    mainPage.classList.remove('page-enter');
                }, 500);
            }, 400);
        });
    }
    if (navHomeBtn && navTasksBtn && navProfileBtn) {
        navHomeBtn.addEventListener('click', () => {
            if (allFundsPage.classList.contains('active')) {
                allFundsPage.classList.remove('active');
                mainPage.classList.add('active');
            } else {
                switchPage(mainPage);
            }
            navItems.forEach(nav => nav.classList.remove('active'));
            navHomeBtn.classList.add('active');
        });
        navTasksBtn.addEventListener('click', () => {
            switchPage(tasksPage);
            navItems.forEach(nav => nav.classList.remove('active'));
            navTasksBtn.classList.add('active');
        });
        navProfileBtn.addEventListener('click', () => {
            switchPage(profilePage);
            navItems.forEach(nav => nav.classList.remove('active'));
            navProfileBtn.classList.add('active');
        });
    }
    if (bannerBtn) {
        bannerBtn.addEventListener('click', () => {
            switchPage(tasksPage);
            navItems.forEach(nav => nav.classList.remove('active'));
            if (navTasksBtn) navTasksBtn.classList.add('active');
        });
    }
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterType = btn.getAttribute('data-filters');
            
            taskCards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                
                if (filterType === 'all') {
                    card.style.display = 'flex';
                } else if (filterType === 'easy' && cardType === 'easy') {
                    card.style.display = 'flex';
                } else if (filterType === 'daily' && cardType === 'daily') {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    const tasksList = document.querySelector('.tasks-list');
    if (tasksList) {
        tasksList.addEventListener('click', (e) => {
            if (e.target.classList.contains('task-plus-btn')) {
                const btn = e.target;
                if (btn.classList.contains('completed')) return;

                if (appState.completedToday >= appState.maxDailyTasks) {
                    alert('Вы выполнили все доступные задания на сегодня! Возвращайтесь завтра.');
                    return;
                }
                const card = btn.closest('.task-card');
                const priceText = card.querySelector('.task-price').textContent;
                const price = parseInt(priceText.replace(/\D/g, ''), 10);
                appState.completedToday++;
                appState.totalTasksCompleted++;
                appState.totalMoney += price;
                saveState();
                updateStatsUI();
                btn.classList.add('completed');
                btn.textContent = '✓';
                btn.disabled = true;
                card.classList.add('completed');
            }
        });
    }
    if (myTasksBtn) {
        myTasksBtn.addEventListener('click', () => {
            switchPage(tasksPage);
            navItems.forEach(nav => nav.classList.remove('active'));
            if (navTasksBtn) navTasksBtn.classList.add('active');
        });
    }
    if (myFundsBtn) {
        myFundsBtn.addEventListener('click', () => {
            switchPage(allFundsPage);
        });
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            profilePage.classList.add('page-exit');
            if (globalBottomNav) globalBottomNav.classList.add('hidden');
            setTimeout(() => {
                profilePage.classList.remove('active', 'page-exit');
                if (nameInput) nameInput.value = '';
                if (emailInput) emailInput.value = '';                               
                if (tumblerLogin) tumblerLogin.click();
                authForm.style.display = 'block';
                authForm.classList.add('active', 'page-enter');
                setTimeout(() => {
                    authForm.classList.remove('page-enter');
                }, 500);
            }, 400);
        });
    }
    if (showAllFundsLink) {
        showAllFundsLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchPage(allFundsPage);
        });
    }
    if (backFromFunds) {
        backFromFunds.addEventListener('click', (e) => {
            e.preventDefault();
            switchPage(mainPage);
            navItems.forEach(nav => nav.classList.remove('active'));
            if (navHomeBtn) navHomeBtn.classList.add('active');
        });
    }
});