// 视频数据
const videosData = [
    {
        id: 1,
        title: '🌿 探索大自然的美丽瞬间，记录生活中的每一份感动',
        author: '@旅行者小明',
        avatar: 'assets/avatar.svg',
        date: '3月15日',
        likes: 128000,
        comments: 3286,
        duration: '03:00',
        video: 'assets/videos/nature.mp4',
        category: 'travel',
        description: '🌿 探索大自然的美丽瞬间，记录生活中的每一份感动 #自然风光 #旅行日记 #治愈系'
    },
    {
        id: 2,
        title: '🍜 地道美食探店，发现城市里的美味宝藏',
        author: '@美食达人',
        avatar: 'assets/avatar.svg',
        date: '3月14日',
        likes: 85600,
        comments: 1523,
        duration: '02:30',
        video: 'assets/videos/food.mp4',
        category: 'food',
        description: '🍜 地道美食探店，发现城市里的美味宝藏，今天带大家打卡这家超火的网红餐厅 #美食探店 #城市味道'
    },
    {
        id: 3,
        title: '💄 新手必看！日常妆容教程，5分钟搞定',
        author: '@美妆博主Lily',
        avatar: 'assets/avatar.svg',
        date: '3月13日',
        likes: 156000,
        comments: 4521,
        duration: '05:20',
        video: 'assets/videos/beauty.mp4',
        category: 'beauty',
        description: '💄 新手必看！日常妆容教程，5分钟搞定，手残党也能学会的日常妆容 #美妆教程 #新手化妆'
    },
    {
        id: 4,
        title: '🎵 超治愈钢琴曲，放松心情的最佳选择',
        author: '@音乐空间',
        avatar: 'assets/avatar.svg',
        date: '3月12日',
        likes: 67800,
        comments: 892,
        duration: '04:15',
        video: 'assets/videos/nature.mp4',
        category: 'music',
        description: '🎵 超治愈钢琴曲，放松心情的最佳选择，睡前必听 #音乐 #治愈系'
    },
    {
        id: 5,
        title: '🎮 游戏高能时刻集锦，精彩操作秀翻全场',
        author: '@游戏达人',
        avatar: 'assets/avatar.svg',
        date: '3月11日',
        likes: 98700,
        comments: 2341,
        duration: '03:45',
        video: 'assets/videos/food.mp4',
        category: 'game',
        description: '🎮 游戏高能时刻集锦，精彩操作秀翻全场 #游戏 #高能时刻'
    },
    {
        id: 6,
        title: '🚀 科技前沿，最新科技产品深度测评',
        author: '@科技先锋',
        avatar: 'assets/avatar.svg',
        date: '3月10日',
        likes: 45600,
        comments: 1234,
        duration: '06:30',
        video: 'assets/videos/beauty.mp4',
        category: 'tech',
        description: '🚀 科技前沿，最新科技产品深度测评，带你了解黑科技 #科技 #测评'
    }
];

// 评论数据
const commentsData = [
    { id: 1, author: '用户A', avatar: 'assets/avatar.svg', time: '2小时前', text: '太美了！求bgm是什么？', likes: 234 },
    { id: 2, author: '用户B', avatar: 'assets/avatar.svg', time: '3小时前', text: '这是哪里拍的？太美了！', likes: 156 },
    { id: 3, author: '用户C', avatar: 'assets/avatar.svg', time: '5小时前', text: '已收藏，下次旅行一定要去', likes: 89 },
    { id: 4, author: '用户D', avatar: 'assets/avatar.svg', time: '8小时前', text: '画质太棒了，怎么拍的？求教程', likes: 432 },
    { id: 5, author: '用户E', avatar: 'assets/avatar.svg', time: '12小时前', text: '治愈了我一天的疲惫', likes: 567 }
];

// 用户状态
let currentVideoId = 1;
let likedVideos = new Set();
let collectedVideos = new Set();
// 关注状态改由 Store 统一管理（见 js/storage.js），跨页面同步、刷新不丢

