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

  // The example everyone sees on open. These files ship with the site, so it looks
  // the same on any computer, with no upload and no network beyond this origin.
  //
  // To change it: drop new photos into assets/example/ and list them below. The
  // bizName and tagline are placeholder text written to suit the truck photos;
  // replace them with the real client's wording. Set enabled to false for an
  // empty form.
  var EXAMPLE = {
    enabled: true,
    images: [
      'assets/example/1.jpg',
      'assets/example/2.jpg',
      'assets/example/3.jpg',
      'assets/example/4.jpg',
      'assets/example/5.jpg',
      'assets/example/6.jpg'
    ],
    bizName: '东方商用车',
    tagline: '载得动，跑得远',
    industry: 'manufacturing', // must match a value in the industry <select>
    platform: '9:16'           // 16:9 | 1:1 | 4:5 | 9:16
  };

  /* ---------------------------------------------------------------------
     Copy, in both languages
     --------------------------------------------------------------------- */

  var COPY = {
    en: {
      skip: 'Skip to the form',
      brandRole: 'Marketing Agency',

      inputTitle: 'What you provide',

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

      secPlatform: 'Video size',
      platYoutube: 'YouTube & web',
      platFeed: 'Instagram feed',
      platPortrait: 'Instagram portrait',
      platReels: 'TikTok & Reels',

      submit: 'Submit brief',
      reset: 'Reset',

      outputTitle: 'What you receive',
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
      confirm: function (brand) {
        return 'Brief received for ' + brand + '. Our team returns your advertisement within five business days.';
      },
      confirmNoName: 'Brief received. Our team returns your advertisement within five business days.',
      annSlot: 'Ready. Waiting for the video file.',
      annPlaying: 'Advertisement loaded.'
    },

    zh: {
      skip: '跳至表单',
      brandRole: '营销机构',

      inputTitle: '您提供的',

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

      secPlatform: '视频尺寸',
      platYoutube: 'YouTube 与网页',
      platFeed: 'Instagram 信息流',
      platPortrait: 'Instagram 竖版',
      platReels: 'TikTok 与 Reels',

      submit: '提交需求',
      reset: '重置',

      outputTitle: '您收到的',
      metaBrand: '品牌',
      metaIndustry: '行业',
      metaPlatform: '平台',
      metaSource: '素材图片',

      idleTitle: '暂无广告',
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
      confirm: function (brand) {
        return '已收到「' + brand + '」的需求。我们将在五个工作日内交付广告。';
      },
      confirmNoName: '需求已收到。我们将在五个工作日内交付广告。',
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

  var confirmMsg = $('confirm');

  var frame = $('frame');
  var stateIdle = $('state-idle');
  var stateSlot = $('state-slot');
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
  var view = 'idle';        // idle | slot | playing

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

    // The confirmation stays put, but has to be rewritten in the new language.
    if (!confirmMsg.hidden) {
      var brand = bizName.value.trim();
      confirmMsg.textContent = brand ? dict.confirm(brand) : dict.confirmNoName;
    }
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

  function syncRatioLabels() {
    form.querySelectorAll('.ratio').forEach(function (label) {
      label.classList.toggle('is-selected', label.querySelector('input').checked);
    });
  }

  form.querySelectorAll('input[name="platform"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      syncRatioLabels();
      updateMeta();
    });
  });

  /* ---------------------------------------------------------------------
     Output states
     --------------------------------------------------------------------- */

  function setView(next) {
    view = next;
    stateIdle.hidden = next !== 'idle';
    stateSlot.hidden = next !== 'slot';
    adVideo.hidden = next !== 'playing';

    downloadBtn.hidden = next !== 'playing';
    if (next !== 'slot') videoError.hidden = true;
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

  // Submitting sends a brief to the team. It does not make anything: the work is
  // done by people, so all this does is acknowledge the brief. The deliverable
  // beside it stays on screen as an example of what comes back.
  function showConfirmation() {
    var brand = bizName.value.trim();
    confirmMsg.textContent = brand ? t().confirm(brand) : t().confirmNoName;
    confirmMsg.hidden = false;
    submitBtn.disabled = true;
    announce(confirmMsg.textContent);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!images.length) return;
    showConfirmation();
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
    removeAllImages();

    if (videoObjectUrl) {
      URL.revokeObjectURL(videoObjectUrl);
      videoObjectUrl = null;
    }
    adVideo.pause();
    adVideo.removeAttribute('src');
    adVideo.load();

    confirmMsg.hidden = true;
    submitBtn.disabled = true;

    // The form resets itself after this handler; read the defaults on the next tick.
    setTimeout(function () {
      syncRatioLabels();
      setView('idle');
      updateMeta();
      updateSubmitState();
      updateTaglineCount();

      // Reset means "back to how the page started", and the page starts on the
      // example. Without this, a visitor could leave the demo blank for the next one.
      restoreExample();
    }, 0);
  });

  window.addEventListener('beforeunload', function () {
    images.forEach(function (img) { URL.revokeObjectURL(img.url); });
    if (videoObjectUrl) URL.revokeObjectURL(videoObjectUrl);
  });

  /* ---------------------------------------------------------------------
     The hardcoded example

     Fetches the shipped photos back into the same File objects a real upload
     would produce, so nothing downstream needs to know the difference.
     Requires the page to be served over HTTP; opened straight off the disk as
     a file:// URL the fetches fail and the form simply starts empty.
     --------------------------------------------------------------------- */

  function loadExampleImages() {
    return Promise.all(EXAMPLE.images.map(function (path) {
      return fetch(path)
        .then(function (res) { return res.ok ? res.blob() : null; })
        .then(function (blob) {
          if (!blob || !/^image\//.test(blob.type)) return null;
          var name = path.split('/').pop();
          return {
            file: new File([blob], name, { type: blob.type }),
            url: URL.createObjectURL(blob),
            name: name
          };
        })
        .catch(function () { return null; });
    })).then(function (loaded) {
      return loaded.filter(Boolean);
    });
  }

  function restoreExample() {
    if (!EXAMPLE.enabled) return Promise.resolve();

    bizName.value = EXAMPLE.bizName;
    tagline.value = EXAMPLE.tagline;
    industry.value = EXAMPLE.industry;

    var radio = form.querySelector('input[name="platform"][value="' + EXAMPLE.platform + '"]');
    if (radio) {
      radio.checked = true;
      syncRatioLabels();
    }

    updateMeta();
    updateTaglineCount();

    return loadExampleImages().then(function (loaded) {
      images.forEach(function (img) { URL.revokeObjectURL(img.url); });
      images = loaded;

      renderThumbs();
      updateMeta();
      updateSubmitState();

      if (!images.length) {
        setView('idle');   // fetch blocked or files missing
        return;
      }

      // The example is presented already finished, so anyone opening the link
      // sees the advertisement without touching anything.
      return probeVideo().then(function (found) {
        if (found) playVideo(VIDEO_PATH, 'advertisement.mp4');
        else setView('slot');
      });
    });
  }

  /* ---------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------- */

  syncRatioLabels();
  applyLanguage();
  setView('idle');
  restoreExample();
})();
