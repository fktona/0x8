import React from "react";
import EditAccountPage from "../../_components/edit-account";
import { AccountTypes } from "@/app/actions/action";

async function Profile({ params }: { params: { id: string } }) {
  await params;
  const id = await params?.id;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}user/${id}`,
      {
        next: {
          tags: ["admin"],
        },
      }
    );

    const user: AccountTypes = await response.json();
    console.log(user);

    return <EditAccountPage account={user} />;
  } catch (error) {
    console.error(error);
    return <div>Error loading users</div>;
  }
}

export default Profile;
