/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import React, { useRef, useState } from "react";

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imageKit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with  status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (e) {
    throw new Error(`Authentication request failed: ${e}`);
  }
};

const ImageUpload = ({onFileChange}: {onFileChange: (filePath: string) => void}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.log(error)
    toast({
      title: 'Image upload failed',
      description: `Your image could not be uploaded. Please try again.`,
      variant: 'destructive'
    })
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath)
    toast({
      title: 'Image uploaded successfully',
      description: `${res.filePath} uploaded successfully!`
    })
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="text-upload.png"
      />

      <button className="form-input upload-btn" onClick={(e) => {
        e.preventDefault();
        if(ikUploadRef.current) {
            // @ts-expect-error: ikUploadRef is typed as null but will be assigned a valid ref
            ikUploadRef.current?.click();
        }
      }}>
          <Image src='/icons/upload.svg' alt="upload-icon" width={20} height={20} className="object-contain" />
          <p className="text- font-light text-light-100">Upload a file</p>
          {file && <p className="upload-filename">{file.filePath}</p> }
      </button>

      {file && (
        <IKImage 
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
