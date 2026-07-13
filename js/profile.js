// 个人作品数据
const myWorks = [
    {
        id: 1,
        title: '周末自驾游，记录美好时光 🚗✨',
        likes: 2356,
        comments: 156,
        duration: '02:30',
        thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22390%22 viewBox=%220 0 220 390%22%3E%3Crect fill=%22%232a2a2a%22 width=%22220%22 height=%22390%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23aaa%22 font-size=%2240%22%3E🚗%3C/text%3E%3C/svg%3E'
    },
    {
        id: 2,
        title: '夕阳下的城市，太美了 🌇',
        likes: 5678,
        comments: 342,
        duration: '01:45',
        thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22390%22 viewBox=%220 0 220 390%22%3E%3Crect fill=%22%233a2a1a%22 width=%22220%22 height=%22390%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23aaa%22 font-size=%2240%22%3E🌇%3C/text%3E%3C/svg%3E'
    },
    {
        id: 3,
        title: '今日份美食分享 🍜',
        likes: 3421,
        comments: 234,
        duration: '00:58',
        thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22390%22 viewBox=%220 0 220 390%22%3E%3Crect fill=%22%231a2a1a%22 width=%22220%22 height=%22390%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23aaa%22 font-size=%2240%22%3E🍜%3C/text%3E%3C/svg%3E'
    },
    {
        id: 4,
        title: '猫咪的日常 🐱',
        likes: 8902,
        comments: 567,
        duration: '00:32',
        thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22390%22 viewBox=%220 0 220 390%22%3E%3Crect fill=%22%232a1a2a%22 width=%22220%22 height=%22390%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23aaa%22 font-size=%2240%22%3E🐱%3C/text%3E%3C/svg%3E'
    },
    {
        id: 5,
        title: '海边日落 🌊',
        likes: 12567,
        comments: 892,
        duration: '01:20',
        thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22390%22 viewBox=%220 0 220 390%22%3E%3Crect fill=%22%231a2a3a%22 width=%22220%22 height=%22390%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23aaa%22 font-size=%2240%22%3E🌊%3C/text%3E%3C/svg%3E'
    },
    {
        id: 6,
        title: '晨间瑜伽 🧘‍♀️',
        likes: 4532,
        comments: 234,
        duration: '03:15',
        thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22390%22 viewBox=%220 0 220 390%22%3E%3Crect fill=%22%232a3a2a%22 width=%22220%22 height=%22390%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23aaa%22 font-size=%2240%22%3E🧘%3C/text%3E%3C/svg%3E'
    }
];

