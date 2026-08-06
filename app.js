/* =========================================================================
   East 2 West — Marketing Agency

   The page is a static case study. It has no form and produces nothing: the
   advertisement is made by people. All this script does is switch language and
   show the finished advertisement once it exists.
   ========================================================================= */
(function () {
  'use strict';

  // Drop the finished advertisement at this path and it appears in the frame.
  var VIDEO_PATH = 'assets/advertisement.mp4';

  /* ---------------------------------------------------------------------
     Copy, in both languages

     The client's own words (鑫达重汽, 载得动，跑得远) stay in Chinese in both
     modes. They are the brand as it exists today, not interface text.

     The delivered name and tagline (XINDA Trucks, Built to haul. Built to
     last.) are fixed the same way, in index.html rather than here. They stay
     English in both modes because they are the deliverable itself.
     --------------------------------------------------------------------- */

  var COPY = {
    en: {
      skip: 'Skip to the case study',
      brandRole: 'Marketing Agency',

      inputTitle: 'What you provide',
      secImages: 'Product images',
      secBrand: 'Your brand, in Chinese',
      labelName: 'Business name 公司名称',
      labelTagline: 'Tagline 标语',
      secIndustry: 'Industry',
      indManufacturing: 'Manufacturing & OEM',
      secPlatform: 'Video size',
      platReels: 'TikTok & Reels',

      outputTitle: 'What you receive',
      secNaming: 'Our English translation',
      labelSource: 'Chinese name',
      labelDelivered: 'Delivered',
      metaBrand: 'Brand',
      metaIndustry: 'Industry',
      metaPlatform: 'Video size',
      metaSource: 'Source images',
      sourceCount: '6 images',

      emptyTitle: 'Your advertisement',
      pickVideo: 'Load a video file',
      download: 'Download',

      footerRight: 'Wharton Global Youth Program',

      altPhoto: function (n) { return 'Product photograph ' + n + ' of 6'; },
      errVideoType: 'That file is not a video.',
      annPlaying: 'Advertisement loaded.'
    },

    zh: {
      skip: '跳至案例',
      brandRole: '营销机构',

      inputTitle: '您提供的',
      secImages: '产品图片',
      secBrand: '您的中文品牌',
      labelName: '公司名称 Business name',
      labelTagline: '标语 Tagline',
      secIndustry: '行业',
      indManufacturing: '制造与代工',
      secPlatform: '视频尺寸',
      platReels: 'TikTok 与 Reels',

      outputTitle: '您收到的',
      secNaming: '我们的英文翻译',
      labelSource: '中文名称',
      labelDelivered: '交付',
      metaBrand: '品牌',
      metaIndustry: '行业',
      metaPlatform: '视频尺寸',
      metaSource: '素材图片',
      sourceCount: '6 张图片',

      emptyTitle: '您的广告',
      pickVideo: '载入视频文件',
      download: '下载',

      footerRight: '沃顿全球青年项目',

      altPhoto: function (n) { return '产品照片 ' + n + ' / 6'; },
      errVideoType: '该文件不是视频。',
      annPlaying: '广告已载入。'
    }
  };

  /* ---------------------------------------------------------------------
     Elements
     --------------------------------------------------------------------- */

  var $ = function (id) { return document.getElementById(id); };

  var stateEmpty = $('state-empty');
  var adVideo = $('ad-video');
  var pickVideo = $('pick-video');
  var videoInput = $('video-input');
  var videoError = $('video-error');
  var downloadBtn = $('download-btn');
  var liveRegion = $('live-region');

  var lang = 'en';
  var videoObjectUrl = null;

  var t = function () { return COPY[lang]; };

  function announce(msg) { liveRegion.textContent = msg; }

  /* ---------------------------------------------------------------------
     Language
     --------------------------------------------------------------------- */

  function applyLanguage() {
    var dict = t();

    document.documentElement.lang = (lang === 'zh') ? 'zh-Hans' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = dict[el.getAttribute('data-i18n')];
      if (typeof val === 'string') el.textContent = val;
    });

    document.querySelectorAll('[data-photo]').forEach(function (img) {
      img.alt = dict.altPhoto(img.getAttribute('data-photo'));
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var on = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    // Any error still on screen would be in the previous language.
    videoError.hidden = true;
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      lang = btn.getAttribute('data-lang');
      applyLanguage();
    });
  });

  /* ---------------------------------------------------------------------
     The advertisement
     --------------------------------------------------------------------- */

  function showVideo(src, filename) {
    adVideo.src = src;
    downloadBtn.href = src;
    downloadBtn.setAttribute('download', filename || 'advertisement.mp4');

    stateEmpty.hidden = true;
    adVideo.hidden = false;
    downloadBtn.hidden = false;
    videoError.hidden = true;

    announce(t().annPlaying);
  }

  // Resolves false when the file is not there, which is the expected case
  // until the finished advertisement is committed.
  function probeVideo() {
    return new Promise(function (resolve) {
      var probe = document.createElement('video');
      var settled = false;
      var finish = function (result) {
        if (settled) return;
        settled = true;
        probe.removeAttribute('src');
        resolve(result);
      };

      probe.preload = 'metadata';
      probe.addEventListener('loadedmetadata', function () { finish(true); });
      probe.addEventListener('error', function () { finish(false); });
      setTimeout(function () { finish(false); }, 3000);

      probe.src = VIDEO_PATH;
    });
  }

  /* ---------------------------------------------------------------------
     Loading a video by hand, for previewing before the file is committed.
     Remove this block once assets/advertisement.mp4 is in the repository.
     --------------------------------------------------------------------- */

  function acceptVideo(file) {
    if (!file || !/^video\//.test(file.type)) {
      videoError.textContent = t().errVideoType;
      videoError.hidden = false;
      announce(t().errVideoType);
      return;
    }
    if (videoObjectUrl) URL.revokeObjectURL(videoObjectUrl);
    videoObjectUrl = URL.createObjectURL(file);
    showVideo(videoObjectUrl, file.name);
  }

  pickVideo.addEventListener('click', function () { videoInput.click(); });

  videoInput.addEventListener('change', function () {
    if (videoInput.files.length) acceptVideo(videoInput.files[0]);
    videoInput.value = '';
  });

  ['dragenter', 'dragover'].forEach(function (evt) {
    stateEmpty.addEventListener(evt, function (e) {
      e.preventDefault();
      stateEmpty.classList.add('is-dragging');
    });
  });
  ['dragleave', 'drop'].forEach(function (evt) {
    stateEmpty.addEventListener(evt, function (e) {
      e.preventDefault();
      if (evt === 'dragleave' && stateEmpty.contains(e.relatedTarget)) return;
      stateEmpty.classList.remove('is-dragging');
    });
  });
  stateEmpty.addEventListener('drop', function (e) {
    if (e.dataTransfer && e.dataTransfer.files.length) acceptVideo(e.dataTransfer.files[0]);
  });

  // A stray drop anywhere else must not navigate away from the page.
  ['dragover', 'drop'].forEach(function (evt) {
    window.addEventListener(evt, function (e) {
      if (!stateEmpty.contains(e.target)) e.preventDefault();
    });
  });

  window.addEventListener('beforeunload', function () {
    if (videoObjectUrl) URL.revokeObjectURL(videoObjectUrl);
  });

  /* ---------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------- */

  applyLanguage();

  probeVideo().then(function (found) {
    if (found) showVideo(VIDEO_PATH, 'advertisement.mp4');
  });
})();
