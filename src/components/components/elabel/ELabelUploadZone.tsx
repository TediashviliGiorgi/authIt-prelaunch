import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Sparkles, Check } from 'lucide-react';

interface ELabelUploadZoneProps {
  onFileAccepted: (file: File) => void;
  isProcessing: boolean;
  progress: number;
  uploadedFile: File | null;
}

export function ELabelUploadZone({ 
  onFileAccepted, 
  isProcessing, 
  progress, 
  uploadedFile 
}: ELabelUploadZoneProps) {
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onFileAccepted(file);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxFiles: 1,
    disabled: isProcessing,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        rounded border-2 border-dashed px-3 py-2 cursor-pointer transition-all
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50'}
        ${isProcessing ? 'pointer-events-none' : ''}
      `}
    >
      <input {...getInputProps()} />
      
      <div className="flex items-center gap-2">
        {/* Icon */}
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center shrink-0
          ${isProcessing ? 'bg-primary/10' : uploadedFile ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-muted'}
        `}>
          {isProcessing ? (
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          ) : uploadedFile ? (
            <Check className="h-4 w-4 text-emerald-600" />
          ) : (
            <Upload className="h-4 w-4 text-muted-foreground" />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">AI analyzing...</span>
              <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden max-w-[100px]">
                <div 
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{Math.round(progress)}%</span>
            </div>
          ) : uploadedFile ? (
            <div>
              <p className="text-xs font-medium text-emerald-600 truncate">{uploadedFile.name}</p>
              <p className="text-[10px] text-muted-foreground">Click or drop to replace</p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-medium">
                {isDragActive ? 'Drop file here' : 'Drop PDF/Image for AI auto-fill'}
              </p>
              <p className="text-[10px] text-muted-foreground">PDF, PNG, JPG supported</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}