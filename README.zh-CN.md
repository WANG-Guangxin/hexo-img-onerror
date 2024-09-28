
# hexo-img-onerror

[![License](https://img.shields.io/github/license/WANG-Guangxin/hexo-img-onerror)](LICENSE)

一个 Hexo 插件，使用 `onerror` 属性为 `<img>` 标签提供备用图像源。该插件有助于确保如果原始图像加载失败，则会显示备用图像。

## 特性

- 自动将 `onerror` 属性添加到图像作为备用图像 URL。

## 安装

运行以下命令安装插件：

```bash
npm install hexo-img-onerror --save
```

## 使用

安装插件后，请在 Hexo 项目中配置它。

1. 在 Hexo `_config.yml` 中添加以下配置：

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

2. 此配置启用插件并设置备用图像以显示，如果任何图像加载失败。

### 示例

在你的文章或页面中，添加图像：

```markdown
![Description](https://example.com/path1/image.jpg)
![Description](https://example.com/path2/image.jpg)
```

如果 `image.jpg` 加载失败，插件将自动应用备用图像：

```html
<img src="https://example.com/path1/image.jpg" onerror="this.src='https://fallback.com/path1/image.jpg';">
<img src="https://example.com/path2/image.jpg" onerror="this.src='https://fallback.com/path2/image.jpg';">
```

## License

这个使用 [MIT](LICENSE) 许可证。