// DOM 元素
const mainVideo = document.getElementById('mainVideo');
const videoGrid = document.getElementById('videoGrid');
const commentModal = document.getElementById('commentModal');
const shareModal = document.getElementById('shareModal');
const uploadModal = document.getElementById('uploadModal');
const commentsList = document.getElementById('commentsList');
const searchInput = document.getElementById('searchInput');

// 格式化数字
function formatNumber(num) {
    if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万';
    }
    return num.toString();
}

// 渲染视频列表
function renderVideoList(category = 'all') {
    let filteredVideos = videosData;

    if (category !== 'all') {
        filteredVideos = videosData.filter(v => v.category === category);
    }

    videoGrid.innerHTML = filteredVideos.map(video => `
        <div class="video-card ${video.id === currentVideoId ? 'playing' : ''}" data-video-id="${video.id}">
            <div class="video-thumbnail">
                <img src="${video.cover || 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%2768%27 viewBox=%270 0 120 68%27%3E%3Crect fill=%27%232a2a2a%27 width=%27120%27 height=%2768%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%23aaa%27 font-size=%2714%27%3E▶️ 播放%3C/text%3E%3C/svg%3E'}" alt="${video.title}">
                <span class="duration">${video.duration}</span>
            </div>
            <div class="video-card-info">
                <div class="video-card-title">${video.title}</div>
                <div class="video-card-meta">
                    <span class="video-card-author">${video.author}</span>
                    <span class="video-card-stats">❤️ ${formatNumber(video.likes)}</span>
                </div>
            </div>
        </div>
    `).join('');

    // 添加点击事件
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            const videoId = parseInt(card.dataset.videoId);
            playVideo(videoId);
        });
    });
}

// 播放视频
function playVideo(videoId) {
    const video = videosData.find(v => v.id === videoId);
    if (!video) return;

    currentVideoId = videoId;

    // 更新视频源
    mainVideo.querySelector('source').src = video.video;
    mainVideo.load();
    mainVideo.play().catch(() => {});

    // 更新视频信息
    document.querySelector('.author-name').textContent = video.author;
    document.querySelector('.publish-date').textContent = video.date;
    document.querySelector('.video-description p').textContent = video.description;

    // 更新互动按钮状态
    updateInteractionButtons(video);

    // 更新播放状态
    document.querySelectorAll('.video-card').forEach(card => {
        card.classList.toggle('playing', parseInt(card.dataset.videoId) === videoId);
    });
}

// 更新互动按钮状态
function updateInteractionButtons(video) {
    const likeBtn = document.querySelector('.like-btn');
    const collectBtn = document.querySelector('.collect-btn');
    const followBtn = document.querySelector('.follow-btn');

    likeBtn.querySelector('.count').textContent = formatNumber(video.likes);
    likeBtn.classList.toggle('liked', likedVideos.has(video.id));

    collectBtn.classList.toggle('collected', collectedVideos.has(video.id));

    const following = Store.isFollowing(video.author);
    followBtn.classList.toggle('following', following);
    followBtn.textContent = following ? '已关注' : '+ 关注';
}

// 点赞功能
document.querySelector('.like-btn').addEventListener('click', function() {
    if (likedVideos.has(currentVideoId)) {
        likedVideos.delete(currentVideoId);
        videosData.find(v => v.id === currentVideoId).likes--;
        this.classList.remove('liked');
    } else {
        likedVideos.add(currentVideoId);
        videosData.find(v => v.id === currentVideoId).likes++;
        this.classList.add('liked');
        // 添加点赞动画
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    }
    const video = videosData.find(v => v.id === currentVideoId);
    this.querySelector('.count').textContent = formatNumber(video.likes);
});

// 收藏功能
document.querySelector('.collect-btn').addEventListener('click', function() {
    if (collectedVideos.has(currentVideoId)) {
        collectedVideos.delete(currentVideoId);
        this.classList.remove('collected');
    } else {
        collectedVideos.add(currentVideoId);
        this.classList.add('collected');
    }
});

// 关注功能
document.querySelector('.follow-btn').addEventListener('click', function() {
    const video = videosData.find(v => v.id === currentVideoId);
    const author = video.author;
    const nowFollowing = Store.toggleFollow(author);
    this.classList.toggle('following', nowFollowing);
    this.textContent = nowFollowing ? '已关注' : '+ 关注';
});

