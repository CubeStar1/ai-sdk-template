CREATE OR REPLACE FUNCTION execute_sql(query text) 
RETURNS jsonb 
LANGUAGE plpgsql
AS $$
DECLARE
  result jsonb;
  clean_query text := rtrim(query, ';');
BEGIN
  EXECUTE 'SELECT jsonb_agg(t) FROM (' || clean_query || ') t' INTO result;
  RETURN result;
END;
$$;


create table public.plant_health_analyses (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  user_id uuid null,
  image_url text null,
  result jsonb null,
  constraint plant_health_analyses_pkey primary key (id),
  constraint plant_health_analyses_user_id_fkey foreign KEY (user_id) references auth.users (id)
) TABLESPACE pg_default;

create table public.pest_detections (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  user_id uuid null,
  image_url text null,
  detections jsonb null,
  constraint pest_detections_pkey primary key (id),
  constraint pest_detections_user_id_fkey foreign KEY (user_id) references auth.users (id)
) TABLESPACE pg_default;

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

create table public.conversations (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid null,
  title text not null,
  created_at timestamp with time zone null default CURRENT_TIMESTAMP,
  updated_at timestamp with time zone null default CURRENT_TIMESTAMP,
  constraint conversations_pkey primary key (id),
  constraint conversations_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create trigger update_conversations_updated_at BEFORE
update on conversations for EACH row
execute FUNCTION update_updated_at ();

create table public.messages (
  id uuid not null default extensions.uuid_generate_v4 (),
  conversation_id uuid null,
  role text not null,
  content text not null,
  tool_invocations jsonb null,
  created_at timestamp with time zone null default CURRENT_TIMESTAMP,
  constraint messages_pkey primary key (id),
  constraint messages_conversation_id_fkey foreign KEY (conversation_id) references conversations (id) on delete CASCADE
) TABLESPACE pg_default;