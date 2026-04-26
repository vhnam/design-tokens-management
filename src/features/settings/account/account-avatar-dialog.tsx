import { useState } from 'react';

import { Button } from '@/components/primitives/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/primitives/dialog';
import { Field, FieldLabel } from '@/components/primitives/field';
import { Input } from '@/components/primitives/input';

interface AccountAvatarDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (avatarUrl: string) => void;
}

const AccountAvatarDialog = ({ isOpen, onClose, onSubmit }: AccountAvatarDialogProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  const handleAvatarUpload = () => {
    onSubmit(avatarUrl);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Avatar</DialogTitle>
        </DialogHeader>
        <Field>
          <FieldLabel>Image URL</FieldLabel>
          <Input type="url" placeholder="Enter image URL" />
        </Field>

        {avatarUrl && (
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-gray-200">
              <img
                src={avatarUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => setAvatarUrl('')}
              />
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end pt-4 border-t">
          <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
          <Button
            type="button"
            onClick={handleAvatarUpload}
            disabled={!avatarUrl}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Set Avatar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountAvatarDialog;
