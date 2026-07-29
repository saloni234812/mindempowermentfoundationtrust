import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Export client if variables are present, otherwise return null
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database helper that automatically resolves from Supabase if connected, 
// otherwise falls back to our local MockDatabase
import { MockDatabase } from "./mockData";

export class DatabaseService {
  static async getImpactStats() {
    if (supabase) {
      const { data, error } = await supabase
        .from("impact_stats")
        .select("*")
        .order("order_index", { ascending: true });
      if (!error && data) return data;
    }
    return MockDatabase.getImpactStats();
  }

  static async getPrograms() {
    if (supabase) {
      const { data, error } = await supabase.from("programs").select("*");
      if (!error && data) return data;
    }
    return MockDatabase.getPrograms();
  }

  static async getProgramBySlug(slug: string) {
    if (supabase) {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .eq("slug", slug)
        .single();
      if (!error && data) return data;
    }
    return MockDatabase.getProgramBySlug(slug);
  }

  static async getProjects() {
    if (supabase) {
      const { data, error } = await supabase.from("projects").select("*");
      if (!error && data) return data;
    }
    return MockDatabase.getProjects();
  }

  static async getProjectBySlug(slug: string) {
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();
      if (!error && data) return data;
    }
    return MockDatabase.getProjectBySlug(slug);
  }

  static async getTransparencyDocs() {
    if (supabase) {
      const { data, error } = await supabase.from("transparency_documents").select("*");
      if (!error && data) return data;
    }
    return MockDatabase.getTransparencyDocs();
  }

  static async getBlogPosts() {
    if (supabase) {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) return data;
    }
    return MockDatabase.getBlogPosts();
  }

  static async getBlogPostBySlug(slug: string) {
    if (supabase) {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();
      if (!error && data) return data;
    }
    return MockDatabase.getBlogPostBySlug(slug);
  }

  static async getEvents() {
    if (supabase) {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });
      if (!error && data) return data;
    }
    return MockDatabase.getEvents();
  }

  static async registerVolunteer(volunteer: {
    name: string;
    email: string;
    phone: string;
    skills: string[];
    availability: string;
    location: string;
    resumeUrl?: string;
  }) {
    let result = { success: false, id: "" };
    if (supabase) {
      const { data, error } = await supabase
        .from("volunteers")
        .insert([volunteer])
        .select();
      if (!error && data) {
        result = { success: true, id: data[0].id };
      }
    } else {
      const mockRes = await MockDatabase.registerVolunteer(volunteer);
      if (mockRes.success) {
        result = { success: true, id: mockRes.id };
      }
    }

    if (result.success) {
      try {
        await fetch("/mail-handler.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...volunteer,
            form_type: "volunteer",
          }),
        });
      } catch (err) {
        console.error("Failed to send volunteer notification email:", err);
      }
    }

    return result;
  }

  static async submitContact(message: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    let result = { success: false };
    if (supabase) {
      const { error } = await supabase.from("contacts").insert([message]);
      if (!error) result = { success: true };
    } else {
      const mockRes = await MockDatabase.submitContact(message);
      if (mockRes.success) result = { success: true };
    }

    if (result.success) {
      try {
        await fetch("/mail-handler.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...message,
            form_type: "contact",
          }),
        });
      } catch (err) {
        console.error("Failed to send contact notification email:", err);
      }
    }

    return result;
  }

  static async submitNewsletter(email: string) {
    if (supabase) {
      const { error } = await supabase.from("newsletter").insert([{ email }]);
      if (!error) return { success: true };
    }
    return MockDatabase.submitNewsletter(email);
  }

  static async registerDonation(donation: {
    payment_id: string;
    amount: number;
    donor_name: string;
    donor_email: string;
    donor_phone?: string;
    campaign_id?: string;
    status: string;
    is_anonymous: boolean;
  }) {
    if (supabase) {
      const { data, error } = await supabase
        .from("donations")
        .insert([donation])
        .select();
      if (!error && data) return { success: true, receiptId: data[0].id };
    }
    return MockDatabase.registerDonation(donation);
  }
}