// 评论功能
document.querySelector('.comment-btn').addEventListener('click', () => {
    commentModal.classList.add('show');
    renderComments();
});

// 分享功能
document.querySelector('.share-btn').addEventListener('click', () => {
    shareModal.classList.add('show');
});

// 上传功能
document.querySelector('.upload-btn').addEventListener('click', () => {
    uploadModal.classList.add('show');
});

// 关闭模态框
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        commentModal.classList.remove('show');
        shareModal.classList.remove('show');
        uploadModal.classList.remove('show');
    });
});

// 点击模态框背景关闭
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});

// 渲染评论
function renderComments() {
    commentsList.innerHTML = commentsData.map(comment => `
        <div class="comment-item" data-comment-id="${comment.id}">
            <div class="comment-header">
                <img src="${comment.avatar}" alt="${comment.author}" class="comment-avatar">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-time">${comment.time}</span>
            </div>
            <div class="comment-text">${comment.text}</div>
            <div class="comment-actions">
                <button class="comment-action-btn like-comment">❤️ ${comment.likes}</button>
                <button class="comment-action-btn">回复</button>
            </div>
        </div>
    `).join('');

    // 评论点赞
    document.querySelectorAll('.like-comment').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.color = '#fe2c55';
        });
    });
}

// 发送评论
document.querySelector('.send-comment-btn').addEventListener('click', () => {
    const input = document.getElementById('commentInput');
    const text = input.value.trim();

    if (text) {
        const newComment = {
            id: Date.now(),
            author: '我',
            avatar: 'assets/avatar.svg',
            time: '刚刚',
            text: text,
            likes: 0
        };
        commentsData.unshift(newComment);
        renderComments();
        input.value = '';

        // 更新评论数
        videosData.find(v => v.id === currentVideoId).comments++;
        document.querySelector('.comment-btn .count').textContent =
            formatNumber(videosData.find(v => v.id === currentVideoId).comments);
    }
});

// 分享选项点击
document.querySelectorAll('.share-option').forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.textContent;
        this.textContent = '✅ 已复制';
        setTimeout(() => {
            this.textContent = text;
            shareModal.classList.remove('show');
        }, 1000);
    });
});

// 分类标签切换
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderVideoList(this.dataset.category);
    });
});

// 搜索功能
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            const filtered = videosData.filter(v =>
                v.title.toLowerCase().includes(query) ||
                v.author.toLowerCase().includes(query) ||
                v.description.toLowerCase().includes(query)
            );
            videoGrid.innerHTML = '';
            if (filtered.length > 0) {
                renderVideoList('all');
                // 高亮匹配的
            }
        }
    }
});

// 导航切换
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        // 指向其它页面则跳转，同页仅切换高亮
        const target = this.getAttribute('href');
        if (target && target !== '#') {
            const current = window.location.pathname.split('/').pop() || 'index.html';
            if (!target.endsWith(current)) {
                window.location.href = target;
            }
        }
    });
});

// 播放暂停控制
const playPauseBtn = document.querySelector('.play-pause');
playPauseBtn.addEventListener('click', () => {
    if (mainVideo.paused) {
        mainVideo.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        mainVideo.pause();
        playPauseBtn.textContent = '▶️';
    }
});

// 视频播放状态同步
mainVideo.addEventListener('play', () => {
    playPauseBtn.textContent = '⏸️';
});

mainVideo.addEventListener('pause', () => {
    playPauseBtn.textContent = '▶️';
});

// 进度条更新
mainVideo.addEventListener('timeupdate', () => {
    const progress = (mainVideo.currentTime / mainVideo.duration) * 100;
    document.querySelector('.progress-fill').style.width = progress + '%';

    // 更新时间显示
    const current = formatTime(mainVideo.currentTime);
    const total = formatTime(mainVideo.duration || 180);
    document.querySelector('.time-display').textContent = `${current} / ${total}`;
});

// 时间格式化
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 点击进度条跳转
document.querySelector('.progress-bar').addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    mainVideo.currentTime = percent * mainVideo.duration;
});

