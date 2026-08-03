/* =========================================================================
   East to West — Marketing Agency
   Frontend only. Nothing is uploaded anywhere; images stay in this browser.
   ========================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     Configuration
     --------------------------------------------------------------------- */

  // Drop your finished advertisement at this path and it plays automatically.
  var VIDEO_PATH = 'assets/advertisement.mp4';

  var MAX_IMAGES = 12;
  var MAX_BYTES = 10 * 1024 * 1024; // 10 MB
  var ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  /* ---------------------------------------------------------------------
     Copy, in both languages
     --------------------------------------------------------------------- */

  var COPY = {
    en: {
      skip: 'Skip to the form',
      brandRole: 'Marketing Agency',

      inputTitle: 'Input',

      secImages: 'Product images',
      dropPrimary: 'Drag images here, or select files',
      dropMeta: 'JPG, PNG, WEBP or GIF · up to 10 MB each · 12 images maximum',
      removeAll: 'Remove all',

      secBrand: 'Your brand, in Chinese',
      labelName: 'Business name 公司名称',
      phName: '苏州手工茶行',
      labelTagline: 'Tagline 标语',
      phTagline: '三代人的手艺',

      secIndustry: 'Industry',
      indChoose: 'Select an industry',
      indFood: 'Restaurant & prepared food',
      indTea: 'Tea & beverage',
      indTextiles: 'Textiles & apparel',
      indElectronics: 'Consumer electronics',
      indHome: 'Home & kitchen goods',
      indBeauty: 'Beauty & personal care',
      indManufacturing: 'Manufacturing & OEM',
      indOther: 'Something else',

      secPlatform: 'Target platform',
      platYoutube: 'YouTube & web',
      platFeed: 'Instagram feed',
      platPortrait: 'Instagram portrait',
      platReels: 'TikTok & Reels',

      submit: 'Generate advertisement',
      reset: 'Reset',

      outputTitle: 'Output',
      metaBrand: 'Brand',
      metaIndustry: 'Industry',
      metaPlatform: 'Platform',
      metaSource: 'Source images',

      idleTitle: 'No advertisement yet',
      slotTitle: 'Video slot',
      pickVideo: 'Load a video file',
      download: 'Download',

      footerRight: 'Wharton Global Youth Program',

      notSet: '—',
      count: function (n) { return n + (n === 1 ? ' image' : ' images'); },
      countOf: function (n) { return n + ' of ' + MAX_IMAGES + ' selected'; },
      errType: function (name) { return '“' + name + '” was skipped. Images only: JPG, PNG, WEBP or GIF.'; },
      errSize: function (name) { return '“' + name + '” was skipped. Each image must be under 10 MB.'; },
      errMax: 'Only the first ' + MAX_IMAGES + ' images were kept.',
      errVideoType: 'That file is not a video.',
      steps: ['Reading images', 'Matching reference ads', 'Composing scenes', 'Rendering'],
      annProcessing: 'Generating your advertisement.',
      annSlot: 'Ready. Waiting for the video file.',
      annPlaying: 'Advertisement loaded.'
    },

    zh: {
      skip: '跳至表单',
      brandRole: '营销机构',

      inputTitle: '输入',

      secImages: '产品图片',
      dropPrimary: '把图片拖到这里，或选择文件',
      dropMeta: 'JPG、PNG、WEBP 或 GIF · 每张不超过 10 MB · 最多 12 张',
      removeAll: '全部移除',

      secBrand: '您的中文品牌',
      labelName: '公司名称 Business name',
      phName: '苏州手工茶行',
      labelTagline: '标语 Tagline',
      phTagline: '三代人的手艺',

      secIndustry: '行业',
      indChoose: '请选择行业',
      indFood: '餐饮与食品',
      indTea: '茶饮与饮品',
      indTextiles: '纺织与服装',
      indElectronics: '消费电子',
      indHome: '家居与厨房用品',
      indBeauty: '美妆与个护',
      indManufacturing: '制造与代工',
      indOther: '其他',

      secPlatform: '投放平台',
      platYoutube: 'YouTube 与网页',
      platFeed: 'Instagram 信息流',
      platPortrait: 'Instagram 竖版',
      platReels: 'TikTok 与 Reels',

      submit: '生成广告',
      reset: '重置',

      outputTitle: '输出',
      metaBrand: '品牌',
      metaIndustry: '行业',
      metaPlatform: '平台',
      metaSource: '素材图片',

      idleTitle: '尚未生成广告',
      slotTitle: '视频位',
      pickVideo: '载入视频文件',
      download: '下载',

      footerRight: '沃顿全球青年项目',

      notSet: '—',
      count: function (n) { return n + ' 张图片'; },
      countOf: function (n) { return '已选 ' + n + ' / ' + MAX_IMAGES + ' 张'; },
      errType: function (name) { return '已跳过“' + name + '”。仅支持 JPG、PNG、WEBP 或 GIF。'; },
      errSize: function (name) { return '已跳过“' + name + '”。每张图片须小于 10 MB。'; },
      errMax: '仅保留了前 ' + MAX_IMAGES + ' 张图片。',
      errVideoType: '该文件不是视频。',
      steps: ['读取图片', '匹配参考广告', '编排画面', '渲染中'],
      annProcessing: '正在生成广告。',
      annSlot: '已就绪，等待视频文件。',
      annPlaying: '广告已载入。'
    }
  };

  /* ---------------------------------------------------------------------
     Elements
     --------------------------------------------------------------------- */

  var $ = function (id) { return document.getElementById(id); };

  var form = $('brief-form');
  var dropzone = $('dropzone');
  var fileInput = $('file-input');
  var fileError = $('file-error');
  var thumbs = $('thumbs');
  var thumbsHead = $('thumbs-head');
  var thumbCount = $('thumb-count');
  var clearImages = $('clear-images');

  var bizName = $('biz-name');
  var tagline = $('tagline');
  var taglineCount = $('tagline-count');
  var industry = $('industry');

  var submitBtn = $('submit-btn');
  var resetBtn = $('reset-btn');

  var metaBrand = $('meta-brand');
  var metaIndustry = $('meta-industry');
  var metaPlatform = $('meta-platform');
  var metaCount = $('meta-count');

  var frame = $('frame');
  var stateIdle = $('state-idle');
  var stateProcessing = $('state-processing');
  var stateSlot = $('state-slot');
  var procStep = $('proc-step');
  var progress = $('progress');
  var progressFill = $('progress-fill');
  var adVideo = $('ad-video');
  var pickVideo = $('pick-video');
  var videoInput = $('video-input');
  var videoError = $('video-error');
  var downloadBtn = $('download-btn');
  var liveRegion = $('live-region');

  /* ---------------------------------------------------------------------
     State
     --------------------------------------------------------------------- */

  var lang = 'en';
  var images = [];          // { file, url, name }
  var videoObjectUrl = null;
  var timers = [];
  var view = 'idle';        // idle | processing | slot | playing

  var t = function () { return COPY[lang]; };

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

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

    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var val = dict[el.getAttribute('data-i18n-ph')];
      if (typeof val === 'string') el.placeholder = val;
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var on = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    // Anything built or written by script has to be redrawn in the new language.
    renderThumbs();
    updateMeta();
    updateSubmitState();
    updateTaglineCount();

    // Stale error text would still be in the previous language.
    fileError.hidden = true;
    videoError.hidden = true;
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      lang = btn.getAttribute('data-lang');
      applyLanguage();
    });
  });

  /* ---------------------------------------------------------------------
     Images
     --------------------------------------------------------------------- */

  function showError(msg) {
    fileError.textContent = msg;
    fileError.hidden = false;
  }

  function addFiles(fileList) {
    var incoming = Array.prototype.slice.call(fileList);
    var problems = [];

    fileError.hidden = true;

    incoming.forEach(function (file) {
      if (images.length >= MAX_IMAGES) {
        if (problems.indexOf(t().errMax) === -1) problems.push(t().errMax);
        return;
      }
      var okType = ACCEPTED.indexOf(file.type) !== -1 || /^image\//.test(file.type);
      if (!okType) { problems.push(t().errType(file.name)); return; }
      if (file.size > MAX_BYTES) { problems.push(t().errSize(file.name)); return; }

      images.push({ file: file, url: URL.createObjectURL(file), name: file.name });
    });

    if (problems.length) showError(problems[0]);

    renderThumbs();
    updateMeta();
    updateSubmitState();
  }

  function removeImage(index) {
    URL.revokeObjectURL(images[index].url);
    images.splice(index, 1);
    renderThumbs();
    updateMeta();
    updateSubmitState();
  }

  function removeAllImages() {
    images.forEach(function (img) { URL.revokeObjectURL(img.url); });
    images = [];
    fileInput.value = '';
    fileError.hidden = true;
    renderThumbs();
    updateMeta();
    updateSubmitState();
  }

  function renderThumbs() {
    thumbs.innerHTML = '';
    thumbsHead.hidden = images.length === 0;

    if (images.length === 0) return;

    thumbCount.textContent = t().countOf(images.length);

    images.forEach(function (img, i) {
      var li = document.createElement('li');
      li.className = 'thumb';

      var el = document.createElement('img');
      el.src = img.url;
      el.alt = img.name;

      var idx = document.createElement('span');
      idx.className = 'thumb-index';
      idx.textContent = i + 1;

      var rm = document.createElement('button');
      rm.type = 'button';
      rm.className = 'thumb-remove';
      rm.textContent = '×';
      rm.setAttribute('aria-label', (lang === 'zh' ? '移除 ' : 'Remove ') + img.name);
      rm.addEventListener('click', function () { removeImage(i); });

      li.appendChild(el);
      li.appendChild(idx);
      li.appendChild(rm);
      thumbs.appendChild(li);
    });
  }

  fileInput.addEventListener('change', function () {
    addFiles(fileInput.files);
    fileInput.value = '';
  });

  clearImages.addEventListener('click', removeAllImages);

  ['dragenter', 'dragover'].forEach(function (evt) {
    dropzone.addEventListener(evt, function (e) {
      e.preventDefault();
      dropzone.classList.add('is-dragging');
    });
  });
  ['dragleave', 'drop'].forEach(function (evt) {
    dropzone.addEventListener(evt, function (e) {
      e.preventDefault();
      if (evt === 'dragleave' && dropzone.contains(e.relatedTarget)) return;
      dropzone.classList.remove('is-dragging');
    });
  });
  dropzone.addEventListener('drop', function (e) {
    if (e.dataTransfer && e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  });

  // The page-level handlers stop a stray drop from navigating away from the app.
  ['dragover', 'drop'].forEach(function (evt) {
    window.addEventListener(evt, function (e) {
      if (!dropzone.contains(e.target) && !stateSlot.contains(e.target)) e.preventDefault();
    });
  });

  /* ---------------------------------------------------------------------
     Fields
     --------------------------------------------------------------------- */

  function updateTaglineCount() {
    taglineCount.textContent = tagline.value.length + ' / 60';
  }

  function selectedPlatformInput() {
    return form.querySelector('input[name="platform"]:checked');
  }

  function updateMeta() {
    var dict = t();

    metaBrand.textContent = bizName.value.trim() || dict.notSet;
    metaCount.textContent = images.length ? dict.count(images.length) : '0';

    var opt = industry.options[industry.selectedIndex];
    metaIndustry.textContent = (industry.value && opt) ? opt.textContent : dict.notSet;

    var platform = selectedPlatformInput();
    if (platform) {
      metaPlatform.textContent = (lang === 'zh')
        ? platform.getAttribute('data-platform-zh')
        : platform.getAttribute('data-platform');
      frame.setAttribute('data-ratio', platform.value);
    }
  }

  function updateSubmitState() {
    submitBtn.disabled = images.length === 0;
  }

  bizName.addEventListener('input', updateMeta);
  industry.addEventListener('change', updateMeta);
  tagline.addEventListener('input', updateTaglineCount);

  form.querySelectorAll('input[name="platform"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      form.querySelectorAll('.ratio').forEach(function (label) {
        label.classList.toggle('is-selected', label.contains(radio) && radio.checked);
      });
      updateMeta();
    });
  });

  /* ---------------------------------------------------------------------
     Output states
     --------------------------------------------------------------------- */

  function setView(next) {
    view = next;
    stateIdle.hidden = next !== 'idle';
    stateProcessing.hidden = next !== 'processing';
    stateSlot.hidden = next !== 'slot';
    adVideo.hidden = next !== 'playing';

    downloadBtn.hidden = next !== 'playing';
    if (next !== 'slot') videoError.hidden = true;
  }

  function runProcessing(done) {
    setView('processing');
    announce(t().annProcessing);

    var steps = t().steps;
    var each = 600;

    steps.forEach(function (label, i) {
      timers.push(setTimeout(function () {
        procStep.textContent = label;
        var pct = Math.round(((i + 1) / steps.length) * 100);
        progressFill.style.width = pct + '%';
        progress.setAttribute('aria-valuenow', String(pct));
      }, i * each));
    });

    timers.push(setTimeout(done, steps.length * each + 200));
  }

  // Look for a video at VIDEO_PATH. Resolves false if it is not there,
  // which is the expected case until the finished ad is committed.
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

  function playVideo(src, filename) {
    adVideo.src = src;
    downloadBtn.href = src;
    downloadBtn.setAttribute('download', filename || 'advertisement.mp4');
    setView('playing');
    announce(t().annPlaying);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!images.length) return;

    clearTimers();
    progressFill.style.width = '0%';
    progress.setAttribute('aria-valuenow', '0');
    procStep.textContent = t().steps[0];

    submitBtn.disabled = true;

    runProcessing(function () {
      probeVideo().then(function (found) {
        submitBtn.disabled = false;
        if (found) {
          playVideo(VIDEO_PATH, 'advertisement.mp4');
        } else {
          setView('slot');
          announce(t().annSlot);
        }
      });
    });
  });

  /* ---------------------------------------------------------------------
     Manual video loading, for previewing before the file is committed
     --------------------------------------------------------------------- */

  function acceptVideo(file) {
    if (!file || !/^video\//.test(file.type)) {
      videoError.textContent = t().errVideoType;
      videoError.hidden = false;
      announce(t().errVideoType);
      return;
    }
    videoError.hidden = true;
    if (videoObjectUrl) URL.revokeObjectURL(videoObjectUrl);
    videoObjectUrl = URL.createObjectURL(file);
    playVideo(videoObjectUrl, file.name);
  }

  pickVideo.addEventListener('click', function () { videoInput.click(); });
  videoInput.addEventListener('change', function () {
    if (videoInput.files.length) acceptVideo(videoInput.files[0]);
    videoInput.value = '';
  });

  ['dragenter', 'dragover'].forEach(function (evt) {
    stateSlot.addEventListener(evt, function (e) {
      e.preventDefault();
      stateSlot.classList.add('is-dragging');
    });
  });
  ['dragleave', 'drop'].forEach(function (evt) {
    stateSlot.addEventListener(evt, function (e) {
      e.preventDefault();
      if (evt === 'dragleave' && stateSlot.contains(e.relatedTarget)) return;
      stateSlot.classList.remove('is-dragging');
    });
  });
  stateSlot.addEventListener('drop', function (e) {
    if (e.dataTransfer && e.dataTransfer.files.length) acceptVideo(e.dataTransfer.files[0]);
  });

  /* ---------------------------------------------------------------------
     Reset
     --------------------------------------------------------------------- */

  resetBtn.addEventListener('click', function () {
    clearTimers();
    removeAllImages();

    if (videoObjectUrl) {
      URL.revokeObjectURL(videoObjectUrl);
      videoObjectUrl = null;
    }
    adVideo.pause();
    adVideo.removeAttribute('src');
    adVideo.load();

    progressFill.style.width = '0%';
    progress.setAttribute('aria-valuenow', '0');
    submitBtn.disabled = true;

    // The form resets itself after this handler; read the defaults on the next tick.
    setTimeout(function () {
      form.querySelectorAll('.ratio').forEach(function (label) {
        var radio = label.querySelector('input');
        label.classList.toggle('is-selected', radio.checked);
      });
      setView('idle');
      updateMeta();
      updateSubmitState();
      updateTaglineCount();
    }, 0);
  });

  window.addEventListener('beforeunload', function () {
    images.forEach(function (img) { URL.revokeObjectURL(img.url); });
    if (videoObjectUrl) URL.revokeObjectURL(videoObjectUrl);
  });

  /* ---------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------- */

  form.querySelectorAll('.ratio').forEach(function (label) {
    var radio = label.querySelector('input');
    label.classList.toggle('is-selected', radio.checked);
  });

  applyLanguage();
  setView('idle');
})();
