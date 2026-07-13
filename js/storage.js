// js/storage.js - 跨页面共享的本地存储工具
// 统一管理：用户资料(昵称/简介/头像)、关注列表、我的上传作品
// 三个页面都引用本文件，读写同一份数据，保证状态全局一致、刷新不丢
(function (global) {
    const KEY_PROFILE = 'videohub_profile';
    const KEY_FOLLOWS = 'videohub_follows';
    const KEY_UPLOADS = 'videohub_uploads';

    const DEFAULT_NICKNAME = 'VideoHub 用户';
    const DEFAULT_BIO = '热爱生活，记录美好瞬间 🎬✨';
    const DEFAULT_AVATAR = 'assets/avatar.svg';

    function safeParse(str, fallback) {
        try {
            const v = JSON.parse(str);
            return v == null ? fallback : v;
        } catch (e) {
            return fallback;
        }
    }

    // 把图片 DataURL 用 canvas 压缩到指定最大边长，避免 localStorage 超限(5MB)
    function compressImage(dataUrl, maxEdge, cb) {
        const img = new Image();
        img.onload = function () {
            const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
            const w = Math.max(1, Math.round(img.width * scale));
            const h = Math.max(1, Math.round(img.height * scale));
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            cb(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = function () { cb(dataUrl); };
        img.src = dataUrl;
    }

    const Store = {
        DEFAULT_NICKNAME: DEFAULT_NICKNAME,
        DEFAULT_BIO: DEFAULT_BIO,
        DEFAULT_AVATAR: DEFAULT_AVATAR,

        // ---- 用户资料 ----
        getProfile: function () {
            return Object.assign(
                { nickname: DEFAULT_NICKNAME, bio: DEFAULT_BIO, avatar: DEFAULT_AVATAR },
                safeParse(localStorage.getItem(KEY_PROFILE), {})
            );
        },
        setProfile: function (patch) {
            const next = Object.assign(this.getProfile(), patch);
            localStorage.setItem(KEY_PROFILE, JSON.stringify(next));
            return next;
        },

        // ---- 关注列表（存作者名数组）----
        getFollows: function () {
            const arr = safeParse(localStorage.getItem(KEY_FOLLOWS), []);
            return Array.isArray(arr) ? arr : [];
        },
        isFollowing: function (name) {
            return this.getFollows().indexOf(name) >= 0;
        },
        // 切换关注状态，返回切换后是否已关注
        toggleFollow: function (name) {
            const list = this.getFollows();
            const i = list.indexOf(name);
            let nowFollowing;
            if (i >= 0) {
                list.splice(i, 1);
                nowFollowing = false;
            } else {
                list.push(name);
                nowFollowing = true;
            }
            localStorage.setItem(KEY_FOLLOWS, JSON.stringify(list));
            return nowFollowing;
        },

        // ---- 我的上传作品 ----
        getUploads: function () {
            const arr = safeParse(localStorage.getItem(KEY_UPLOADS), []);
            return Array.isArray(arr) ? arr : [];
        },
        addUpload: function (video) {
            const list = this.getUploads();
            list.unshift(video);
            localStorage.setItem(KEY_UPLOADS, JSON.stringify(list));
            return list;
        },

        // ---- 把当前资料同步到侧边栏/页面 UI ----
        applyProfileToUI: function () {
            const p = this.getProfile();
            document.querySelectorAll('.user-section .username').forEach(function (el) {
                el.textContent = p.nickname;
            });
            document.querySelectorAll('.user-section .user-avatar img').forEach(function (el) {
                el.src = p.avatar;
            });
            return p;
        },

        // 暴露图片压缩工具
        compressImage: compressImage,

        // 初始化手机端抽屉菜单（三杆按钮开关 + 遮罩 + 点菜单项收起）
        // 三个页面共用，元素 id 约定：menuToggle / sidebar / sidebarOverlay
        initMobileSidebar: function () {
            const menuToggle = document.getElementById('menuToggle');
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            if (!menuToggle || !sidebar || !overlay) return;

            const setSidebar = function (open) {
                sidebar.classList.toggle('open', open);
                overlay.classList.toggle('show', open);
            };

            menuToggle.addEventListener('click', function () {
                setSidebar(!sidebar.classList.contains('open'));
            });
            overlay.addEventListener('click', function () {
                setSidebar(false);
            });
            // 点击菜单项后自动收起
            sidebar.querySelectorAll('.nav-item').forEach(function (item) {
                item.addEventListener('click', function () { setSidebar(false); });
            });
        }
    };

    global.Store = Store;
})(window);