// 喜欢的视频
const likedVideos = [
    { id: 101, title: '超美风景 🏔️', likes: 15600, comments: 890, duration: '02:00', thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22390%22 viewBox=%220 0 220 390%22%3E%3Crect fill=%22%231a3a2a%22 width=%22220%22 height=%22390%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23aaa%22 font-size=%2240%22%3E🏔️%3C/text%3E%3C/svg%3E' },
    { id: 102, title: '美食教程 🍰', likes: 23400, comments: 1200, duration: '05:30', thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22390%22 viewBox=%220 0 220 390%22%3E%3Crect fill=%22%233a2a1a%22 width=%22220%22 height=%22390%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23aaa%22 font-size=%2240%22%3E🍰%3C/text%3E%3C/svg%3E' },
    { id: 103, title: '萌宠合集 🐕', likes: 34500, comments: 2100, duration: '03:45', thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22390%22 viewBox=%220 0 220 390%22%3E%3Crect fill=%22%232a2a3a%22 width=%22220%22 height=%22390%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23aaa%22 font-size=%2240%22%3E🐕%3C/text%3E%3C/svg%3E' }
];

// 收藏的视频
const collectedVideos = [
    { id: 201, title: '学习笔记 📚', likes: 8900, comments: 450, duration: '10:20', thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22390%22 viewBox=%220 0 220 390%22%3E%3Crect fill=%22%231a1a3a%22 width=%22220%22 height=%22390%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23aaa%22 font-size=%2240%22%3E📚%3C/text%3E%3C/svg%3E' }
];

// DOM 元素
const worksGrid = document.getElementById('worksGrid');
const editProfileModal = document.getElementById('editProfileModal');
let currentTab = 'videos';

// 格式化数字
function formatNumber(num) {
    if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万';
    }
    return num.toString();
}

// 渲染作品
function renderWorks(tab) {
    let data;
    switch (tab) {
        case 'videos':
            data = Store.getUploads();   // 我的作品 = 我在首页上传发布的视频
            break;
        case 'likes':
            data = likedVideos;
            break;
        case 'collects':
            data = collectedVideos;
            break;
        default:
            data = Store.getUploads();
    }

    if (data.length === 0) {
        worksGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🎬</div>
                <p class="empty-text">${tab === 'videos' ? '还没有作品，去首页发布你的第一个视频吧！' : '还没有视频，快去发现更多内容'}</p>
                <button class="empty-btn" onclick="location.href='index.html'">${tab === 'videos' ? '去发布作品' : '去首页看看'}</button>
            </div>
        `;
        return;
    }

    worksGrid.innerHTML = data.map(work => `
        <div class="work-card" data-id="${work.id}" data-mine="${work.isMine ? 1 : 0}">
            <img src="${work.cover || work.thumbnail}" alt="${work.title}" class="work-card-thumbnail">
            <span class="work-card-duration">${work.duration}</span>
            <div class="work-card-overlay">
                <div class="work-card-title">${work.title}</div>
                <div class="work-card-stats">
                    <span class="work-card-stat">❤️ ${formatNumber(work.likes)}</span>
                    <span class="work-card-stat">💬 ${work.comments}</span>
                </div>
            </div>
        </div>
    `).join('');

    // 添加点击事件：我的作品跳首页播放该视频，其它跳首页
    document.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('click', () => {
            if (card.dataset.mine === '1') {
                location.href = 'index.html?v=' + card.dataset.id;
            } else {
                location.href = 'index.html';
            }
        });
    });
}

// 标签切换
document.querySelectorAll('.works-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.works-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentTab = this.dataset.tab;
        renderWorks(currentTab);
    });
});

// 填充个人资料到页面（并同步侧边栏）
function applyProfile() {
    const p = Store.getProfile();
    document.querySelector('.profile-name').textContent = p.nickname;
    document.querySelector('.profile-bio').textContent = p.bio;
    document.querySelector('.profile-avatar-large img').src = p.avatar;
    Store.applyProfileToUI();
}

// 大头像点击修改
const avatarPicker = document.createElement('input');
avatarPicker.type = 'file';
avatarPicker.accept = 'image/*';
avatarPicker.style.display = 'none';
document.body.appendChild(avatarPicker);

const avatarLarge = document.querySelector('.profile-avatar-large');
avatarLarge.style.cursor = 'pointer';
avatarLarge.title = '点击修改头像';
avatarLarge.addEventListener('click', () => avatarPicker.click());

avatarPicker.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        Store.compressImage(ev.target.result, 256, (compressed) => {
            Store.setProfile({ avatar: compressed });
            applyProfile();
        });
    };
    reader.readAsDataURL(file);
    e.target.value = '';   // 允许重复选择同一文件
});

// 编辑资料弹窗
document.querySelector('.edit-profile-btn').addEventListener('click', () => {
    const p = Store.getProfile();
    document.getElementById('editNickname').value = p.nickname;
    document.getElementById('editBio').value = p.bio;
    editProfileModal.classList.add('show');
});

document.querySelector('#editProfileModal .close-modal').addEventListener('click', () => {
    editProfileModal.classList.remove('show');
});

editProfileModal.addEventListener('click', (e) => {
    if (e.target === editProfileModal) {
        editProfileModal.classList.remove('show');
    }
});

// 保存修改（昵称/简介写入本地存储，全局生效）
document.querySelector('#editProfileModal .upload-submit-btn').addEventListener('click', function() {
    const nickname = document.getElementById('editNickname').value.trim() || Store.DEFAULT_NICKNAME;
    const bio = document.getElementById('editBio').value.trim();
    Store.setProfile({ nickname: nickname, bio: bio });
    this.textContent = '保存中...';
    setTimeout(() => {
        applyProfile();
        this.textContent = '保存成功！';
        this.style.backgroundColor = '#28a745';
        setTimeout(() => {
            editProfileModal.classList.remove('show');
            this.textContent = '保存修改';
            this.style.backgroundColor = '';
        }, 800);
    }, 500);
});

// 初始化
Store.initMobileSidebar();
applyProfile();
renderWorks('videos');

