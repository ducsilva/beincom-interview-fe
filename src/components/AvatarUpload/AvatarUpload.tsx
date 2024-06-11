'use client'

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export const AvatarUploader = ({ onFileSelect, initialAvatar, width = 150, height = 150, canUpdate = true }) => {
    const fileInput = useRef(null);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>('');

    useEffect(() => {
        if (initialAvatar) {
            setPreview(initialAvatar)
        }
    }, [initialAvatar])

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & {
            files: FileList;
        };

        const file = target.files[0];

        if (file.size > 1024 * 1024) { // 1 MB
            toast("Max file size exceeded! File size accepted is 1 MB", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    color: "#4A6CF7",
                    backgroundColor: "#fff",
                },
            });
        } else {
            onFileSelect(file);
            const fileReader = new FileReader();
            fileReader.onload = function () {
                setPreview(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };

    return (
        <div className="file-uploader flex flex-col items-center justify-center p-4">
            <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                ref={fileInput}
            />
            <div
                className="cursor-pointer flex items-center justify-center w-36 h-36 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300"
                onClick={() => {
                    if (canUpdate) {
                        fileInput.current && fileInput.current.click()
                    }
                }}
            >
                {preview ? (
                    <Image
                        src={preview as string}
                        alt="Upload preview"
                        width={width}
                        height={height}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="text-gray-500">Upload Avatar</div>
                )}
            </div>

        </div>
    );
};