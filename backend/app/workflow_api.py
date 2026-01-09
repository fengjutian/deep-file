from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import SessionLocal
from .models import Workflow, WorkflowVersion
from .schemas import WorkflowCreate, WorkflowUpdate

router = APIRouter(
    prefix="/workflow",
    tags=["workflow"]
)


# 数据库依赖
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ===============================
# 创建工作流（初始版本 v1）
# ===============================
@router.post("/")
def create_workflow(
    data: WorkflowCreate,
    db: Session = Depends(get_db)
):
    workflow = Workflow(name=data.name)
    db.add(workflow)
    db.flush()  # 拿到 workflow.id

    version = WorkflowVersion(
        workflow_id=workflow.id,
        version=1,
        graph_json=data.graph
    )
    db.add(version)
    db.commit()

    return {
        "workflow_id": workflow.id,
        "version": 1
    }

@router.get("/{workflow_id}")
def list_versions(workflow_id: int, db: Session = Depends(get_db)):
    versions = db.query(WorkflowVersion)\
        .filter_by(workflow_id=workflow_id)\
        .order_by(WorkflowVersion.version.desc())\
        .all()
    return versions


@router.put("/{workflow_id}")
def update_workflow(workflow_id: int, data: WorkflowUpdate, db: Session):
    latest = db.query(WorkflowVersion)\
        .filter_by(workflow_id=workflow_id)\
        .order_by(WorkflowVersion.version.desc())\
        .first()

    if not latest:
        raise HTTPException(404, "workflow not found")

    new_version = WorkflowVersion(
        workflow_id=workflow_id,
        version=latest.version + 1,
        graph_json=data.graph
    )
    db.add(new_version)
    db.commit()
    return {"version": new_version.version}


@router.post("/{workflow_id}/copy")
def copy_workflow(workflow_id: int, db: Session):
    latest = db.query(WorkflowVersion)\
        .filter_by(workflow_id=workflow_id)\
        .order_by(WorkflowVersion.version.desc())\
        .first()

    new_workflow = Workflow(name="copy_of_" + str(workflow_id))
    db.add(new_workflow)
    db.flush()

    version = WorkflowVersion(
        workflow_id=new_workflow.id,
        version=1,
        graph_json=latest.graph_json
    )
    db.add(version)
    db.commit()
    return {"new_workflow_id": new_workflow.id}

@router.delete("/{workflow_id}")
def delete_workflow(workflow_id: int, db: Session):
    db.query(WorkflowVersion).filter_by(workflow_id=workflow_id).delete()
    db.query(Workflow).filter_by(id=workflow_id).delete()
    db.commit()
    return {"status": "deleted"}
