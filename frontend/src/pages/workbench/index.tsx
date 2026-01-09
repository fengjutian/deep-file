import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';

/** ---------- ID 生成 ---------- */
let nodeId = 4;
const getNodeId = (): string => `node-${nodeId++}`;

/** ---------- 初始 Nodes ---------- */
const initialNodes: Node[] = [
  {
    id: 'n1',
    position: { x: -200, y: 0 },
    data: { label: 'Node 1' },
    type: 'input',
    sourcePosition: 'right',
    style: {
      width: 100,
      height: 70,
      backgroundColor: '#6ede87',
      color: 'white',
    },
  },
  {
    id: 'n2',
    position: { x: 0, y: 100 },
    data: { label: 'Node 2' },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: 'n3',
    position: { x: 0, y: 200 },
    data: { label: 'Node 3' },
    type: 'output',
    style: {
      backgroundColor: '#6865A5',
      color: 'white',
    },
  },
];

/** ---------- 初始 Edges ---------- */
const initialEdges: Edge[] = [
  {
    id: 'n1-n2',
    source: 'n1',
    target: 'n2',
    animated: true,
  },
];

/** ---------- 主组件 ---------- */
export default function App(): JSX.Element {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  /** 节点变化 */
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    []
  );

  /** 边变化 */
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    []
  );

  /** 连线 */
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    []
  );

  /**
   * ✅ 点击节点 → 新增一个相连节点
   */
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const newNodeId = getNodeId();

      /** 新节点 */
      const newNode: Node = {
        id: newNodeId,
        position: {
          x: node.position.x + 200,
          y: node.position.y,
        },
        data: {
          label: `New ${newNodeId}`,
        },
        sourcePosition: 'right',
        targetPosition: 'left',
      };

      /** 新边 */
      const newEdge: Edge = {
        id: `${node.id}-${newNodeId}`,
        source: node.id,
        target: newNodeId,
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat(newEdge));
    },
    []
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
