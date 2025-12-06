CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: increment_referral_count(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.increment_referral_count() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE public.waitlist_signups
    SET referral_count = referral_count + 1
    WHERE id = NEW.referred_by;
  END IF;
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    email text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT user_roles_role_check CHECK ((role = ANY (ARRAY['admin'::text, 'user'::text])))
);


--
-- Name: waitlist_signups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.waitlist_signups (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    referral_code text DEFAULT SUBSTRING(md5((random())::text) FROM 1 FOR 8),
    referred_by uuid,
    referral_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text
);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: waitlist_signups waitlist_signups_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waitlist_signups
    ADD CONSTRAINT waitlist_signups_email_key UNIQUE (email);


--
-- Name: waitlist_signups waitlist_signups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waitlist_signups
    ADD CONSTRAINT waitlist_signups_pkey PRIMARY KEY (id);


--
-- Name: waitlist_signups waitlist_signups_referral_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waitlist_signups
    ADD CONSTRAINT waitlist_signups_referral_code_key UNIQUE (referral_code);


--
-- Name: idx_waitlist_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_waitlist_created_at ON public.waitlist_signups USING btree (created_at DESC);


--
-- Name: idx_waitlist_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_waitlist_email ON public.waitlist_signups USING btree (email);


--
-- Name: idx_waitlist_referral_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_waitlist_referral_code ON public.waitlist_signups USING btree (referral_code);


--
-- Name: waitlist_signups on_waitlist_signup_with_referral; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER on_waitlist_signup_with_referral AFTER INSERT ON public.waitlist_signups FOR EACH ROW EXECUTE FUNCTION public.increment_referral_count();


--
-- Name: waitlist_signups waitlist_signups_referred_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waitlist_signups
    ADD CONSTRAINT waitlist_signups_referred_by_fkey FOREIGN KEY (referred_by) REFERENCES public.waitlist_signups(id);


--
-- Name: waitlist_signups Anyone can sign up for waitlist; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can sign up for waitlist" ON public.waitlist_signups FOR INSERT WITH CHECK (true);


--
-- Name: waitlist_signups Anyone can view signup count; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view signup count" ON public.waitlist_signups FOR SELECT USING (true);


--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- Name: waitlist_signups; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


