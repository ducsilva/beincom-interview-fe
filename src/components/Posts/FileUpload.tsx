'use client'
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const FileUploader = ({ onFileSelect, width = 600, height = 300 }) => {
  const fileInput = useRef(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const handleFileInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }

    const file = target.files[0]

    if (file.size > 1024 * 100) {
      toast("Max file size exceeded! File size accepted is 100 MB ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          color: "#4A6CF7",
          backgroundColor: "#fff"
        }
      })
    } else {
      onFileSelect(target.files[0]);
      const fileReader = new FileReader;
      fileReader.onload = function () {
        setPreview(fileReader.result);
      }
      fileReader.readAsDataURL(target.files[0])
    }
  }

  return (
    <div className="file-uploader">
      <input onChange={handleFileInput} id="image"
        type="file"
        name="image"
        accept="image/*" />
      <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary" />

      {preview && (
        <Image src={preview as string} alt="Upload preview" width={width} height={height} className='mt-2 rounded-3xl' />
      )}

    </div>
  )
}
export default FileUploader