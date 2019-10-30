#### Pull request checklist

Header 部分只有一行，包括三个字段：type（必需）、scope（可选）和 subject（必需）。
type 用于说明 commit 的类别，只允许使用下面 7 个标识。(根据情况可多选)

-   [ ] feat：新功能（feature）
-   [ ] change：需求变化相关代码修改（变量名称，样式，交互）
-   [ ] bug：bug 修正
-   [ ] style： 样式修改（不影响代码运行的变动）
-   [ ] refactor：重构（代码优化及重构）
-   [ ] extend: 扩展（即不是新增功能，也不是修改 bug 的代码变动，提高组件适用性）
-   [ ] fix：修补 bug
-   [ ] docs：文档（documentation）
-   [ ] test：增加测试
-   [ ] other：其他
-   [ ] versions：构建过程或辅助工具的变动（包含包版本的变动，配置变动）

subject 是 commit 目的的简短描述，不超过 50 个字符。

-   以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
-   第一个字母小写
-   结尾不加句号（.）

#### Description of changes

(代码变化说明)

#### Focus areas to test

(主要需测试修改页面及相关功能)
