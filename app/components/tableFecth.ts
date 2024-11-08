import  supabase  from '@/lib/Supabase/Client';

export const tableFetch = async () => {
    const { data, error } = await supabase.from("posts").select("*")
    if (error) {
        throw error
    }
    return data
};