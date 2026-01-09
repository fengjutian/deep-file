from sqlalchemy import Column, BigInteger, String, Integer, DateTime, ForeignKey, JSON
from datetime import datetime
from .database import Base

class Workflow(Base):
    __tablename__ = "workflow"

    id = Column(BigInteger, primary_key=True)
    name = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)


class WorkflowVersion(Base):
    __tablename__ = "workflow_version"

    id = Column(BigInteger, primary_key=True)
    workflow_id = Column(BigInteger, ForeignKey("workflow.id"))
    version = Column(Integer)
    graph_json = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
