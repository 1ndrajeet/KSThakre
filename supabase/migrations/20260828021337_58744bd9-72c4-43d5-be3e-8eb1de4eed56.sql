DROP POLICY IF EXISTS "Temporary seed import" ON public.posts;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM public, anon, authenticated;
INSERT INTO public.user_roles (user_id, role) VALUES ('b09d758c-04b8-4bd4-8c13-fd4952b3e8ca', 'admin') ON CONFLICT (user_id, role) DO NOTHING;