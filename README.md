#### 使用方法

- npm-publish-tool init <包名>
- 进入生成的目录 （cd mydir）
- npm install
- npm start
- 发包编译：npm run republish
- npm 发包：npm publish

#### 目录解析

- src/common/components
  发包内容，需发的文件都在此文件夹中编写，使用 src/common/components 导出

- src/examples
  测试文件，可在其中编写代码验证组件

- src/route
  测试文件路由
