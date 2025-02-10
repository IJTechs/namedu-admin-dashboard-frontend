import { useEffect, useState } from 'react';
import { Button } from '@/components/shared/Button';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { useController } from 'react-hook-form';

interface IProps {
  control: any;
  name: string;
  validationError?: string;
}

export const NewsImages = ({ control, name, validationError }: IProps) => {
  const {
    field: { value = [], onChange },
  } = useController({ name, control });

  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (value.length > 0) {
      const previewUrls = value.map((img: string | File) => (typeof img === 'string' ? img : URL.createObjectURL(img)));
      setPreviews(previewUrls);
    }
  }, [value]);

  const handleImageChange = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));

      setPreviews(prev => [...prev, ...newPreviews]);
      onChange([...value, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = value.filter((_: File | string, i: number) => i !== index);
    setPreviews(prev => prev.filter((_, i) => i !== index));
    onChange(updatedImages);
  };

  return (
    <div className="border-[0.2px] border-gray-200 bg-gray-100 p-4 rounded-10 flex-1 space-y-2">
      <div className="flex items-center justify-between font-normal">
        <div>
          <span className="text-gray-700">Yangilik rasmi</span> <span className="text-rose-500">*</span>
        </div>
        <Button type="button" size="sm" variant="ghost" className="text-gray-500">
          <HiOutlinePlusCircle className="h-4 w-4" />
          <label htmlFor="images" className="cursor-pointer">
            {' '}
            Rasm yuklash{' '}
          </label>
        </Button>
      </div>

      {/* Image Previews */}
      <div className="grid gap-2 aspect-video overflow-x-auto scrollbar-hide">
        {previews.length > 0 ? (
          previews.map((src, index) => (
            <div key={index} className="relative border rounded-lg">
              <img src={src} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-md" />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 bg-rose-300 text-rose-500 px-2"
                onClick={() => handleRemoveImage(index)}
              >
                x
              </Button>
            </div>
          ))
        ) : (
          <div className="w-full h-auto py-24 rounded-md bg-gray-200 flex flex-col items-center justify-center text-gray-500">
            <RiUploadCloud2Line className="w-8 h-8" />
            <span className="text-sm">Yangilik rasmini yuklang</span>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-2">Tavsiya etilgan o'lcham nisbati: 16:9</p>

      {validationError && <p className="text-[0.8rem] font-medium text-destructive">{validationError}</p>}

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={e => handleImageChange(e.target.files)}
        className="hidden"
        id="images"
      />
    </div>
  );
};
