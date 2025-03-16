import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Missing env variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		autoRefreshToken: true,
		persistSession: true,
	},
});

export const signInWithGoogle = async () => {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: "google",
	});
	if (error) {
		console.error("Error signing in with Google", error);
	}
};

export const signInWithGitHub = async () => {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: "github",
	});
	if (error) {
		console.error("Error signing in with Github", error);
	}
};

export const checkSession = async () => {
	try {
		const {
			data: { session },
			error,
		} = await supabase.auth.getSession();
		if (error) throw error;
		return session;
	} catch (error) {
		console.error("Error checking session:", error);
		return null;
	}
};
