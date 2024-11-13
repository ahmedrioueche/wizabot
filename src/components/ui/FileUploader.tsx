import React, { useState, DragEvent, ChangeEvent, useEffect, useRef } from 'react';
import { Cloud, File } from 'lucide-react';
import { FaTrash } from 'react-icons/fa';

interface FileUploaderProps {
  maxFileSize?: number; // in bytes
  className?: string;
  isFileUploaded?: (value: boolean) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  className = '',
  isFileUploaded,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const filesLength = useRef<number>(files.length); // Initialize with files' length

  const validateFile = (file: File): boolean => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    const validTypes = ['pdf', 'csv', 'txt'];

    if (!extension || !validTypes.includes(extension)) {
      setError('Invalid file type. Only PDF, CSV, and TXT files are allowed.');
      return false;
    }

    if (file.size > maxFileSize) {
      setError(`File size exceeds ${maxFileSize / (1024 * 1024)}MB limit.`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const uploadedFiles = Array.from(e.dataTransfer.files);
    const validFiles = uploadedFiles.filter(validateFile);
    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files);
      const validFiles = uploadedFiles.filter(validateFile);
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  useEffect(() => {
    // Trigger the callback if file count changes
    if (isFileUploaded) {
      isFileUploaded(files.length > 0);
    }
    filesLength.current = files.length;
  }, [files, isFileUploaded]);

  return (
    <div className={`mx-auto w-full max-w-3xl space-y-4 ${className}`}>
      <div
        className={`relative rounded-lg border-2 border-dashed transition-colors duration-200 ${
          dragActive
            ? 'border-light-primary dark:border-dark-primary bg-light-primary/5 dark:bg-dark-primary/5'
            : 'border-light-muted dark:border-dark-muted'
        } p-8 text-center`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.csv,.txt"
          onChange={handleFileInput}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />

        <Cloud className="text-light-muted dark:text-dark-muted mx-auto h-12 w-12" />
        <div className="mt-4">
          <span className="text-light-text-primary dark:text-dark-text-primary font-semibold">Click to upload</span>
          <span className="text-light-text-secondary dark:text-dark-text-secondary"> or drag and drop</span>
        </div>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1 text-sm">
          Only PDF, CSV, Text Files Allowed
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="bg-light-surface dark:bg-dark-surface border-light-muted/20 dark:border-dark-muted/20 rounded-lg border">
          <div className="p-4">
            <h3 className="text-light-text-primary dark:text-dark-text-primary text-lg font-semibold">
              Uploaded Files
            </h3>
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="bg-light-background dark:bg-dark-background/50 flex items-center justify-between rounded-lg p-3"
                >
                  <div className="flex items-center space-x-3">
                    <File className="text-light-muted dark:text-dark-muted h-5 w-5" />
                    <span className="text-light-text-primary dark:text-dark-text-primary text-sm">{file.name}</span>
                    <span className="text-light-text-secondary dark:text-dark-text-secondary text-xs">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(file)}
                    className="hover:bg-light-muted/10 dark:hover:bg-dark-muted/10 rounded-full p-1 transition-colors duration-200"
                    aria-label="Remove file"
                  >
                    <FaTrash className="text-light-text-secondary dark:text-dark-text-secondary h-4 w-4 hover:text-red-500 dark:hover:text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
