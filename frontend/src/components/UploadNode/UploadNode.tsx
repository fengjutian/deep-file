import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';

export function UploadNode({ id, data }: NodeProps) {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    data?.onUpload?.(id, file);
  };

  return (
    <div
      style={{
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 6,
        background: '#fff',
        width: 200,
        position: 'relative',
      }}
    >
      <Handle
        id="in"
        type="target"
        position={Position.Left}
        style={{ top: '50%' }}
      />

      <div style={{ fontWeight: 600, marginBottom: 6 }}>
        文件上传
      </div>

      <input type="file" onChange={onFileChange} />

      {data?.fileName && (
        <div style={{ marginTop: 6, fontSize: 12 }}>
          已上传：{data.fileName}
        </div>
      )}

      {/* ➡️ 输出连接点 */}
      <Handle
        id="out"
        type="source"
        position={Position.Right}
        style={{ top: '50%' }}
      />
    </div>
  );
}
