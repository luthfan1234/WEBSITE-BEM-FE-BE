'use client';

import { useState, useRef } from 'react';

export default function ImageUpload({ value, onChange, disabled = false }) {
  const [preview, setPreview] = useState(value || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Reset error
    setError('');
    
    // File type validation
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('File harus berformat JPG, PNG, GIF, atau WebP');
      return;
    }
    
    // File size validation (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setError('Ukuran file maksimal 2MB');
      return;
    }
    
    // Create a temporary preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      setPreview(result);
      onChange(result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleExternalUrlChange = (e) => {
    const url = e.target.value;
    setPreview(url);
    onChange(url);
  };
  
  const handleUpload = async () => {
    const file = fileInputRef.current?.files[0];
    if (!file) return;
    
    setUploading(true);
    setError('');
    
    try {
      // In a real implementation, you would upload to a server
      // For now, we'll simulate with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a data URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Gagal mengunggah gambar. Silakan coba lagi.');
    } finally {
      setUploading(false);
    }
  };
  
  const clearImage = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload-component">
      <div className="mb-3">
        <label className="form-label">URL Gambar</label>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="https://example.com/image.jpg"
          value={value || ''}
          onChange={handleExternalUrlChange}
          disabled={disabled || uploading}
        />
        <div className="small text-muted">Masukkan URL gambar atau unggah dari perangkat</div>
      </div>
      
      <div className="mb-3">
        <label className="form-label">Unggah Gambar</label>
        <div className="input-group">
          <input
            ref={fileInputRef}
            type="file"
            className="form-control"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleImageChange}
            disabled={disabled || uploading}
          />
          <button 
            className="btn btn-outline-secondary" 
            type="button" 
            onClick={handleUpload}
            disabled={disabled || uploading || !fileInputRef.current?.files[0]}
          >
            {uploading ? 'Mengunggah...' : 'Unggah'}
          </button>
        </div>
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
      
      {preview && (
        <div className="image-preview mb-3">
          <label className="form-label">Preview</label>
          <div className="position-relative" style={{
            width: '100%',
            paddingBottom: '56.25%' /* 16:9 aspect ratio */,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '4px',
            background: '#f0f0f0'
          }}>
            <img
              src={preview}
              alt="Preview"
              className="img-thumbnail"
              style={{ 
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                objectFit: 'cover',
                objectPosition: 'center',
                border: 'none',
                borderRadius: '4px'
              }}
              onError={(e) => {
                setError('Gambar tidak dapat dimuat. Periksa URL Anda.');
                e.target.src = 'https://via.placeholder.com/800x450/f0f0f0/666666?text=Error+Loading+Image';
              }}
            />
            <button
              type="button"
              className="btn btn-sm btn-danger position-absolute"
              style={{ top: '10px', right: '10px', zIndex: 10 }}
              onClick={clearImage}
              disabled={disabled || uploading}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .image-upload-component {
          background-color: #f8f9fa;
          border-radius: 6px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }
        .image-preview {
          background-color: white;
          border-radius: 4px;
          padding: 0.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
}
