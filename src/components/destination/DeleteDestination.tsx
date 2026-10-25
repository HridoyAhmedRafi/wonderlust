"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { DialogClose } from "../ui/dialog";
import { IDestination } from "@/lib/destinations";

const DeleteDestination = ({ destination }: { destination: IDestination }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:5000/destinations/${destination._id}`,
      {
        method: "DELETE",
      },
    );
    const data = await res.json();
    console.log("Response from server", data);
    if (data.acknowledged === true) {
      redirect("/destinations");
      router.refresh();
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          className="cursor-pointer"
          render={<Button variant="destructive" />}
        >
          <Trash data-icon="inline-start" className="size-3.5" />
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              destination from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <DialogClose
              render={
                <AlertDialogAction
                  onClick={handleDelete}
                  type="submit"
                  className="cursor-pointer"
                >
                  Continue
                </AlertDialogAction>
              }
            ></DialogClose>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteDestination;
