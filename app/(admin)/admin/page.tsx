import React from "react";
import AdminDashboardPage from "./_components/admin";

async function Admin() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user`, {
      next: {
        tags: ["admin"],
      },
    });

    const users = await response.json();
    console.log(users);

    return <AdminDashboardPage users={users} />;
  } catch (error) {
    console.error(error);
    return <div>Error loading users</div>;
  }
}

export const revaildate = 0;

export default Admin;
