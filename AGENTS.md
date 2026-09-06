<!-- BEGIN:para-structure-agents -->

## docs / PARA 落盘约定

`docs/`（或当前 PARA 根）下只有四维：`01-Projects`、`02-Areas`、`03-Resources`、`04-Archives`。

**按维分流，不要混用。** 创建或补全 PARA 目录时同步维护本锚点块，是推荐做法。

| 维 | 放什么 | 是否建主题子文件夹 |
|----|--------|-------------------|
| `01-Projects` | 每次输入的**需求、方案**及同主题配套稿（任务、调查、改善报告等） | **要**：一个主题一个项目夹 |
| `02-Areas` | 长期维护的规范、领域笔记、调查备忘（无明确交付闭环） | **不要**：文件直接落在该维根下 |
| `03-Resources` | 外部参考、剪藏 | **不要** |
| `04-Archives` | 已结束项目整体迁入 | **不要**为新主题 mkdir；迁入时保持原项目夹 |

### `01-Projects`：需求 / 方案按主题夹

落到 `01-Projects/<项目夹>/`，不要散落到另外三维。

```text
R{YYYYMMDD}-xx-主题
```

- `{YYYYMMDD}`：创建日；`xx` 为当日已有同前缀夹的下一号（从 `01` 起）
- 夹内用 `00-README.md`、`01-需求_….md`、`02-方案_….md` 等编号文件，不要再套一层主题子目录
- 已有同主题夹则追加文件，不要平行再开一夹
- 新建夹优先：`para-structure cp "主题"`

### 另外三维：禁止再嵌套主题子文件夹

`02-Areas`、`03-Resources`、`04-Archives` 的根下直接放 `YYYYMMDD-xx-主题.md`（序号按该维根下当天已有同前缀文件计）。

| 不要 | 要 |
|------|----|
| `02-Areas/主题/需求.md` 或 `02-Areas/YYYYMMDD-xx-主题-需求.md` | `01-Projects/R…-主题/01-需求_….md` |
| 在 Resources / Archives 根下为新主题 mkdir | 单文件落在该维根下（归档迁入的整夹除外） |

`.gitkeep` 与 PARA 根 `README.md` 是脚手架，不要删。

<!-- END:para-structure-agents -->
