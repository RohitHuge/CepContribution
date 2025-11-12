import { createContext, useContext, useEffect, useState } from "react";
import { Client, Account, ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Configure Appwrite Client ---
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // or your Appwrite endpoint
    .setProject("68d984c90022bff5d32e");              // ⚡ Replace this

  const account = new Account(client);

  // --- Load current user (on app start or refresh) ---
  useEffect(() => {
    const loadUser = async () => {
      try {
        const current = await account.get();
        setUser(current);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // --- Auth Helpers ---
  const signUp = async ({ email, password, name }) => {
    await account.create(ID.unique(), email, password, name);
    return signIn({ email, password });
  };

  const signIn = async ({ email, password }) => {
    await account.createEmailPasswordSession(email, password);
    const current = await account.get();
    setUser(current);
    return current;
  };

  const signOut = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  // --- Optional: role or metadata extraction ---
  const roles = user?.prefs?.roles || [];

  return (
    <AuthContext.Provider
      value={{
        user,
        roles,
        loading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
