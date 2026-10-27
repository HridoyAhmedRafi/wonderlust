import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserRound, Mail } from "lucide-react";
import EditUserProfile from "@/components/profile-management/EditUserProfile";
import SignOutUserPfile from "@/components/profile-management/SignOutUserPfile";

const Profilepage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="rounded-2xl border p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold">Please sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-cyan-600">ACCOUNT</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your personal information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          {/* Cover */}
          <div className="h-32 bg-linear-to-r from-cyan-500 to-blue-600" />

          <div className="px-6 pb-8 sm:px-8">
            {/* Avatar and Actions */}
            <div className="-mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-cyan-50 text-3xl font-bold text-cyan-700 shadow-sm">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User profile"}
                      width={96}
                      height={96}
                      unoptimized
                      className="size-full object-cover"
                    />
                  ) : (
                    user.name?.charAt(0).toUpperCase() || "U"
                  )}
                </div>

                <div className="pb-1">
                  <h2 className="text-xl font-bold sm:text-2xl">
                    {user.name || "User"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    My Account
                  </p>
                </div>
              </div>

              <div className="flex gap-3 sm:pb-1">
                <EditUserProfile user={user}></EditUserProfile>
                <SignOutUserPfile></SignOutUserPfile>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your account details.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UserRound className="size-4 text-cyan-600" />
                    Full Name
                  </div>
                  <p className="mt-3 break-word font-medium">
                    {user.name || "Not provided"}
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="size-4 text-cyan-600" />
                    Email Address
                  </div>
                  <p className="mt-3 break-all font-medium">
                    {user.email || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profilepage;
