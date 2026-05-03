const fs = require('fs');
const path = require('path');

function getOnErrorMap(config) {
  const mapFile = config['onerror-map'] || config.onerror_map;
  if (!mapFile) return null;

  const baseDir = typeof hexo !== 'undefined' && hexo.base_dir ? hexo.base_dir : process.cwd();
  const resolvedPath = path.isAbsolute(mapFile) ? mapFile : path.resolve(baseDir, mapFile);

  try {
    const raw = fs.readFileSync(resolvedPath, 'utf8');
    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      console.error(`[hexo-img-onerror] onerror-map must be a JSON object: ${resolvedPath}`);
      return null;
    }

    return parsed;
  } catch (err) {
    console.error(`[hexo-img-onerror] failed to load onerror-map from ${resolvedPath}: ${err.message}`);
    return null;
  }
}

function getOnErrorMapUrl(src, onErrorMap, srcPrefixes) {
  if (!onErrorMap || !srcPrefixes.length) return null;

  const prefix = srcPrefixes.find(prefix => typeof prefix === 'string' && src.startsWith(prefix));
  if (!prefix) return null;

  let key = src.slice(prefix.length);
  if (key.startsWith('/')) key = key.slice(1);
  if (!key) return null;

  const queryIndex = key.indexOf('?');
  if (queryIndex !== -1) key = key.slice(0, queryIndex);

  const hashIndex = key.indexOf('#');
  if (hashIndex !== -1) key = key.slice(0, hashIndex);

  return onErrorMap[key] || null;
}

function addOnError(data, config) {
  const onErrorMap = getOnErrorMap(config);
  const srcPrefixes = config.src_prefix || [];
  const onErrorSrcPrefixes = config.onerror_src_prefix || [];

  if (srcPrefixes.length !== onErrorSrcPrefixes.length) {
    console.error('src_prefix and onerror_src_prefix must have the same number of elements.');
    return data;
  }

  return data.replace(/<img [^>]*src="([^"]+)"[^>]*>/g, (match, src) => {
    let fallbackUrl = getOnErrorMapUrl(src, onErrorMap, srcPrefixes);

    if (!fallbackUrl) {
      const srcIndex = srcPrefixes.findIndex(prefix => src.startsWith(prefix));
      if (srcIndex !== -1) {
        fallbackUrl = src.replace(srcPrefixes[srcIndex], onErrorSrcPrefixes[srcIndex]);
      }
    }

    if (fallbackUrl) {
      const safeUrl = fallbackUrl.replace(/'/g, "\\'");
      return match.replace(/(<img [^>]*src="[^"]+")/, `$1 onerror="this.onerror=null;this.src='${safeUrl}'"`);
    }

    return match;
  });
}

hexo.extend.filter.register('after_post_render', (data) => {
  const config = hexo.config.img_onerror;
  if (config && config.enable) {
    data.content = addOnError(data.content, config);
    data.img_onerror_processed = true;
  }

  return data;
}, 10);

hexo.extend.filter.register('after_render:html', (html, data) => {
  const config = hexo.config.img_onerror;
  if (config && config.enable && !data.img_onerror_processed) {
    return addOnError(html, config);
  }

  return html;
}, 10);