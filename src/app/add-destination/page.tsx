"use client";

import { useState } from "react";
import { LoaderCircle, PackagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

const CATEGORIES = [
  "Beach",
  "Cultural",
  "Adventure",
  "Mountain",
  "City Break",
  "Wildlife",
  "Cruise",
];

const EMPTY_PACKAGE = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

type DestinationPackage = typeof EMPTY_PACKAGE;

const inputClass =
  "h-11 border-transparent bg-slate-50 placeholder:text-slate-400 focus-visible:bg-white";

const AddDestinationPage = () => {
  const [form, setForm] = useState<DestinationPackage>(EMPTY_PACKAGE);
  const [saving, setSaving] = useState(false);

  const updateForm = (updates: Partial<DestinationPackage>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const handleAddPackage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPackage: DestinationPackage = { ...form };

    setSaving(true);
    try {
      // API calling.
      const res = await fetch("http://localhost:5000/add-destination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPackage),
      });

      const data = await res.json();
      if (data.acknowledged === true) {
        toast.success("Destination Added successfully");
        setForm(EMPTY_PACKAGE);
      } else {
        toast.error("Failed to add destination. Please try again.");
      }
    } catch {
      /* Network failure or non-JSON response. */
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
      <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
        Add New Travel Package
      </h1>
      <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
        <form onSubmit={handleAddPackage} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Destination Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(event) => updateForm({ name: event.target.value })}
              placeholder="Bali Paradise"
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
                placeholder="Indonesia"
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
                  <SelectValue placeholder="Select category" />
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
                onChange={(event) => updateForm({ price: event.target.value })}
                placeholder="e.g., 1299"
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
                placeholder="e.g., 7 Days/6 Nights"
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
              onChange={(event) => updateForm({ imageUrl: event.target.value })}
              placeholder="https://example.com/image.jpg"
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
              placeholder="Describe the travel experience..."
              rows={5}
              className="border-transparent bg-slate-50 placeholder:text-slate-400 focus-visible:bg-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setForm(EMPTY_PACKAGE)}
              disabled={saving}
              className="cursor-pointer h-10 border-red-200 px-5 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="cursor-pointer h-10 bg-cyan-600 px-5 hover:bg-cyan-700"
            >
              {saving ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <PackagePlus />
              )}
              {saving ? "Adding..." : "Add Travel Package"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDestinationPage;
