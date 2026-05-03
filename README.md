
[中文说明](README.zh-CN.md)

# hexo-img-onerror

[![License](https://img.shields.io/github/license/WANG-Guangxin/hexo-img-onerror)](LICENSE)

A Hexo plugin that provides a fallback image source using the `onerror` attribute for `<img>` tags. This plugin helps ensure that if the original image fails to load, a backup image will be displayed instead.

## Features

- Automatically adds an `onerror` attribute to images as fallback image URL.

## Installation

To install the plugin, run the following command:

```bash
npm install hexo-img-onerror --save
```

## Usage

After installing the plugin, configure it in your Hexo project.

1. Add the following configuration in your Hexo `_config.yml`:

```yaml
img_onerror:
  enable: true
  onerror-map: ./onerror-map.json
  src_prefix:
    - https://example.com/path1
    - https://example.com/path2
  onerror_src_prefix:
    - https://fallback.com/path1
    - https://fallback.com/path2
```

2. This configuration enables the plugin and sets the fallback image to display if any image fails to load.

If `onerror-map` is configured, the plugin will first look up the URL path after the matching `src_prefix` entry and use that mapped URL as the `onerror` fallback. The JSON file should be a simple object mapping relative file paths to fallback URLs, for example:

```json
{
  "aa/bb/cc.png": "https://fallback.example.com/aa/bb/cc.png",
  "100MB.bin": "https://fallback.example.com/100MB.bin"
}
```

For example, if your `src_prefix` contains `https://api.wgxls.eu.org:8443/files`, then an image with source `https://api.wgxls.eu.org:8443/files/aa/bb/cc.png` will look up the key `aa/bb/cc.png` in `onerror-map`.

If there is no `onerror-map` configured, or the image key is not found in the map, the plugin falls back to the existing `src_prefix` / `onerror_src_prefix` replacement logic.

### Example

In your posts or pages, add images normally:

```markdown
![Description](https://example.com/path1/image.jpg)
![Description](https://example.com/path2/image.jpg)
```

If `image.jpg` fails to load, the plugin will automatically apply the fallback image:

```html
<img src="https://example.com/path1/image.jpg" onerror="this.src='https://fallback.com/path1/image.jpg';">
<img src="https://example.com/path2/image.jpg" onerror="this.src='https://fallback.com/path2/image.jpg';">
```

## License

This project is licensed under the [MIT License](LICENSE).
