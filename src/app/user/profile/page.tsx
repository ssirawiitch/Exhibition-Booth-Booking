// app/profile/edit/page.tsx
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ViewProfile from "@/component/ViewProfile";
import getUserProfile from "@/libs/getUserProfile";
import { redirect } from "next/navigation";

export default async function UserProfile() {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token as string | undefined;

    let userDetail = null;
    if (session?.user?.token) {
      userDetail = await getUserProfile(session.user.token as string);
    }
    const userRole = userDetail?.data?.role;
    if (userRole !== 'member') {
      redirect("/user/login");
    }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized</h1>
          <p className="text-gray-600">Please login to view your profile</p>
        </div>
      </div>
    );
  }

  const userData = await getUserProfile(token);
  const user = userData?.data;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Failed to load profile
          </h1>
          <p className="text-gray-600">Please try logging in again.</p>
        </div>
      </div>
    );
  }

  return <ViewProfile user={user} />;
}
