import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Program = {
  id: string;
  name: string;
  slug: string;
  description: string;
  age_group: string;
  mode: string;
  image_url: string | null;
  sort_order: number;
};

export type ClassRow = {
  id: string;
  title: string;
  trainer_name: string;
  starts_at: string;
  duration_minutes: number;
  age_group: string;
  mode: string;
};

export type Entrepreneur = {
  id: string;
  display_name: string;
  age: number | null;
  category: string;
  headline: string;
  bio: string;
  panchayat: string | null;
};

export type ProjectRow = {
  id: string;
  entrepreneur_id: string | null;
  title: string;
  description: string;
};

export const programsQuery = queryOptions({
  queryKey: ["programs"],
  queryFn: async (): Promise<Program[]> => {
    const { data, error } = await supabase
      .from("programs")
      .select("id,name,slug,description,age_group,mode,image_url,sort_order")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Program[];
  },
});

export const classesQuery = queryOptions({
  queryKey: ["classes"],
  queryFn: async (): Promise<ClassRow[]> => {
    const { data, error } = await supabase
      .from("classes")
      .select("id,title,trainer_name,starts_at,duration_minutes,age_group,mode")
      .order("starts_at", { ascending: true });
    if (error) throw error;
    return (data ?? []) as ClassRow[];
  },
});

export const entrepreneursQuery = queryOptions({
  queryKey: ["entrepreneurs"],
  queryFn: async (): Promise<Entrepreneur[]> => {
    const { data, error } = await supabase
      .from("entrepreneurs")
      .select("id,display_name,age,category,headline,bio,panchayat")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Entrepreneur[];
  },
});

export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: async (): Promise<ProjectRow[]> => {
    const { data, error } = await supabase
      .from("projects")
      .select("id,entrepreneur_id,title,description")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []) as ProjectRow[];
  },
});
