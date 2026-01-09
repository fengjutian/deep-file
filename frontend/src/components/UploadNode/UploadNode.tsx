import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';

export function UploadNode({ id, data }: NodeProps) {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    data?.onUpload?.(id, file);
  };

  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
          <div style={{ fontWeight: 500 }}>已上传文件：</div>
          <div style={{ marginTop: 2 }}>名称：{data.fileName}</div>
          {data.fileType && (
            <div>类型：{data.fileType}</div>
          )}
          {data.fileSize && (
            <div>大小：{formatFileSize(data.fileSize)}</div>
          )}
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
