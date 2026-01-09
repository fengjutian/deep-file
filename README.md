# Deep File

Deep File是一个基于AI的文档处理工作流管理系统，支持复杂的文档解析、处理和工作流执行。

## 项目结构

```
deep-file/
├── backend/             # 后端API服务
│   ├── app/            # 应用核心代码
│   │   ├── main.py     # FastAPI应用入口
│   │   ├── core/       # 核心配置和工具
│   │   ├── models/     # 数据库模型
│   │   ├── schemas/    # Pydantic数据模式
│   │   ├── api/        # API路由
│   │   ├── services/   # 业务服务
│   │   └── utils/      # 工具函数
│   ├── requirements.txt # 依赖列表
│   └── alembic/        # 数据库迁移
├── frontend/           # 前端应用
└── README.md           # 项目说明文档
```

## 技术栈

### 后端
- **框架**: FastAPI 0.104+
- **API文档**: Swagger UI / ReDoc
- **数据库**: SQLAlchemy 2.0+ (支持SQLite/PostgreSQL/MySQL)
- **数据库迁移**: Alembic 1.12+
- **数据验证**: Pydantic 2.4+
- **认证**: JWT + bcrypt
- **文档处理**: pdfplumber, pypdfium2
- **AI集成**: LangChain
- **HTTP客户端**: httpx

### 前端
- **框架**: React
- **状态管理**: 待选择
- **UI组件**: @xyflow/react (工作流编辑器)
- **HTTP客户端**: axios

## 安装与运行

### 后端安装

1. **激活虚拟环境**
   ```powershell
   cd backend
   .\venv\Scripts\Activate.ps1  # Windows PowerShell
   # 或
   .\venv\Scripts\activate      # Windows Command Prompt
   ```

2. **安装依赖**
   ```powershell
   pip install -r requirements.txt
   ```

3. **配置环境变量**
   ```powershell
   cp .env.example .env
   # 编辑.env文件，配置数据库连接和其他设置
   ```

4. **数据库迁移**
   ```powershell
   # 初始化迁移环境（首次运行）
   alembic init alembic
   
   # 创建迁移文件
   alembic revision --autogenerate -m "Initial migration"
   
   # 执行迁移
   alembic upgrade head
   ```

5. **启动开发服务器**
   ```powershell
   uvicorn app.main:app --reload
   ```

   服务器将在 http://localhost:8000 启动

### 前端安装

1. **安装依赖**
   ```powershell
   cd frontend
   npm install
   ```

2. **启动开发服务器**
   ```powershell
   npm run dev
   ```

## API文档

- **Swagger UI**: http://localhost:8000/api/v1/docs
- **ReDoc**: http://localhost:8000/api/v1/redoc

## 核心功能

1. **工作流管理**
   - 创建、编辑、删除工作流
   - 工作流版本控制
   - 工作流激活状态管理

2. **文档处理**
   - PDF文档解析
   - 文本提取和处理
   - 文档内容分析

3. **AI集成**
   - 基于LLM的文档内容理解
   - 智能文档处理建议
   - 自动化文档分类

4. **工作流执行**
   - DAG（有向无环图）工作流执行引擎
   - 任务依赖管理
   - 执行状态监控

## 开发说明

### 代码风格
- 遵循PEP 8编码规范
- 使用Type Hints
- 编写单元测试

### 提交规范
- feat: 新增功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 代码重构
- test: 测试代码更新
- chore: 构建或依赖更新

## 许可证

MIT License
