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
      download: 'Download',

      footerRight: 'Wharton Global Youth Program',

      altPhoto: function (n) { return 'Product photograph ' + n + ' of 6'; },
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
      download: '下载',

      footerRight: '沃顿全球青年项目',

      altPhoto: function (n) { return '产品照片 ' + n + ' / 6'; },
      annPlaying: '广告已载入。'
    }
  };

  /* ---------------------------------------------------------------------
     Elements
     --------------------------------------------------------------------- */

  var $ = function (id) { return document.getElementById(id); };

  var stateEmpty = $('state-empty');
  var adVideo = $('ad-video');
  var downloadBtn = $('download-btn');
  var liveRegion = $('live-region');

  var lang = 'en';

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

    announce(t().annPlaying);
  }

  // Resolves false only if the advertisement cannot be loaded, which leaves the
  // fallback state on screen rather than an empty frame.
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
     Boot
     --------------------------------------------------------------------- */

  applyLanguage();

  probeVideo().then(function (found) {
    if (found) showVideo(VIDEO_PATH, 'advertisement.mp4');
  });
})();
