"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Pencil, Save, X } from "lucide-react";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IDestination } from "@/lib/destinations";

const CATEGORIES = [
  "Beach",
  "Cultural",
  "Adventure",
  "Mountain",
  "City Break",
  "Wildlife",
  "Cruise",
];

const inputClass =
  "h-11 border-transparent bg-slate-50 placeholder:text-slate-400 focus-visible:bg-white";

export function EditDestination({
  destination,
}: {
  destination: IDestination;
}) {
  const router = useRouter();
  const [form, setForm] = useState(destination);
  const [saving, setSaving] = useState(false);

  const updateForm = (updates: Partial<IDestination>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const handleUpdatePackage = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const { _id, ...payload } = form;
    setSaving(true);
    try {
      // API calling.
      const res = await fetch(`http://localhost:5000/destinations/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const data = await res.json();

      if (data.matchedCount > 0 || data.modifiedCount > 0) {
        router.refresh();
        toast.success("Destination updated successfully");
      } else {
        toast.error("Destination not found. Please try again.");
      }
    } catch {
      /* Network failure, non-OK status, or non-JSON response. */
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" className="cursor-pointer">
            <Pencil></Pencil> Edit
          </Button>
        }
      />
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-sm md:min-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Make changes to your destination here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <form onSubmit={handleUpdatePackage} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Destination Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(event) => updateForm({ name: event.target.value })}
                placeholder={destination.name}
                className={inputClass}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={form.country}
                  onChange={(event) =>
                    updateForm({ country: event.target.value })
                  }
                  placeholder={destination.country}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={form.category || null}
                  onValueChange={(value) =>
                    updateForm({
                      category: typeof value === "string" ? value : "",
                    })
                  }
                >
                  <SelectTrigger
                    id="category"
                    className="h-11 w-full border-transparent bg-slate-50"
                  >
                    <SelectValue placeholder={destination.category} />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="any"
                  value={form.price}
                  onChange={(event) =>
                    updateForm({ price: event.target.value })
                  }
                  placeholder={destination.price}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={form.duration}
                  onChange={(event) =>
                    updateForm({ duration: event.target.value })
                  }
                  placeholder={destination.duration}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                type="date"
                value={form.departureDate}
                onChange={(event) =>
                  updateForm({ departureDate: event.target.value })
                }
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={form.imageUrl}
                onChange={(event) =>
                  updateForm({ imageUrl: event.target.value })
                }
                placeholder={destination.imageUrl}
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(event) =>
                  updateForm({ description: event.target.value })
                }
                placeholder={destination.description}
                rows={5}
                className="border-transparent bg-slate-50 placeholder:text-slate-400 focus-visible:bg-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setForm(destination)}
                    disabled={saving}
                    className="cursor-pointer h-10 border-red-200 px-5 text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <X />
                    Cancel
                  </Button>
                }
              ></DialogClose>
              <DialogClose
                render={
                  <Button
                    type="submit"
                    disabled={saving}
                    className="cursor-pointer h-10 bg-cyan-600 px-5 hover:bg-cyan-700"
                  >
                    {saving ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      <Save></Save>
                    )}
                    {saving ? "Saving..." : "Save"}
                  </Button>
                }
              />
            </div>
          </form>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
