import { useState, useEffect } from "react";
import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profilePicture: z.string()
});

type UserAccount = z.infer<typeof UserSchema>;

const useAuthState = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserAccount>({
    id: "",
    firstName: "",
    lastName: "",
    profilePicture: ""
  });

  useEffect(() => {
    const getLoggedInStatus = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();

        if (response.ok) {
          const { success } = UserSchema.safeParse(data.user);
          if (!success) throw new Error();
          setUser(data.user);
          setIsLoggedIn(data.loggedIn);
        } else {
          setUser({ id: "", firstName: "", lastName: "", profilePicture: "" });
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    getLoggedInStatus();
  }, []);

  return { loading, isLoggedIn, user };
};

export default useAuthState;
