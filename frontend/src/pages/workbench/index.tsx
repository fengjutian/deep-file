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
import {UploadNode} from '@/components/UploadNode/UploadNode';

let nodeId = 1;
const getNodeId = (): string => `node-${nodeId++}`;

const nodeTypes = {
  upload: UploadNode,
};

const initialNodes: any[] = [
  {
    id: 'n1',
    position: { x: -200, y: 0 },
    data: { label: 'Node 1' },
    type: 'upload',
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
    // type: 'group',
  },
  {
    id: 'n2-1',
    position: { x: 0, y: 150 },
    data: { label: 'Node 2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    // parentId: 'n2-1',
  },
    {
    id: 'n2-2',
    position: { x: 0, y: 200 },
    data: { label: 'Node 2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    // parentId: 'n2-2',
  },
  {
    id: 'n2-3',
    position: { x: 0, y: 250 },
    data: { label: 'Node 2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    // parentId: 'n2-3',
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

const initialEdges: Edge[] = [
  {
    id: 'n1-n2',
    source: 'n1',
    target: 'n2',
    animated: true,
  },
];

export default function Workbench(): React.ReactElement {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  
  // 处理文件上传的回调函数
  const onUpload = useCallback((nodeId: string, file: File) => {
    setNodes((nds) => {
      return nds.map((node) => {
        if (node.id === nodeId) {
          // 更新节点数据，保存文件信息
          return {
            ...node,
            data: {
              ...node.data,
              fileName: file.name,
              fileType: file.type,
              fileSize: file.size,
              file: file, // 保存文件对象
            },
          };
        }
        return node;
      });
    });
  }, []);


  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    []
  );


  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    []
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const newNodeId = getNodeId();

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
        nodes={nodes.map((node) => {
          // 为所有upload类型的节点添加onUpload回调函数
          if (node.type === 'upload') {
            return {
              ...node,
              data: {
                ...node.data,
                onUpload, // 添加onUpload回调
              },
            };
          }
          return node;
        })}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // onNodeClick={onNodeClick}
        fitView
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