// 全屏功能
document.querySelector('.fullscreen').addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.querySelector('.main-video-player').requestFullscreen();
    }
});

// 音量控制（静音按钮 + 音量滑块联动）
let isMuted = true;
const volumeBtn = document.querySelector('.volume');
const volumeSlider = document.getElementById('volumeSlider');

// 根据音量返回对应图标
function volumeIcon(vol, muted) {
    if (muted || vol === 0) return '🔇';
    if (vol < 0.5) return '🔈';
    return '🔊';
}

// 静音按钮：在静音与上次音量间切换
let lastVolume = 1;   // 记住取消静音时要恢复的音量
volumeBtn.addEventListener('click', function() {
    isMuted = !isMuted;
    mainVideo.muted = isMuted;
    if (!isMuted) {
        // 取消静音：恢复上次音量（若为0则用1）
        const v = lastVolume > 0 ? lastVolume : 1;
        mainVideo.volume = v;
        volumeSlider.value = Math.round(v * 100);
    }
    this.textContent = volumeIcon(mainVideo.volume, isMuted);
    mainVideo.play().catch(() => {});   // 用户主动点击，可解除自动播放限制
});

// 音量滑块：拖动调节音量，自动解除静音
volumeSlider.addEventListener('input', function() {
    const v = this.value / 100;
    mainVideo.volume = v;
    lastVolume = v;
    isMuted = v === 0;       // 拖到0视为静音
    mainVideo.muted = isMuted;
    volumeBtn.textContent = volumeIcon(v, isMuted);
});

// 上传区域：选择视频素材（复用首页真实视频文件作为发布内容）
const uploadArea = document.getElementById('uploadArea');
const uploadThemes = [
    { key: 'nature', label: '🏔️ 自然风光', video: 'assets/videos/nature.mp4', cover: 'assets/nature_cover.jpg' },
    { key: 'food', label: '🍜 美食推荐', video: 'assets/videos/food.mp4', cover: 'assets/food_cover.jpg' },
    { key: 'beauty', label: '💄 美妆护肤', video: 'assets/videos/beauty.mp4', cover: 'assets/beauty_cover.jpg' }
];
let selectedTheme = null;

function renderUploadArea() {
    const themeBtns = uploadThemes.map(x => {
        const on = x.key === selectedTheme;
        const style = on
            ? 'padding:8px 14px;border-radius:8px;border:1px solid #fe2c55;background:#fe2c55;color:#fff;cursor:pointer;font-size:14px;'
            : 'padding:8px 14px;border-radius:8px;border:1px solid #fe2c55;background:transparent;color:#fe2c55;cursor:pointer;font-size:14px;';
        return `<button type="button" class="theme-pick" data-theme="${x.key}" style="${style}">${x.label}</button>`;
    }).join('');

    if (selectedTheme) {
        const t = uploadThemes.find(x => x.key === selectedTheme);
        uploadArea.innerHTML = `
            <div class="upload-icon">✅</div>
            <p>已选择素材：<strong>${t.label}</strong></p>
            <small>可点击下方其它主题更换</small>
            <div style="margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">${themeBtns}</div>
        `;
    } else {
        uploadArea.innerHTML = `
            <div class="upload-icon">📹</div>
            <p>选择一个视频素材来发布你的作品</p>
            <small>从下方主题中选择（演示用真实视频素材）</small>
            <div style="margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">${themeBtns}</div>
        `;
    }

    uploadArea.querySelectorAll('.theme-pick').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedTheme = btn.dataset.theme;
            renderUploadArea();
        });
    });
}
renderUploadArea();

