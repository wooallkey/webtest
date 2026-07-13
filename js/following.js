// 关注的用户数据
const followingUsers = [
    {
        id: 1,
        name: '@旅行者小明',
        avatar: 'assets/avatar.svg',
        bio: '🌍 环游世界，记录美好 | 旅行博主',
        videos: 156,
        followers: 125000,
        isFollowing: true
    },
    {
        id: 2,
        name: '@美食达人',
        avatar: 'assets/avatar.svg',
        bio: '🍜 探店达人 | 分享美食地图',
        videos: 234,
        followers: 256000,
        isFollowing: true
    },
    {
        id: 3,
        name: '@美妆博主Lily',
        avatar: 'assets/avatar.svg',
        bio: '💄 美妆教程 | 好物分享',
        videos: 456,
        followers: 890000,
        isFollowing: true
    },
    {
        id: 4,
        name: '@音乐空间',
        avatar: 'assets/avatar.svg',
        bio: '🎵 分享治愈音乐 | 纯音乐爱好者',
        videos: 123,
        followers: 78000,
        isFollowing: true
    }
];

// 粉丝用户数据
const followersUsers = [
    {
        id: 101,
        name: '@视频爱好者',
        avatar: 'assets/avatar.svg',
        bio: '🎬 喜欢看各种有趣的视频',
        videos: 12,
        followers: 450,
        isFollowing: false
    },
    {
        id: 102,
        name: '@小明同学',
        avatar: 'assets/avatar.svg',
        bio: '📱 科技数码爱好者',
        videos: 45,
        followers: 2300,
        isFollowing: true
    },
    {
        id: 103,
        name: '@生活记录者',
        avatar: 'assets/avatar.svg',
        bio: '📝 记录生活点滴',
        videos: 78,
        followers: 5600,
        isFollowing: false
    }
];

// DOM 元素
const userList = document.getElementById('userList');
let currentTab = 'following';

// 格式化数字
function formatNumber(num) {
    if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万';
    }
    return num.toString();
}

// 渲染用户列表
function renderUsers(tab) {
    const users = tab === 'following' ? followingUsers : followersUsers;

    if (users.length === 0) {
        userList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">👥</div>
                <h3 class="empty-title">还没有${tab === 'following' ? '关注任何人' : '粉丝'}</h3>
                <p class="empty-text">去首页发现更多有趣的创作者吧！</p>
                <button class="empty-btn" onclick="location.href='index.html'">发现创作者</button>
            </div>
        `;
        return;
    }

    userList.innerHTML = users.map(user => `
        <div class="user-item" data-user-id="${user.id}">
            <div class="user-item-avatar">
                <img src="${user.avatar}" alt="${user.name}">
            </div>
            <div class="user-item-info">
                <div class="user-item-name">${user.name}</div>
                <div class="user-item-bio">${user.bio}</div>
                <div class="user-item-stats">
                    <span class="user-item-stat">🎬 ${user.videos} 视频</span>
                    <span class="user-item-stat">👥 ${formatNumber(user.followers)} 粉丝</span>
                </div>
            </div>
            <button class="follow-status-btn ${user.isFollowing ? 'following' : ''}" data-user-id="${user.id}">
                ${user.isFollowing ? '已关注' : '+ 关注'}
            </button>
        </div>
    `).join('');

    // 添加关注/取消关注事件
    document.querySelectorAll('.follow-status-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const userId = parseInt(this.dataset.userId);
            toggleFollow(userId, this);
        });
    });

    // 点击用户跳转到个人主页
    document.querySelectorAll('.user-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('follow-status-btn')) {
                location.href = 'profile.html';
            }
        });
    });
}

// 切换关注状态
function toggleFollow(userId, btn) {
    const allUsers = [...followingUsers, ...followersUsers];
    const user = allUsers.find(u => u.id === userId);

    if (user) {
        user.isFollowing = !user.isFollowing;
        btn.classList.toggle('following');
        btn.textContent = user.isFollowing ? '已关注' : '+ 关注';
    }
}

// 标签切换
document.querySelectorAll('.tabs-container .tab-btn').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tabs-container .tab-btn').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentTab = this.dataset.tab;
        renderUsers(currentTab);
    });
});

// 初始化
renderUsers('following');
