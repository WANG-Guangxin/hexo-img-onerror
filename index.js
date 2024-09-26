function addOnError(data, config) {
  const srcPrefixes = config.src_prefix || [];
  const onErrorSrcPrefixes = config.onerror_src_prefix || [];

  if (srcPrefixes.length !== onErrorSrcPrefixes.length) {
    console.error('src_prefix and onerror_src_prefix must have the same number of elements.');
    return data;
  }

  return data.replace(/<img [^>]*src="([^"]+)"[^>]*>/g, (match, src) => {
    const srcIndex = srcPrefixes.findIndex(prefix => src.startsWith(prefix));
    
    if (srcIndex !== -1) {
      const newSrc = src.replace(srcPrefixes[srcIndex], onErrorSrcPrefixes[srcIndex]);
      return match.replace(/(<img [^>]*src="[^"]+")/, `$1 onerror="this.onerror=null;this.src='${newSrc}'"`);
    }
    
    return match;
  });
}

hexo.extend.filter.register('after_post_render', (data) => {
  const config = hexo.config.img_onerror;
  if (config.enable) {
    data.content = addOnError(data.content, config);
    data.img_onerror_processed = true;
  }

  return data;
}, 10);

hexo.extend.filter.register('after_render:html', (html, data) => {
  const config = hexo.config.img_onerror;
  if (config.enable && !data.img_onerror_processed) {
    return addOnError(html, config);
  }

  return html;
}, 10);