// 发布视频
document.querySelector('.upload-submit-btn').addEventListener('click', function() {
    const title = document.getElementById('videoTitle').value.trim();
    const desc = document.getElementById('videoDesc').value.trim();

    if (!selectedTheme) {
        alert('请先选择一个视频素材');
        return;
    }
    if (!title) {
        alert('请填写视频标题');
        return;
    }

    const theme = uploadThemes.find(x => x.key === selectedTheme);
    const profile = Store.getProfile();
    const newVideo = {
        id: Date.now(),
        title: title,
        author: profile.nickname,      // 作者 = 当前登录用户
        avatar: profile.avatar,
        date: '刚刚',
        likes: 0,
        comments: 0,
        duration: '00:10',
        video: theme.video,
        cover: theme.cover,
        category: theme.key,
        description: desc || title,
        isMine: true
    };
    Store.addUpload(newVideo);
    videosData.unshift(newVideo);

    this.textContent = '发布成功！';
    this.style.backgroundColor = '#28a745';
    setTimeout(() => {
        uploadModal.classList.remove('show');
        this.textContent = '发布视频';
        this.style.backgroundColor = '';
        document.getElementById('videoTitle').value = '';
        document.getElementById('videoDesc').value = '';
        selectedTheme = null;
        renderUploadArea();
        renderVideoList();
        playVideo(newVideo.id);   // 发布后自动播放自己的新作品
    }, 1200);
});

// 推荐视频 展开/收起（默认收起，状态记入本地存储）
const videoContainer = document.querySelector('.video-container');
const toggleVideoListBtn = document.getElementById('toggleVideoList');
const LIST_COLLAPSED_KEY = 'videohub_list_collapsed';

function applyListCollapsed(collapsed) {
    videoContainer.classList.toggle('list-collapsed', collapsed);
    toggleVideoListBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    localStorage.setItem(LIST_COLLAPSED_KEY, collapsed ? '1' : '0');
}

// 初始状态：默认收起（首次访问）；之后读上次记录
let listCollapsed = localStorage.getItem(LIST_COLLAPSED_KEY);
listCollapsed = listCollapsed === null ? true : listCollapsed === '1';
applyListCollapsed(listCollapsed);

toggleVideoListBtn.addEventListener('click', () => {
    listCollapsed = !listCollapsed;
    applyListCollapsed(listCollapsed);
});

// 快捷键支持
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch(e.code) {
        case 'Space':
            e.preventDefault();
            if (mainVideo.paused) {
                mainVideo.play();
            } else {
                mainVideo.pause();
            }
            break;
        case 'ArrowLeft':
            mainVideo.currentTime -= 5;
            break;
        case 'ArrowRight':
            mainVideo.currentTime += 5;
            break;
        case 'KeyM':
            isMuted = !isMuted;
            mainVideo.muted = isMuted;
            if (!isMuted) {
                mainVideo.volume = lastVolume > 0 ? lastVolume : 1;
                volumeSlider.value = Math.round(mainVideo.volume * 100);
            }
            volumeBtn.textContent = volumeIcon(mainVideo.volume, isMuted);
            break;
        case 'KeyF':
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.querySelector('.main-video-player').requestFullscreen();
            }
            break;
    }
});

// 合并本地已上传作品到视频列表（我的作品也会出现在首页推荐）
Store.getUploads().forEach(v => videosData.unshift(v));

// 初始化
renderVideoList();
renderComments();
Store.applyProfileToUI();

// 支持 ?v=<id> 直接播放指定视频（从"我的作品"点击跳转用）
const vParam = new URLSearchParams(window.location.search).get('v');
const vId = vParam ? parseInt(vParam) : NaN;
if (vId && videosData.find(v => v.id === vId)) {
    playVideo(vId);
}

// 视频错误处理（防止视频不存在时出错）
mainVideo.addEventListener('error', () => {
    console.log('Video load error, using fallback display');
});

// 手机端：上下滑动切换视频（上滑=下一个，下滑=上一个）
// 按可播放的视频列表顺序循环；与进度条/控制条等点击区分，仅识别纵向大幅滑动
const playerEl = document.querySelector('.main-video-player');
let touchStartY = null;
let touchStartX = null;
let touchStartT = 0;

playerEl.addEventListener('touchstart', (e) => {
    // 单指起始点记录（用于判断滑动方向）
    const t = e.changedTouches[0];
    touchStartY = t.clientY;
    touchStartX = t.clientX;
    touchStartT = Date.now();
}, { passive: true });

