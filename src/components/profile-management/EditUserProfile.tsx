"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, LoaderCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EditUserProfileProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};
const EditUserProfile = ({ user }: EditUserProfileProps) => {
  //   const { data: session } = useSession();
  //   const user = session?.user;
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(user.name ?? "");
  const [newEmail, setNewEmail] = useState(user.email ?? "");
  const [newImage, setNewImage] = useState(user.image ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const nameChanged = newName.trim() !== user.name;
    const emailChanged =
      newEmail.trim().toLowerCase() !== user.email.toLowerCase();
    const imageChanged = newImage.trim() !== (user.image ?? "");

    if (!nameChanged && !emailChanged && !imageChanged) {
      setMessage("কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setLoading(true);

    try {
      if (nameChanged || imageChanged) {
        const profileData: {
          name?: string;
          image?: string | null;
        } = {};

        if (nameChanged) {
          profileData.name = newName.trim();
        }

        if (imageChanged) {
          profileData.image = newImage.trim() || null;
        }

        const { error } = await authClient.updateUser(profileData);

        if (error) {
          setMessage(error.message || "Profile update failed.");
          return;
        }
      }

      if (emailChanged) {
        const { error } = await authClient.changeEmail({
          newEmail: newEmail.trim(),
          callbackURL: "/profile",
        });

        if (error) {
          setMessage(error.message || "Email change failed.");
          return;
        }

        setMessage(
          "নতুন email-এ verification link পাঠানো হয়েছে। Email verify করো।",
        );
        return;
      }

      setOpen(false);
      router.refresh();
    } catch {
      setMessage("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
        <Pencil className="size-4" />
        Edit Profile
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={user?.name}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder={user?.email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Profile Image URL</Label>
            <Input
              id="image"
              type="url"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder={user?.image as string}
            />
          </div>

          {message && (
            <p aria-live="polite" className="text-sm text-muted-foreground">
              {message}
            </p>
          )}

          <DialogFooter>
            <Button
              className="cursor-pointer"
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button className="cursor-pointer" type="submit" disabled={loading}>
              {loading && <LoaderCircle className=" size-4 animate-spin" />}
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserProfile;
