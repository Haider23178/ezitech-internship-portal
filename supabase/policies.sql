-- APPLICANTS POLICIES

CREATE POLICY "Applicants can view own record"
ON public.applicants
FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Applicants can insert own record"
ON public.applicants
FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage applicants"
ON public.applicants
FOR ALL TO authenticated
USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');


-- RESUMES POLICIES

CREATE POLICY "Applicants can view own resumes"
ON public.resumes
FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.applicants
        WHERE applicants.id = resumes.applicant_id
        AND applicants.user_id = auth.uid()
    )
);

CREATE POLICY "Applicants can insert own resumes"
ON public.resumes
FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.applicants
        WHERE applicants.id = resumes.applicant_id
        AND applicants.user_id = auth.uid()
    )
);

CREATE POLICY "Admins can manage resumes"
ON public.resumes
FOR ALL TO authenticated
USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');


-- STATUS LOGS POLICIES

CREATE POLICY "Applicants can view own status logs"
ON public.status_logs
FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.applicants
        WHERE applicants.id = status_logs.applicant_id
        AND applicants.user_id = auth.uid()
    )
);

CREATE POLICY "Admins can manage status logs"
ON public.status_logs
FOR ALL TO authenticated
USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');


-- STORAGE POLICIES

CREATE POLICY "Applicants can upload own resumes"
ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'resumes'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Applicants can view own resumes"
ON storage.objects
FOR SELECT TO authenticated
USING (
    bucket_id = 'resumes'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Admins can manage resume files"
ON storage.objects
FOR ALL TO authenticated
USING (
    bucket_id = 'resumes'
    AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
)
WITH CHECK (
    bucket_id = 'resumes'
    AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);