playerEl.addEventListener('touchend', (e) => {
    if (touchStartY === null) return;
    const t = e.changedTouches[0];
    const dy = touchStartY - t.clientY;    // 正=上滑(下一个)，负=下滑(上一个)
    const dx = touchStartX - t.clientX;
    const dt = Date.now() - touchStartT;
    touchStartY = null;

    // 横向滑动幅度更大时不处理（避免与其它横向手势冲突）
    if (Math.abs(dx) > Math.abs(dy)) return;
    // 距离过小或时间过长（疑似拖动进度）不触发
    if (Math.abs(dy) < 50 || dt > 800) return;

    // 排除点在控制条/互动按钮上的情况
    const target = e.target;
    if (target.closest('.video-controls') || target.closest('.interaction-panel') || target.closest('.video-info')) {
        return;
    }

    const idx = videosData.findIndex(v => v.id === currentVideoId);
    if (idx < 0) return;
    let next;
    if (dy > 0) {
        next = videosData[(idx + 1) % videosData.length];
    } else {
        next = videosData[(idx - 1 + videosData.length) % videosData.length];
    }
    playVideo(next.id);
}, { passive: true });

// ===== 手机端：抽屉菜单 =====
const menuToggle = document.getElementById('menuToggle');
const sidebarEl = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function setSidebar(open) {
    sidebarEl.classList.toggle('open', open);
    sidebarOverlay.classList.toggle('show', open);
}
menuToggle.addEventListener('click', () => setSidebar(!sidebarEl.classList.contains('open')));
sidebarOverlay.addEventListener('click', () => setSidebar(false));
// 点击菜单项后自动收起
document.querySelectorAll('.sidebar .nav-item').forEach(item => {
    item.addEventListener('click', () => setSidebar(false));
});

// ===== 视频中央暂停指示器（点画面切换播放/暂停，抖音风）=====
const centerIndicator = document.getElementById('centerPlayIndicator');

function showCenterIndicator() {
    centerIndicator.classList.add('show');
    clearTimeout(centerIndicator._t);
    centerIndicator._t = setTimeout(() => centerIndicator.classList.remove('show'), 700);
}
// 暂停时持续显示，播放后短暂显示再隐藏
mainVideo.addEventListener('pause', () => {
    clearTimeout(centerIndicator._t);
    centerIndicator.classList.add('show');
});
mainVideo.addEventListener('play', () => {
    showCenterIndicator();
});

// 点击视频画面切换播放/暂停（排除点在控制条/互动按钮/音量浮层上）
const playerForClick = document.querySelector('.main-video-player');
playerForClick.addEventListener('click', (e) => {
    if (e.target.closest('.video-controls') ||
        e.target.closest('.interaction-panel') ||
        e.target.closest('.video-info') ||
        e.target.closest('.mobile-volume-bar') ||
        e.target.closest('.toggle-video-list')) {
        return;
    }
    if (mainVideo.paused) {
        mainVideo.play().catch(() => {});
    } else {
        mainVideo.pause();
    }
});

// ===== 手机端音量浮层：与主音量状态同步 =====
const mobileVolumeBtn = document.getElementById('mobileVolumeBtn');
const mobileVolumeSlider = document.getElementById('mobileVolumeSlider');

function syncMobileVolume() {
    mobileVolumeBtn.textContent = volumeIcon(mainVideo.volume, isMuted);
    mobileVolumeSlider.value = Math.round((isMuted ? 0 : mainVideo.volume) * 100);
}

mobileVolumeBtn.addEventListener('click', function() {
    isMuted = !isMuted;
    mainVideo.muted = isMuted;
    if (!isMuted) {
        const v = lastVolume > 0 ? lastVolume : 1;
        mainVideo.volume = v;
    }
    volumeBtn.textContent = volumeIcon(mainVideo.volume, isMuted);
    syncMobileVolume();
    mainVideo.play().catch(() => {});
});

mobileVolumeSlider.addEventListener('input', function() {
    const v = this.value / 100;
    mainVideo.volume = v;
    lastVolume = v;
    isMuted = v === 0;
    mainVideo.muted = isMuted;
    volumeBtn.textContent = volumeIcon(v, isMuted);
    syncMobileVolume();
});

// 初始同步一次手机音量显示
syncMobileVolume();
