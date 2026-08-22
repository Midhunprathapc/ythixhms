'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';
import styles from './DocumentUploader.module.css';

export interface DocumentUploaderProps {
  label: string;
  accept?: string;
  onFilesChange: (files: File[]) => void;
}

export const DocumentUploader = ({ label, accept = "image/*,.pdf", onFilesChange }: DocumentUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    }
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <div>
      <div 
        className={`${styles.uploader} ${dragActive ? styles.dragActive : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <UploadCloud className={styles.icon} size={48} />
        <p className={styles.title}>{label}</p>
        <p className={styles.subtitle}>Drag and drop files here or click to browse</p>
      </div>

      {files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((file, index) => (
            <div key={index} className={styles.fileItem}>
              <div className={styles.fileInfo}>
                <FileText size={18} />
                <span>{file.name}</span>
              </div>
              <button 
                type="button"
                className={styles.removeBtn}
                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
