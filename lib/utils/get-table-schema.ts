
const TABLE_SCHEMA = `

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

`;

export async function getTableSchema(): Promise<string> {
  return TABLE_SCHEMA;
}
