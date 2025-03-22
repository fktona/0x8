import React from "react";
import ProfilePage from "../_components/profile";
import { TradeTransaction, UserProfile } from "@/types";
import { getAccount } from "@/app/actions/action";

interface Props {
  params: { id: string };
}

async function Profile({ params }: Props) {
  const id = params.id; // No need to await, params.id is already a string

  try {
    const [profile, response] = await Promise.all([
      getAccount(id),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}/transactions`, {
        next: {
          tags: ["admin"],
        },
      }),
    ]);

    const users: TradeTransaction[] = await response.json();

    return (
      <ProfilePage
        trades={users.slice(0, 50)}
        profile={profile as UserProfile}
      />
    );
  } catch (error) {
    console.error(error);
    return <div>Error loading profile</div>;
  }
}

export default Profile;
