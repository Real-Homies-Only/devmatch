import { KeyedMutator } from "swr";
import { z } from "zod";

import { User } from "@/utils/authProps";
import useSWRImmutable from "swr/immutable";

const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profilePicture: z.string(),
  userType: z.string(),
  isAdmin: z.boolean()
});

interface AuthState {
  loading: boolean;
  isLoggedIn: boolean;
  user: User;
}

interface APIResponse {
  loggedIn: boolean;
  user: User;
}

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args);
  const data: APIResponse = await response.json();
  return data;
};

const useAuthState = (): AuthState & { mutate: KeyedMutator<APIResponse> } => {
  const { data, error, mutate } = useSWRImmutable<APIResponse>(
    "/api/user",
    fetcher
  );

  if (error) {
    console.log("error");
    return {
      loading: false,
      isLoggedIn: false,
      user: {
        id: "",
        firstName: "",
        lastName: "",
        profilePicture: "",
        isAdmin: false,
        userType: ""
      },
      mutate
    };
  }

  if (!data) {
    console.log("got no data");
    return {
      loading: true,
      isLoggedIn: false,
      user: {
        id: "",
        firstName: "",
        lastName: "",
        profilePicture: "",
        isAdmin: false,
        userType: ""
      },
      mutate
    };
  }

  const { success, data: userData } = UserSchema.safeParse(data.user);

  if (!success) {
    console.log("failed");
    return {
      loading: false,
      isLoggedIn: false,
      user: {
        id: "",
        firstName: "",
        lastName: "",
        profilePicture: "",
        isAdmin: false,
        userType: ""
      },
      mutate
    };
  }

  return {
    loading: false,
    isLoggedIn: data.loggedIn,
    user: userData,
    mutate
  };
};

export default useAuthState;
