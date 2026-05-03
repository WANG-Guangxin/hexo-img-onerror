
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
  onerror-map: ./onerror-map.json
  src_prefix:
    - https://example.com/path1
    - https://example.com/path2
  onerror_src_prefix:
    - https://fallback.com/path1
    - https://fallback.com/path2
```

2. 此配置启用插件并设置备用图像以显示，如果任何图像加载失败。

如果配置了 `onerror-map`，插件会优先从匹配到的 `src_prefix` 前缀之后提取路径，并在 JSON 映射表中查找对应的备用链接，然后将该链接写入 `onerror`。JSON 文件格式为一个简单的对象，键为相对于 `src_prefix` 的路径，例如：

```json
{
  "aa/bb/cc.png": "https://fallback.example.com/aa/bb/cc.png",
  "100MB.bin": "https://fallback.example.com/100MB.bin"
}
```

例如，如果你的 `src_prefix` 包含 `https://api.wgxls.eu.org:8443/files`，那么源地址 `https://api.wgxls.eu.org:8443/files/aa/bb/cc.png` 会查找 `aa/bb/cc.png` 作为 `onerror-map` 键。

如果没有配置 `onerror-map`，或者在映射表中未找到对应条目，则会回退到现有的 `src_prefix` / `onerror_src_prefix` 替换逻辑。

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
