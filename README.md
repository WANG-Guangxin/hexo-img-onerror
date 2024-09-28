
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
  src_prefix:
    - https://example.com/path1
    - https://example.com/path2
  onerror_src_prefix:
    - https://fallback.com/path1
    - https://fallback.com/path2
```

2. This configuration enables the plugin and sets the fallback image to display if any image fails to load.

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
