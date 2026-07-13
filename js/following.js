// 创作者信息池（覆盖首页所有作者，供"关注的人"列表展示详情）
const creators = [
    { id: 1, name: '@旅行者小明', avatar: 'assets/avatar.svg', bio: '🌍 环游世界，记录美好 | 旅行博主', videos: 156, followers: 125000 },
    { id: 2, name: '@美食达人', avatar: 'assets/avatar.svg', bio: '🍜 探店达人 | 分享美食地图', videos: 234, followers: 256000 },
    { id: 3, name: '@美妆博主Lily', avatar: 'assets/avatar.svg', bio: '💄 美妆教程 | 好物分享', videos: 456, followers: 890000 },
    { id: 4, name: '@音乐空间', avatar: 'assets/avatar.svg', bio: '🎵 分享治愈音乐 | 纯音乐爱好者', videos: 123, followers: 78000 },
    { id: 5, name: '@游戏达人', avatar: 'assets/avatar.svg', bio: '🎮 游戏高光时刻 | 实力与欢乐并存', videos: 89, followers: 320000 },
    { id: 6, name: '@科技先锋', avatar: 'assets/avatar.svg', bio: '🚀 科技前沿 | 新品深度测评', videos: 67, followers: 154000 }
];

// 粉丝数据（关注我的人，成员固定；其"关注"按钮状态由本地存储控制，初始未关注）
const followersUsers = [
    { id: 101, name: '@视频爱好者', avatar: 'assets/avatar.svg', bio: '🎬 喜欢看各种有趣的视频', videos: 12, followers: 450 },
    { id: 102, name: '@小明同学', avatar: 'assets/avatar.svg', bio: '📱 科技数码爱好者', videos: 45, followers: 2300 },
    { id: 103, name: '@生活记录者', avatar: 'assets/avatar.svg', bio: '📝 记录生活点滴', videos: 78, followers: 5600 }
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
    let users;
    if (tab === 'following') {
        // 关注的人 = 我已关注的人（含创作者与粉丝中被关注的），初始为空
        const followed = Store.getFollows();
        const pool = creators.concat(followersUsers);
        users = pool.filter(u => followed.indexOf(u.name) >= 0);
    } else {
        // 粉丝列表成员固定，"已关注/未关注"按钮状态由本地存储控制
        users = followersUsers;
    }

    if (users.length === 0) {
        userList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">👥</div>
                <h3 class="empty-title">${tab === 'following' ? '还没有关注任何人' : '还没有粉丝'}</h3>
                <p class="empty-text">${tab === 'following' ? '去首页发现更多有趣的创作者，点击关注即可' : '发布更多精彩作品来吸引粉丝吧'}</p>
                <button class="empty-btn" onclick="location.href='index.html'">${tab === 'following' ? '发现创作者' : '去首页看看'}</button>
            </div>
        `;
        return;
    }

    userList.innerHTML = users.map(user => {
        const following = Store.isFollowing(user.name);
        return `
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
            <button class="follow-status-btn ${following ? 'following' : ''}" data-name="${user.name}">
                ${following ? '已关注' : '+ 关注'}
            </button>
        </div>
        `;
    }).join('');

    // 关注/取消关注：写入本地存储并重新渲染当前列表
    document.querySelectorAll('.follow-status-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            Store.toggleFollow(this.dataset.name);
            renderUsers(currentTab);
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
Store.applyProfileToUI();
renderUsers('following');
