"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Define validation schema
const AccountSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  wallet: z.string().min(1, { message: "Wallet address is required" }),
  twitter: z.string().optional(),
  telegram: z.string().optional(),
  imageUrl: z.string().optional(),
  chains: z.array(z.string()).optional(),
});

export type AccountTypes = z.infer<typeof AccountSchema>;

export type AccountFormState = {
  errors?: {
    name?: string[];
    wallet?: string[];
    twitter?: string[];
    telegram?: string[];
    imageUrl?: string[];
    chains?: string[];
    _form?: string[];
  };
  success?: boolean;
  message?: string;
};

// Function to upload image to Cloudinary
async function uploadToCloudinary(imageData: FormData): Promise<string | null> {
  try {
    // Replace with your actual Cloudinary upload URL and credentials
    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: imageData,
      }
    );

    if (!uploadResponse.ok) {
      console.log(uploadResponse);
      throw new Error("Failed to upload image");
    }

    const data = await uploadResponse.json();
    console.log("Cloudinary response:", data);
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
}

export async function addAccount(
  prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  try {
    // Extract form data
    const name = formData.get("name") as string;
    const wallet = formData.get("wallet") as string;
    const twitter = formData.get("twitter") as string;
    const telegram = formData.get("telegram") as string;
    const chainsData = formData.get("chains") as string;
    const chains = chainsData ? JSON.parse(chainsData) : [];

    // Handle image upload
    let imageUrl = null;
    const profileImage = formData.get("profileImage") as File;

    if (profileImage && profileImage.size > 0) {
      // Create a new FormData for Cloudinary
      const imageFormData = new FormData();
      imageFormData.append("file", profileImage);
      imageFormData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "default_preset"
      );

      // Upload to Cloudinary
      imageUrl = await uploadToCloudinary(imageFormData);
      console.log("Image URL:", imageUrl);
    }

    // Validate form data
    const validatedFields = AccountSchema.safeParse({
      name,
      wallet,
      twitter,
      telegram,
      imageUrl,
      chains,
    });

    // If validation fails, return errors
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Please fix the errors above.",
      };
    }

    // Prepare payload for backend
    const payload = {
      name: validatedFields.data.name,
      wallet: validatedFields.data.wallet,
      twitter: validatedFields.data.twitter || "",
      telegram: validatedFields.data.telegram || "",
      imageUrl: validatedFields.data.imageUrl || "",
      chains: validatedFields.data.chains || [],
    };

    // In a real app, you would send this payload to your backend API
    console.log("Account payload:", payload);

    // Example API call (uncomment and modify as needed)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["admin"],
      },
      body: JSON.stringify(payload),
    });

    console.log("API response:", response);

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to add account");
    }

    return {
      success: true,
      message: "Account added successfully!",
    };
  } catch (error) {
    console.error("Error adding account:", error);
    return {
      errors: {
        _form: ["Failed to add account. Please try again."],
      },
    };
  }
}

export const getAccount = async (wallet: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}user/${wallet}`,
      {
        method: "GET",
        next: {
          tags: ["admin"],
        },
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch account");
    }

    const data = await response.json();
    console.log("Account:", data);
    return data;
  } catch (error) {
    console.error("Error fetching account:", error);
    return null;
  }
};

export async function EditAccount(
  prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  try {
    // Extract form data
    const name = formData.get("name") as string;
    const wallet = formData.get("wallet") as string;
    const twitter = formData.get("twitter") as string;
    const telegram = formData.get("telegram") as string;
    const chainsData = formData.get("chains") as string;
    const chains = chainsData ? JSON.parse(chainsData) : [];
    const defaultImageUrl = formData.get("defaultImageUrl") as string;

    // Handle image upload
    let imageUrl = defaultImageUrl || null;
    const profileImage = formData.get("profileImage") as File;

    if (profileImage && profileImage.size > 0) {
      // Create a new FormData for Cloudinary
      const imageFormData = new FormData();
      imageFormData.append("file", profileImage);
      imageFormData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "default_preset"
      );

      // Upload to Cloudinary
      imageUrl = await uploadToCloudinary(imageFormData);
      console.log("Image URL:", imageUrl);
    }

    // Validate form data

    const validatedFields = AccountSchema.safeParse({
      name,
      wallet,
      twitter,
      telegram,
      imageUrl: imageUrl || "",
      chains,
    });

    // If validation fails, return errors
    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Please fix the errors above.",
      };
    }
    console.log({
      name,
      wallet,
      twitter,
      telegram,
      imageUrl: imageUrl || "",
      chains,
    });
    // Prepare payload for backend
    const payload = {
      name: validatedFields.data.name,
      wallet: validatedFields.data.wallet,
      twitter: validatedFields.data.twitter || "",
      telegram: validatedFields.data.telegram || "",
      imageUrl: validatedFields.data.imageUrl || "",
      chains: validatedFields.data.chains || [],
    };

    // In a real app, you would send this payload to your backend API
    console.log("Account payload:", payload);

    // Example API call (uncomment and modify as needed)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}user/${wallet}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["admin"],
        },
        body: JSON.stringify(payload),
      }
    );

    console.log("API response:", response);

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to add account");
    }

    return {
      success: true,
      message: "Account added successfully!",
    };
  } catch (error) {
    console.error("Error adding account:", error);
    return {
      errors: {
        _form: ["Failed to add account. Please try again."],
      },
    };
  }
}

export async function deleteAccount(wallet: string): Promise<AccountFormState> {
  try {
    // Make DELETE request to API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}user/${wallet}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["admin"],
        },
      }
    );

    console.log("API response:", response);

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to delete account");
    }

    revalidatePath("/admin");

    return {
      success: true,
      message: "Account deleted successfully!",
    };
  } catch (error) {
    console.error("Error deleting account:", error);
    return {
      errors: {
        _form: ["Failed to delete account. Please try again."],
      },
    };
  }
}

export async function getAllUsersTransactions() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}user/all-users-transactions`,
      {
        method: "GET",
        next: {
          tags: ["admin"],
        },
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();
    console.log("Transactions:", data);
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export async function getLeaderBoard(chain: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}user/pnl-leaderboard?chain=${chain}`,
      {
        method: "GET",
        next: {
          tags: ["admin"],
        },
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();
    console.log("Transactions:", data);
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export async function getUserPnl({
  wallet,
  chain,
  tokens,
}: {
  wallet: string;
  chain: string;
  tokens: string[];
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}user/${wallet}/tokens-pnl?chain=${chain}&tokens=${tokens}`,
      {
        method: "GET",
        next: {
          tags: ["admin"],
        },
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();
    console.log("Transactions:", data);
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export async function getUserTokenHoldings({
  wallet,
  chain,
}: {
  wallet: string;
  chain: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}user/${wallet}/top-holdings?chain=${chain}`,
      {
        method: "GET",
        next: {
          tags: ["admin"],
        },
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();
    console.log("Transactions:", data);
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export const TopInfo = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}tracker`, {
      method: "GET",
      next: {
        tags: ["admin"],
      },
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    console.log("Transactions:", data);
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
  return [];
};
