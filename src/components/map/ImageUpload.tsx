import { useState } from "react";
import { Input } from "@/components/ui/input";

const ImageUpload = () => {
  const [preview, setPreview] = useState<string>("");

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result!.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full"
      />
      {preview && (
        <div className="relative w-32 h-32">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
