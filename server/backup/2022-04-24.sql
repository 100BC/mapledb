--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6 (Ubuntu 13.6-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.6 (Ubuntu 13.6-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Genre; Type: TYPE; Schema: public; Owner: mooseical
--

CREATE TYPE public."Genre" AS ENUM (
    'COUNTRY',
    'ELECTRONIC',
    'EXPERIMENTAL',
    'FOLK',
    'JAZZ',
    'METAL',
    'POP',
    'RAP',
    'ROCK'
);


ALTER TYPE public."Genre" OWNER TO mooseical;

--
-- Name: MusicType; Type: TYPE; Schema: public; Owner: mooseical
--

CREATE TYPE public."MusicType" AS ENUM (
    'ALBUM',
    'EP',
    'SINGLE',
    'LIVE',
    'OTHER',
    'DELUXE',
    'REMIX',
    'COMPILATION'
);


ALTER TYPE public."MusicType" OWNER TO mooseical;

--
-- Name: Province; Type: TYPE; Schema: public; Owner: mooseical
--

CREATE TYPE public."Province" AS ENUM (
    'AB',
    'BC',
    'MB',
    'NB',
    'NL',
    'NS',
    'NT',
    'NU',
    'ON',
    'PE',
    'QC',
    'SK',
    'YT'
);


ALTER TYPE public."Province" OWNER TO mooseical;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: city; Type: TABLE; Schema: public; Owner: mooseical
--

CREATE TABLE public.city (
    id smallint NOT NULL,
    name character varying(255) NOT NULL,
    province public."Province" NOT NULL
);


ALTER TABLE public.city OWNER TO mooseical;

--
-- Name: City_id_seq; Type: SEQUENCE; Schema: public; Owner: mooseical
--

CREATE SEQUENCE public."City_id_seq"
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."City_id_seq" OWNER TO mooseical;

--
-- Name: City_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mooseical
--

ALTER SEQUENCE public."City_id_seq" OWNED BY public.city.id;


--
-- Name: subgenre; Type: TABLE; Schema: public; Owner: mooseical
--

CREATE TABLE public.subgenre (
    id smallint NOT NULL,
    name character varying(255) NOT NULL,
    genre public."Genre" NOT NULL
);


ALTER TABLE public.subgenre OWNER TO mooseical;

--
-- Name: Subgenre_id_seq; Type: SEQUENCE; Schema: public; Owner: mooseical
--

CREATE SEQUENCE public."Subgenre_id_seq"
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Subgenre_id_seq" OWNER TO mooseical;

--
-- Name: Subgenre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mooseical
--

ALTER SEQUENCE public."Subgenre_id_seq" OWNED BY public.subgenre.id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: mooseical
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO mooseical;

--
-- Name: music; Type: TABLE; Schema: public; Owner: mooseical
--

CREATE TABLE public.music (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    music_type public."MusicType" NOT NULL,
    release date NOT NULL,
    date_added timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    instrumental boolean DEFAULT false NOT NULL,
    subgenre_id smallint NOT NULL,
    non_canadians character varying(255)[],
    apple_link character varying(255),
    bandcamp_link character varying(255),
    soundcloud_link character varying(255),
    spotify_link character varying(255),
    youtube_link character varying(255),
    has_cover boolean DEFAULT false NOT NULL,
    copyright character varying(255)
);


ALTER TABLE public.music OWNER TO mooseical;

--
-- Name: musician; Type: TABLE; Schema: public; Owner: mooseical
--

CREATE TABLE public.musician (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    date_added timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    city_id smallint NOT NULL,
    is_group boolean DEFAULT false NOT NULL,
    apple_link character varying(255),
    bandcamp_link character varying(255),
    soundcloud_link character varying(255),
    spotify_link character varying(255),
    youtube_link character varying(255),
    disbanded date
);


ALTER TABLE public.musician OWNER TO mooseical;

--
-- Name: musician_music; Type: TABLE; Schema: public; Owner: mooseical
--

CREATE TABLE public.musician_music (
    musician_id character varying(255) NOT NULL,
    music_id character varying(255) NOT NULL
);


ALTER TABLE public.musician_music OWNER TO mooseical;

--
-- Name: city id; Type: DEFAULT; Schema: public; Owner: mooseical
--

ALTER TABLE ONLY public.city ALTER COLUMN id SET DEFAULT nextval('public."City_id_seq"'::regclass);


--
-- Name: subgenre id; Type: DEFAULT; Schema: public; Owner: mooseical
--

ALTER TABLE ONLY public.subgenre ALTER COLUMN id SET DEFAULT nextval('public."Subgenre_id_seq"'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: mooseical
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
cbffd29a-09e8-4d1a-ae14-8fa91dfa73aa	24650f304c573f60aa3a6f27d1a338c447b907dc92a489d6c0fcff4306180ea4	2021-11-11 03:53:11.145981+00	20211107203347_init	\N	\N	2021-11-11 03:53:11.017079+00	1
44550c2c-2ace-45ed-a27e-156f991f30ba	070304b87d1635fe3a0b21b0649255fdb68b02b19f041f3ec0913fa5b4649d1b	2021-11-11 05:13:20.165203+00	20211111051046_add_delete_cascade	\N	\N	2021-11-11 05:13:20.145782+00	1
2bdd7870-62a2-4484-9319-578cd9e41351	c6470beab2ec44bced2a42debed788dfd26f91fe25a416c5e4c47c15074b70aa	2021-11-12 05:35:44.222502+00	20211112045845_add_disbanded	\N	\N	2021-11-12 05:35:44.206256+00	1
c5062779-e193-404d-863a-d8cbd84898c9	e3d0742dcb1b5df9e1ff149bced6fe09822900bcbe1805607675311285cfddc4	2021-11-12 20:05:40.244857+00	20211112194604_remove_unique_cover	\N	\N	2021-11-12 20:05:40.224548+00	1
3123510f-b774-42f2-8a0d-36cdfa4dffbb	f06ace0b6711d79d4e09666f6bcc14aa29274f4a9ddae2422b42121adfda97f9	2022-02-06 23:15:48.905386+00	20220206201033_create_has_cover	\N	\N	2022-02-06 23:15:48.867444+00	1
453359d9-e81a-47f6-907c-25b30dd9985a	6d865eb1d1f5dc77d5eca5c56e3c63a34e448b39a886981d973d3ea60e679cd2	2022-02-07 04:22:07.790723+00	20220207031734_create_label_table	\N	\N	2022-02-07 04:22:07.742416+00	1
3c78974c-cc31-45e7-a27c-94f043a28e95	d8270b591848db3dae925b0e14a09a04633f5b1f55d92c77a39c1e9f760d21d2	2022-02-07 21:22:58.342755+00	20220207184043_drop_latest_release	\N	\N	2022-02-07 21:22:58.32381+00	1
24e2a7e0-a161-4641-a645-a8aac7922491	9237cd7e4c879be6c286506fb421289c4727b01b9a1debf2ce9f3062cd8c4484	2022-02-08 20:41:10.874801+00	20220208201322_swap_label_to_copyright	\N	\N	2022-02-08 20:41:10.854244+00	1
cc58058b-bd78-4b96-b353-134c04190d24	bc1e571b41145017ddfd2cf45c7144f021453dc09f743a0987eae43dbc1c79a9	2022-02-10 02:57:20.365845+00	20220210012351_index_music_type_release	\N	\N	2022-02-10 02:57:20.261183+00	1
ae6d035e-c4cf-4cc6-b986-cfe6036882a0	2d5305bcaa2be16c42b027e0d74eafb7c763490a8f842ade72893ccf321012e6	2022-02-13 20:39:17.971439+00	20220213202957_remove_cover	\N	\N	2022-02-13 20:39:17.846634+00	1
55604d67-79d0-4420-a863-d73c386dd256	96289127db8aa4157d4e240e45133980a5a23da2872dafc11fd25ebf80724389	2022-04-02 05:58:01.644003+00	20220402052242_add_new_music_type	\N	\N	2022-04-02 05:58:01.636883+00	1
3ca0f938-65a9-4e0f-a195-b36d46d05a37	74b2bc09845b9d8735db96e6978fd22fe17d1b05d930777e80b0148982ba0b3d	2022-04-02 06:18:56.809193+00	20220402060512_add_compilation_music_type	\N	\N	2022-04-02 06:18:56.803103+00	1
e2e19904-d4c6-4dd3-b562-f3ee4fa39dc4	eab2ff767cf03ebfcc158497fef450d60c9185a1304eb0ae7b77c8875a57d0c9	2022-04-09 02:12:24.39619+00	20220409020201_rename_tables	\N	\N	2022-04-09 02:12:24.382761+00	1
8604c23e-be24-456e-ab78-840f40fbc6d4	74d831d14d5dacc041f1e4c59a6644bf435fc4363f73c07f3eac613767bfe3a3	2022-04-09 02:12:24.409229+00	20220409020520_rename_table_constraints	\N	\N	2022-04-09 02:12:24.398065+00	1
cc42ef11-a437-43ea-adb9-7606ea12d10a	7b48c00d8bfe0407b82ce69e79705b01ac43f31cf26dabeccbe7077d3ac61af0	2022-04-09 02:39:15.480432+00	20220409022052_rename_columns	\N	\N	2022-04-09 02:39:15.471053+00	1
bba66548-5d9a-4269-8a85-7fb6b4b821b0	6eee61018908e46e1d0eee9486396421c102045407cff295b80df43159951a3a	2022-04-09 02:39:15.487442+00	20220409023152_rename_column_constraints	\N	\N	2022-04-09 02:39:15.48207+00	1
\.


--
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: mooseical
--

COPY public.city (id, name, province) FROM stdin;
1	Toronto	ON
2	Calgary	AB
3	Montréal	QC
4	Regina	SK
5	Vancouver	BC
6	Ottawa	ON
7	Quinte West	ON
8	Winnipeg	MB
9	Edmonton	AB
10	Trois Rivières	QC
11	Halifax	NS
12	Victoria	BC
\.


--
-- Data for Name: music; Type: TABLE DATA; Schema: public; Owner: mooseical
--

COPY public.music (id, name, music_type, release, date_added, instrumental, subgenre_id, non_canadians, apple_link, bandcamp_link, soundcloud_link, spotify_link, youtube_link, has_cover, copyright) FROM stdin;
au-de-la	Au De La	ALBUM	2015-09-18	2021-11-20 00:52:01.526	f	39	{}	https://music.apple.com/us/album/au-de-la/1034625356	https://bigbravesl.bandcamp.com/album/au-de-la	https://soundcloud.com/big-brave/sets/audela	https://open.spotify.com/album/6tWiEilM2DWdFQCiT2AuXx	https://www.youtube.com/playlist?list=OLAK5uy_ldugMaMnl2Rp0wsLRxzZDgYdsa9uIwnvc	t	2015 Southern Lord Recordings
go-grey	Go Grey	ALBUM	2010-02-02	2021-11-11 15:35:26.683	f	7	{}	https://music.apple.com/us/album/go-grey/346049268	https://usgirls.bandcamp.com/album/go-grey-lp	\N	https://open.spotify.com/album/2zj0tmX0sbfwIuIrzIpMoO	https://www.youtube.com/playlist?list=OLAK5uy_mzreKJ3LpoUtniE2sfapyd5D0yJJNExmo	t	2010 Siltbreeze
new-material	New Material	ALBUM	2018-03-23	2021-11-11 04:36:21.905	f	2	{}	https://music.apple.com/us/album/new-material/1329736231	https://preoccupations.bandcamp.com/album/new-material	https://soundcloud.com/preoccupations/sets/new-material-5	https://open.spotify.com/album/0bN1NlgXiOJ3IwR7wOp9XT	https://www.youtube.com/playlist?list=OLAK5uy_mUL6V8zMxZJbvXfQW_2gUy-mn2tKm0rxo	t	Flemish Eye Records
preoccupations	Preoccupations	ALBUM	2016-09-16	2021-11-11 04:34:49.819	f	2	{}	https://music.apple.com/us/album/preoccupations/1120204378	https://preoccupations.bandcamp.com/album/preoccupations-2	\N	https://open.spotify.com/album/4LAzbMdXrJqjby5ujfGLkp	https://www.youtube.com/playlist?list=OLAK5uy_mTTNIdVDTr_0V2QykJY3a_UyDftqsFuXI	t	Flemish Eye Records
viet-cong	Viet Cong	ALBUM	2015-01-20	2021-11-11 04:30:28.703	f	2	{}	https://music.apple.com/us/album/viet-cong/927436612	https://preoccupations.bandcamp.com/album/viet-cong	\N	https://open.spotify.com/album/0VI3ERMY6YzfZrgivHPr4E	https://www.youtube.com/playlist?list=OLAK5uy_nvGvq9yTXIcAXYbo_Kv3XBHkCPiuP02X4	t	Flemish Eye Records
cassette	Cassette	EP	2013-09-05	2021-11-11 04:27:42.227	f	2	{}	\N	https://preoccupations.bandcamp.com/album/cassette-2	https://soundcloud.com/preoccupations/sets/cassette-25	https://open.spotify.com/album/7pUVUibjt9KL2IdUodgY8a	https://www.youtube.com/playlist?list=OLAK5uy_kkG7cmpp3LL0nfdcnbGLq4cpHlBaWpTQo	t	Flemish Eye Records
pontiac-87	Pontiac 87	SINGLE	2018-11-16	2021-11-11 05:17:40.293	f	2	{}	https://music.apple.com/us/album/pontiac-87-single/1439949688	https://preoccupations.bandcamp.com/track/pontiac-87	https://soundcloud.com/preoccupations/pontiac-87	https://open.spotify.com/track/2r37FJR6039SdCNihjsn9L	https://youtu.be/9vzF0uigioU	t	2018 Jagjaguwar
key-off-duty-trip	Key / Off Duty Trip	SINGLE	2016-09-16	2021-11-11 05:18:57.366	f	2	{}	https://music.apple.com/us/album/key-off-duty-trip-single/1528840832	https://preoccupations.bandcamp.com/album/key-b-w-off-duty-trip	\N	\N	\N	t	\N
room-inside-the-world	Room Inside The World	ALBUM	2018-02-16	2021-11-11 06:14:07	f	2	{}	https://music.apple.com/us/album/room-inside-the-world/1295939856	https://ought.bandcamp.com/album/room-inside-the-world	https://soundcloud.com/oughtofficial/sets/room-inside-the-world-1	https://open.spotify.com/album/6vtsloMlaCnPKcZV7T5d5E	https://www.youtube.com/playlist?list=OLAK5uy_lAbgRfU7CyX9B1LKCqOIXy9beSsFPaIX0	t	2018 Royal Mountain Records
more-than-any-other-day	More Than Any Other Day	ALBUM	2014-04-29	2021-11-11 06:09:54.913	f	2	{}	https://music.apple.com/us/album/more-than-any-other-day/853301929	https://ought.bandcamp.com/album/more-than-any-other-day-2	https://soundcloud.com/oughtofficial/sets/more-than-any-other-day	https://open.spotify.com/album/0uOPPNiTA3k0HNvqKWcuSb	https://www.youtube.com/playlist?list=OLAK5uy_lCK6AuoWC1RXwGXqIicK5pJl-lbal9b4k	t	2014 Constellation
aquarium-drunkard-covers	Aquarium Drunkard Covers	OTHER	2015-09-22	2021-11-11 06:17:38.911	f	2	{}	\N	https://ought.bandcamp.com/album/aquarium-drunkard-covers	\N	\N	\N	t	\N
antisocialites	Antisocialites	ALBUM	2017-09-08	2021-11-11 04:17:18.686	f	19	{}	https://music.apple.com/us/album/antisocialites/1239105234	https://alvvays.bandcamp.com/album/antisocialites	https://soundcloud.com/alvvays/sets/antisocialites	https://open.spotify.com/album/4u6Jgv50VbtFhgIZYjkAHr	https://www.youtube.com/playlist?list=OLAK5uy_lbQ-ro5zN2X8nK_TRhF_OK42wi0F1e1xA	t	2017 Royal Mountain Records
alvvays	Alvvays	ALBUM	2014-07-22	2021-11-11 04:18:48.055	f	19	{}	https://music.apple.com/us/album/alvvays/877969472	https://alvvays.bandcamp.com/album/alvvays	https://soundcloud.com/alvvays/sets/alvvays-3	https://open.spotify.com/album/7hZHazzF2CYhmxIzvgDtyC	https://www.youtube.com/playlist?list=OLAK5uy_kJ0aWLk4WdbYHF0sMsa4cUBpyQnlQiFVM	t	2014 Royal Mountain Records
new-calm-ep	New Calm EP	EP	2012-05-10	2021-11-11 05:56:10.116	f	2	{}	\N	https://ought.bandcamp.com/album/new-calm-ep	\N	\N	\N	t	\N
men-i-trust	Men I Trust	ALBUM	2014-05-28	2021-12-05 03:17:30.227	f	17	{}	https://music.apple.com/us/album/men-i-trust/886240552	https://menitrust.bandcamp.com/album/men-i-trust	\N	https://open.spotify.com/album/4wxfSOwc8WNRg8TRLUMjMA	https://youtu.be/n2w0flHCciM	t	2014 Indie
tintype-remastered	Tintype (Remastered)	OTHER	2018-09-28	2021-11-11 22:22:57.547	f	9	{}	https://music.apple.com/us/album/tintype-remastered/1434585527	https://thepackad.bandcamp.com/album/tintype	https://soundcloud.com/the-pack-ad/sets/tintype-1	https://open.spotify.com/album/6vs07mhLRIkCwXtxWX7Cxl	\N	t	2018 Mint Records Inc.
musk-ox	Musk Ox	ALBUM	2007-11-27	2021-11-14 04:30:06.169	t	20	{}	\N	https://muskoxofficial.bandcamp.com/album/musk-ox-2	\N	\N	\N	t	\N
heavy-light	Heavy Light	ALBUM	2020-03-06	2021-11-11 15:25:52.899	f	4	{}	https://music.apple.com/us/album/heavy-light/1490058404	\N	https://soundcloud.com/usgirls/sets/heavy-light-1	https://open.spotify.com/album/5yMALYLW7R0woM1lHhINfg	https://www.youtube.com/playlist?list=OLAK5uy_mvHWePmlfsJguD_DBSftNiKLvMpYiSnw4	t	2020 Royal Mountain Records
in-a-poem-unlimited	In a Poem Unlimited	ALBUM	2018-02-16	2021-11-11 15:27:28.046	f	4	{}	https://music.apple.com/us/album/in-a-poem-unlimited/1311639242	\N	https://soundcloud.com/usgirls/sets/in-a-poem-unlimited-1	https://open.spotify.com/album/3NaBTnzFcmFsjEfluKhJ1Y	https://www.youtube.com/playlist?list=OLAK5uy_n2NQN3vA50w_mw9OsfUnn1vUtVF3XNPlM	t	2018 Royal Mountain Records
served-live	Served Live	LIVE	2021-01-29	2021-11-11 14:51:08.395	f	11	{}	https://music.apple.com/us/album/served-live/1540884434	https://thedeadsouth.bandcamp.com/album/served-live	\N	https://open.spotify.com/album/5h0GwNM4KChKcGKX2s2FUE	https://www.youtube.com/playlist?list=OLAK5uy_lTiM_c-7YFCQqLvMgj4Fglbfw0ofot1Pw	t	2021 Six Shooter Records Inc.
the-dead-south-ourvinyl-sessions	The Dead South | OurVinyl Sessions	LIVE	2020-10-23	2021-11-11 15:02:04.011	f	11	{}	https://music.apple.com/us/album/the-dead-south-ourvinyl-sessions-ep/1601275116	\N	\N	https://open.spotify.com/album/2nJkXNUEoagnWQHaONxEkx	https://www.youtube.com/playlist?list=OLAK5uy_m-xsNiVGTxTD1tvzjRHKZsf_nM-dmNziI	t	2020 OurVinyl
good-company	Good Company	ALBUM	2014-04-26	2021-11-11 14:45:30.362	f	3	{}	https://music.apple.com/us/album/good-company/1390184219	https://thedeadsouth.bandcamp.com/album/good-company	https://soundcloud.com/the-dead-south/sets/good-company	https://open.spotify.com/album/6lwi7L8AubdepWEeH1UtR3	https://www.youtube.com/playlist?list=OLAK5uy_k1P4As_TT-AJPwPBZZCcnVpqr_C6SYVZY	t	2018 Six Shooter Records Inc.
slow-descent	Slow Descent	ALBUM	2003-10-03	2021-11-15 04:54:42.749	t	29	{}	\N	https://colinstetson.bandcamp.com/album/slow-descent	\N	\N	\N	t	\N
this-little-light-of-mine-house-of-the-rising-sun	This Little Light of Mine / House of the Rising Sun	SINGLE	2020-04-17	2021-11-11 14:55:45.383	f	11	{}	https://music.apple.com/us/album/this-little-light-of-mine-house-of-the-rising-sun-single/1500698892	\N	https://soundcloud.com/the-dead-south/sets/this-little-light-of-58548712	https://open.spotify.com/album/6OvNPZgAL5dnukXZkzIVrw	https://www.youtube.com/playlist?list=OLAK5uy_mkWbn-3yHOYZEsbMxVCPyPGKvi4t4_nlc	t	2020 Six Shooter Records Inc.
half-free	Half Free	ALBUM	2015-09-25	2021-11-11 15:29:34.403	f	5	{}	https://music.apple.com/us/album/half-free/1016571386	\N	https://soundcloud.com/usgirls/sets/half-free	https://open.spotify.com/album/6J0S5axsvUCr69kYZ0GkAT	https://www.youtube.com/playlist?list=OLAK5uy_mdonqBgvsxYkElVAFFJhTpFheEbpGeZcs	t	2015 4AD Ltd
sun-coming-down	Sun Coming Down	ALBUM	2015-09-18	2021-11-11 06:12:31.157	f	2	{}	https://music.apple.com/us/album/sun-coming-down/1014051883	https://ought.bandcamp.com/album/sun-coming-down	https://soundcloud.com/oughtofficial/sets/sun-coming-down	https://open.spotify.com/album/4MxLa2uPSGSus8XCSivcOD	https://www.youtube.com/playlist?list=OLAK5uy_nPrSMEFGXDD9rcCeSwM_VjW6XPUj9choQ	t	2015 Constellation
four-desires	Four Desires	EP	2018-08-21	2021-11-11 06:16:10.26	f	2	{}	https://music.apple.com/us/album/four-desires-ep/1421820989	https://ought.bandcamp.com/album/four-desires	https://soundcloud.com/oughtofficial/sets/four-desires-1	https://open.spotify.com/album/45UjcgfSyPSln0RZNhDbtH	https://www.youtube.com/playlist?list=OLAK5uy_kC_HaFQCAEg7YM4O88pfUxr1cUBCuMUM8	t	2018 Royal Mountain Records
tron-legacy-the-mixtape	Tron Legacy: The Mixtape	OTHER	2010-11-24	2021-12-02 02:42:18.995	f	52	{}	\N	https://cadenceweapon.bandcamp.com/album/tron-legacy-the-mixtape	\N	\N	\N	t	\N
humming-man	Humming Man	SINGLE	2016-03-03	2021-12-05 03:40:48.268	f	17	{}	https://music.apple.com/us/album/humming-man-single/1089985824	https://menitrust.bandcamp.com/track/humming-man	https://soundcloud.com/men-i-trust/humming-man	https://open.spotify.com/track/7HVxy3Kr59FJ70NhhzEo2a	https://youtu.be/cc6JAwM29_Y	t	2016 Men I Trust
dollhouse	Dollhouse	ALBUM	2017-10-13	2021-11-11 22:04:21.64	f	9	{}	https://music.apple.com/us/album/dollhouse/1276445179	https://thepackad.bandcamp.com/album/dollhouse-digital-album	https://soundcloud.com/the-pack-ad/sets/dollhouse-7	https://open.spotify.com/album/5RdICGOqhAbMZnIWgnplQV	https://www.youtube.com/playlist?list=OLAK5uy_m82hbCclUluQelFG-ODEytb9ytbnqlQoQ	t	2017 The Pack A.D. under exclusive license to Cadence Music
positive-thinking	Positive Thinking	ALBUM	2016-08-12	2021-11-11 22:07:11.17	f	9	{}	https://music.apple.com/us/album/positive-thinking/1107082788	https://thepackad.bandcamp.com/album/positive-thinking	https://soundcloud.com/the-pack-ad/sets/positive-thinking-4	https://open.spotify.com/album/7y7MYj0omCvkBm7x4OULDg	https://www.youtube.com/playlist?list=OLAK5uy_n86SmU_Bs12n63seonkUB7Okr1q6JlXio	t	2016 The Pack A.D. under exclusive license to Cadence Music.
do-not-engage	Do Not Engage	ALBUM	2014-01-28	2021-11-11 22:09:58.09	f	9	{}	https://music.apple.com/us/album/do-not-engage/747431833	https://thepackad.bandcamp.com/album/do-not-engage	\N	https://open.spotify.com/album/4uFS37zu0ccQ2srbaLftsW	https://www.youtube.com/playlist?list=OLAK5uy_kNZdzpumdrcI4FQCYKUxP0avsu_GWUOAE	t	2014 The Pack A.D., Inc Under Exclusive License To Nettwerk Productions
unpersons	Unpersons	ALBUM	2011-09-13	2021-11-11 22:12:01.82	f	9	{}	https://music.apple.com/us/album/unpersons/462069447	https://thepackad.bandcamp.com/album/unpersons	\N	https://open.spotify.com/album/72IHzn1ZPArQ6nL81A4FHd	https://www.youtube.com/playlist?list=OLAK5uy_nP_aGR07M9lmozZrrzUcABz5ln6dzIk2k	t	2011 Mint Records Inc.
funeral-mixtape	Funeral Mixtape	ALBUM	2008-08-12	2021-11-11 22:18:03.776	f	9	{}	https://music.apple.com/us/album/funeral-mixtape/463676451	https://thepackad.bandcamp.com/album/funeral-mixtape	\N	https://open.spotify.com/album/3ExGeaaHiZhEHEkkw01DwM	https://www.youtube.com/playlist?list=OLAK5uy_mlya5nVNvrI9Q3J_iEwtD4m8s-caHiH3g	t	2008 Mint Records Inc.
tintype	Tintype	ALBUM	2008-01-08	2021-11-11 22:20:50.158	f	9	{}	https://music.apple.com/us/album/tintype/463809638	\N	\N	https://open.spotify.com/album/1OkQpd9oGSe2OKUIL6Y3hz	https://www.youtube.com/playlist?list=OLAK5uy_nAaz2_Cak22CuC1fmNepq51Uz5jS-zsio	t	2008 Mint Records Inc.
some-sssongs	Some Sssongs	EP	2013-08-27	2021-11-11 22:26:43.3	f	9	{}	https://music.apple.com/us/album/some-sssongs-ep/1217631886	https://thepackad.bandcamp.com/album/some-sssongs-10	\N	https://open.spotify.com/album/6zNP8YFIj2FapeSCxOYlMs	\N	t	2013 Nettwerk Productions
cellophane	Cellophane	SINGLE	2014-11-10	2021-11-11 22:31:16.623	f	9	{}	https://music.apple.com/us/album/cellophane-single/934630232	\N	\N	https://open.spotify.com/album/3GivOYHe71pyybMWXiD49J	https://youtu.be/YGOPfdw5FmY	t	2014 The Pack A.D., Inc under exclusive license to Nettwerk Productions
introducing	Introducing	ALBUM	2008-06-15	2021-11-11 15:39:32.499	f	7	{}	https://music.apple.com/us/album/introducing/349265325	\N	\N	https://open.spotify.com/album/2v2GtPYdz086wcuxmJX5av	https://www.youtube.com/playlist?list=OLAK5uy_kouHNOk6E2NRPCLDqncil2AsWEchf1Be0	t	2008 Siltbreeze
santa-stay-home	Santa Stay Home	SINGLE	2020-11-30	2021-11-11 17:42:16.282	f	8	{}	https://music.apple.com/us/album/santa-stay-home-feat-rich-morel-single/1539977342	\N	https://soundcloud.com/usgirls/sets/santa-stay-home	https://open.spotify.com/album/1mjLdkI6p3x8KEVxBr24Xf	https://www.youtube.com/playlist?list=OLAK5uy_ml2_gOjn90JlGffL-11n8wiQNLSIPjNkk	t	2020 Royal Mountain Records
junkyard	Junkyard	SINGLE	2021-03-10	2021-11-11 17:45:46.146	f	5	{}	https://music.apple.com/us/album/junkyard-single/1554236156	\N	https://soundcloud.com/usgirls/junkyard	https://open.spotify.com/track/0OCJzfjerfla22BTxwPevJ	https://youtu.be/0rfFjMN0HZQ	t	2021 4AD Ltd.
we-kill-computers	we kill computers	ALBUM	2010-04-27	2021-11-11 22:15:04.657	f	9	{}	https://music.apple.com/us/album/we-kill-computers/463680204	https://thepackad.bandcamp.com/album/we-kill-computers	\N	https://open.spotify.com/album/24moxI015BOcBgL8XQAtI7	https://www.youtube.com/playlist?list=OLAK5uy_moLM-NHdesL5esfyJI07piI-ELQP0F7us	t	2010 Mint Records Inc.
you-dont-own-me	You Don't Own Me	SINGLE	2021-06-15	2021-11-11 22:52:18.088	f	9	{}	https://music.apple.com/us/album/you-dont-own-me-single/1571858331	https://thepackad.bandcamp.com/track/you-dont-own-me-single	\N	https://open.spotify.com/track/4lYE7cFMbic0lo0mnSeldT	https://youtu.be/0-LBa9o9jik	t	2021 The Pack a.d
coconut	Coconut	SINGLE	2016-11-30	2021-11-11 22:55:51.712	f	10	{}	https://music.apple.com/us/album/coconut-single/1191651580	https://thepackad.bandcamp.com/album/coconut-original-pack-xmas-song	https://soundcloud.com/the-pack-ad/sets/coconut-4	https://open.spotify.com/track/4vWixsGSzqY6BPZJ5YSZAy	\N	t	\N
sirens-seasick-french-version	Sirens / Seasick (French Version)	SINGLE	2012-07-10	2021-11-11 22:41:35.358	f	9	{}	https://music.apple.com/us/album/sirens-seasick-french-version-single/562332940	https://thepackad.bandcamp.com/album/sirens-seasick-7-french-version	\N	\N	\N	t	2012 Mint Records
live-vol-2	Live! Vol. 2	LIVE	2020-11-06	2021-11-11 22:45:50.43	f	9	{}	https://music.apple.com/us/album/live-vol-2-ep/1538078466	https://thepackad.bandcamp.com/album/the-pack-a-d-live-vol-2	https://soundcloud.com/the-pack-ad/sets/live-vol-2-7	https://open.spotify.com/album/7BHffBSi6QpjUtOSfUoCBG	https://www.youtube.com/playlist?list=OLAK5uy_n6WXYGIXOUVTpkX6MOZTQqpMlRdkD9pME	t	2020 The Pack a.d.
live-vol-1	Live! Vol. 1	LIVE	2020-09-04	2021-11-11 22:47:23.119	f	9	{}	https://music.apple.com/us/album/live-vol-1-ep/1528433284	https://thepackad.bandcamp.com/album/the-pack-a-d-live-vol-1	https://soundcloud.com/the-pack-ad/sets/live-vol-1-9	https://open.spotify.com/album/2TTqInosHQLaEZztTPa62O	https://www.youtube.com/playlist?list=OLAK5uy_leS-SVHaBVxcWKasZyMF9knCZ6R9GAqQw	t	2020 The Pack a.d.
the-pack-ad-on-audiotree-live	The Pack a.d. on Audiotree Live	LIVE	2016-11-08	2021-11-11 23:06:49.867	f	9	{}	https://music.apple.com/us/album/the-pack-a-d-on-audiotree-live-ep/1509338545	https://audiotree.bandcamp.com/album/the-pack-a-d-audiotree-live	\N	https://open.spotify.com/album/0xG3c9ejovqjUOnHPlsY4l	https://youtu.be/toqZA5eRDdw	t	2016 The Pack a.d.
us-girls-slim-twig	U.S. Girls / Slim Twig	ALBUM	2011-06-20	2021-11-12 04:02:53.335	f	5	{"Slim Twig"}	https://music.apple.com/us/album/u-s-girls-slim-twig/917507333	https://palmist.bandcamp.com/album/u-s-girls-slim-twig	https://soundcloud.com/usgirls/sets/u-s-girls-slim-twig	https://open.spotify.com/album/6URn19MDyFWFbaFOIyLdCC	https://www.youtube.com/playlist?list=OLAK5uy_kMo9xCUIhk6RvOHLnpuY_9UhorLw4L4aM	t	2011 Palmist (FatCat Records)
notre-dame-des-sept-douleurs	Notre​-​Dame​-​des​-​Sept​-​Douleurs	ALBUM	2020-06-26	2021-11-12 04:48:36.873	f	4	{}	https://music.apple.com/us/album/notre-dame-des-sept-douleurs/1491350324	https://klopelgag.bandcamp.com/album/notre-dame-des-sept-douleurs	\N	https://open.spotify.com/album/4kNpkRG2YpK4jV9OoopVNh	https://www.youtube.com/playlist?list=OLAK5uy_mxfkNmOSOj9Shl326OU0xYOUYWPK6Pym8	t	2020 COOP Les Faux-Monnayeurs sous licence exclusive à Secret City Records Inc.
welcome-to-bobbys-motel	Welcome to Bobby's Motel	ALBUM	2020-06-26	2021-11-12 04:44:23.978	f	13	{}	https://music.apple.com/us/album/welcome-to-bobbys-motel/1497182281	https://pottery.bandcamp.com/album/welcome-to-bobbys-motel	https://soundcloud.com/potteryband/sets/welcome-to-bobbys-motel-1	https://open.spotify.com/album/14SQ63AKzEL8vBu0FaCB6V	https://www.youtube.com/playlist?list=OLAK5uy_k8uKVF2R_L2KUchZvLyygeCTW5tx7ke8c	t	2020 Royal Mountain Records
no-1	No. 1	EP	2019-05-10	2021-11-12 04:42:28.239	f	13	{}	https://music.apple.com/us/album/no-1/1453535946	https://pottery.bandcamp.com/album/no-1	\N	https://open.spotify.com/album/7rXHGSvdykZW67WSB3opmi	https://www.youtube.com/playlist?list=OLAK5uy_kQn1CIgHZXsjED2djngcVBE7qVJ-Nsu2A	t	2019 Royal Mountain Records
miss-colombia	Miss Colombia	ALBUM	2020-04-17	2021-11-12 04:12:10.358	f	4	{}	https://music.apple.com/us/album/miss-colombia/1494471811	https://lidopimienta.bandcamp.com/album/miss-colombia	https://soundcloud.com/lido-pimienta/sets/miss-colombia	https://open.spotify.com/album/33bM8o4IrrktRBlAcxcoDr	https://www.youtube.com/playlist?list=OLAK5uy_nZy-uX2rX8lW67Wd2dQdzunRrTeZzCdeE	t	2020 Lido Pimienta
la-papessa	La Papessa	ALBUM	2016-10-28	2021-11-12 04:10:11.152	f	4	{}	https://music.apple.com/us/album/la-papessa/1485073680	https://lidopimienta.bandcamp.com/album/la-papessa	\N	https://open.spotify.com/album/6SeNCa0uwF7AFJAgHb1PhF	https://www.youtube.com/playlist?list=OLAK5uy_mleYky-luygy1UX-KCdrS4hlon2Lnf_oY	t	2016 Self-Released
color	COLOR	ALBUM	2010-09-22	2021-11-12 04:38:07.601	f	12	{}	\N	https://lidopimienta1.bandcamp.com/releases	https://soundcloud.com/lido-pimienta/sets/lido-pimienta-color	\N	https://www.youtube.com/playlist?list=PL-siuG6IH0SR1kAhg-1FCAUKDwzYF_EaG	t	\N
do-you-drive	Do You Drive?	ALBUM	2019-01-31	2021-11-12 18:43:18.503	f	14	{}	https://music.apple.com/us/album/do-you-drive/1462351150	https://ctsecond.bandcamp.com/album/do-you-drive	https://soundcloud.com/ctsecond/sets/doyoudrive	https://open.spotify.com/album/063cYFZdDaUPO8nZOWiAZ0	https://www.youtube.com/playlist?list=OLAK5uy_l2xaWLq_1t0Ia-0U6bfVCBR5ZJ9LK7IKI	t	2019 Clairmont The Second
lil-mont-from-the-ave	Lil Mont from the Ave	ALBUM	2017-09-29	2021-11-12 18:41:52.608	f	14	{}	https://music.apple.com/us/album/lil-mont-from-the-ave/1462248912	https://ctsecond.bandcamp.com/album/lil-mont-from-the-ave	https://soundcloud.com/ctsecond/sets/lilmontfta	https://open.spotify.com/album/1cZLwwMVQDCEOErLWjJD6X	https://www.youtube.com/playlist?list=OLAK5uy_lXE7NRhvfed3dOxjEO8JUYRCbySOuL7NM	t	2019 Clairmont The Second
quest-for-milk-and-honey-black-edition	Quest For Milk and Honey (Black Edition)	ALBUM	2017-01-27	2021-11-12 18:40:21.992	f	14	{}	https://music.apple.com/us/album/quest-for-milk-and-honey-black-edition/1439366654	https://ctsecond.bandcamp.com/album/quest-for-milk-and-honey-black-edition	https://soundcloud.com/ctsecond/sets/qfmhblack	https://open.spotify.com/album/6Zl89ttD4sjSDfpZHryYSN	https://www.youtube.com/playlist?list=OLAK5uy_lSDQ5QWR72xHSiK3iKx3XfJocfZtvSfW4	t	2017 Black Box Recordings Inc.
project-ii	Project II	ALBUM	2014-12-11	2021-11-12 18:38:04.934	f	14	{}	https://music.apple.com/us/album/project-ii/1458296217	https://ctsecond.bandcamp.com/album/project-ii	https://soundcloud.com/ctsecond/sets/projectii	https://open.spotify.com/album/3TWNnI5J3E2HcETpa5KRP8	https://www.youtube.com/playlist?list=OLAK5uy_nhpPnqtX2DZKG5bT7fPZQ0Tt0zX9a0iJ4	t	2019 Clairmont The Second
becoming-a-gentlemiin	Becoming A GentlemIIn	ALBUM	2013-08-13	2021-11-12 18:36:19.295	f	14	{}	\N	https://ctsecond.bandcamp.com/album/becoming-a-gentlemiin	https://soundcloud.com/ctsecond/sets/becoming-a-gentlemiin-album	\N	\N	t	\N
hands	HANDS	SINGLE	2021-01-22	2021-11-12 19:05:34.36	f	14	{}	https://music.apple.com/us/album/hands-single/1550239175	https://ctsecond.bandcamp.com/track/hands	https://soundcloud.com/ctsecond/hands	https://open.spotify.com/track/2km09YBjaI0hci6G2TuLZh	https://youtu.be/cyKQPw7Ogic	t	2021 Clairmont The Second
thou	Thou	SINGLE	2019-06-13	2021-11-12 19:03:20.606	f	14	{}	https://music.apple.com/us/album/thou-single/1464251487	https://ctsecond.bandcamp.com/track/thou	https://soundcloud.com/ctsecond/thou	https://open.spotify.com/track/10XFWwjo13klzhyUc7ROB1	https://youtu.be/EZYigHTThTM	t	2019 Clairmont The Second
tortoise	Tortoise	SINGLE	2018-03-09	2021-11-12 19:01:16.283	f	14	{}	https://music.apple.com/us/album/tortoise-single/1460438452	https://ctsecond.bandcamp.com/track/tortoise	https://soundcloud.com/ctsecond/tortoise	https://open.spotify.com/track/1eUzyltwegHdUN86TgzFph	https://youtu.be/z95ssFn1Lwc	t	2019 Clairmont The Second
old-clothes	Old Clothes	SINGLE	2018-01-12	2021-11-12 18:51:09.513	f	14	{}	https://music.apple.com/us/album/old-clothes-feat-hezi-single/1460453498	https://ctsecond.bandcamp.com/track/old-clothes	https://soundcloud.com/ctsecond/oldclothes	https://open.spotify.com/track/3ssABJZNyqfih6V6nFT15p	https://youtu.be/PzMubRk9gkk	t	\N
letoile-thoracique	L'étoile Thoracique	ALBUM	2016-11-04	2021-11-12 04:50:01.006	f	4	{}	https://music.apple.com/us/album/l%C3%A9toile-thoracique/1593489439	https://klopelgag.bandcamp.com/album/l-toile-thoracique	\N	https://open.spotify.com/album/7k6AhyoX4FauOohaNc96L9	https://www.youtube.com/playlist?list=OLAK5uy_k1TARcItjlFaPLC8pzb0mTSAQFrgt0lNc	t	2021 COOP Les Faux-Monnayeurs sous licence exclusive à Secret City Records Inc.
lalchimie-des-monstres	L'alchimie des monstres	ALBUM	2013-09-24	2021-11-12 04:51:35.107	f	4	{}	https://music.apple.com/us/album/lalchimie-des-monstres/1525011458	https://klopelgag.bandcamp.com/album/lalchimie-des-monstres-2	\N	https://open.spotify.com/album/40O1Dnj2qUdf3J4NxNkeEz	https://www.youtube.com/playlist?list=OLAK5uy_lrpMStrML9NNavUNUGwWZEjgULRg0fpiA	t	2020 COOP Les Faux-Monnayeurs sous licence exclusive à Secret City Records Inc.
ep	EP	EP	2012-04-17	2021-11-12 04:53:21.478	f	4	{}	https://music.apple.com/us/album/ep-ep/1570508515	https://klopelgag.bandcamp.com/album/ep	\N	https://open.spotify.com/album/7A05XSJLewZ1aw3FauGguM	https://www.youtube.com/playlist?list=OLAK5uy_k39zM0L3jOV5JNJB1jLXROVtFRgsPyp00	t	2012 Johnny Frisson
toute-seule-pour-noel	Toute seule pour Noël	SINGLE	2019-12-01	2021-11-12 04:55:20.3	f	8	{}	https://music.apple.com/us/album/toute-seule-pour-no%C3%ABl-single/1489527555	https://klopelgag.bandcamp.com/track/toute-seule-pour-no-l	\N	https://open.spotify.com/album/7nwZkKKvXPgjQHaHHUHVSF	https://youtu.be/r4blq_TX5es	t	2019 COOP Les Faux-Monnayeurs sous licence exclusive à Secret City Records Inc.
no-u-dont-intres-ting-mi-pce	no u don't / intres​-​ting / mi pce	SINGLE	2021-03-18	2021-11-12 19:07:10.33	f	14	{}	https://music.apple.com/us/album/no-u-dont-intres-ting-mi-pce-single/1557544433	https://ctsecond.bandcamp.com/album/no-u-dont-intres-ting-mi-pce	https://soundcloud.com/ctsecond/sets/3pce	https://open.spotify.com/album/5tfO8WwTGATVF4wmMSulqF	https://www.youtube.com/playlist?list=OLAK5uy_mdwhwNANntxGuieUxWN75c9wtR8oZhhDU	t	2021 Clairmont The Second
metz	METZ	ALBUM	2012-10-09	2021-11-12 21:43:41.321	f	15	{}	https://music.apple.com/us/album/metz/547383746	https://metz.bandcamp.com/album/metz	https://soundcloud.com/metztheband/sets/metz-28	https://open.spotify.com/album/3oC10Ph30CCwkMRLKuSjoe	https://www.youtube.com/playlist?list=OLAK5uy_kKq3lg0P4ZwhAauLMccv_H3oO3Rz-rRTo	t	2017 Royal Mountain Records
acid-slow-decay	Acid / Slow Decay	SINGLE	2020-05-01	2021-11-12 21:57:49.747	f	15	{}	https://music.apple.com/us/album/acid-single/1553391937	https://metz.bandcamp.com/album/acid-slow-decay	https://soundcloud.com/metztheband/sets/acid	https://open.spotify.com/album/6oohCr9v7p096xhoKxUOBq	https://www.youtube.com/playlist?list=OLAK5uy_le97ADfehW8a91FCDTr6B0RYhxFCJaPHw	t	2021 Sub Pop Records
cant-understand	Can't Understand	SINGLE	2015-12-04	2021-11-12 22:03:44.723	f	15	{}	https://music.apple.com/us/album/cant-understand-single/1059499074	https://metz.bandcamp.com/album/cant-understand	\N	https://open.spotify.com/album/6wUb7O9ST1L2chMhDn4EBZ	\N	t	2015 Sub Pop Records
blank-curtain	Blank Curtain	SINGLE	2021-11-03	2021-11-12 19:12:14.778	f	2	{}	https://music.apple.com/us/album/blank-curtain-single/1589545171	https://bandcola.bandcamp.com/album/blank-curtain	https://soundcloud.com/cola27260/blank-curtain	https://open.spotify.com/track/43tcigLcShka2kZw8SxCTi	https://youtu.be/0mkC2aYpRmk	t	2021 Next Door Records
the-dream-is-over	The Dream is Over	ALBUM	2016-05-27	2021-11-12 22:27:56.572	f	16	{}	https://music.apple.com/us/album/the-dream-is-over/1455900783	https://puptheband.bandcamp.com/album/the-dream-is-over	\N	https://open.spotify.com/album/0nOAue4UAgOJMLroZc4aTL	https://www.youtube.com/playlist?list=OLAK5uy_m1JWrMHhYQ8d-MsYNKaqtbzRUPrgNn65I	t	2016 Royal Mountain Records
strange-peace	Strange Peace	ALBUM	2017-09-22	2021-11-12 21:47:47.017	f	15	{}	https://music.apple.com/us/album/strange-peace/1247025222	https://metz.bandcamp.com/album/strange-peace	https://soundcloud.com/metztheband/sets/strange-peace-1	https://open.spotify.com/album/5JcEgB1aPhg5o2PGX6dIYp	https://www.youtube.com/playlist?list=OLAK5uy_kcu6W56wirN1CN4o2Rp3cZrHVticX539Q	t	2017 Royal Mountain Records
pup	PUP	ALBUM	2013-10-08	2021-11-12 22:15:24.713	f	16	{}	https://music.apple.com/us/album/pup/1454864622	https://puptheband.bandcamp.com/album/pup	https://soundcloud.com/puptheband/sets/pup	https://open.spotify.com/album/4TQIkptwVlAp373XVCSc3k	https://www.youtube.com/playlist?list=OLAK5uy_nNTNwVcNaGhDRaBfK7EJRYaSWupKPX5qQ	t	2013 Royal Mountain Records
eraser	Eraser	SINGLE	2016-01-22	2021-11-12 22:05:31.895	f	15	{}	https://music.apple.com/us/album/eraser-single/1047860848	https://metz.bandcamp.com/album/eraser	https://soundcloud.com/metztheband/sets/eraser-7	https://open.spotify.com/track/6iPMsAuO70VFdIcf0Oh4Wx	\N	t	2016 Sub Pop Records
ii	II	ALBUM	2015-05-05	2021-11-12 21:46:05.677	f	15	{}	https://music.apple.com/us/album/ii/961251374	https://metz.bandcamp.com/album/ii	https://soundcloud.com/metztheband/sets/ii-630	https://open.spotify.com/album/34n3HpFDwJeTh4RKOdUlkq	https://www.youtube.com/playlist?list=OLAK5uy_nl_gxAfYw_2Lk4ZTNTO_qv6HGWEI_V348	t	2017 Royal Mountain Records
me	M.E.	SINGLE	2019-08-20	2021-11-12 22:09:05.345	f	15	{}	https://music.apple.com/us/album/m-e-single/1473984742	https://metz.bandcamp.com/album/m-e	\N	https://open.spotify.com/album/5RYBGljsBjTGCLnwvnYjji	https://www.youtube.com/playlist?list=OLAK5uy_m1dfr5vDoM9mBMmectfIdy_CnnTkiHAz0	t	2019 Sub Pop Records
live-at-the-opera-house	Live at the Opera House	LIVE	2021-11-05	2021-11-12 21:55:19.777	f	15	{}	https://music.apple.com/us/album/live-at-the-opera-house/1576037668	https://metz.bandcamp.com/album/live-at-the-opera-house-1	https://soundcloud.com/metztheband/sets/live-at-the-opera-house-2	https://open.spotify.com/album/1vPRNtR0IqIy7JIetIgdil	https://www.youtube.com/playlist?list=OLAK5uy_kxRDMVpYCTAdCLc9Z6G6GUCwWaTzBeXIc	t	2021 Royal Mountain Records
inheritance	Inheritance	ALBUM	2021-07-09	2021-11-14 04:22:36.973	t	20	{}	https://music.apple.com/us/album/inheritance/1573791649	https://muskoxofficial.bandcamp.com/album/inheritance	\N	https://open.spotify.com/album/21yrj0GePwJiTwnWaV8oVS	https://www.youtube.com/playlist?list=OLAK5uy_lp6TO-qjgrOzaTfZnoqBw51qex-JbpIU0	t	2021 Anamnesis Arts
woodfall	Woodfall	ALBUM	2014-06-17	2021-11-14 04:25:33.272	t	20	{}	https://music.apple.com/us/album/woodfall/1515370959	https://muskoxofficial.bandcamp.com/album/woodfall	\N	https://open.spotify.com/album/7vPMS7CtrZgI2PgBY7DAHe	https://www.youtube.com/playlist?list=OLAK5uy_nYyNGhI5qor2EPNj0EcWeQdUhEPvn2H8s	t	2020 Anamnesis Arts
it-was-fun-while-it-lasted	It Was Fun While It Lasted	ALBUM	2020-04-17	2021-11-11 22:00:59.463	f	9	{}	https://music.apple.com/us/album/it-was-fun-while-it-lasted/1497225707	https://thepackad.bandcamp.com/album/it-was-fun-while-it-lasted	https://soundcloud.com/the-pack-ad/sets/it-was-fun-while-it-lasted-2	https://open.spotify.com/album/1AXmSHA1ltK7gYTcR00zXx	https://youtube.com/playlist?list=OLAK5uy_l6FiEwkUhCkj8Q6orUk3yEoT-SISCJl7A	t	2020 The Pack a.d.
this-place-sucks-ass	This Place Sucks Ass	EP	2020-10-23	2021-11-12 22:31:37.119	f	16	{}	https://music.apple.com/us/album/this-place-sucks-ass-ep/1530020311	https://puptheband.bandcamp.com/album/this-place-sucks-ass	https://soundcloud.com/puptheband/sets/this-place-sucks-ass	https://open.spotify.com/album/0kjzdJiGl3ZDdmPhltXcG2	https://www.youtube.com/playlist?list=OLAK5uy_lZBtyOCvbBnMu1t1qjDZNXNWwxOVVBrAo	t	2020 Little Dipper, under exclusive license to Universal Music Canada
holier-than-thou	Holier Than Thou	SINGLE	2021-09-10	2021-11-12 22:37:49.283	f	16	{}	https://music.apple.com/us/album/holier-than-thou-single/1582036425	\N	https://soundcloud.com/puptheband/holier-than-thou	https://open.spotify.com/track/4U0CF3mjpwEwIPMQgV4z7i	https://youtu.be/kmBUKg5rEXE	t	2021 Blackened Recordings Inc.
paper-planes	Paper Planes	SINGLE	2017-12-21	2021-11-14 18:54:49.662	f	26	{}	https://music.apple.com/us/album/paper-planes-single/1580191721	\N	\N	https://open.spotify.com/track/5sfzdv72q7HVb8rZFUMkH8	https://youtu.be/a3yBH5V38p0	t	2021 Blacksquares Media
waiting-kill-something	Waiting / Kill Something	SINGLE	2021-11-09	2021-11-12 22:38:55.306	f	16	{}	https://music.apple.com/us/album/waiting-kill-something-single/1591952555	https://puptheband.bandcamp.com/album/waiting-kill-something	https://soundcloud.com/puptheband/sets/waiting-kill-something-2	https://open.spotify.com/album/7k4p5L2vlq7jdIAkB7HK8R	https://www.youtube.com/playlist?list=OLAK5uy_myUx0wlh0taDO8z9zlqUgCFLQXv3ECjqw	t	2021 Little Dipper, under exclusive license to Universal Music Canada
morbid-stuff	Morbid Stuff	ALBUM	2019-04-05	2021-11-12 22:29:49.503	f	16	{}	https://music.apple.com/us/album/morbid-stuff/1449065618	https://puptheband.bandcamp.com/album/morbid-stuff	https://soundcloud.com/puptheband/sets/morbid-stuff-1	https://open.spotify.com/album/0819j23RlVKRJLnXM8ZQI3	https://www.youtube.com/playlist?list=OLAK5uy_knP26Hr0MvW7ACEK_Ee9EpR06_dK7nb_A	t	2019 Little Dipper, under exclusive license to Universal Music Canada
opal-angel-ep	Opal Angel EP	EP	2017-10-10	2021-11-13 15:48:20.906	f	18	{}	https://music.apple.com/us/album/opal-angel-single/1535528785	https://lunali.bandcamp.com/album/opal-angel-ep	https://soundcloud.com/lunaliband/sets/opal-angel-ep	https://open.spotify.com/album/1Bq52mwQ62zZTusF8DGQM5	\N	t	2017 Luna Li
you-dont-get-me-high-anymore-triple-j-like-a-version	You Don't Get Me High Anymore (triple j Like A Version)	LIVE	2017-12-15	2021-11-12 22:34:06.243	f	16	{}	https://music.apple.com/us/album/you-dont-get-me-high-anymore-triple-j-like-a-version-single/1583342117	\N	https://soundcloud.com/puptheband/you-dont-get-me-high-anymore	https://open.spotify.com/track/5PQKZu7oKeFay4rNBPZoc2	https://youtu.be/KSMKP_XQi6Q	t	2017 Australian Broadcasting Corporation
sour-soul	Sour Soul	ALBUM	2015-02-24	2021-11-14 05:14:18.833	f	23	{"Ghostface Killah"}	https://music.apple.com/us/album/sour-soul/1439443786	https://badbadnotgoodofficial.bandcamp.com/album/sour-soul	https://soundcloud.com/badbadnotgood/sets/sour-soul-1	https://open.spotify.com/album/3cFQsh5o8zThmbyQRuRosJ	\N	t	2015 eOne Music
iii	III	ALBUM	2014-05-06	2021-11-14 04:59:41.843	f	22	{}	https://music.apple.com/us/album/iii/1330064907	https://badbadnotgoodofficial.bandcamp.com/album/iii	https://soundcloud.com/badbadnotgood/sets/iii-153	https://open.spotify.com/album/58gf6kYIJs1vM9mQMz8Roh	https://www.youtube.com/playlist?list=OLAK5uy_nbD7_MIlr6ynco3NZTyQwLjl_i2w7Jy4g	t	2014 BADBADNOTGOOD LTD Under exclusive license to Arts & Crafts Productions Inc.
bbng2	BBNG2	ALBUM	2012-04-03	2021-11-14 04:57:57.143	t	22	{}	\N	https://badbadnotgoodofficial.bandcamp.com/album/bbng2	https://soundcloud.com/badbadnotgood/sets/bbng2	\N	\N	t	\N
holidays	Holidays	OTHER	2016-12-22	2021-11-17 01:49:28.956	t	35	{}	\N	https://anomaliebeats.bandcamp.com/album/holidays	\N	\N	https://www.youtube.com/playlist?list=PL2NORulmbo2sK97M_KZ8E80oAQXz1Efn-	t	\N
confessions-pt-iii	Confessions, Pt. III	SINGLE	2017-09-22	2021-11-14 05:33:24.805	t	22	{}	https://music.apple.com/us/album/confessions-pt-iii-feat-colin-stetson-single/1327052545	https://badbadnotgoodofficial.bandcamp.com/track/confessions-pt-iii	https://soundcloud.com/badbadnotgood/confessions-pt-iii-feat-colin-stetson	https://open.spotify.com/track/0fv7b75OApEs9Y7y8v12rc	https://youtu.be/XfEmah0iJfo	t	2017 Badbadnotgood Ltd.
tried	Tried	SINGLE	2018-09-26	2021-11-14 05:43:25.757	f	24	{"Little Dragon"}	https://music.apple.com/us/album/tried-single/1435531483	https://badbadnotgoodofficial.bandcamp.com/album/tried	\N	https://open.spotify.com/track/4yJNpsFEeXkq83wEg4p8w4	https://youtu.be/MREJtWbQ6Bw	t	2018 BADBADNOTGOOD Ltd.
velvet-bw-boogie-no-69	Velvet b/w Boogie No. 69	SINGLE	2015-04-07	2021-11-14 05:25:24.761	t	22	{}	https://music.apple.com/us/album/velvet-b-w-boogie-no-69-single/1309422783	\N	\N	https://open.spotify.com/album/1vc5QohObsJSLXPc4lgow3	\N	t	2015 Innovative Leisure
bbnglive-2	BBNGLIVE 2	LIVE	2012-02-21	2021-11-14 04:53:34.671	t	22	{}	\N	https://badbadnotgoodofficial.bandcamp.com/album/bbnglive-2	\N	\N	\N	t	\N
bbnglive1	BBNGLIVE1	LIVE	2011-11-22	2021-11-14 04:51:52.529	t	22	{}	\N	https://badbadnotgoodofficial.bandcamp.com/album/bbnglive-1	\N	\N	\N	t	\N
entre-les-nuages-et-la-neige	Entre Les Nuages et La Neige	EP	2007-02-01	2021-11-14 04:33:37.588	t	20	{}	\N	https://muskoxofficial.bandcamp.com/album/entre-les-nuages-et-la-neige	\N	\N	\N	t	\N
iv	IV	ALBUM	2016-07-08	2021-11-14 05:15:48.181	f	22	{}	https://music.apple.com/us/album/iv/1330053797	https://badbadnotgoodofficial.bandcamp.com/album/iv	https://soundcloud.com/badbadnotgood/sets/iv-42	https://open.spotify.com/album/5Dgfrxiz3M0SLosVnVoLEu	https://www.youtube.com/playlist?list=OLAK5uy_nNBcgmnG84p4KRARlKVL6VU96QWRjuXHU	t	2016 Innovative Leisure
meta-animal	Meta Animal	EP	2015-05-19	2021-11-11 22:28:25.122	f	9	{}	https://music.apple.com/us/album/meta-animal-ep/991623078	\N	\N	https://open.spotify.com/album/3otzOw1BNydzjgjNydf5ha	\N	t	2015 The Pack A.D., Inc under exclusive license to Nettwerk Productions
when-its-real	When It's Real	SINGLE	2013-05-28	2021-12-02 02:46:00.562	f	14	{"Jarell Perry"}	https://music.apple.com/us/album/when-its-real-feat-jarell-perry-single/649011812	\N	\N	https://open.spotify.com/album/0rUkxZziGWDi0ykEC8ApEV	\N	t	Upper Class Recordings 2013
the-face-of-patience	The Face of Patience	SINGLE	2010-10-25	2021-11-14 04:31:46.281	t	20	{}	https://music.apple.com/us/album/the-face-of-patience-single/1566785547	https://muskoxofficial.bandcamp.com/track/the-face-of-patience	\N	https://open.spotify.com/track/4Li5aDxrNWvGAyGXLLb6Zq	https://youtu.be/KkpeHMF6rUs	t	\N
entre-le-soleil-et-les-arbres	Entre Le Soleil et Les Arbres	EP	2008-03-01	2021-11-14 04:32:49.335	t	20	{}	\N	https://muskoxofficial.bandcamp.com/album/entre-le-soleil-et-les-arbres	\N	\N	\N	t	\N
entre-la-terre-et-le-ciel	Entre La Terre et Le Ciel	EP	2006-07-01	2021-11-14 04:34:28.269	t	20	{}	\N	https://muskoxofficial.bandcamp.com/album/entre-la-terre-et-le-ciel	\N	\N	\N	t	\N
bbng	BBNG	ALBUM	2011-09-17	2021-11-14 04:48:23.596	t	22	{}	\N	https://badbadnotgoodofficial.bandcamp.com/album/bbng	\N	\N	\N	t	\N
goodbye-blue	Goodbye Blue	SINGLE	2020-04-28	2021-11-14 18:22:31.048	f	22	{}	https://music.apple.com/us/album/goodbye-blue-single/1509245404	\N	\N	https://open.spotify.com/album/4wGczzhsQq7FDClgkbVZ1a	https://www.youtube.com/playlist?list=OLAK5uy_mnC5VxoTDZHrMn7kSLHkwKw-g1I62INqA	t	2020 BADBADNOTGOOD LTD.
key-to-love-is-understanding	Key to Love (Is Understanding)	SINGLE	2019-12-06	2021-11-14 05:59:30.6	f	24	{Majestics}	https://music.apple.com/us/album/key-to-love-is-understanding-single/1486953656	\N	\N	https://open.spotify.com/album/0UyNc1FaDzkzcBlLsDASJA	https://www.youtube.com/playlist?list=OLAK5uy_kUasd_qDxix71MQqf6zl6y5tASFeryklo	t	2019 Light in the Attic Records & Distribution
i-dont-know	I Don't Know	SINGLE	2017-10-20	2021-11-14 05:35:54.498	f	25	{"Samuel T. Herring"}	https://music.apple.com/us/album/i-dont-know-single/1327061805	https://badbadnotgoodofficial.bandcamp.com/track/i-dont-know-feat-samuel-t-herring	\N	https://open.spotify.com/track/1aHaWYUyMZ3mc669rFUGJt	https://youtu.be/iv82_ZSwa4Y	t	2017 Innovative Leisure
live-vol-3	Live! Vol. 3	LIVE	2021-02-05	2021-11-11 22:49:56.072	f	9	{}	https://music.apple.com/us/album/live-vol-3-ep/1548396826	https://thepackad.bandcamp.com/album/the-pack-a-d-live-vol-3	https://soundcloud.com/the-pack-ad/sets/live-vol-3-1	https://open.spotify.com/album/6y8mqYrrqMdRw2MDaVAmMY	https://www.youtube.com/playlist?list=OLAK5uy_mBQ_OAiynUq8sml_pfm8HXIC5LRTLAZ0c	t	2021 The Pack a.d.
beyond-the-brake	Beyond the Brake	SINGLE	2021-05-20	2021-11-15 05:35:45.751	t	30	{}	\N	https://colinstetson.bandcamp.com/track/beyond-the-brake	\N	https://open.spotify.com/album/1FxxLyGe7wRDxIljda1IQZ	https://youtu.be/3StzPuUiwf4	t	2021 7K!
cadence-weapon-is-the-black-hand	Cadence Weapon Is The Black Hand	EP	2005-02-22	2021-12-02 02:38:11.353	f	51	{}	\N	https://cadenceweapon.bandcamp.com/album/cadence-weapon-is-the-black-hand	\N	\N	\N	t	\N
peaceful-as-hell	Peaceful as Hell	ALBUM	2020-04-13	2021-11-14 18:39:27.658	f	26	{}	https://music.apple.com/us/album/peaceful-as-hell/1579703068	https://blackdresses.bandcamp.com/album/peaceful-as-hell	\N	https://open.spotify.com/album/5oZ5YCtaBH4L4Q2rrQpdvg	https://www.youtube.com/playlist?list=OLAK5uy_mVuTfWMNjw9jg7jogUqZou1_htqjBuW_A	t	2021 Blacksquares Media
love-and-affection-for-stupid-little-bitches	Love and Affection for Stupid Little Bitches	ALBUM	2019-08-01	2021-11-14 18:40:55.473	f	26	{}	https://music.apple.com/us/album/love-and-affection-for-stupid-little-bitches/1579756015	https://blackdresses.bandcamp.com/album/love-and-affection-for-stupid-little-bitches	https://soundcloud.com/black-dresses/sets/love-and-affection-for-stupid-little-bitches	https://open.spotify.com/album/7gWJWmp8vVvaUO4skaPBqn	https://www.youtube.com/playlist?list=OLAK5uy_kCdKa7NdKsOeLyj8TBq92vyAqF6w3aMZk	t	2021 Blacksquares Media
thank-you	THANK YOU	ALBUM	2019-02-05	2021-11-14 18:42:44.814	f	26	{}	https://music.apple.com/us/album/thank-you/1579742922	https://blackdresses.bandcamp.com/album/thank-you	https://soundcloud.com/black-dresses/sets/thank-you	https://open.spotify.com/album/5arLv32f6lnEegeKS7T3fX	https://www.youtube.com/playlist?list=OLAK5uy_kZEpH1W12Go2aP1-bHqpdjFhg1ftvukBc	t	2021 Blacksquares Media
wasteisolation	WASTEISOLATION	ALBUM	2018-04-13	2021-11-14 18:44:08.879	f	26	{}	https://music.apple.com/us/album/wasteisolation/1579917277	https://blackdresses.bandcamp.com/album/wasteisolation	\N	https://open.spotify.com/album/2Kov3GLXwADxba0BIAYzGl	https://www.youtube.com/playlist?list=OLAK5uy_ka3un0bSV4RMzH0pCQMmVe4lmwZ2bwHIs	t	2021 Blacksquares Media
hell-is-real	HELL IS REAL	EP	2018-10-15	2021-11-14 18:45:57.421	f	26	{}	https://music.apple.com/us/album/hell-is-real-ep/1579755625	https://blackdresses.bandcamp.com/album/hell-is-real	https://soundcloud.com/black-dresses/sets/hell-is-real	https://open.spotify.com/album/6ktkgWdHCLwcscTcafICJW	https://www.youtube.com/playlist?list=OLAK5uy_nRQDUMW9RwFdRqpAQSs9yVtsV-m_uRl48	t	2021 Blacksquares Media
those-who-didnt-run	Those Who Didn't Run	EP	2011-10-04	2021-11-15 05:09:38.482	t	30	{}	https://music.apple.com/us/album/those-who-didnt-run-ep/483014103	https://colinstetson.bandcamp.com/album/those-who-didnt-run-3	\N	https://open.spotify.com/album/1cyvpsyZ7Euaq0akBS9y18	\N	t	2011 Constellation
dreams-come-true-2019	Dreams Come True 2019	EP	2019-05-07	2021-11-14 18:47:37.021	f	26	{}	https://music.apple.com/us/album/dreams-come-true-2019-ep/1579582111	https://blackdresses.bandcamp.com/album/dreams-come-true-2019	https://soundcloud.com/black-dresses/sets/dreams-come-true-2019	https://open.spotify.com/album/0jfgaw0ltpZRJvAdLNgl3a	https://www.youtube.com/playlist?list=OLAK5uy_mdRbwVdCV7ox04XrU6wtqr_sTR1d1_7WI	t	2021 Blacksquares Media
world-peace	WORLD PEACE	SINGLE	2020-12-21	2021-11-14 18:50:18.663	f	26	{ESPer99}	https://music.apple.com/us/album/world-peace-feat-esper99-single/1557941153	https://blackdresses.bandcamp.com/track/world-peace-ft-esper99	\N	https://open.spotify.com/track/29kajvgGlqGH3KKULSHf1Y	https://youtu.be/yLtU5-8DUC4	t	\N
metropole	Métropole	EP	2017-06-23	2021-11-17 02:14:04.229	t	35	{}	https://music.apple.com/us/album/m%C3%A9tropole/1519893744	https://anomaliebeats.bandcamp.com/album/m-tropole	https://soundcloud.com/anomaliebeats/sets/metropole-ep	https://open.spotify.com/album/2DnmCXa8xsCuCYmA3rUbbU	https://www.youtube.com/playlist?list=PL2NORulmbo2v-dKk6T8xeHIB66xVBY-1v	t	2017 Anomalie
the-weather-station	The Weather Station	ALBUM	2017-10-06	2021-11-14 19:15:35.619	f	28	{}	https://music.apple.com/us/album/the-weather-station/1253654985	https://theweatherstation.bandcamp.com/album/the-weather-station	\N	https://open.spotify.com/album/1HzRcm4q1txASZShxQz4wX	https://www.youtube.com/playlist?list=OLAK5uy_nu94CL0OBOePkICPnR2-prSTHjjSR1PRo	t	2017 Outside Music
loyalty	Loyalty	ALBUM	2015-05-12	2021-11-14 19:17:13.949	f	28	{}	https://music.apple.com/us/album/loyalty/967020041	https://theweatherstation.bandcamp.com/album/loyalty	\N	https://open.spotify.com/album/18UstruwXPZS4ws8XuE11N	https://www.youtube.com/playlist?list=OLAK5uy_nWjPfWcIfn1xvyS8eVdQohxwOCe2Ato0Y	t	2015 Outside Music
hang-glide	Hang Glide	SINGLE	2017-12-13	2021-11-17 02:10:49.446	t	35	{"Rob Araujo"}	https://music.apple.com/us/album/hang-glide-single/1321067950	https://anomaliebeats.bandcamp.com/album/hang-glide	https://soundcloud.com/anomaliebeats/hangglide	https://open.spotify.com/track/0XbdhHYvrfmUeMd6NaCfmN	https://youtu.be/F_-6z1k5Kbs	t	2017 Anomalie
crush	CRUSH	SINGLE	2018-11-26	2021-11-14 18:52:20.824	f	26	{}	https://music.apple.com/us/album/crush-single/1580022881	https://blackdresses.bandcamp.com/track/crush-tessa-violet-cover	https://soundcloud.com/black-dresses/crush-tessa-violet-cover	https://open.spotify.com/track/5yaL6SDmHuItZpB5PyQ0WF	https://youtu.be/TVgVEvJlp9c	t	2021 Blacksquares Media
the-line	The Line	ALBUM	2009-04-29	2021-11-14 19:21:14.216	f	28	{}	\N	https://theweatherstation.bandcamp.com/album/the-line	\N	\N	https://www.youtube.com/playlist?list=OLAK5uy_nxD7jZszhWeMC-Uqi9XnADIzX7Z3mAcIU	t	2009 Mountain Bed Recordings
late-night-tales-badbadnotgood	Late Night Tales: BADBADNOTGOOD	COMPILATION	2017-07-14	2021-11-14 18:18:55.195	f	22	{}	https://music.apple.com/us/album/late-night-tales-badbadnotgood/1236718852	https://latenighttales.bandcamp.com/album/late-night-tales-badbadnotgood	\N	https://open.spotify.com/album/1J3enVyckc2vOR0xOK1jZX	https://www.youtube.com/playlist?list=OLAK5uy_lmAwI-dcct_k8JQ8QDexeHN0ImQFGNaSw	t	2017 Night Time Stories Ltd.
all-of-it-was-mine	All Of It Was Mine	ALBUM	2011-08-16	2021-11-14 19:19:41.967	f	28	{}	https://music.apple.com/us/album/all-of-it-was-mine/1541922279	https://theweatherstation.bandcamp.com/album/all-of-it-was-mine	https://soundcloud.com/the-weather-station/sets/all-of-it-was-mine	https://open.spotify.com/album/5B36fxNILJERG4j99L3ssS	https://www.youtube.com/playlist?list=OLAK5uy_lpQpu7rp4AyqWuufyVgoPLgPQ6wW2Jh0k	t	2011 Fat Possum Records
sorrow	SORROW	ALBUM	2016-04-08	2021-11-15 05:17:57.026	t	31	{}	https://music.apple.com/us/album/sorrow-a-reimagining-of-goreckis-3rd-symphony/1078960233	https://colinstetson.bandcamp.com/album/sorrow-a-reimagining-of-goreckis-3rd-symphony	\N	https://open.spotify.com/album/3EOAedhOdCr6VsxrdTKM8E	https://www.youtube.com/playlist?list=OLAK5uy_lTorvP6laCsJAigOv7Cd4-FpcqWkOAJvs	t	2016 Colin Stetson, published by Boosey & Hawkes / PWM Edition
new-history-warfare-vol3-to-see-more-light	New History Warfare Vol​.​3: To See More Light	ALBUM	2013-04-30	2021-11-15 05:12:26.361	t	30	{}	https://music.apple.com/us/album/new-history-warfare-vol-3-to-see-more-light/626980450	https://colinstetson.bandcamp.com/album/new-history-warfare-vol-3-to-see-more-light-3	\N	https://open.spotify.com/album/5mBOGECzXM9rkVvECALl9B	https://www.youtube.com/playlist?list=OLAK5uy_mnaVVQ5Q1YRqAp8LjTDJh96pFCF7mQBjk	t	2013 Constellation
new-history-warfare-vol2-judges	New History Warfare Vol​.​2: Judges	ALBUM	2011-02-22	2021-11-15 05:06:01.547	t	30	{}	https://music.apple.com/us/album/new-history-warfare-vol-2-judges/482631565	https://colinstetson.bandcamp.com/album/new-history-warfare-vol-2-judges-3	\N	https://open.spotify.com/album/56rcjS8EZIWTXCbk1V2NBI	https://www.youtube.com/playlist?list=OLAK5uy_kk0mezoKvYMhY0nMRdkpO4vsi-FdPoDi0	t	2011 Constellation
metropole-part-ii	Métropole Part II	EP	2018-10-05	2021-11-17 02:19:34.775	t	35	{}	https://music.apple.com/us/album/m%C3%A9tropole-pt-ii/1435442162	https://anomaliebeats.bandcamp.com/album/m-tropole-part-ii	https://soundcloud.com/anomaliebeats/sets/metropole-part-ii-1	https://open.spotify.com/album/5tjtkMg20jEuzuJrT27gBj	https://youtu.be/F9XsWcEqOy8	t	2018 Anomalie
i-lie-here-buried-with-my-rings-and-my-dresses	I Lie Here Buried With My Rings and My Dresses	ALBUM	2021-06-20	2021-11-19 03:18:48.044	f	37	{}	https://music.apple.com/us/album/i-lie-here-buried-with-my-rings-and-my-dresses/1570917460	https://backxwash.bandcamp.com/album/i-lie-here-buried-with-my-rings-and-my-dresses	\N	https://open.spotify.com/album/4gaxRsSkSQmoyDsTesvplD	https://www.youtube.com/watch?v=9y_sBea80Gg	t	2021 Ugly Hag Records
deviancy	DEVIANCY	ALBUM	2019-07-12	2021-11-19 03:21:08.491	f	37	{}	https://music.apple.com/us/album/deviancy/1464301712	https://grimalkinrecords.bandcamp.com/album/deviancy	https://soundcloud.com/backxwash/sets/deviancy	https://open.spotify.com/album/3hcTivG2J6BLh6IKWV5mb2	https://www.youtube.com/playlist?list=OLAK5uy_myBNG5mMDcJlXFvl8Fqe20r7b5mcFSEAo	t	2019 Grimalkin
stigmata	STIGMATA	EP	2020-08-04	2021-11-19 03:26:48.361	f	37	{}	\N	https://backxwash.bandcamp.com/album/stigmata-ep	https://soundcloud.com/backxwash/sets/stigmata-ep	\N	https://youtu.be/B52KBY1t5u4	t	\N
the-rain-like-curses	The Rain Like Curses	SINGLE	2019-01-21	2021-11-15 05:33:05.474	t	30	{}	https://music.apple.com/us/album/the-rain-like-curses-ep/1449870443	https://colinstetson.bandcamp.com/track/the-rain-like-curses	https://soundcloud.com/colin-stetson/the-rain-like-curses	https://open.spotify.com/album/0QWaEMzVmZ9L0wuhR7vs4c	https://youtu.be/sE02nI55K5Q	t	2019 Colin Stetson
new-history-warfare-vol1	New History Warfare Vol​.​1	ALBUM	2008-03-04	2021-11-15 05:02:24.792	t	30	{}	https://music.apple.com/us/album/new-history-warfare-vol-1/294145269	https://colinstetson.bandcamp.com/album/new-history-warfare-vol-1	\N	https://open.spotify.com/album/2VXcqeEGtQ9EEbtU1GSts8	https://www.youtube.com/playlist?list=OLAK5uy_nBHcimVPUFvP4xWRHxCcSf1W2-uObF4eU	t	2008 Aagoo Records
odds-sods-2	Odds & Sods 2	OTHER	2020-03-20	2022-02-12 17:42:15.077	f	18	{}	\N	https://chadvangaalen.bandcamp.com/album/odds-sods-2	\N	\N	\N	t	\N
everything-nice	Everything Nice	EP	2021-02-25	2021-11-19 03:11:21.617	f	36	{}	https://music.apple.com/us/album/everything-nice-ep/1553119597	https://armslengthontario.bandcamp.com/album/everything-nice	https://soundcloud.com/rmsength/sets/everything-nice-1	https://open.spotify.com/album/7uQQcFRmh3y3pVvQyQwYHr	https://www.youtube.com/playlist?list=OLAK5uy_m4M-V6CFK-VY5cDjZkB6in-6xvhReZ1gM	t	2021 Arm's Length
whats-mine-is-yours	What's Mine Is Yours	EP	2019-08-09	2021-11-19 03:13:17.308	f	36	{}	https://music.apple.com/us/album/whats-mine-is-yours-ep/1474025038	https://armslengthontario.bandcamp.com/album/whats-mine-is-yours	https://soundcloud.com/rmsength/sets/whats-mine-is-yours	https://open.spotify.com/album/73BLzd3gNmOxiuoG7PqID1	https://www.youtube.com/watch?v=sHWwv-qq-v8&list=OLAK5uy_ljNDNk5xr5IB-6q2Wuem__1Pyxp0CIuns	t	2019 Arm's Length
all-this-i-do-for-glory	All This I Do For Glory	ALBUM	2017-04-28	2021-11-15 05:28:54.562	t	30	{}	https://music.apple.com/us/album/all-this-i-do-for-glory/1252038158	https://colinstetson.bandcamp.com/album/all-this-i-do-for-glory	https://soundcloud.com/colin-stetson/sets/all-this-i-do-for-glory	https://open.spotify.com/album/5IQhNr6Vn3cq03bPty6Cpe	https://www.youtube.com/playlist?list=OLAK5uy_mp8WTotm-jZ_o62ThgLYZZBW7xwVqfP2I	t	2017 Colin Stetson
never-were-the-way-she-was	Never Were the Way She Was	ALBUM	2015-04-28	2021-11-15 05:41:44.01	t	30	{}	https://music.apple.com/us/album/never-were-the-way-she-was/977805758	https://stetsonneufeldduo.bandcamp.com/album/never-were-the-way-she-was-6	https://soundcloud.com/colinstetsonandsarahneufeld/sets/never-were-the-way-she-was	https://open.spotify.com/album/6strsYjypCDE3OTh2f9W8l	https://www.youtube.com/playlist?list=OLAK5uy_m0K09pymYaWYG1PId9LE4Yi37awSJOU4w	t	2015 Constellation
detritus	Detritus	ALBUM	2021-05-14	2021-11-16 03:52:41.074	t	30	{}	https://music.apple.com/us/album/detritus/1550688375	https://sarahneufeld.bandcamp.com/album/detritus	\N	https://open.spotify.com/album/0iOd93WyXOkGNH6f2K4SdF	https://www.youtube.com/playlist?list=OLAK5uy_nrZEYt9d9aGZWzKjRR5UmbmrYWMsCSFyE	t	2021 Paper Bag Records
black-sailor-moon	BLACK SAILOR MOON	EP	2018-11-30	2021-11-19 03:24:36.539	f	37	{}	https://music.apple.com/us/album/black-sailor-moon/1445215691	https://backxwash.bandcamp.com/album/black-sailor-moon	https://soundcloud.com/backxwash/sets/black-sailor-moon	https://open.spotify.com/album/0BJmBC1ySke1wTEwAVQpQq	https://www.youtube.com/playlist?list=OLAK5uy_nMuhKSXw56T4-7FQY0in_D8hTGXIgelOc	t	2018 BACKXWASH
the-ridge	The Ridge	ALBUM	2016-02-26	2021-11-16 03:55:20.934	t	30	{}	https://music.apple.com/us/album/the-ridge/1459338851	https://sarahneufeld.bandcamp.com/album/the-ridge	\N	https://open.spotify.com/album/42QHZYOg1m0JiuWHuZhkPQ	https://www.youtube.com/playlist?list=OLAK5uy_mcToLWDy3K8XIPBkbLz8lqVH7fs-d9I5I	t	2016 SN Music Inc
tides	Tides	SINGLE	2021-02-12	2021-12-05 03:24:00.543	f	17	{}	https://music.apple.com/us/album/tides-single/1553056302	https://menitrust.bandcamp.com/track/tides	https://soundcloud.com/men-i-trust/tides	https://open.spotify.com/track/4M7XuOexX6DotCYbEVsDf9	https://youtu.be/zggfXkuS6EM	t	2021 Independent
hello-brother	Hello Brother	ALBUM	2013-08-20	2021-11-16 03:58:02.672	t	30	{}	https://music.apple.com/us/album/hero-brother/669648525	https://sarahneufeld.bandcamp.com/album/hero-brother	https://soundcloud.com/sarahneufeld/sets/hero-brother-1	https://open.spotify.com/album/4ysZncZy1npLGVdTmsD9Lo	https://www.youtube.com/playlist?list=OLAK5uy_mjKsnsVsQCN3SsL7hHpkQo8CQos9mguzM	t	2013 Constellation
its-not-how-it-sounds	IT'S NOT HOW IT SOUNDS	ALBUM	2020-07-10	2021-11-12 18:45:16.902	f	14	{}	https://music.apple.com/us/album/its-not-how-it-sounds/1516185877	https://ctsecond.bandcamp.com/album/its-not-how-it-sounds	https://soundcloud.com/ctsecond/sets/inhis	https://open.spotify.com/album/0jf5MCii8SnGtrRUaxuIBC	https://www.youtube.com/playlist?list=OLAK5uy_mh4MjjE7yM9--_xHkvfsxvIMDa55pObFI	t	2020 Clairmont The Second
nervous	nervous	EP	2019-06-28	2021-11-16 03:36:04.175	f	24	{}	https://music.apple.com/us/album/nervous-ep/1466864179	https://jonahyano.bandcamp.com/album/nervous-ep	\N	https://open.spotify.com/album/2JEBd0ij8JRwNd9ATlaocF	https://www.youtube.com/playlist?list=OLAK5uy_kbi6Go83GeT7fYhbzs5X4Cmw-HLcVxKLM	t	2019 Innovative Leisure
this-time-around	This Time Around	SINGLE	2020-11-17	2021-11-16 03:30:07.816	f	32	{}	https://music.apple.com/us/album/this-time-around-single/1537831327	https://jonahyano.bandcamp.com/track/this-time-around	\N	https://open.spotify.com/album/3zsAhHvn0VOa7G9HPFauVC	https://youtu.be/q5ozd7OjclE	t	2020 Innovative Leisure
monarch-season	Monarch Season	ALBUM	2020-10-16	2021-11-16 04:15:16.946	f	33	{}	https://music.apple.com/us/album/monarch-season/1529210666	https://jennifercastle.bandcamp.com/album/monarch-season	https://soundcloud.com/jennifercastle/sets/monarch-season-1	https://open.spotify.com/album/7gTee00EaRwJQhQbni7XSq	https://www.youtube.com/playlist?list=OLAK5uy_kML2G9lY7uKqMDVCCjF674Y2qK0b3r3yM	t	2020 Idée Fixe Records
pink-city	Pink City	ALBUM	2014-09-02	2021-11-16 04:10:51.262	f	33	{}	https://music.apple.com/us/album/pink-city/1447589042	https://jennifercastle.bandcamp.com/album/pink-city	\N	https://open.spotify.com/album/24FsvLEuAMJZh3pRIlA76P	https://www.youtube.com/playlist?list=OLAK5uy_mTTyA0iTSF89-q1hj9SFcu1Xk9u0bRjY4	t	2014 Idee Fixe Records
castlemusic	Castlemusic	ALBUM	2011-04-26	2021-11-16 04:09:05.316	f	33	{}	https://music.apple.com/us/album/castlemusic/501488988	https://jennifercastle.bandcamp.com/album/castlemusic-2	\N	https://open.spotify.com/album/1MLDfTP53V9QwfyBXSugY9	https://www.youtube.com/playlist?list=OLAK5uy_lGABZHJjtKE8klGW7PERLuI40M_uVHlqo	t	Flemish Eye Records
leaving-none-but-small-birds	Leaving None But Small Birds	ALBUM	2021-10-01	2021-11-20 00:45:16.565	f	38	{"The Body"}	https://music.apple.com/us/album/leaving-none-but-small-birds/1563986379	https://bigbravesl.bandcamp.com/album/leaving-none-but-small-birds	\N	https://open.spotify.com/album/09SsXC6eMGRcGX7uOGYNYQ	https://www.youtube.com/playlist?list=OLAK5uy_lqzL_2Rs6dppz7jo31qHVJsylqSe2Iga4	t	2021 The Body and BIG|BRAVE
vital	Vital	ALBUM	2021-04-23	2021-11-20 00:47:10.855	f	39	{}	https://music.apple.com/us/album/vital/1554948620	https://bigbravesl.bandcamp.com/album/vital	\N	https://open.spotify.com/album/14kuTPhdY22O7vyGhqzNbY	https://www.youtube.com/playlist?list=OLAK5uy_lDDBD0rjD8FNdrFlB1KDjkBRMRUh0gXc0	t	2021 Southern Lord
a-gaze-among-them	A Gaze Among Them	ALBUM	2019-05-10	2021-11-20 00:48:46.07	f	39	{}	https://music.apple.com/us/album/a-gaze-among-them/1457436482	https://bigbravesl.bandcamp.com/album/a-gaze-among-them	\N	https://open.spotify.com/album/1i10no8p3y1igTW46jquub	https://www.youtube.com/playlist?list=OLAK5uy_kE0IW1hYbgIDmnKf8CjAXIbzYfLP0V_FI	t	2019 Southern Lord Recordings Inc.
freaks	F.R.E.A.K.S	EP	2018-06-07	2021-11-19 03:28:40.808	f	37	{}	https://music.apple.com/us/album/f-r-e-a-k-s-ep/1397203226	https://backxwash.bandcamp.com/album/f-r-e-a-k-s	https://soundcloud.com/backxwash/sets/f-r-e-a-k-s	https://open.spotify.com/album/2iJlVqaLbMzGrNgJyFmeoC	https://youtu.be/kzPAvY1hlRE	t	2018 BACKXWASH
ardor	Ardor	ALBUM	2017-09-15	2021-11-20 00:50:15.572	f	39	{}	https://music.apple.com/us/album/ardor/1274679339	https://bigbravesl.bandcamp.com/album/ardor	\N	https://open.spotify.com/album/7F9GqRTn1u9x0sCkWRivRM	https://www.youtube.com/playlist?list=OLAK5uy_kxvyS7-n7C6Z1wXPhWYcaCyXRAe3MoPeM	t	2017 Southern Lord Recordings Inc.
spectrums	Spectrums	ALBUM	2021-10-15	2021-11-20 01:02:13.602	f	26	{}	https://music.apple.com/us/album/spectrums/1586979615	https://odonisodonis.bandcamp.com/album/spectrums	https://soundcloud.com/odonisodonis/sets/spectrums-5	https://open.spotify.com/album/6IsXBYxnhKlFOwao9cTPCz	https://www.youtube.com/playlist?list=PLjWm9ipNz-BxXN-Ejq2UibXauLRei8Kgk	t	2021 felte
rosemarys-revenge	ROSEMARY'S REVENGE	SINGLE	2021-10-31	2021-11-19 03:30:11.62	f	37	{}	https://music.apple.com/us/album/rosemarys-revenge-single/1592903075	https://backxwash.bandcamp.com/track/rosemarys-revenge	\N	https://open.spotify.com/track/1MXh1oickwhakDXsbVj05u	https://youtu.be/JZqromQR2Fw	t	2021 Ugly Hag Records
no-pop	No Pop	ALBUM	2017-10-20	2021-11-20 01:06:20.028	f	26	{}	https://music.apple.com/us/album/no-pop/1275609817	https://odonisodonis.bandcamp.com/album/no-pop	https://soundcloud.com/felte/sets/odonis-odonis-no-pop-hype	https://open.spotify.com/album/5yCeAMpSAsH2Vy7ytf012z	https://www.youtube.com/playlist?list=PLjWm9ipNz-By0UVCWdju2BX0twTEiu5xa	t	2017 Telephone Explosion
post-plague	Post Plague	ALBUM	2016-06-17	2021-11-20 01:08:08.225	f	26	{}	https://music.apple.com/us/album/post-plague/1100831238	https://odonisodonis.bandcamp.com/album/post-plague	https://soundcloud.com/felte/sets/odonis-odonis-post-plague-official-album-stream	https://open.spotify.com/album/6Jp55dBgVnhVetaDomErDu	https://www.youtube.com/playlist?list=PLjWm9ipNz-BwQ8isswZ50GTdRPOSKokfG	t	2016 Odonis Odonis under exclusive license to felte
hard-boiled-soft-boiled	Hard Boiled Soft Boiled	ALBUM	2014-04-15	2021-11-20 01:13:52.451	f	15	{}	\N	https://odonisodonis.bandcamp.com/album/hard-boiled-soft-boiled	\N	https://open.spotify.com/album/58gIBEy799AYbCi1iWlytS	\N	t	2014 Buzz Records
reaction	Reaction	EP	2019-04-12	2021-11-20 01:03:41.62	f	26	{}	https://music.apple.com/us/album/reaction-ep/1453566929	https://odonisodonis.bandcamp.com/album/reaction	https://soundcloud.com/odonisodonis/sets/reaction-719646630	https://open.spotify.com/album/4oqUbiqcZ6X7aIjN767TdW	https://www.youtube.com/playlist?list=PLjWm9ipNz-BxyRgCYjtubMwXQE3_ZA1AA	t	2019 felte
better	Better	EP	2013-04-16	2021-11-20 01:17:21.991	f	15	{}	https://music.apple.com/us/album/better-ep/616386919	https://odonisodonis.bandcamp.com/album/better	\N	https://open.spotify.com/album/5r9xAEG0IbxZpKIqtiaWKi	\N	t	2013 Buzz Records
feral-verdure	Feral Verdure	ALBUM	2014-09-02	2021-11-20 00:53:50.971	f	39	{}	https://music.apple.com/us/album/feral-verdure/914995080	https://bigbrave.bandcamp.com/album/feral-verdure	https://soundcloud.com/big-brave/sets/feral-verdure	https://open.spotify.com/album/1qOmb65F7YCkTW95RBKqsY	https://www.youtube.com/playlist?list=OLAK5uy_lM0F5DUoU1RDl_T3umsYwcFT9ZFRRbxlU	t	Sainte Cécile
gem	Gem	ALBUM	2012-10-22	2021-11-11 15:31:30.529	f	5	{}	https://music.apple.com/us/album/gem/917528814	https://usgirls.bandcamp.com/album/gem	https://soundcloud.com/usgirls/sets/gem-15	https://open.spotify.com/album/39r4jjZQGIyBHLRf6Q5seP	https://www.youtube.com/playlist?list=OLAK5uy_mjohD6ogMA6ubKLfZFAKIn0g0jWEBH8EA	t	2012 FatCat Records
church-of-better-daze	Church of Better Daze	ALBUM	2021-07-16	2021-11-20 16:22:41.767	f	18	{}	https://music.apple.com/us/album/church-of-better-daze/1565628211	https://yaboygolden.bandcamp.com/album/church-of-better-daze	\N	https://open.spotify.com/album/2AKIQQ5uNa8IAKKnownLDi	https://www.youtube.com/playlist?list=OLAK5uy_mkRndDkJM7o2T32fs00ct4iDKCYKwV2vY	t	2021 Six Shooter Records Inc.
jenny-come-home	Jenny Come Home	SINGLE	2015-10-16	2021-11-21 05:49:11.527	f	33	{}	https://music.apple.com/us/album/jenny-come-home-single/1485062593	https://andyshauf.bandcamp.com/album/jenny-come-home	https://soundcloud.com/andyshauf/jenny-come-home	https://open.spotify.com/track/318KYm3I1DWfr5OYPDuWQe	https://youtu.be/K3rEbhklaBE	t	2015 Andy Shauf under exclusive license to Arts & Crafts Productions Inc.
sam-jones-feeds-his-demons	Sam Jones Feeds His Demons	EP	2012-03-20	2021-11-21 05:51:08.579	f	33	{}	\N	https://andyshauf.bandcamp.com/album/sam-jones-feeds-his-demons	https://soundcloud.com/andyshauf/sets/sam-jones-feeds-his-demons-ep	\N	\N	t	\N
us-girls-on-kraak	U.S. Girls on Kraak	ALBUM	2011-10-29	2021-11-11 15:33:24.682	f	6	{}	https://music.apple.com/us/album/u-s-girls-on-kraak/475001822	https://usgirls.bandcamp.com/album/u-s-girls-on-kraak	https://soundcloud.com/usgirls/sets/u-s-girls-on-kraak	https://open.spotify.com/album/57VwxgCCOVKIQMLjgwpgnP	https://www.youtube.com/playlist?list=OLAK5uy_mf--Xwmi4_zf9Rw0tUCiLTheTkeQhL2vA	t	2011 (K-raa-k)3
the-party	The Party	ALBUM	2016-05-20	2021-11-21 05:44:29.653	f	33	{}	https://music.apple.com/us/album/the-party/1485075427	https://andyshauf.bandcamp.com/album/the-party	\N	https://open.spotify.com/album/2EhgysAt5fY85LYceFFpbE	https://www.youtube.com/playlist?list=OLAK5uy_kj9r1Z-Z7jhZ7C8nFVO5jONAL-l5qRia4	t	2016 Andy Shauf under exclusive license to Arts & Crafts Productions Inc.
the-bearer-of-bad-news	The Bearer of Bad News	ALBUM	2015-02-03	2021-11-21 05:46:26.338	f	33	{}	https://music.apple.com/us/album/the-bearer-of-bad-news/948443235	https://andyshauf.bandcamp.com/album/the-bearer-of-bad-news	\N	https://open.spotify.com/album/4DF62SLgZ9dErCxGsbyyI8	https://www.youtube.com/playlist?list=OLAK5uy_nK9dGCLEoP2sEebA-k1H9Irs2ki8ulzD4	t	2015 Andy Shauf under exclusive license to Arts & Crafts Productions Inc.
judy-jeremys-wedding	Judy / Jeremy's Wedding	SINGLE	2020-07-23	2021-11-21 04:54:57.442	f	33	{}	https://music.apple.com/us/album/judy-jeremys-wedding-single/1521646652	https://andyshauf.bandcamp.com/album/judy-jeremys-wedding	\N	https://open.spotify.com/album/7bumNcVT747qlpvGnLSXHA	https://www.youtube.com/playlist?list=OLAK5uy_mXKJ7mmx9AfZYJavNZ9ysrFuAGV1jyGgk	t	2020 Andy Shauf under exclusive license to Arts & Crafts Productions Inc.
you-slipped-away	You Slipped Away	SINGLE	2020-11-17	2021-11-21 04:52:55.808	f	33	{}	https://music.apple.com/us/album/you-slipped-away-single/1537539113	https://andyshauf.bandcamp.com/album/you-slipped-away	\N	https://open.spotify.com/track/34OYw2Qo4HUgZPrSFA9hY9	https://youtu.be/kOGhSoT0GHo	t	2020 Andy Shauf under exclusive license to Arts & Crafts Productions Inc.
lotus-plaza-odonis-odonis	Lotus Plaza / Odonis Odonis	EP	2011-07-18	2021-11-20 01:25:06.055	f	19	{"Lotus Plaza"}	https://music.apple.com/us/album/lotus-plaza-odonis-odonis-ep/917599271	https://odonisodonis.bandcamp.com/album/lotus-plaza-split	https://soundcloud.com/odonisodonis/sets/lotus-plaza-odonis-odonis-2	https://open.spotify.com/album/3TSchHc5DyKnzKxZ94Dpox	\N	t	2011 Palmist (FatCat Records)
hollandaze	Hollandaze	ALBUM	2011-11-07	2021-11-20 01:19:24.372	f	15	{}	https://music.apple.com/us/album/hollandaze-deluxe-edition/917524639	https://odonisodonis.bandcamp.com/album/hollandaze	https://soundcloud.com/odonisodonis/sets/hollandaze	https://open.spotify.com/album/35UFEsTRYVSGpwKvUciNHj	\N	t	2011 FatCat Records
g_ds-pee-at-states-end	G_d's Pee AT STATE'S END!	ALBUM	2021-04-02	2021-11-23 02:44:17.374	t	41	{}	https://music.apple.com/us/album/g-ds-pee-at-states-end/1556346295	https://godspeedyoublackemperor.bandcamp.com/album/g-d-s-pee-at-state-s-end	https://soundcloud.com/godspeedyoublackemperor/sets/g_ds-pee-at-states-end	https://open.spotify.com/album/6gZsJeN8MdITXZMVDXrMk0	https://www.youtube.com/playlist?list=OLAK5uy_kfTpURKzYF6j5xNNrpAw-XZBWvR5yjDSg	t	2021 Constellation
luciferian-towers	Luciferian Towers	ALBUM	2017-09-22	2021-11-23 02:47:39.43	t	41	{}	https://music.apple.com/us/album/luciferian-towers/1264190010	https://godspeedyoublackemperor.bandcamp.com/album/luciferian-towers	https://soundcloud.com/godspeedyoublackemperor/sets/luciferian-towers	https://open.spotify.com/album/6NeicP84ZRNL2yMlWS6XzH	https://www.youtube.com/playlist?list=OLAK5uy_mz1ji9vGp0i_rbxTDRUZFMA9JsrHUNPWE	t	2017 Constellation
asunder-sweet-and-other-distress	Asunder, Sweet and Other Distress	ALBUM	2015-03-31	2021-11-23 02:52:29.025	t	41	{}	https://music.apple.com/us/album/asunder-sweet-and-other-distress/966244441	https://godspeedyoublackemperor.bandcamp.com/album/asunder-sweet-and-other-distress	https://soundcloud.com/godspeedyoublackemperor/sets/asunder-sweet-and-other-2	https://open.spotify.com/album/5PafRMGGWCTcsrnutA2ZIX	https://www.youtube.com/playlist?list=OLAK5uy_kUbwk5dVenUjq5Tv5_po5gUz3vT6LCpWM	t	2015 Constellation
allelujah-dont-bend-ascend	Allelujah! Don't Bend! Ascend!	ALBUM	2012-10-01	2021-11-23 02:54:34.23	t	41	{}	https://music.apple.com/us/album/allelujah-dont-bend-ascend/567236854	https://godspeedyoublackemperor.bandcamp.com/album/allelujah-dont-bend-ascend	https://soundcloud.com/godspeedyoublackemperor/sets/allelujah-dont-bend-ascend-1	https://open.spotify.com/album/1OhcoQdeYqt68I22NWEdF0	https://www.youtube.com/playlist?list=OLAK5uy_kzTN1NM1rPvfXHyZQtL849NquQJQgI6Rc	t	2012 Constellation
four-songs	Four Songs	EP	2009-12-15	2021-11-21 05:56:10.724	f	33	{}	https://music.apple.com/us/album/four-songs-ep/488364056	\N	https://soundcloud.com/andyshauf/sets/four-songs-2	https://open.spotify.com/album/5aK6MbgseyvZpr0E8C5s7A	https://www.youtube.com/playlist?list=OLAK5uy_lbS6e7NYDU-1RX-FsYIcitxLULmpTwDhc	t	2009 Hopeless Records, Inc.
darker-days-b-sides	Darker Days: B-Sides	SINGLE	2012-11-12	2021-11-21 05:58:03.067	f	33	{}	https://music.apple.com/us/album/darker-days-b-sides-single/1534778345	\N	\N	https://open.spotify.com/album/1DnBqOgRVQJkPfY8k5FGCf	\N	t	2012 Andy Shauf
diaper-island	Diaper Island	ALBUM	2011-05-17	2021-11-24 04:41:56.516	f	44	{}	https://music.apple.com/us/album/diaper-island-bonus-track-version/431178318	https://chadvangaalen.bandcamp.com/album/diaper-island-canada	\N	https://open.spotify.com/album/53apxBBX7WzS2adepv79Nq	https://www.youtube.com/playlist?list=OLAK5uy_kk_7N7x5nnyHFIY2N3gwaoFZlvvVOhqxw	t	Flemish Eye Records
darker-days	Darker Days	ALBUM	2009-05-19	2021-11-21 05:54:54.904	f	33	{}	https://music.apple.com/us/album/darker-days/1534691954	\N	\N	https://open.spotify.com/album/0dFEkuzFs7YDLvhNLtyrRl	https://www.youtube.com/playlist?list=OLAK5uy_nRELrE8SZlkFaFgHk4ChjqzIJFGyYqHaQ	t	2009 Andy Shauf
the-magician	The Magician	LIVE	2019-02-22	2021-11-21 06:00:36.946	f	33	{}	https://music.apple.com/us/album/the-magician-live/1452686547?i=1452686948	\N	\N	https://open.spotify.com/track/7mlFvLVmjWwT6d5cktIlC9	\N	t	2019 Arts & Crafts Productions Inc.
remixes-2009-2013	Remixes 2009​-​2013	REMIX	2020-06-05	2021-12-02 02:40:39.43	f	51	{}	\N	https://cadenceweapon.bandcamp.com/album/remixes-2009-2013	\N	\N	\N	t	\N
much-later	Much Later	ALBUM	2017-03-03	2021-11-21 06:09:50.288	f	32	{}	https://music.apple.com/us/album/much-later/1413535335	https://darrylkissick.bandcamp.com/album/much-later	\N	https://open.spotify.com/album/2L28Th0HP1LPwQPbE8etsT	https://www.youtube.com/playlist?list=OLAK5uy_lrVNbsIItjZCx4zlO7_5Z8wagvyaNcpjU	t	2018 654833 Records DK
forever-in-your-heart	Forever In Your Heart	ALBUM	2021-02-14	2021-11-14 18:37:52.416	f	26	{}	https://music.apple.com/us/album/forever-in-your-heart/1579590240	https://blackdresses.bandcamp.com/album/forever-in-your-heart	\N	https://open.spotify.com/album/09kEcsP2Lcx8g5f1CUeYsL	https://www.youtube.com/playlist?list=OLAK5uy_kKZUWb78B9luwUlHQ7U93f_XnszqYqg-M	t	2021 Blacksquares Media
not-looking-ahead	Not Looking Ahead	SINGLE	2018-10-13	2021-11-21 06:11:23.725	f	32	{}	https://music.apple.com/us/album/not-looking-ahead-single/1438968758	https://darrylkissick.bandcamp.com/album/not-looking-ahead	\N	https://open.spotify.com/track/42MRYNJNzDFQleNtc2owRt	https://youtu.be/GuM_TLpwThY	t	2018 654833 Records DK
i-once-knew-its-cool	I Once Knew / It's Cool	SINGLE	2017-04-22	2021-11-21 06:13:23.086	f	32	{}	https://music.apple.com/us/album/i-once-knew-its-cool-single/1229177727	https://darrylkissick.bandcamp.com/album/i-once-knew-its-cool	\N	https://open.spotify.com/album/6QHn8EbsUU5xyA9K5p2dV2	\N	t	2017 654833 Records DK
yanqui-uxo	Yanqui U​.​X​.​O.	ALBUM	2002-11-11	2021-11-23 02:57:32.119	t	41	{}	https://music.apple.com/us/album/yanqui-u-x-o/480245811	https://godspeedyoublackemperor.bandcamp.com/album/yanqui-u-x-o	https://soundcloud.com/godspeedyoublackemperor/sets/yanqui-u-x-o	https://open.spotify.com/album/0XKw8i6Hlz6oV9moQcjjR5	https://www.youtube.com/playlist?list=OLAK5uy_kLUmGIwUKbSh7-SRwF7f4qKVbMx62wXDY	t	2002 Constellation
lift-your-skinny-fists-like-antennas-to-heaven	Lift Your Skinny Fists Like Antennas To Heaven	ALBUM	2000-11-08	2021-11-23 02:59:47.8	t	41	{}	https://music.apple.com/us/album/lift-your-skinny-fists-like-antennas-to-heaven/40886657	https://godspeedyoublackemperor.bandcamp.com/album/lift-your-skinny-fists-like-antennas-to-heaven	https://soundcloud.com/godspeedyoublackemperor/sets/lift-your-skinny-fists-like	https://open.spotify.com/album/2rT82YYlV9UoxBYLIezkRq	https://www.youtube.com/playlist?list=OLAK5uy_mZLN6LQOH-pyVdbP_PZoWS75eKSwskkCo	t	2000 kranky
f-a	F♯ A♯ ∞	ALBUM	1997-08-14	2021-11-23 03:03:44.47	t	41	{}	https://music.apple.com/us/album/f-a/40884346	https://godspeedyoublackemperor.bandcamp.com/album/f-a	https://soundcloud.com/godspeedyoublackemperor/sets/f-a-infinity-1	https://open.spotify.com/album/7sh2Z8jj1iySpHRAnGd9w5	https://www.youtube.com/playlist?list=OLAK5uy_leNpfjYgnSp8bhkVTYkCFsuMB4cd3k3-M	t	1996 kranky
slow-riot-for-new-zero-kanada	Slow Riot for New Zero Kanada	EP	1999-03-29	2021-11-23 03:01:59.113	t	41	{}	https://music.apple.com/us/album/slow-riot-for-new-zero-kanada/40885422	https://godspeedyoublackemperor.bandcamp.com/album/slow-riot-for-new-zero-kanada	https://soundcloud.com/godspeedyoublackemperor/sets/slow-riot-for-new-zero-kanada	https://open.spotify.com/album/2tA6VFMIQuSF3KpXsrulw9	https://www.youtube.com/playlist?list=OLAK5uy_lreyKRXmxCoGPwItinqkORNch8ljaUEi4	t	1998 kranky
light-information	Light Information	ALBUM	2017-09-08	2021-11-24 04:32:08.987	f	18	{}	https://music.apple.com/us/album/light-information/1241449703	https://chadvangaalen.bandcamp.com/album/light-information-canada	\N	https://open.spotify.com/album/7BjgOR0NuaRpDmwaVlCwrK	https://www.youtube.com/playlist?list=OLAK5uy_nfy7s3KZEcDZs0d0fkeEIs-AJUzR_PWu8	t	Flemish Eye
salt	Salt	ALBUM	2019-04-05	2021-11-23 03:54:30.529	f	42	{}	https://music.apple.com/us/album/salt/1447309268	https://blessedband.bandcamp.com/album/salt	https://soundcloud.com/blessedband/sets/blessed-salt-mastered	https://open.spotify.com/album/3XyFw5CFicWxilan4iubRX	https://www.youtube.com/playlist?list=OLAK5uy_mSRJQJiTvPv4gmreGXqftGJWljl2QZDsE	t	2019 Blessed Band LLP distributed by Pirates Blend Records Inc.
iii-0	iii	EP	2021-02-19	2021-11-23 03:57:13.68	f	42	{}	https://music.apple.com/us/album/iii-ep/1534390034	https://blessedband.bandcamp.com/album/iii	https://soundcloud.com/blessedband/sets/iii	https://open.spotify.com/album/4jEi2jR4jOxgBonbHBKWh2	https://www.youtube.com/playlist?list=OLAK5uy_nXZgMRTN84n5hZs58vO_ZWqFMe1jUp_hY	t	\N
blessed	Blessed	EP	2016-05-20	2021-11-23 04:06:27.138	f	42	{}	https://music.apple.com/us/album/blessed-ep/1545282173	https://blessedband.bandcamp.com/album/blessed	\N	https://open.spotify.com/album/35rN2QJFxoXkhi5fAEY4Aq	https://www.youtube.com/playlist?list=OLAK5uy_nvmxKdy8XJe7ySX4uibx1de_xtENmRQBU	t	2016 Blessed Band LLP distributed by Pirates Blend Records Inc.
sound-teeth-showing	Sound / Teeth Showing	SINGLE	2018-04-27	2021-11-23 04:02:52.072	f	42	{}	https://music.apple.com/us/album/sound-teeth-showing-single/1372937557	https://blessedband.bandcamp.com/track/sound	\N	https://open.spotify.com/album/3rNksYooaOXr8ny5geIJUf	https://www.youtube.com/playlist?list=OLAK5uy_nLWXvAhjVvG6-tF4OiMiEaL31C7OSmPOs	t	2018 Buzz Records
blessed-on-audiotree-live	Blessed on Audiotree Live	LIVE	2019-05-23	2021-11-23 03:59:48.829	f	42	{}	https://music.apple.com/us/album/blessed-on-audiotree-live-ep/1463001439	https://audiotree.bandcamp.com/album/blessed-on-audiotree-live	\N	https://open.spotify.com/album/0eluDmHkQVyxZ5SsYy0IXn	https://youtu.be/_t7uk-Purok	t	2019 Blessed
souvenir	souvenir	ALBUM	2020-06-19	2021-11-16 03:23:51.635	f	24	{}	https://music.apple.com/us/album/souvenir/1501761838	https://jonahyano.bandcamp.com/album/souvenir	\N	https://open.spotify.com/album/4cabxBosFk0C7xVD1lVitq	https://www.youtube.com/playlist?list=OLAK5uy_k4GOhDPYKa4mqLQDSJS-8IFjiqUF_45Es	t	2020 Innovative Leisure
ii-0	II	EP	2017-04-28	2021-11-23 04:05:34.621	f	42	{}	https://music.apple.com/us/album/ii-ep/1545278423	https://blessedband.bandcamp.com/album/ii	https://soundcloud.com/blessedband/sets/ii-1	https://open.spotify.com/album/0jXQKL9v6PlRSpcUWLBKmZ	\N	t	2017 CoinTossRecords
center-of-the-maze	Center Of The Maze	ALBUM	2016-06-24	2021-11-25 04:51:15.793	f	38	{}	https://music.apple.com/us/album/center-of-the-maze/1099918374	https://cometcontrol.bandcamp.com/album/center-of-the-maze	https://soundcloud.com/cometcontrolofficial/sets/center-of-the-maze	https://open.spotify.com/album/6Kaa4KSOPHxkGnLczBYRn6	\N	t	2016 Tee Pee Records
comet-control	Comet Control	ALBUM	2014-05-20	2021-11-25 04:49:30.249	f	38	{}	https://music.apple.com/us/album/comet-control/824376542	https://cometcontrol.bandcamp.com/album/comet-control	https://soundcloud.com/cometcontrolofficial/sets/comet-control-1	https://open.spotify.com/album/3O0VAkL5J0yzVWPRtyyYgD	\N	t	2014 Tee Pee Records
worlds-most-stressed-out-gardener	World's Most Stressed out Gardener	ALBUM	2021-03-19	2021-11-24 04:26:38.01	f	48	{}	https://music.apple.com/us/album/worlds-most-stressed-out-gardener/1548377559	https://chadvangaalen.bandcamp.com/album/worlds-most-stressed-out-gardener	https://soundcloud.com/chadvangaalen-music/sets/worlds-most-stressed-out	https://open.spotify.com/album/2ZXDWGLfcWrYbo9eCDFTJO	https://www.youtube.com/playlist?list=OLAK5uy_lq0yu2hlmSD2BP_KTJkTKCPaHoJO8eStc	t	2021 Flemish Eye Records
shrink-dust	Shrink Dust	ALBUM	2014-04-29	2021-11-24 04:33:57.982	f	48	{}	https://music.apple.com/us/album/shrink-dust/796732956	https://chadvangaalen.bandcamp.com/album/shrink-dust-canada	\N	https://open.spotify.com/album/2um4fGiMIkyXgpe1zdPVBl	https://www.youtube.com/playlist?list=OLAK5uy_mWiQYRhjFbfB527y2orjtDVMQEMJgXK_g	t	Flemish Eye Records
soft-airplane	Soft Airplane	ALBUM	2008-09-09	2021-11-24 04:45:02.908	f	18	{}	https://music.apple.com/us/album/soft-airplane/288840450	https://chadvangaalen.bandcamp.com/album/soft-airplane-canada	\N	https://open.spotify.com/album/6WiSCuA2RdQ3DiBuStsUUt	https://www.youtube.com/playlist?list=OLAK5uy_nD-CmtY7K99fw1PbQps2G3xj0RmRxXo6M	t	Flemish Eye Records
lost-harmonies-2	Lost Harmonies 2	OTHER	2021-11-03	2021-11-24 05:07:39.622	f	47	{}	\N	https://chadvangaalen.bandcamp.com/album/lost-harmonies-2	\N	\N	\N	t	\N
infiniheart	Infiniheart	ALBUM	2005-08-23	2021-11-24 04:48:54.796	f	18	{}	https://music.apple.com/us/album/infiniheart/78957225	https://chadvangaalen.bandcamp.com/album/infiniheart-2	\N	https://open.spotify.com/album/3ADAY9RbKarSp4OVSGeTTO	https://www.youtube.com/playlist?list=OLAK5uy_l8AoXeVGGDCsx60Z46aB3FErBx03i0Ofo	t	Flemish Eye Records
your-tan-looks-supernatural	Your Tan Looks Supernatural	EP	2011-03-23	2021-11-24 05:30:30.312	f	44	{}	\N	https://chadvangaalen.bandcamp.com/album/your-tan-looks-supernatural	\N	\N	\N	t	\N
friendly-aliens-monopoly-arp	Friendly Aliens / Monopoly Arp	SINGLE	2018-11-27	2021-11-24 04:54:08.354	f	18	{}	https://music.apple.com/us/album/friendly-aliens-single/1441160944	https://chadvangaalen.bandcamp.com/album/odds-and-sods	\N	https://open.spotify.com/album/5hyFGEwjeZyyDYikpiAXqU	https://www.youtube.com/playlist?list=OLAK5uy_k_Bmbl_bnxkDIa3n79fWTaX7zd27ZKsIg	t	Flemish Eye Records
skelliconnection	Skelliconnection	ALBUM	2006-08-22	2021-11-24 04:47:24.104	f	18	{}	https://music.apple.com/us/album/skelliconnection/177130556	https://chadvangaalen.bandcamp.com/album/skelliconnection-canada	\N	https://open.spotify.com/album/1BMR9Qn1ponUgaJNHrHD7U	https://www.youtube.com/playlist?list=OLAK5uy_n4Jn8ANMgWe7cdqjSsVwBeSCc_0OPF53E	t	Flemish Eye Records
parsa	PARSA	OTHER	2010-01-01	2021-11-24 05:31:33.961	f	47	{}	\N	https://chadvangaalen.bandcamp.com/album/parsa	\N	\N	\N	t	\N
nth	NTH	OTHER	2020-12-04	2021-11-24 05:02:30.297	t	46	{}	\N	https://chadvangaalen.bandcamp.com/album/nth	\N	\N	\N	t	\N
lost-harmonies	Lost Harmonies	OTHER	2020-10-02	2021-11-24 05:01:33.404	f	45	{}	\N	https://chadvangaalen.bandcamp.com/album/lost-harmonies	\N	\N	\N	t	\N
broken-harp	broken harp	OTHER	2021-09-27	2021-11-24 05:05:01.598	t	46	{}	\N	https://chadvangaalen.bandcamp.com/album/broken-harp	\N	\N	\N	t	\N
midas-touch	Midas Touch	SINGLE	2018-10-18	2022-02-13 19:53:11.594	f	28	{}	https://music.apple.com/us/album/midas-touch-feat-the-weather-station/1436985375?i=1436985383	https://theweatherstationjennifercastle.bandcamp.com/track/midas-touch-feat-the-weather-station	\N	\N	https://youtu.be/x_kHdtTm9s4	t	2018 Outside Music
full-moon-bummer	Full Moon Bummer	OTHER	2021-10-01	2021-11-24 05:06:04.17	f	18	{}	\N	https://chadvangaalen.bandcamp.com/album/full-moon-bummer	\N	\N	\N	t	\N
oncle-jazz	Oncle Jazz	ALBUM	2019-09-13	2021-12-05 03:13:41.55	f	17	{}	https://music.apple.com/us/album/oncle-jazz/1473993015	https://menitrust.bandcamp.com/album/oncle-jazz	https://soundcloud.com/men-i-trust/sets/men-i-trust-oncle-jazz	https://open.spotify.com/album/4W4gNYa4tt3t8V6FmONWEK	https://youtu.be/iVg30U6O764	t	2019 Independent
headroom	Headroom	ALBUM	2015-06-30	2021-12-05 03:15:37.911	f	17	{}	https://music.apple.com/us/album/headroom/1013104889	https://menitrust.bandcamp.com/album/headroom	\N	https://open.spotify.com/album/4gUbxHmLI5e9ygyg1iLynP	https://youtu.be/8capWZmXtGY	t	2015 Men I Trust
untourable-album	Untourable Album	ALBUM	2021-08-25	2021-12-05 03:11:31.346	f	17	{}	https://music.apple.com/us/album/untourable-album/1576841023	https://menitrust.bandcamp.com/album/untourable-album	\N	https://open.spotify.com/album/7FkJxlcljM6Ix0pC2JSNOE	https://youtu.be/bBRoT5JlBP4	t	2021 Independent
forever-live-sessions	Forever Live Sessions	LIVE	2020-10-30	2021-12-05 03:19:29.216	f	17	{}	https://music.apple.com/us/album/forever-live-sessions/1522013849	https://menitrust.bandcamp.com/album/forever-live-sessions	https://soundcloud.com/men-i-trust/sets/men-i-trust-forever-live-sessions	https://open.spotify.com/album/4p73PcjJvWer7WDYXcGetn	https://youtu.be/_U9epQ-0I8k	t	2020 Independent
parallel-world	Parallel World	ALBUM	2021-04-30	2021-12-02 02:19:20.918	f	51	{}	https://music.apple.com/us/album/parallel-world/1552277746	https://cadenceweapon.bandcamp.com/album/parallel-world	\N	https://open.spotify.com/album/1Mo1cqa1k11rCtSSm4iUhR	https://www.youtube.com/playlist?list=OLAK5uy_kR3pRqRi-T2hpCez7O0_8wMl8fT1BVJ0I	t	2021 eOne Music
cadence-weapon	Cadence Weapon	ALBUM	2018-01-19	2021-12-02 02:24:29.493	f	50	{}	https://music.apple.com/us/album/cadence-weapon/1298056400	https://cadenceweapon.bandcamp.com/album/cadence-weapon	\N	https://open.spotify.com/album/4Yx4gbcfNWPYOtNc1cKFP7	https://www.youtube.com/playlist?list=OLAK5uy_kIHgPiAXCFojRrMHOBuz_-tCMePVDLSws	t	2017 eOne Music
hope-in-dirt-city	Hope in Dirt City	ALBUM	2012-05-29	2021-12-02 02:28:03.599	f	14	{}	https://music.apple.com/us/album/hope-in-dirt-city/518893195	https://cadenceweapon.bandcamp.com/album/hope-in-dirt-city	\N	https://open.spotify.com/album/2BEm2koFtkq0NkoKKrIawB	https://www.youtube.com/playlist?list=OLAK5uy_kXw-2SQ0XiqrYou15kqZOBGdKFvwOIHkk	t	\N
breaking-kayfabe	Breaking Kayfabe	ALBUM	2005-12-06	2021-12-02 02:30:13.158	f	51	{}	https://music.apple.com/us/album/breaking-kayfabe/470120511	https://cadenceweapon.bandcamp.com/album/breaking-kayfabe	\N	https://open.spotify.com/album/0Qg9rHrz6wxU6NRj6pfBZg	https://www.youtube.com/playlist?list=OLAK5uy_nCuRsZKAxVMy_c50q_1JdlkjjfjzUIRrs	t	2005 Upper Class Recordings Inc. All Rights Reserved.
separation-anxiety	Separation Anxiety	EP	2009-01-20	2021-12-02 02:37:01.896	f	51	{}	https://music.apple.com/us/album/separation-anxiety-ep/303337362	https://cadenceweapon.bandcamp.com/album/separation-anxiety	\N	\N	\N	t	2009 Cadence Weapon
jackson-pollock-rap-version	Jackson Pollock (Rap Version)	SINGLE	2018-12-07	2021-12-02 02:31:42.017	f	51	{}	https://music.apple.com/us/album/jackson-pollock-rap-version-single/1444752018	https://cadenceweapon.bandcamp.com/track/jackson-pollock-rap-version	\N	https://open.spotify.com/track/6zeddnyiqybRB884QkZHdz	https://youtu.be/U5pOsgrTum0	t	\N
be-about	Be About	SINGLE	2018-06-08	2021-12-02 02:22:02.464	f	51	{}	https://music.apple.com/us/album/be-about-single/1388632827	https://cadenceweapon.bandcamp.com/track/be-about	\N	https://open.spotify.com/album/2BpTZvQuhvt0u1LfTZVNwX	https://youtu.be/s2CUZDU1HEQ	t	2018 eOne Music
cooler-returns	Cooler Returns	ALBUM	2021-01-22	2021-11-30 05:15:33.448	f	49	{}	https://music.apple.com/us/album/cooler-returns/1535535356	https://kiwijr.bandcamp.com/album/cooler-returns	https://soundcloud.com/kiwijr/sets/cooler-returns-1	https://open.spotify.com/album/3fyN7oZcsihhEcsjE1ovwg	https://www.youtube.com/playlist?list=OLAK5uy_moHOSDf3ZPXYr9cIx-b9Wdle7VF4h62xA	t	2021 Kiwi Jr.
football-money	Football Money	ALBUM	2019-03-29	2021-11-30 05:16:34.944	f	49	{}	https://music.apple.com/us/artist/kiwi-jr/1448309058	https://kiwijr.bandcamp.com/album/football-money	https://soundcloud.com/kiwijr/sets/football-money-1	https://open.spotify.com/album/36xiTMLlHVXR662eAkJwRo	https://www.youtube.com/playlist?list=OLAK5uy_lHn9jKbPk_kPf8CLAx3nEbVeIrWY5VJw0	t	2019 Mint Records Inc.
afterparty-babies	Afterparty Babies	ALBUM	2008-03-04	2021-12-02 02:28:57.802	f	14	{}	https://music.apple.com/us/album/afterparty-babies/1485020088	https://cadenceweapon.bandcamp.com/album/afterparty-babies	\N	https://open.spotify.com/album/2eor9A4SyU3FOrUpSglEA8	https://www.youtube.com/playlist?list=OLAK5uy_miWLjcXwQMiWvMBqdnkLRkIDYoaDRADbU	t	2008 Upper Class Recordings Inc.
inside-the-sun	Inside the Sun	ALBUM	2021-08-27	2021-11-25 04:53:20.031	f	54	{}	https://music.apple.com/us/album/inside-the-sun/1567959171	https://cometcontrol.bandcamp.com/album/inside-the-sun	https://soundcloud.com/cometcontrolofficial/sets/inside-the-sun-2	https://open.spotify.com/album/7JIS29ayzLmt66W8erm31U	\N	t	2021 Tee Pee Records
lucky-sue	Lucky Sue	SINGLE	2020-10-02	2021-12-05 03:25:43.208	f	17	{}	https://music.apple.com/us/album/lucky-sue-single/1533068735	https://menitrust.bandcamp.com/track/lucky-sue	https://soundcloud.com/men-i-trust/lucky-sue	https://open.spotify.com/track/4lAfXpZKFDEudiEzLB9uHm	https://youtu.be/zIGfy4BMvDg	t	\N
plain-view	Plain View	SINGLE	2016-12-12	2021-12-05 03:37:51.945	f	17	{}	https://music.apple.com/us/album/plain-view-single/1181704396	https://menitrust.bandcamp.com/track/plain-view	\N	https://open.spotify.com/track/3XkxqQ02BchQiJvC99GuDR	\N	t	2016 Men I Trust
lauren	Lauren	SINGLE	2016-06-13	2021-12-05 03:42:45.864	f	17	{}	https://music.apple.com/us/album/lauren-single/1122749911	https://menitrust.bandcamp.com/track/lauren	https://soundcloud.com/men-i-trust/lauren	https://open.spotify.com/album/3rlpbpAzZUayIquPKgqpfX	https://youtu.be/TNsSBhl_2LI	t	2016 Men I Trust
when-smoke-rises	When Smoke Rises	ALBUM	2021-05-28	2021-12-05 06:22:54.581	f	24	{}	https://music.apple.com/us/album/when-smoke-rises/1557495549	\N	https://soundcloud.com/mustafaregentparksongs/sets/when-smoke-rises-2	https://open.spotify.com/album/7rkN6aKoETjoXjtvOUCh0Z	https://www.youtube.com/playlist?list=OLAK5uy_mMYObAwlb1ZumsspxXtXb0hAYiOV138Ro	t	2021 Regent Park Songs
snapshot-of-a-beginner	Snapshot of a Beginner	ALBUM	2020-03-27	2021-12-11 19:24:18.74	f	18	{}	https://music.apple.com/us/album/snapshot-of-a-beginner/1491352055	https://napeyes.bandcamp.com/album/snapshot-of-a-beginner	https://soundcloud.com/napeyes/sets/snapshot-of-a-beginner	https://open.spotify.com/album/6nwyUwe1dsdPSwHR3OXLqB	https://www.youtube.com/playlist?list=OLAK5uy_n537Ghg1xw3gW0-i2VTRS8JBke-0FaIPA	t	2020 Royal Mountain Records
im-bad-now	I'm Bad Now	ALBUM	2018-03-09	2021-12-11 19:29:27.538	f	18	{}	https://music.apple.com/us/album/im-bad-now/1322075004	https://napeyes.bandcamp.com/album/im-bad-now	\N	https://open.spotify.com/album/3VousideqvXGhqJYW2NjJE	https://www.youtube.com/playlist?list=OLAK5uy_nrVfKgKMtQoeUmiEmzaElZjoDqzV-wStY	t	2018 Nap Eyes
thought-rock-fish-scale	Thought Rock Fish Scale	ALBUM	2016-02-05	2021-12-11 19:33:18.404	f	18	{}	https://music.apple.com/us/album/thought-rock-fish-scale/1058442966	https://napeyes.bandcamp.com/album/thought-rock-fish-scale	\N	https://open.spotify.com/album/34cwuSIixiG2KlbKbA3Nas	https://www.youtube.com/playlist?list=OLAK5uy_kBsU6FmTwBMuquNz-LjEATXpRQmGKPTyE	t	2016 Nap Eyes
whine-of-the-mystic	Whine of the Mystic	ALBUM	2015-07-10	2021-12-11 19:31:39.294	f	18	{}	https://music.apple.com/us/album/whine-of-the-mystic/986966264	https://napeyes.bandcamp.com/album/whine-of-the-mystic-2	\N	https://open.spotify.com/album/4OmkQuC8Cehcx5M1FELOBZ	https://www.youtube.com/playlist?list=OLAK5uy_n0vSC871WegPq1KWKQPFZQJ4D3Og0EgTM	t	2015 Nap Eyes
when-i-come-around-ep	When I come Around - EP	EP	2021-05-14	2021-12-11 19:35:01.342	f	18	{}	https://music.apple.com/us/album/when-i-come-around-ep/1562692634	https://napeyes.bandcamp.com/album/when-i-come-around-ep	https://soundcloud.com/napeyes/sets/when-i-come-around-ep	https://open.spotify.com/album/15FGfyBSRsWOxxpxrBwpi7	https://www.youtube.com/playlist?list=OLAK5uy_nNHfPZxKWzCTrqyoVtC1zWv8_oNjYoG9M	t	2021 Royal Mountain Records
waska-matisiwin	Waska Matisiwin	ALBUM	2021-04-30	2021-12-11 19:14:57.68	f	53	{}	https://music.apple.com/us/album/waska-matisiwin/1561046809	https://lauraniquay.bandcamp.com/album/waska-matisiwin	https://soundcloud.com/lauraniquay/sets/waska-matisiwin	https://open.spotify.com/album/0Tm5Exm8H4m2L1HoojSWBG	https://www.youtube.com/playlist?list=OLAK5uy_n51jhfRXqdczEsVJdV9STM8QBuKCzHL0Q	t	2021 Musique Nomade
mote-mote	Mote Mote	SINGLE	2019-05-03	2021-12-11 19:18:54.954	f	53	{}	https://music.apple.com/us/album/mote-mote-single/1459941693	\N	\N	https://open.spotify.com/album/7wc1kV6sz0Mluzp106GzoY	https://youtu.be/QL0fOcHhifA	t	2018 Musique nomade
no-dust	No Dust	OTHER	2013-01-01	2021-12-05 05:21:15.458	f	48	{}	\N	https://chadvangaalen.bandcamp.com/album/no-dust	\N	\N	\N	t	\N
waratanak	Waratanak	ALBUM	2018-08-06	2021-12-11 19:16:44.878	f	53	{}	https://music.apple.com/us/album/waratanak/1439924558	https://lauraniquay.bandcamp.com/album/waratanak	\N	https://open.spotify.com/album/0ZIUhHSUB2HxuniUEod3Id	https://www.youtube.com/playlist?list=OLAK5uy_l_MQG4pl8k9f-8MSyiqMnRNmWJoO8hUDY	t	Musique nomade
swim	Swim	SINGLE	2016-03-21	2021-11-23 04:09:35.21	f	42	{}	\N	https://blessedband.bandcamp.com/track/swim	\N	https://open.spotify.com/track/4KCl0m4wL2A7G8dYmGcE12	https://youtu.be/PsajXVFBZ5w	t	2016 Kingfisher Bluez
here-now-timewave-zero	Here & Now / Timewave Zero	SINGLE	2016-08-03	2021-12-15 01:31:46.255	t	22	{}	https://music.apple.com/us/album/here-now-timewave-zero-single/1310851374	https://badbadnotgoodofficial.bandcamp.com/album/timewave-zero-b-w-here-now	https://soundcloud.com/badbadnotgood/here-and-now	https://open.spotify.com/album/0yQIm2aUcWnm8MswC8fI8Z	\N	t	2016 BADBADNOTGOOD LTD Under exclusive license to Arts & Crafts Productions Inc.
blood-river	Blood River	SINGLE	2020-10-15	2021-12-11 19:40:32.323	f	18	{NNAMDI}	https://music.apple.com/us/album/blood-river-single/1533464395	https://napeyes.bandcamp.com/track/blood-river-ft-nnamdi	https://soundcloud.com/napeyes/blood-river	https://open.spotify.com/track/2S1hcjqPs8CpvK1dWpBhxe	https://youtu.be/vsAd7ITt51c	t	\N
snake-oil-childs-romance	Snake Oil / Child's Romance	SINGLE	2020-08-27	2021-12-11 19:42:52.044	f	18	{}	https://music.apple.com/us/album/snake-oil-childs-romance-single/1525795019	https://napeyes.bandcamp.com/album/snake-oil-childs-romance	https://soundcloud.com/napeyes/sets/snake-oil-b-w-childs-romance	https://open.spotify.com/album/5wp2MHpEd7l2ccB59SpPa0	https://www.youtube.com/playlist?list=OLAK5uy_mSrKHq4tgg6F4C0la0QxCfwy9R-qrBL24	t	2020 Royal Mountain Records
aquarium-drunkards-lagniappe-session	Aquarium Drunkard’s Lagniappe Session	SINGLE	2020-06-09	2021-12-11 19:44:32.446	f	18	{}	https://music.apple.com/us/album/aquarium-drunkards-lagniappe-session-single/1514100161	https://napeyes.bandcamp.com/album/aquarium-drunkard-s-lagniappe-session	https://soundcloud.com/napeyes/sets/aquarium-drunkards-397420156	https://open.spotify.com/album/5saw4XcA8M46Uf3xO24Czk	https://www.youtube.com/playlist?list=OLAK5uy_lKlqME8HATMfn9bg94wgOVPWIouGKhNVc	t	2020 Jagjaguwar
too-bad	Too Bad	SINGLE	2018-11-02	2021-12-11 19:46:44.781	f	18	{}	https://music.apple.com/us/album/too-bad-single/1438970536	https://napeyes.bandcamp.com/album/too-bad	\N	https://open.spotify.com/album/0oyd2L3XwWMSpfm5DatqVK	\N	t	2018 Nap Eyes
house-music	House Music	ALBUM	2021-03-19	2021-12-15 02:18:05.452	t	41	{}	https://music.apple.com/us/album/house-music/1544364403	https://bellorchestre.bandcamp.com/album/house-music	https://soundcloud.com/bellorchestre/sets/house-music-882109990	https://open.spotify.com/album/2WJQfOY8wCM012nVHcfURF	https://www.youtube.com/playlist?list=OLAK5uy_laArn94ePDu80KlARyopmZW6Mnd4QPCuU	t	2021 Erased Tapes Records Ltd.
angels-of-death	Angels of Death	ALBUM	2018-05-18	2021-11-16 04:12:39.33	f	33	{}	https://music.apple.com/us/album/angels-of-death/1343922414	https://jennifercastle.bandcamp.com/album/angels-of-death	https://soundcloud.com/jennifercastle/sets/angels-of-death-2	https://open.spotify.com/album/3cQYjg0yl9xQNnrXVS7tMP	https://www.youtube.com/playlist?list=OLAK5uy_nqp15_tL4BT8VF0LqWB3rtWuTQ_GYSzZ0	t	2018 Idee Fixe Records
illusion-doubt	Illusion & Doubt	ALBUM	2016-11-18	2021-12-15 01:26:53.746	f	3	{}	https://music.apple.com/us/album/illusion-doubt/1390164099	https://thedeadsouth.bandcamp.com/album/illusion-doubt	https://soundcloud.com/the-dead-south/sets/illusion-and-doubt	https://open.spotify.com/album/2MWYyYOXojNHtiMkYyshCE	https://www.youtube.com/playlist?list=OLAK5uy_lT_P9phbg4uWf2eKT7zCqWiJchW3Wp6jc	t	2018 Six Shooter Records Inc.
lala	LALA	SINGLE	2019-11-22	2021-12-12 05:29:36.537	f	16	{}	https://music.apple.com/us/album/lala-single/1487269755	https://nobro.bandcamp.com/album/lala	\N	https://open.spotify.com/track/6mcfn8HmK3JMQiRC1af0zF	https://youtu.be/p6r1g7X7L6E	t	2019 NOBRO under exclusive license to Dine Alone Music Inc.
sugar-joy	Sugar & Joy	ALBUM	2019-10-11	2021-12-15 01:24:05.169	f	11	{}	https://music.apple.com/us/album/sugar-joy/1466883659	https://thedeadsouth.bandcamp.com/album/sugar-joy	https://soundcloud.com/the-dead-south/sets/sugar-joy-1	https://open.spotify.com/album/122hoBSgL0aLSnoHyyD93i	https://www.youtube.com/playlist?list=OLAK5uy_nxv1oi5KNLsyBfKgihekLwEbvw6ffetqM	t	2019 Six Shooter Records Inc.
mongoose	Mongoose	SINGLE	2019-03-08	2021-12-12 05:28:11.851	f	16	{}	https://music.apple.com/us/album/mongoose-single/1455705368	\N	\N	https://open.spotify.com/track/0qRZdVs12uQncsD18QECjb	https://youtu.be/iHoq62e_TE8	t	2019 1132013 Records DK
the-kids-are-back	The Kids Are Back	SINGLE	2018-05-10	2021-12-12 05:26:50.929	f	16	{}	https://music.apple.com/us/album/the-kids-are-back-single/1453811469	\N	https://soundcloud.com/nobromusic/the-kids-are-back	https://open.spotify.com/track/0GZ474QHXlXcyhFaL6SoyJ	https://youtu.be/lXhaTV2gLWU	t	2019 1132013 Records DK
jazz-engage	Jazz engagé	ALBUM	2019-11-01	2022-01-26 01:37:33.288	f	18	{}	https://music.apple.com/us/album/jazz-engag%C3%A9/1482032499	https://chocolatmtl.bandcamp.com/album/jazz-engag	\N	https://open.spotify.com/album/6tw2d8ukWN6FHzF9u2DF3L	https://www.youtube.com/playlist?list=OLAK5uy_mJVc6rffyTb1VBJhWJijhrO18tO3fXrqc	t	2019 Bravo musique
musk-ox-re-release	Musk Ox Re​-​release	ALBUM	2009-02-03	2021-11-14 04:29:17.449	t	20	{}	https://music.apple.com/us/album/musk-ox/1566659859	https://muskoxofficial.bandcamp.com/album/musk-ox-re-release	\N	https://open.spotify.com/album/3Abz8LahxC01FtuG6MXWEp	https://www.youtube.com/playlist?list=OLAK5uy_k2A51Q4wdGU3wBELkfFCecYG7vVOVzr84	t	2021 Anamnesis Arts
tss-tss	Tss Tss	ALBUM	2014-10-21	2022-01-26 01:40:46.973	f	38	{}	https://music.apple.com/us/album/tss-tss/923281576	https://chocolatmtl.bandcamp.com/album/tss-tss	\N	https://open.spotify.com/album/5DyhaAOLV66TK6WbzLWZhv	https://youtube.com/playlist?list=OLAK5uy_lSjwbFS0bEvd1bxlY-f7z4b40Xm1lv8k4	t	2014 Grosse Boîte
rencontrer-looloo	Rencontrer Looloo	ALBUM	2016-11-11	2022-01-26 01:44:02.285	f	38	{}	https://music.apple.com/us/album/rencontrer-looloo/1151908000	https://chocolatmtl.bandcamp.com/album/rencontrer-looloo	\N	https://open.spotify.com/album/5p5o5lAkjxOMk6wPHgtfrP	https://youtube.com/playlist?list=OLAK5uy_m2a6ItIA0-iVCRmpPnMV7ZRyjf7mZDP7I	t	2016 Teenage Menopause Records
piano-elegant	Piano élégant	ALBUM	2008-03-18	2022-01-26 01:46:13.102	f	18	{}	https://music.apple.com/us/album/piano-%C3%A9l%C3%A9gant/627075826	https://chocolatmtl.bandcamp.com/album/piano-l-gant	\N	https://open.spotify.com/album/3imZbiMys7dwmBRaVneiUp	https://www.youtube.com/playlist?list=OLAK5uy_nheeMtbs-z0miPXvaBqC-mtSC7S5LznYQ	t	Dare To Care Records
chocolat	Chocolat	EP	2007-03-06	2022-01-26 01:48:00.387	f	38	{}	https://music.apple.com/us/album/chocolat/1399869593	https://chocolatmtl.bandcamp.com/album/ep	\N	https://open.spotify.com/album/6BxYfMmusCR2tKsuWZ63tg	https://www.youtube.com/playlist?list=OLAK5uy_nL_i-rL_XjMbCfLOhqwVHC_6_RW993S-A	t	2007 Bravo musique
my-sunshine	My Sunshine	ALBUM	2021-10-08	2021-11-21 06:08:26.372	f	32	{}	https://music.apple.com/us/album/my-sunshine/1584083365	https://darrylkissick.bandcamp.com/album/my-sunshine	https://soundcloud.com/user-156767294/sets/my-sunshine	https://open.spotify.com/album/0FnIEELJGko1sBeq9uBhLV	https://www.youtube.com/playlist?list=OLAK5uy_k_HMu2KIdJKMm6k7PodjQOpAR3iETfnII	t	2021 654833 Records DK
escalator-teeth-on-and-on	Escalator Teeth/On and On	SINGLE	2018-09-27	2022-02-07 23:38:24.426	f	15	{}	https://music.apple.com/us/album/escalator-teeth-on-and-on-single/1436357844	https://metz.bandcamp.com/album/escalator-teeth-on-and-on	\N	https://open.spotify.com/album/1DMdH5iSwMVnKJZ1HhsUCH	\N	t	2018 Royal Mountain Records
dirty-shirt	Dirty Shirt	SINGLE	2012-10-09	2021-11-12 22:01:27.19	f	15	{}	https://music.apple.com/us/album/dirty-shirt-single/579093364	https://metz.bandcamp.com/album/dirty-shirt	https://soundcloud.com/metztheband/sets/dirty-shirt-2	https://open.spotify.com/album/7H8PUR3PNQb49uJyiDBmW5	\N	t	2012 Sub Pop Records
jams-ep	jams EP	EP	2021-02-05	2021-11-13 15:46:10.159	t	1	{}	https://music.apple.com/us/album/jams-ep/1547672519	https://lunali.bandcamp.com/album/jams-ep	https://soundcloud.com/lunaliband/sets/jams-ep-1	https://open.spotify.com/album/2jYVeHLlyPSV5DiRMILSmC	https://www.youtube.com/playlist?list=OLAK5uy_nyCR2YNgoaxyENwd6BCtMQDl6ZEC9PqTE	t	2021 Luna Li Music, Inc.
come-running-to-me	Come Running to Me	SINGLE	2022-01-21	2022-01-23 00:49:32.112	f	35	{}	https://music.apple.com/us/album/come-running-to-me-single/1600421253	https://anomaliebeats.bandcamp.com/track/come-running-to-me	\N	https://open.spotify.com/track/1RSVmoikDpX0PtpxNGXxyF	https://youtu.be/Vk34HnVAMO4	t	2022 Anomalie under exclusive license to Nettwerk Music Group Inc.
satan-jacob-rose	Satan / Jacob Rose	SINGLE	2022-02-07	2022-02-07 23:20:06.303	f	33	{}	https://music.apple.com/us/album/satan-jacob-rose-single/1606833991	https://andyshauf.bandcamp.com/album/satan-jacob-rose	https://soundcloud.com/andyshauf/sets/satan-jacob-rose-1	https://open.spotify.com/album/5pryPQr48Emi38L8bGqsN6	https://youtube.com/playlist?list=OLAK5uy_k51G2jpwjRLkmMnvbnlAL45W3PVQf9PgA	t	2022 Andy Shauf under exclusive license to Arts & Crafts Productions Inc.
forget-your-own-face	Forget Your Own Face	ALBUM	2022-02-14	2022-02-15 06:11:27.425	f	26	{}	\N	https://blackdresses.bandcamp.com/album/forget-your-own-face	\N	\N	\N	t	\N
all-lights-fucked-on-the-hairy-amp-drooling	all lights fucked on the hairy amp drooling	OTHER	2022-02-14	2022-02-15 06:17:45.352	t	41	{}	\N	https://godspeedyoublackemperor.bandcamp.com/album/all-lights-fucked-on-the-hairy-amp-drooling	\N	\N	\N	t	\N
sick-hustle	Sick Hustle	EP	2020-04-17	2021-12-12 05:25:20.192	f	16	{}	https://music.apple.com/us/album/sick-hustle-ep/1493873544	https://nobro.bandcamp.com/album/sick-hustle	\N	https://open.spotify.com/album/0SoBXo7nuRAT4kuTX9fdeF	https://www.youtube.com/playlist?list=OLAK5uy_kadY4MrUrEHF6FKoEDr45HMhe1J3tLor4	t	2020 NOBRO under exclusive license to Dine Alone Music Inc.
what-am-i-going-to-do-with-everything-i-know	What Am I Going to Do with Everything I Know	EP	2014-10-14	2021-11-14 19:28:55.337	f	28	{}	https://music.apple.com/us/album/what-am-i-going-to-do-with-everything-i-know-ep/1542637980	https://theweatherstation.bandcamp.com/album/what-am-i-going-to-do-with-everything-i-know	https://soundcloud.com/the-weather-station/sets/what-am-i-going-to-do-with	https://open.spotify.com/album/5j2h8QIWLza3Ol1Xof3usu	https://www.youtube.com/playlist?list=OLAK5uy_l38MI_Ju-TY3nsfn1e40xRSDP5Fw7r0Tc	t	2014 Fat Possum Records
dribble	Dribble	SINGLE	2021-12-10	2021-12-11 07:40:07.183	t	35	{}	https://music.apple.com/us/album/dribble-single/1594472900	https://anomaliebeats.bandcamp.com/track/dribble	https://soundcloud.com/anomaliebeats/dribble	https://open.spotify.com/track/3HEJptfJ3taABLi2klHspp	https://youtu.be/QLDeUebGpfQ	t	2021 Anomalie under exclusive license to Nettwerk Music Group Inc.
bend-the-rules	Bend The Rules	EP	2020-12-02	2021-11-17 02:21:11.225	f	34	{Chromeo}	https://music.apple.com/us/album/bend-the-rules-ep/1540363851	https://anomaliebeats.bandcamp.com/album/bend-the-rules-ep	https://soundcloud.com/anomaliebeats/sets/anomalie-chromeo-bend-the	https://open.spotify.com/album/35Vp5J1OcWptPU2iisnVV9	https://www.youtube.com/playlist?list=PL2NORulmbo2uF_-rTE7dFWk3RRvSkeNgD	t	2020 Juliet Records / Last Gang Records Inc.
wilds	Wilds	ALBUM	2021-09-24	2021-11-21 04:49:41.426	f	33	{}	https://music.apple.com/us/album/wilds/1583063014	https://andyshauf.bandcamp.com/album/wilds	https://soundcloud.com/andyshauf/sets/wilds-3	https://open.spotify.com/album/5NR2AbSSCSDnh9G1UGvVUZ	https://www.youtube.com/playlist?list=PLJ7QPuvv91JuPr5gvB9NiEwquKaRUWdZJ	t	2021 Andy Shauf under exclusive license to Arts & Crafts Productions Inc.
the-neon-skyline	The Neon Skyline	ALBUM	2020-01-24	2021-11-21 05:42:54.47	f	33	{}	https://music.apple.com/us/album/the-neon-skyline/1482623827	https://andyshauf.bandcamp.com/album/the-neon-skyline	\N	https://open.spotify.com/album/2Bw5SFzC3f5CqD5xGSTtRW	https://www.youtube.com/playlist?list=OLAK5uy_nD54W2nKy_PTR2YMTx4BQ5qetNn_fdzt0	t	2019 Andy Shauf under exclusive license to Arts & Crafts Productions Inc.
i-tried-to-wear-the-world	I Tried to Wear the World	SINGLE	2018-10-18	2022-02-08 00:48:28.856	f	28	{}	https://music.apple.com/us/album/i-tried-to-wear-the-world-feat-jennifer-castle/1436985375?i=1436985380	https://theweatherstationjennifercastle.bandcamp.com/track/i-tried-to-wear-the-world-feat-jennifer-castle	\N	https://open.spotify.com/track/1IHV2redNieb9ebJVJuSYp	https://youtu.be/2SEl6HL9JKE	t	2018 Outside Music
bond	Bond	SINGLE	2021-11-05	2021-11-17 02:24:46.728	t	35	{}	https://music.apple.com/us/album/bond-single/1588241127	https://anomaliebeats.bandcamp.com/track/bond	https://soundcloud.com/anomaliebeats/bond	https://open.spotify.com/track/2xTCPar5DbmOnyLlkz9oAY	https://youtu.be/HyFmjuTWpIc	t	2021 Anomalie under exclusive license to Nettwerk Music Group Inc.
odyssee	Odyssée	SINGLE	2016-04-22	2021-11-17 01:46:59.286	t	35	{}	https://music.apple.com/us/album/odyss%C3%A9e-single/1519889916	https://anomaliebeats.bandcamp.com/album/odyss-e	https://soundcloud.com/anomaliebeats/odyssee	https://open.spotify.com/track/5eYuwdQzr0D4NuPV3mYQLT	https://youtu.be/CPdAK4VhwKA	t	2016 Lowtemp
the-ocean-went-mad-and-we-were-to-blame	The Ocean Went Mad and We Were to Blame	EP	2013-06-29	2021-11-11 14:58:27.988	f	3	{}	https://music.apple.com/us/album/the-ocean-went-mad-and-we-were-to-blame-ep/668262399	https://thedeadsouth.bandcamp.com/album/the-ocean-went-mad-and-we-were-to-blame	https://soundcloud.com/the-dead-south/sets/the-ocean-went-mad-and-we-were	https://open.spotify.com/album/19wNh9yNFsxbFdhgzvigWv	https://www.youtube.com/playlist?list=OLAK5uy_k_NPwF_fyXJfaWz1-unqqBcrO_phglbLU	t	2013 The Dead South
waiting-for-the-sun-to-leave	Waiting For The Sun To Leave	ALBUM	2010-09-28	2021-11-21 05:53:19.811	f	33	{}	https://music.apple.com/us/album/waiting-for-the-sun-to-leave/488192962	\N	https://soundcloud.com/andyshauf/sets/waiting-for-the-sun-to-leave	https://open.spotify.com/album/5Z681qcsr8bNq7InUcxzyq	https://www.youtube.com/playlist?list=OLAK5uy_ldWojeaTQ4ZR2MJCuRiJ-lkQzRqCGtzn0	t	2010 Hopeless Records, Inc.
atlas-vending	Atlas Vending	ALBUM	2020-10-09	2021-11-12 21:53:38.628	f	15	{}	https://music.apple.com/us/album/atlas-vending/1519868188	https://metz.bandcamp.com/album/atlas-vending	https://soundcloud.com/metztheband/sets/atlas-vending-1	https://open.spotify.com/album/2lXXwhfcjzfFZJuYpNcl6r	https://www.youtube.com/playlist?list=OLAK5uy_kxjPMkza8M6oFRMT_ScNw9L-g816dt0Kk	t	2020 Royal Mountain Records
the-green-corridor-series-02	The Green Corridor Series #02	ALBUM	2012-03-27	2021-11-24 04:39:01.874	f	44	{"Xiu Xiu"}	https://music.apple.com/us/album/the-green-corridor-series-02/564770034	https://altinvillage.bandcamp.com/album/the-green-corridor-2	\N	https://open.spotify.com/album/52kb5xudbjpq6HbGWuxWsK	https://www.youtube.com/playlist?list=OLAK5uy_kKpY9LLOYAqo6CDQY-yZ87chr7nG877jI	t	2012 Altin Village & Mine
ignorance	Ignorance	ALBUM	2021-02-05	2021-11-14 19:10:44.806	f	27	{}	https://music.apple.com/us/album/ignorance/1524055739	https://theweatherstation.bandcamp.com/album/ignorance	https://soundcloud.com/the-weather-station/sets/ignorance-301686269	https://open.spotify.com/album/0121OEsqJiU2tlOh6gvlH3	https://www.youtube.com/playlist?list=OLAK5uy_lnAPEik4JPrPijAeTYCcdyn7cByjY5W-4	t	2020 Next Door Records
god-has-nothing-to-do-with-this-leave-him-out-of-it	God Has Nothing To Do With This Leave Him Out Of It	ALBUM	2020-05-28	2021-11-19 03:22:57.001	f	37	{}	\N	https://backxwash.bandcamp.com/album/god-has-nothing-to-do-with-this-leave-him-out-of-it	https://soundcloud.com/backxwash/sets/god-has-nothing-to-do-with	\N	\N	t	2020 Grimalkin
dig-yourself-a-grave	Dig Yourself a Grave	SINGLE	2022-01-28	2022-02-10 03:32:41.794	f	37	{"Andy Morin"}	https://music.apple.com/us/album/dig-yourself-a-grave-single/1607742981	\N	https://soundcloud.com/a2b2_records/andy-morin-backxwash-dig-yourself-a-grave	https://open.spotify.com/track/4XVj8nilkbKcrnL9kRF5k7	https://youtu.be/u9BkT_yDW8o	t	2022 A2B2 Records
once-more-with-feeling	Once More With Feeling...	EP	2014-10-28	2021-11-11 06:06:20.069	f	2	{}	https://music.apple.com/us/album/once-more-with-feeling-ep/910718417	https://ought.bandcamp.com/album/once-more-with-feeling-ep	https://soundcloud.com/oughtofficial/sets/once-more-with-feeling-3	https://open.spotify.com/album/2JFoSALYdxG8eX4p1XODb9	https://www.youtube.com/playlist?list=OLAK5uy_m0At9DuzpkR30CqfE2MwjPc7Oxki3Po18	t	2014 Constellation
talk-memory	Talk Memory	ALBUM	2021-10-08	2021-11-14 06:13:09.597	t	22	{}	https://music.apple.com/us/album/talk-memory/1573107489	https://badbadnotgoodofficial.bandcamp.com/album/talk-memory	\N	https://open.spotify.com/album/0OD57XYiJ2si5Eg4dtSFRB	https://www.youtube.com/playlist?list=OLAK5uy_mHcEbHVBT20q11ZiSDWv92QzJBvIjngSg	t	2021 XL Recordings Ltd. / Innovative Leisure 
odonis-odonis-on-audiotree-live	Odonis Odonis on Audiotree Live	LIVE	2019-05-06	2021-11-20 01:21:42.885	f	26	{}	https://music.apple.com/us/album/odonis-odonis-on-audiotree-live-ep/1460433989	https://audiotree.bandcamp.com/album/odonis-odonis-on-audiotree-live	\N	https://open.spotify.com/album/0RtEQVbFi4rSsnwCLXcwSk	https://youtube.com/playlist?list=PLunIrIqYqs78eeYYokLy1Q8IPrrc2URXb	t	2019 Odonis Odonis
sour-soul-instrumentals	Sour Soul Instrumentals	ALBUM	2015-02-24	2021-11-14 05:12:15.209	t	22	{"Ghostface Killah"}	https://music.apple.com/us/album/sour-soul-instrumentals/1601482538	https://badbadnotgoodofficial.bandcamp.com/album/sour-soul-instrumentals	\N	\N	\N	t	2015 Lex Records
we-are-children-of-the-light	We Are Children Of The Light	SINGLE	2021-12-12	2022-02-15 06:15:04.332	f	26	{}	https://music.apple.com/us/album/we-are-children-of-the-light-single/1600455125	\N	\N	https://open.spotify.com/track/7uNrG8Shcu3ixhrTN1MR4q	https://youtu.be/lvlIRvmv1zs	t	2021 Blacksquares Media
how-is-it-that-i-should-look-at-the-stars	How Is It That I Should Look At The Stars	ALBUM	2022-03-04	2022-03-28 01:07:55.966	f	27	{}	https://music.apple.com/us/album/how-is-it-that-i-should-look-at-the-stars/1590918444	https://theweatherstation.bandcamp.com/album/how-is-it-that-i-should-look-at-the-stars	\N	https://open.spotify.com/album/6GgHy26g1ILOtU9hkrHbLb	https://www.youtube.com/playlist?list=OLAK5uy_l1M24SJa6q34D1F591AhSHn42Ddw-ytNE	t	2022 Next Door Records
duality	Duality	ALBUM	2022-03-04	2022-03-28 01:16:26.702	f	1	{}	https://music.apple.com/us/album/duality/1598958658	https://lunali.bandcamp.com/album/duality	\N	https://open.spotify.com/album/2T2LSGT5K9mw9miI1CQB5B	https://www.youtube.com/playlist?list=OLAK5uy_lFd6OaRPct-3aTvftQ6Mdev1BBRpkpQoM	t	2022 Luna Li Music, Inc.
open-channels	Open Channels	SINGLE	2022-03-02	2022-03-28 01:59:08.736	t	22	{}	https://music.apple.com/us/album/open-channels-single/1609183262	\N	\N	https://open.spotify.com/track/6Qd4Jb3zUFzQ37d2nfxFEV	https://youtu.be/3bS2ArAmQ8c	t	\N
let-it-burn	Let it Burn	SINGLE	2022-03-10	2022-03-28 02:01:59.105	f	32	{}	https://music.apple.com/us/album/let-it-burn-single/1609867297	https://darrylkissick.bandcamp.com/album/let-it-burn	\N	https://open.spotify.com/track/2nRmpHE26QmGZCUm7Yn7KL	\N	t	2022 654833 Records DK
live-your-truth-shred-some-gnar	Live Your Truth Shred Some Gnar	ALBUM	2022-02-23	2022-03-28 05:21:00.527	f	16	{}	https://music.apple.com/us/album/live-your-truth-shred-some-gnar/1584005032	https://nobro.bandcamp.com/album/live-your-truth-shred-some-gnar	\N	https://open.spotify.com/album/5Ae3xDGRamEFOSmzdtPGGv	https://youtube.com/playlist?list=OLAK5uy_ns8Te16zTeCg4xmsaGGkU7Y65_bPHK8MM	t	2022 NOBRO under exclusive license to Dine Alone Music Inc.
so-excited	So Excited	SINGLE	2022-02-22	2022-03-28 05:27:12.674	f	2	{}	https://music.apple.com/us/album/so-excited/1601143720?i=1601143722	https://bandcola.bandcamp.com/track/so-excited	\N	https://open.spotify.com/track/23w8OHNRRcV4fypBEUm7NC	https://youtu.be/uAesPEZlAEo	t	2022 Next Door Records
split	Split	SINGLE	2022-03-04	2022-03-28 05:30:42.532	f	15	{"Adulkt Life"}	https://music.apple.com/us/album/split-single/1609228569	https://metz.bandcamp.com/album/metz-adulkt-life	\N	https://open.spotify.com/album/1YLyhJErfeiIZBeeWq6ZHD	https://youtu.be/-w4Puy4q8h0	t	2022 What's Your Rupture? Metz Appear Courtesy of Sub Pop
easy-listening-for-jerks-pt-1	Easy Listening for Jerks, Pt. 1	EP	2022-03-04	2022-03-28 05:37:54.804	f	11	{}	https://music.apple.com/us/album/easy-listening-for-jerks-pt-1-ep/1584437249	https://thedeadsouth.bandcamp.com/album/easy-listening-for-jerks-pt-1	\N	https://open.spotify.com/album/0WGthoOCZMnLHNQDIU02tw	https://youtube.com/playlist?list=PLpTYrvO29m2MMwnPyNvZAmlGHvIK19Y5D	t	2021 Six Shooter Records Inc.
parallel-world-deluxe-edition	Parallel World (Deluxe Edition)	DELUXE	2022-03-25	2022-03-28 05:33:02.828	f	51	{}	https://music.apple.com/us/album/parallel-world-deluxe-edition/1597866791	https://cadenceweapon.bandcamp.com/album/parallel-world-remixes	\N	https://open.spotify.com/album/0PeRkG0U2RckOC9OOSwiAi	\N	t	2021 MNRK Music Group
easy-listening-for-jerks-pt-2	Easy Listening for Jerks, Pt. 2	EP	2022-03-04	2022-03-28 05:40:37.383	f	11	{}	https://music.apple.com/us/album/easy-listening-for-jerks-pt-2/1590944484	https://thedeadsouth.bandcamp.com/album/easy-listening-for-jerks-pt-2	\N	https://open.spotify.com/album/5CsjHKt09ww1QB5xW78JbI	https://youtube.com/playlist?list=PLpTYrvO29m2OwJWWUa1e8K5bPcMernmiM	t	2021 Six Shooter Records Inc.
memory-leaves	Memory Leaves	SINGLE	2022-02-18	2022-03-28 05:48:09.968	f	23	{Masego}	https://music.apple.com/us/album/memory-leaves-feat-masego-single/1608162134	https://anomaliebeats.bandcamp.com/track/memory-leaves-feat-masego	\N	https://open.spotify.com/track/4LprWT4OjEawpeh8WeDE8W	https://youtu.be/yuTw6UYc4cM	t	2022 Anomalie under exclusive license to Nettwerk Music Group Inc.
hummingbird	Hummingbird	SINGLE	2022-03-25	2022-03-28 05:51:11.483	t	35	{"Bad Snacks"}	https://music.apple.com/us/album/hummingbird-feat-bad-snacks/1610308402	https://anomaliebeats.bandcamp.com/track/hummingbird-feat-bad-snacks	\N	https://open.spotify.com/track/4I0KjYxuQtNov6MHuuL6zt	https://youtu.be/L0F6YVQY-Kg	t	2022 Anomalie under exclusive license to Nettwerk Music Group Inc.
nth-2	NTH 2	OTHER	2022-02-04	2022-03-28 05:54:00.883	t	46	{}	\N	https://chadvangaalen.bandcamp.com/album/nth-2	\N	\N	\N	t	\N
angst-in-my-pants	Angst In My Pants	SINGLE	2021-06-16	2022-03-29 06:17:36.668	f	55	{}	https://music.apple.com/us/album/angst-in-my-pants-single/1570500001	https://artdecco.bandcamp.com/track/angst-in-my-pants-sparks-cover	\N	https://open.spotify.com/track/3qG5kyeeEPMX2OZ9CWON3c	https://youtu.be/bnM4-5L9igg	t	2021 Paper Bag Records
palm-slave	Palm Slave	SINGLE	2022-03-09	2022-03-29 06:15:02.207	f	55	{}	https://music.apple.com/us/album/palm-slave-single/1611384868	https://artdecco.bandcamp.com/track/palm-slave	\N	https://open.spotify.com/track/7HW7f73FNzMv4E5XJe86qs	https://youtu.be/g9EgXiw2IyQ	t	2022 Paper Bag Records
thats-entertainment	That's Entertainment	SINGLE	2021-05-19	2022-03-29 06:23:26.066	f	56	{}	https://music.apple.com/us/album/thats-entertainment-single/1565838007	https://artdecco.bandcamp.com/track/thats-entertainment	\N	https://open.spotify.com/track/7272MuFL7TEWdDd7GhHFaR	https://youtu.be/-unX1apcj9s	t	2021 Paper Bag Records
in-standard-definition	In Standard Definition	ALBUM	2021-04-23	2022-03-29 06:26:56.854	f	57	{}	https://music.apple.com/us/album/in-standard-definition/1542838211	https://artdecco.bandcamp.com/album/in-standard-definition	\N	https://open.spotify.com/album/1ACpj2XQ2dsTQ1fZsAEYiq	https://youtube.com/playlist?list=PL1BS70vPwk2D-DYusPLq9Tfm4x3k6bhzb	t	2021 Paper Bag Records
ill-never-give-you-up	I'll Never Give You Up	SINGLE	2020-01-17	2022-03-29 06:31:33.24	f	55	{}	https://music.apple.com/us/album/ill-never-give-you-up-single/1490041140	https://artdecco.bandcamp.com/track/ill-never-give-you-up	\N	https://open.spotify.com/track/5HVNkMlnHAEgtzPYNDjBRn	https://youtu.be/Vz0egwWKi_U	t	2020 Paper Bag Records
trespasser	Trespasser	ALBUM	2018-10-12	2022-03-29 06:33:48.885	f	55	{}	https://music.apple.com/us/album/trespasser/1391337577	https://artdecco.bandcamp.com/album/trespasser	\N	https://open.spotify.com/album/6fepVllxygbvcwGrc01sRO	https://youtube.com/playlist?list=PL1BS70vPwk2BaeAe4Y1JTPE5VxssQ5F5W	t	2018 Paper Bag Records
this-flight-tonight	This Flight Tonight	SINGLE	2019-07-23	2022-03-29 06:37:14.223	f	55	{}	https://music.apple.com/us/album/this-flight-tonight-single/1472140053	\N	\N	https://open.spotify.com/track/7FnzuFKoX8hZO0lMdWB2lx?si=89851b61f43b4b93	https://youtu.be/VCz0izFo7As	t	2019 Paper Bag Records
the-unraveling-of-puptheband	THE UNRAVELING OF PUPTHEBAND	ALBUM	2022-04-01	2022-04-01 17:42:31.144	f	16	{}	https://music.apple.com/us/album/the-unraveling-of-puptheband/1601542904	https://puptheband.bandcamp.com/album/the-unraveling-of-puptheband	\N	https://open.spotify.com/album/7lRqCEA3dm00WmZ5cIKBKF	https://youtube.com/playlist?list=OLAK5uy_nORcSfm4lAtFKPQcMQLxSrbm7oFsu7a8M	t	2022 Little Dipper, under exclusive license to Universal Music Canada
bend-the-rules-deluxe	Bend The Rules (Deluxe)	DELUXE	2021-05-07	2021-11-17 02:22:56.771	f	34	{Chromeo}	https://music.apple.com/us/album/bend-the-rules-deluxe/1563291277	https://anomaliebeats.bandcamp.com/album/bend-the-rules-deluxe	https://soundcloud.com/anomaliebeats/sets/bend-the-rules-deluxe	https://open.spotify.com/album/5WHwgzRuLkcEZsBFxUjGX4	\N	t	2021 Juliet Records / Last Gang Records Inc.
ignorance-deluxe-version	Ignorance (Deluxe Version)	DELUXE	2021-09-29	2021-11-14 19:12:58.65	f	27	{}	https://music.apple.com/us/album/ignorance-deluxe-version/1571878888	https://theweatherstation.bandcamp.com/album/deluxe-edition-of-ignorance	https://soundcloud.com/the-weather-station/sets/ignorance-deluxe-edition	https://open.spotify.com/album/2RfdX0EHvqLoOApwWRhOHv	\N	t	2021 Next Door Records
automat	Automat	COMPILATION	2019-07-12	2021-11-12 21:51:27.794	f	15	{}	https://music.apple.com/us/album/automat/1460167374	https://metz.bandcamp.com/album/automat	https://soundcloud.com/metztheband/sets/automat-5	https://open.spotify.com/album/2VK2cXWLB8oAePobsjWzHo	https://www.youtube.com/playlist?list=OLAK5uy_keBs7dLZ_H2om0AElCNoruS3-NsKEGJCM	t	2019 Sub Pop Records
iii-remixes	iii remixes	REMIX	2021-04-30	2021-11-23 03:55:57.205	f	43	{}	https://music.apple.com/us/album/iii-remixes-ep/1561798539	https://blessedband.bandcamp.com/album/iii-remixes	\N	https://open.spotify.com/album/3iWypPxRAbATMQeZyE4Hls	\N	t	2021 Flemish Eye Records
nth-3	NTH 3	OTHER	2022-04-01	2022-04-03 05:14:02.258	t	46	{}	\N	https://chadvangaalen.bandcamp.com/album/nth-3	\N	\N	\N	t	\N
fighting-spirits	Fighting Spirits	EP	2021-02-26	2021-11-20 16:32:03.407	f	40	{}	https://music.apple.com/us/album/fighting-spirits-single/1614361814	https://towerhillmetal.bandcamp.com/album/fighting-spirits-demo	\N	https://open.spotify.com/album/7KaLA7xrQG3yMgwZ2FXHJh	https://youtu.be/y3ia7HWobA0	t	2022 3779152 Records DK
dont-throw-rocks-at-the-moon	Don't Throw Rocks At The Moon	EP	2021-02-12	2022-04-06 06:07:57.453	f	58	{}	https://music.apple.com/us/album/dont-throw-rocks-at-the-moon-ep/1549696769	https://planetgiza.bandcamp.com/album/dont-throw-rocks-at-the-moon	\N	https://open.spotify.com/album/11enzbnR8lIHAwA82Zz3nH	https://youtube.com/playlist?list=OLAK5uy_kF5_dK4x3mUQX1cJZbRR6r4Eoa2cY-Xn8	t	2021 Planet Giza
added-sugar	Added Sugar	ALBUM	2019-02-12	2022-04-06 06:12:24.234	f	58	{}	https://music.apple.com/us/album/added-sugar/1451659525	https://planetgiza.bandcamp.com/album/added-sugar	\N	https://open.spotify.com/album/1EqGwkiaYljCmwbpzPO5d6	https://www.youtube.com/playlist?list=OLAK5uy_mD_LmauUZjCVC_xB-ujD7V2pnTCItZNO0	t	\N
out-of-touch	Out of Touch	SINGLE	2021-07-16	2022-04-06 06:29:44.557	f	59	{"Ivy Sole"}	https://music.apple.com/us/album/out-of-touch-single/1571349381	\N	\N	https://open.spotify.com/track/3mlPHwzrnp80WThV2FenuG	https://youtu.be/DmgaujWYi-U	t	2021 Planet Giza
while-you-on-road	While You on Road	SINGLE	2022-02-25	2022-04-06 06:16:18.478	f	59	{}	https://music.apple.com/us/album/while-you-on-road-single/1608014956	\N	\N	https://open.spotify.com/track/7lUdvbrsHvoUfqBt7JOwkZ	https://youtu.be/jEI3Dg38pXM	t	2022 Planet Giza
ftw	FTW	SINGLE	2021-09-10	2022-04-06 06:27:02.867	f	14	{}	https://music.apple.com/us/album/ftw-single/1580749972	\N	\N	https://open.spotify.com/track/5IznlF0A1XVddM19iuCn5Q	https://youtu.be/rmTCTMbFaLA	t	2021 Planet Giza
hands-on	Hands On	SINGLE	2020-02-13	2022-04-06 06:37:53.613	f	60	{JMF}	https://music.apple.com/us/album/hands-on-feat-jmf-single/1498148761	\N	\N	https://open.spotify.com/track/0YmU22gCHDKFejuvI8nDou?si=2201bc05ed7f4c73	https://youtu.be/FI11My0-sWQ	t	\N
\.


--
-- Data for Name: musician; Type: TABLE DATA; Schema: public; Owner: mooseical
--

COPY public.musician (id, name, date_added, city_id, is_group, apple_link, bandcamp_link, soundcloud_link, spotify_link, youtube_link, disbanded) FROM stdin;
us-girls	U.S. Girls	2021-11-11 15:19:43.774	1	f	https://music.apple.com/us/artist/u-s-girls/346049270	https://usgirls.bandcamp.com/	https://soundcloud.com/usgirls	https://open.spotify.com/artist/3AHFDfqhSqPBecjQDIOIJA	https://www.youtube.com/channel/UCh0oPo8AHsibYz9p0CWJhNw	\N
musk-ox	Musk Ox	2021-11-14 04:21:25.628	6	t	https://music.apple.com/us/artist/musk-ox/306546840	https://muskoxofficial.bandcamp.com/	\N	https://open.spotify.com/artist/2Y1gQP3Mkmogngm9BJI5Jh	https://www.youtube.com/c/MuskOxOfficial/	\N
the-pack-ad	The Pack a.d.	2021-11-11 21:42:23.831	5	t	https://music.apple.com/us/artist/the-pack-a-d/270177376	https://thepackad.bandcamp.com/	https://soundcloud.com/the-pack-ad	https://open.spotify.com/artist/2gbOUPIhea9nrCmAeZBgpo	https://www.youtube.com/user/ThePackad	\N
alvvays	Alvvays	2021-11-11 04:13:01.315	1	t	https://music.apple.com/us/artist/alvvays/730606893	https://alvvays.bandcamp.com/	https://soundcloud.com/alvvays	https://open.spotify.com/artist/3kzwYV3OCB010YfXMF0Avt	https://www.youtube.com/channel/UCFwM7mqRJQltXEduilGLHYg	\N
lido-pimienta	Lido Pimienta	2021-11-12 04:06:16.461	1	f	https://music.apple.com/us/artist/lido-pimienta/389475023	https://lidopimienta.bandcamp.com/	https://soundcloud.com/lido-pimienta	https://open.spotify.com/artist/1IdkKQ9CM1i0wygfxYV4Z3	https://www.youtube.com/channel/UCPfz16ao-2v68HDN3weu9Jg	\N
pottery	Pottery	2021-11-12 04:40:44.436	3	t	https://music.apple.com/us/artist/pottery/1441603318	https://pottery.bandcamp.com/	https://soundcloud.com/potteryband	https://open.spotify.com/artist/4zXEe25IWFWVU48Q0BaK9q	https://www.youtube.com/c/PotteryBand	\N
klo-pelgag	Klô Pelgag	2021-11-12 04:47:09.721	3	f	https://music.apple.com/us/artist/kl%C3%B4-pelgag/516410353	https://klopelgag.bandcamp.com/	\N	https://open.spotify.com/artist/7vYe47XsRmlUuaA9ZSC9fi	https://www.youtube.com/channel/UC_iEE4hHrQM8J-O1v-yK_Yw	\N
clairmont-the-second	Clairmont The Second	2021-11-12 18:34:01.633	1	f	https://music.apple.com/us/artist/clairmont-the-second/1081170592	https://ctsecond.bandcamp.com/	https://soundcloud.com/ctsecond	https://open.spotify.com/artist/2FtWl97A21W2V0urMwaWn7	https://www.youtube.com/channel/UChOYciHsw735JfiWgFLdpvA	\N
colin-stetson	Colin Stetson	2021-11-14 05:30:57.782	3	f	https://music.apple.com/us/artist/colin-stetson/204463551	https://colinstetson.bandcamp.com/	https://soundcloud.com/colin-stetson	https://open.spotify.com/artist/4G6HhUUQ1LgyYnA2WJppf8	https://www.youtube.com/channel/UCCJMjLN3ebaMOFB7nV4JTeA	\N
cola	Cola	2021-11-12 19:10:38.996	3	t	https://music.apple.com/us/artist/cola/1592146749	https://bandcola.bandcamp.com/	https://soundcloud.com/cola27260	https://open.spotify.com/artist/1KCSUZBJy1bAsIz7wUYkd8	https://www.youtube.com/channel/UCOj-XQMQewDzwrpSphvhOMg	\N
jonah-yano	Jonah Yano	2021-11-14 05:50:23.389	1	f	https://music.apple.com/us/artist/jonah-yano/1237016701	https://jonahyano.bandcamp.com/	https://soundcloud.com/jonahyano	https://open.spotify.com/artist/4Js9qeA7KMFyjBYHEjFaeJ	https://www.youtube.com/channel/UCPfwAb1uRhgp_KUhDYcuWHw	\N
sarah-neufeld	Sarah Neufeld	2021-11-15 05:38:29.887	1	f	https://music.apple.com/us/artist/sarah-neufeld/215660210	https://sarahneufeld.bandcamp.com/	https://soundcloud.com/sarahneufeld	https://open.spotify.com/artist/17YxHBveizVRDwCUBVn1X0	https://www.youtube.com/channel/UC51aIfY8rwPlpUBkCic5mmA	\N
jennifer-castle	Jennifer Castle	2021-11-14 19:39:59.123	1	f	https://music.apple.com/us/artist/jennifer-castle/1044012878	https://jennifercastle.bandcamp.com/	https://soundcloud.com/jennifercastle	https://open.spotify.com/artist/2RzmnX5DXwcryxwUyREPbK	https://www.youtube.com/channel/UCoaUJrAwmhFyWM9lV1j1eZw	\N
arms-length	arm's length	2021-11-19 03:09:33.013	7	t	https://music.apple.com/us/artist/arms-length/1474016594	https://armslengthontario.bandcamp.com/	https://soundcloud.com/rmsength	https://open.spotify.com/artist/1KXSj6uiC8Wtl2wCckVmAD	https://www.youtube.com/channel/UC7WAJGad2Rmg1WVtDX4RBlg	\N
backxwash	Backxwash	2021-11-19 03:16:33.569	3	f	https://music.apple.com/us/artist/backxwash/1360719873	https://backxwash.bandcamp.com/	https://soundcloud.com/backxwash	https://open.spotify.com/artist/4du3q8TIzsZxZZKdRT23Jg	https://www.youtube.com/channel/UC-i20-F5uTdBQMr3iNHwKuA	\N
big-brave	BIG|BRAVE	2021-11-20 00:42:19.448	3	t	https://music.apple.com/us/artist/big-brave/914156848	https://bigbravesl.bandcamp.com/	https://soundcloud.com/big-brave	https://open.spotify.com/artist/5nlpqhz47LYv7KvarJdh44	https://www.youtube.com/channel/UCdBZDSj-1WJy-5FrXRr2Tfw	\N
badbadnotgood	BADBADNOTGOOD	2021-11-14 04:46:14.309	1	t	https://music.apple.com/us/artist/badbadnotgood/505464105	https://badbadnotgoodofficial.bandcamp.com/	https://soundcloud.com/badbadnotgood	https://open.spotify.com/artist/65dGLGjkw3UbddUg2GKQoZ	https://www.youtube.com/channel/UCoYAFe4DypQIUqMd1YynPVg	\N
preoccupations	Preoccupations	2021-11-11 04:22:23.908	2	t	https://music.apple.com/us/artist/preoccupations/1106477906	https://preoccupations.bandcamp.com/	https://soundcloud.com/preoccupations	https://open.spotify.com/artist/2bs3QE2ZMBjmb0QTqAjCj3	https://www.youtube.com/channel/UCweFfOf1p5lYXdn22OFmYMw	\N
the-dead-south	The Dead South	2021-11-11 14:41:35.568	4	t	https://music.apple.com/us/artist/the-dead-south/668262442	https://thedeadsouth.bandcamp.com/	https://soundcloud.com/the-dead-south	https://open.spotify.com/artist/3HR1xtIsUefdFnkI1XHgeA	https://www.youtube.com/channel/UCWqvhmZyB66eKv01SiH_Kjg	\N
metz	METZ	2021-11-12 21:42:01.947	1	t	https://music.apple.com/us/artist/metz/2771256	https://metz.bandcamp.com/	https://soundcloud.com/metztheband	https://open.spotify.com/artist/18TNVFTJ6WfeicsMRrdJHI	https://www.youtube.com/channel/UCb_HwfOwZQdNS7N28QKOcwA	\N
pup	PUP	2021-11-12 22:10:52.762	1	t	https://music.apple.com/us/artist/pup/722031743	https://puptheband.bandcamp.com/	https://soundcloud.com/puptheband	https://open.spotify.com/artist/6A7uqgC2N1nUhrCLAytHxN	https://www.youtube.com/channel/UCU-33byAz0Oo4RgMy-aEWQA	\N
luna-li	Luna Li	2021-11-13 15:40:13.557	1	f	https://music.apple.com/us/artist/luna-li/1242663809	https://lunali.bandcamp.com/	https://soundcloud.com/lunaliband	https://open.spotify.com/artist/4ZAk3yVJdtf1CFnTiG08U3	https://www.youtube.com/channel/UCBLR7YMKO1Zh3Cg0TUfwJ2A	\N
ought	Ought	2021-11-11 05:53:27.286	3	t	https://music.apple.com/us/artist/ought/853301949	https://ought.bandcamp.com/	https://soundcloud.com/oughtofficial	https://open.spotify.com/artist/2VhVBXSB8n2KxuzKVZNxTY	https://www.youtube.com/channel/UCLnOvt4tUzJ0lhCGhYxOHuA	2021-11-03
odonis-odonis	Odonis Odonis	2021-11-20 00:59:07.378	1	t	https://music.apple.com/us/artist/odonis-odonis/452720213	https://odonisodonis.bandcamp.com/	https://soundcloud.com/odonisodonis	https://open.spotify.com/artist/33qVw2pK7R3Io2tMPNOIf0	https://www.youtube.com/channel/UCMmqy62FZ2vmmNl-vrqtNuA	\N
boy-golden	Boy Golden	2021-11-20 16:14:43.115	8	f	https://music.apple.com/us/artist/boy-golden/392029780	https://yaboygolden.bandcamp.com/	https://soundcloud.com/user-87012428	https://open.spotify.com/artist/4oNZapwLKDfR92AX7LbRk1	https://www.youtube.com/channel/UCFuCZ_8LFQa2wTbt-RIWUBQ	\N
tower-hill	Tower Hill	2021-11-20 16:28:02.26	9	f	https://music.apple.com/us/artist/tower-hill/1614354821	https://towerhillmetal.bandcamp.com/	\N	https://open.spotify.com/artist/3B7apcTxwZ6zgI7kO5rKuv	\N	\N
andy-shauf	Andy Shauf	2021-11-21 04:45:43.647	1	f	https://music.apple.com/us/artist/andy-shauf/279290457	https://andyshauf.bandcamp.com/	https://soundcloud.com/andyshauf	https://open.spotify.com/artist/5mFKYdmiYwNJTDtSzgFyQx	https://www.youtube.com/channel/UCYQhbuN2aE-yy3uxc3uUeNQ	\N
darryl-kissick	Darryl Kissick	2021-11-21 06:06:37.12	4	f	https://music.apple.com/us/artist/darryl-kissick/1439838404	https://darrylkissick.bandcamp.com/	https://soundcloud.com/user-156767294	https://open.spotify.com/artist/1VbP2VbyU1Ht1wtIAMn4Gc	\N	\N
godspeed-you-black-emperor	Godspeed You! Black Emperor	2021-11-23 02:42:30.345	3	t	https://music.apple.com/us/artist/godspeed-you-black-emperor/40884339	https://godspeedyoublackemperor.bandcamp.com/	https://soundcloud.com/godspeedyoublackemperor	https://open.spotify.com/artist/4svpOyfmQKuWpHLjgy4cdK	https://www.youtube.com/channel/UCDhKhucVT-9sNQExgHPcabg	\N
blessed	Blessed	2021-11-23 03:52:50.872	5	t	https://music.apple.com/us/artist/blessed/1218357914	https://blessedband.bandcamp.com/	https://soundcloud.com/blessedband	https://open.spotify.com/artist/0IE68xHQxczOqBXTnB1cGD	https://www.youtube.com/channel/UCXqnGMEU7z_RsyeVVLaeIVw	\N
chad-vangaalen	Chad VanGaalen	2021-11-24 04:23:58.913	2	f	https://music.apple.com/us/artist/chad-vangaalen/73693057	https://chadvangaalen.bandcamp.com/	https://soundcloud.com/chadvangaalen-music	https://open.spotify.com/artist/597yzFFRvWnxCtDInHwciZ	https://www.youtube.com/channel/UCX4URexy6IUIM0tjfxCQR1Q	\N
kiwi-jr	Kiwi jr.	2021-11-30 05:13:30.839	1	t	https://music.apple.com/us/artist/kiwi-jr/1448309058	https://kiwijr.bandcamp.com/	https://soundcloud.com/kiwijr	https://open.spotify.com/artist/4CMdLKWNEoNSLpaJ6QMWYy	https://www.youtube.com/channel/UCtCuYqJV-xmBhuVC6oOHK7w	\N
cadence-weapon	Cadence Weapon	2021-12-02 02:17:09.419	1	f	https://music.apple.com/us/artist/cadence-weapon/152198444	https://cadenceweapon.bandcamp.com/	\N	https://open.spotify.com/artist/179CHqJZlZwKBQhjcOeAOS	https://www.youtube.com/channel/UCXhYMe2iNs_CZccZ7NkCIIQ	\N
men-i-trust	Men I Trust	2021-12-05 03:10:07.346	3	t	https://music.apple.com/us/artist/men-i-trust/886240553	https://menitrust.bandcamp.com/	https://soundcloud.com/men-i-trust	https://open.spotify.com/artist/3zmfs9cQwzJl575W1ZYXeT	https://www.youtube.com/c/MenITrust	\N
mustafa	Mustafa	2021-12-05 06:21:01.741	1	f	https://music.apple.com/us/artist/mustafa/1501533511	\N	https://soundcloud.com/mustafaregentparksongs	https://open.spotify.com/artist/1zkKkDDra0jlsiJYz57P3P	https://www.youtube.com/channel/UCcgIyeJkzAv4SrIH-Kzlk0g	\N
anomalie	Anomalie	2021-11-17 01:43:41.763	3	f	https://music.apple.com/us/artist/anomalie/677760463	https://anomaliebeats.bandcamp.com/	https://soundcloud.com/anomaliebeats	https://open.spotify.com/artist/2ev6Cd0yJVCcpf2zezEQ8Z	https://www.youtube.com/c/anomaliebeats	\N
nap-eyes	Nap Eyes	2021-12-11 19:22:33.435	11	t	https://music.apple.com/us/artist/nap-eyes/825083588	https://napeyes.bandcamp.com/	https://soundcloud.com/napeyes	https://open.spotify.com/artist/1ysOXSDpupZ5RBQ9PNFZU7	https://www.youtube.com/channel/UCuKdHhfN-kxfjnYGGPWPZdQ	\N
the-weather-station	The Weather Station	2021-11-14 19:03:43.177	1	f	https://music.apple.com/us/artist/the-weather-station/313107696	https://theweatherstation.bandcamp.com/	https://soundcloud.com/the-weather-station	https://open.spotify.com/artist/39ZEMGRv3pIYTYKEhr4Abu	https://www.youtube.com/channel/UCWkEDYcqsXyqCBSG1-7Ig-g	\N
bell-orchestre	Bell Orchestre	2021-12-15 02:16:26.959	3	t	https://music.apple.com/us/artist/bell-orchestre/81617178	https://bellorchestre.bandcamp.com/	https://soundcloud.com/bellorchestre	https://open.spotify.com/artist/1eGeixtxaPiyKM6CPVANqr	https://www.youtube.com/channel/UCsymfVUJDyx-Bp5__WaSRwA	\N
nobro	NOBRO	2021-12-12 05:22:41.921	3	t	https://music.apple.com/us/artist/nobro/1450330746	https://nobro.bandcamp.com/	https://soundcloud.com/nobromusic	https://open.spotify.com/artist/5Tomvwat8AxMGd2ewkDNPs	https://www.youtube.com/channel/UCr1qAF-u4QfC8XhIEuWbzTg	\N
chocolat	Chocolat	2022-01-26 01:35:39.006	3	t	https://music.apple.com/us/artist/chocolat/1159912010	https://chocolatmtl.bandcamp.com/	\N	https://open.spotify.com/artist/1WCqmUezh1dSnBcHSozS57	https://www.youtube.com/channel/UCjyfkNpDThaGg4kMF-DU9JQ	\N
comet-control	Comet Control	2021-11-25 04:47:17.724	1	t	https://music.apple.com/us/artist/comet-control/824376739	https://cometcontrol.bandcamp.com/	https://soundcloud.com/cometcontrolofficial	https://open.spotify.com/artist/6FOPSIm6V6lkUgTItiNX4G	\N	\N
laura-niquay	Laura Niquay	2021-12-11 19:13:40.017	10	f	https://music.apple.com/us/artist/laura-niquay/1392044782	https://lauraniquay.bandcamp.com/	https://soundcloud.com/lauraniquay	https://open.spotify.com/artist/0pl54zLEvzbyIPj7ork06z	https://www.youtube.com/channel/UCISTj_29ERHBQuYmnJURd1Q	\N
black-dresses	Black Dresses	2021-11-14 18:34:16.471	1	t	https://music.apple.com/us/artist/black-dresses/1370133803	https://blackdresses.bandcamp.com/	https://soundcloud.com/black-dresses	https://open.spotify.com/artist/7FFwJQ58hAy7PMo4lUBW96	https://www.youtube.com/channel/UCuCzDrAbCOfujH_qfHwQLzQ	\N
art-decco	Art d'Ecco	2022-03-29 05:44:15.614	12	f	https://music.apple.com/us/artist/art-decco/1390013514	https://artdecco.bandcamp.com/	\N	https://open.spotify.com/artist/3P3quzbMWdn5kalJUa6W5J	\N	\N
planet-giza	Planet Giza	2022-04-06 06:02:55.364	3	t	https://music.apple.com/us/artist/planet-giza/1177559829	https://planetgiza.bandcamp.com/	\N	https://open.spotify.com/artist/332mFY6yBda91AsIOSKirG	https://www.youtube.com/c/PlanetGiza	\N
\.


--
-- Data for Name: musician_music; Type: TABLE DATA; Schema: public; Owner: mooseical
--

COPY public.musician_music (musician_id, music_id) FROM stdin;
alvvays	antisocialites
alvvays	alvvays
preoccupations	cassette
preoccupations	viet-cong
preoccupations	preoccupations
preoccupations	new-material
preoccupations	pontiac-87
preoccupations	key-off-duty-trip
ought	new-calm-ep
ought	once-more-with-feeling
ought	more-than-any-other-day
ought	sun-coming-down
ought	room-inside-the-world
ought	four-desires
ought	aquarium-drunkard-covers
the-dead-south	good-company
the-dead-south	served-live
the-dead-south	this-little-light-of-mine-house-of-the-rising-sun
the-dead-south	the-ocean-went-mad-and-we-were-to-blame
the-dead-south	the-dead-south-ourvinyl-sessions
us-girls	heavy-light
us-girls	in-a-poem-unlimited
us-girls	half-free
us-girls	gem
us-girls	us-girls-on-kraak
us-girls	go-grey
us-girls	introducing
us-girls	santa-stay-home
us-girls	junkyard
the-pack-ad	it-was-fun-while-it-lasted
the-pack-ad	dollhouse
the-pack-ad	positive-thinking
the-pack-ad	do-not-engage
the-pack-ad	unpersons
the-pack-ad	we-kill-computers
the-pack-ad	funeral-mixtape
the-pack-ad	tintype
the-pack-ad	tintype-remastered
the-pack-ad	some-sssongs
the-pack-ad	meta-animal
the-pack-ad	cellophane
the-pack-ad	sirens-seasick-french-version
the-pack-ad	live-vol-2
the-pack-ad	live-vol-1
the-pack-ad	live-vol-3
the-pack-ad	you-dont-own-me
the-pack-ad	coconut
the-pack-ad	the-pack-ad-on-audiotree-live
us-girls	us-girls-slim-twig
lido-pimienta	la-papessa
lido-pimienta	miss-colombia
lido-pimienta	color
pottery	no-1
pottery	welcome-to-bobbys-motel
klo-pelgag	notre-dame-des-sept-douleurs
klo-pelgag	letoile-thoracique
klo-pelgag	lalchimie-des-monstres
klo-pelgag	ep
klo-pelgag	toute-seule-pour-noel
clairmont-the-second	becoming-a-gentlemiin
clairmont-the-second	project-ii
clairmont-the-second	quest-for-milk-and-honey-black-edition
clairmont-the-second	lil-mont-from-the-ave
clairmont-the-second	do-you-drive
clairmont-the-second	its-not-how-it-sounds
clairmont-the-second	old-clothes
clairmont-the-second	tortoise
clairmont-the-second	thou
clairmont-the-second	hands
clairmont-the-second	no-u-dont-intres-ting-mi-pce
cola	blank-curtain
metz	metz
metz	ii
metz	strange-peace
metz	automat
metz	atlas-vending
metz	live-at-the-opera-house
metz	acid-slow-decay
metz	dirty-shirt
metz	cant-understand
metz	eraser
metz	me
pup	pup
pup	the-dream-is-over
pup	morbid-stuff
pup	this-place-sucks-ass
pup	you-dont-get-me-high-anymore-triple-j-like-a-version
pup	holier-than-thou
pup	waiting-kill-something
luna-li	jams-ep
luna-li	opal-angel-ep
musk-ox	inheritance
musk-ox	woodfall
musk-ox	musk-ox-re-release
musk-ox	musk-ox
musk-ox	the-face-of-patience
musk-ox	entre-le-soleil-et-les-arbres
musk-ox	entre-les-nuages-et-la-neige
musk-ox	entre-la-terre-et-le-ciel
badbadnotgood	bbng
badbadnotgood	bbnglive1
badbadnotgood	bbnglive-2
badbadnotgood	bbng2
badbadnotgood	iii
badbadnotgood	sour-soul-instrumentals
badbadnotgood	sour-soul
badbadnotgood	iv
badbadnotgood	velvet-bw-boogie-no-69
badbadnotgood	confessions-pt-iii
colin-stetson	confessions-pt-iii
badbadnotgood	i-dont-know
badbadnotgood	tried
badbadnotgood	key-to-love-is-understanding
jonah-yano	key-to-love-is-understanding
badbadnotgood	talk-memory
badbadnotgood	late-night-tales-badbadnotgood
badbadnotgood	goodbye-blue
black-dresses	forever-in-your-heart
black-dresses	peaceful-as-hell
black-dresses	love-and-affection-for-stupid-little-bitches
black-dresses	thank-you
black-dresses	wasteisolation
black-dresses	hell-is-real
black-dresses	dreams-come-true-2019
black-dresses	world-peace
black-dresses	crush
black-dresses	paper-planes
the-weather-station	ignorance
the-weather-station	ignorance-deluxe-version
the-weather-station	the-weather-station
the-weather-station	loyalty
the-weather-station	all-of-it-was-mine
the-weather-station	the-line
the-weather-station	what-am-i-going-to-do-with-everything-i-know
colin-stetson	slow-descent
colin-stetson	new-history-warfare-vol1
colin-stetson	new-history-warfare-vol2-judges
colin-stetson	those-who-didnt-run
colin-stetson	new-history-warfare-vol3-to-see-more-light
colin-stetson	sorrow
colin-stetson	all-this-i-do-for-glory
colin-stetson	the-rain-like-curses
colin-stetson	beyond-the-brake
colin-stetson	never-were-the-way-she-was
sarah-neufeld	never-were-the-way-she-was
jonah-yano	souvenir
jonah-yano	this-time-around
jonah-yano	nervous
sarah-neufeld	detritus
sarah-neufeld	the-ridge
sarah-neufeld	hello-brother
jennifer-castle	castlemusic
jennifer-castle	pink-city
jennifer-castle	angels-of-death
jennifer-castle	monarch-season
anomalie	odyssee
anomalie	holidays
anomalie	hang-glide
anomalie	metropole
anomalie	metropole-part-ii
anomalie	bend-the-rules
anomalie	bend-the-rules-deluxe
anomalie	bond
arms-length	everything-nice
arms-length	whats-mine-is-yours
backxwash	i-lie-here-buried-with-my-rings-and-my-dresses
backxwash	deviancy
backxwash	god-has-nothing-to-do-with-this-leave-him-out-of-it
backxwash	black-sailor-moon
backxwash	stigmata
backxwash	freaks
backxwash	rosemarys-revenge
big-brave	leaving-none-but-small-birds
big-brave	vital
big-brave	a-gaze-among-them
big-brave	ardor
big-brave	au-de-la
big-brave	feral-verdure
odonis-odonis	spectrums
odonis-odonis	reaction
odonis-odonis	no-pop
odonis-odonis	post-plague
odonis-odonis	hard-boiled-soft-boiled
odonis-odonis	better
odonis-odonis	hollandaze
odonis-odonis	odonis-odonis-on-audiotree-live
odonis-odonis	lotus-plaza-odonis-odonis
boy-golden	church-of-better-daze
tower-hill	fighting-spirits
andy-shauf	wilds
andy-shauf	you-slipped-away
andy-shauf	judy-jeremys-wedding
andy-shauf	the-neon-skyline
andy-shauf	the-party
andy-shauf	the-bearer-of-bad-news
andy-shauf	jenny-come-home
andy-shauf	sam-jones-feeds-his-demons
andy-shauf	waiting-for-the-sun-to-leave
andy-shauf	darker-days
andy-shauf	four-songs
andy-shauf	darker-days-b-sides
andy-shauf	the-magician
darryl-kissick	my-sunshine
darryl-kissick	much-later
darryl-kissick	not-looking-ahead
darryl-kissick	i-once-knew-its-cool
godspeed-you-black-emperor	g_ds-pee-at-states-end
godspeed-you-black-emperor	luciferian-towers
godspeed-you-black-emperor	asunder-sweet-and-other-distress
godspeed-you-black-emperor	allelujah-dont-bend-ascend
godspeed-you-black-emperor	yanqui-uxo
godspeed-you-black-emperor	lift-your-skinny-fists-like-antennas-to-heaven
godspeed-you-black-emperor	slow-riot-for-new-zero-kanada
godspeed-you-black-emperor	f-a
blessed	salt
blessed	iii-remixes
blessed	iii-0
blessed	blessed-on-audiotree-live
blessed	sound-teeth-showing
blessed	ii-0
blessed	blessed
blessed	swim
chad-vangaalen	worlds-most-stressed-out-gardener
chad-vangaalen	light-information
chad-vangaalen	shrink-dust
chad-vangaalen	the-green-corridor-series-02
chad-vangaalen	diaper-island
chad-vangaalen	soft-airplane
chad-vangaalen	skelliconnection
chad-vangaalen	infiniheart
chad-vangaalen	friendly-aliens-monopoly-arp
chad-vangaalen	lost-harmonies
chad-vangaalen	nth
chad-vangaalen	broken-harp
chad-vangaalen	full-moon-bummer
chad-vangaalen	lost-harmonies-2
chad-vangaalen	your-tan-looks-supernatural
chad-vangaalen	parsa
comet-control	comet-control
comet-control	center-of-the-maze
comet-control	inside-the-sun
kiwi-jr	cooler-returns
kiwi-jr	football-money
cadence-weapon	parallel-world
cadence-weapon	be-about
cadence-weapon	cadence-weapon
cadence-weapon	hope-in-dirt-city
cadence-weapon	afterparty-babies
cadence-weapon	breaking-kayfabe
cadence-weapon	jackson-pollock-rap-version
cadence-weapon	separation-anxiety
cadence-weapon	cadence-weapon-is-the-black-hand
cadence-weapon	remixes-2009-2013
cadence-weapon	tron-legacy-the-mixtape
cadence-weapon	when-its-real
men-i-trust	untourable-album
men-i-trust	oncle-jazz
men-i-trust	headroom
men-i-trust	men-i-trust
men-i-trust	forever-live-sessions
men-i-trust	tides
men-i-trust	lucky-sue
men-i-trust	plain-view
men-i-trust	humming-man
men-i-trust	lauren
chad-vangaalen	no-dust
mustafa	when-smoke-rises
anomalie	dribble
laura-niquay	waska-matisiwin
laura-niquay	waratanak
laura-niquay	mote-mote
nap-eyes	snapshot-of-a-beginner
nap-eyes	im-bad-now
nap-eyes	whine-of-the-mystic
nap-eyes	thought-rock-fish-scale
nap-eyes	when-i-come-around-ep
nap-eyes	blood-river
nap-eyes	snake-oil-childs-romance
nap-eyes	aquarium-drunkards-lagniappe-session
nap-eyes	too-bad
nobro	sick-hustle
nobro	the-kids-are-back
nobro	mongoose
nobro	lala
the-dead-south	sugar-joy
the-dead-south	illusion-doubt
badbadnotgood	here-now-timewave-zero
bell-orchestre	house-music
anomalie	come-running-to-me
chocolat	jazz-engage
chocolat	tss-tss
chocolat	rencontrer-looloo
chocolat	piano-elegant
chocolat	chocolat
andy-shauf	satan-jacob-rose
metz	escalator-teeth-on-and-on
the-weather-station	i-tried-to-wear-the-world
jennifer-castle	i-tried-to-wear-the-world
backxwash	dig-yourself-a-grave
chad-vangaalen	odds-sods-2
jennifer-castle	midas-touch
the-weather-station	midas-touch
black-dresses	forget-your-own-face
black-dresses	we-are-children-of-the-light
godspeed-you-black-emperor	all-lights-fucked-on-the-hairy-amp-drooling
the-weather-station	how-is-it-that-i-should-look-at-the-stars
luna-li	duality
badbadnotgood	open-channels
darryl-kissick	let-it-burn
nobro	live-your-truth-shred-some-gnar
cola	so-excited
metz	split
cadence-weapon	parallel-world-deluxe-edition
the-dead-south	easy-listening-for-jerks-pt-1
the-dead-south	easy-listening-for-jerks-pt-2
anomalie	memory-leaves
anomalie	hummingbird
chad-vangaalen	nth-2
art-decco	palm-slave
art-decco	angst-in-my-pants
art-decco	thats-entertainment
art-decco	in-standard-definition
art-decco	ill-never-give-you-up
art-decco	trespasser
art-decco	this-flight-tonight
pup	the-unraveling-of-puptheband
chad-vangaalen	nth-3
planet-giza	dont-throw-rocks-at-the-moon
planet-giza	added-sugar
planet-giza	while-you-on-road
planet-giza	ftw
planet-giza	out-of-touch
planet-giza	hands-on
\.


--
-- Data for Name: subgenre; Type: TABLE DATA; Schema: public; Owner: mooseical
--

COPY public.subgenre (id, name, genre) FROM stdin;
2	post punk	ROCK
3	gothic country	COUNTRY
4	art pop	POP
5	psychedelic pop	POP
6	noise pop	EXPERIMENTAL
7	drone	EXPERIMENTAL
9	garage rock	ROCK
10	christmas rock music	ROCK
11	bluegrass	COUNTRY
12	dark pop	POP
13	art punk	ROCK
14	hip hop	RAP
8	christmas pop music	POP
15	noise rock	METAL
16	pop punk	ROCK
17	bedroom pop	POP
18	indie rock	ROCK
19	indie pop	ROCK
1	dream pop	POP
20	chamber folk	FOLK
21	jazz	JAZZ
22	jazz fusion	JAZZ
23	jazz rap	RAP
24	neo soul	POP
25	soul	JAZZ
26	electro industrial	EXPERIMENTAL
28	contemporary folk	FOLK
30	post minimalism	JAZZ
31	modern classical	JAZZ
32	indie folk	FOLK
33	singer songwriter	FOLK
34	synth funk	ELECTRONIC
35	nu jazz	ELECTRONIC
36	midwest emo	ROCK
37	industrial hip hop	RAP
27	baroque folk	FOLK
38	psychedelic rock	ROCK
39	drone metal	METAL
40	heavy metal	METAL
41	post rock	ROCK
42	art rock	ROCK
43	electronic rock	ELECTRONIC
44	slacker rock	ROCK
45	synth rock	ROCK
46	sound collage	EXPERIMENTAL
47	experimental rock	ROCK
48	psychedelic folk	FOLK
49	jangle pop	ROCK
50	conscious hip hop	RAP
51	glitch hop	RAP
52	experimental hip hop	RAP
53	folk rock	FOLK
54	neo psychedelia	ROCK
56	alternative rock	ROCK
55	new wave	ROCK
57	glam rock	ROCK
58	r&b	POP
59	alternative rap	RAP
60	deep house	ELECTRONIC
29	avant garde jazz	JAZZ
\.


--
-- Name: City_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mooseical
--

SELECT pg_catalog.setval('public."City_id_seq"', 12, true);


--
-- Name: Subgenre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mooseical
--

SELECT pg_catalog.setval('public."Subgenre_id_seq"', 60, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: mooseical
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: city city_pkey; Type: CONSTRAINT; Schema: public; Owner: mooseical
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (id);


--
-- Name: music music_pkey; Type: CONSTRAINT; Schema: public; Owner: mooseical
--

ALTER TABLE ONLY public.music
    ADD CONSTRAINT music_pkey PRIMARY KEY (id);


--
-- Name: musician_music musician_music_pkey; Type: CONSTRAINT; Schema: public; Owner: mooseical
--

ALTER TABLE ONLY public.musician_music
    ADD CONSTRAINT musician_music_pkey PRIMARY KEY (musician_id, music_id);


--
-- Name: musician musician_pkey; Type: CONSTRAINT; Schema: public; Owner: mooseical
--

ALTER TABLE ONLY public.musician
    ADD CONSTRAINT musician_pkey PRIMARY KEY (id);


--
-- Name: subgenre subgenre_pkey; Type: CONSTRAINT; Schema: public; Owner: mooseical
--

ALTER TABLE ONLY public.subgenre
    ADD CONSTRAINT subgenre_pkey PRIMARY KEY (id);


--
-- Name: city_name_province_key; Type: INDEX; Schema: public; Owner: mooseical
--

CREATE UNIQUE INDEX city_name_province_key ON public.city USING btree (name, province);


--
-- Name: music_apple_link_key; Type: INDEX; Schema: public; Owner: mooseical
--

CREATE UNIQUE INDEX music_apple_link_key ON public.music USING btree (apple_link);


--
-- Name: music_bandcamp_link_key; Type: INDEX; Schema: public; Owner: mooseical
--

CREATE UNIQUE INDEX music_bandcamp_link_key ON public.music USING btree (bandcamp_link);


--
-- Name: music_music_type_release_idx; Type: INDEX; Schema: public; Owner: mooseical
--

CREATE INDEX music_music_type_release_idx ON public.music USING btree (music_type, release DESC);


--
-- Name: music_soundcloud_link_key; Type: INDEX; Schema: public; Owner: mooseical
--

CREATE UNIQUE INDEX music_soundcloud_link_key ON public.music USING btree (soundcloud_link);


--
-- Name: music_spotify_link_key; Type: INDEX; Schema: public; Owner: mooseical
--

CREATE UNIQUE INDEX music_spotify_link_key ON public.music USING btree (spotify_link);


--
-- Name: music_youtube_link_key; Type: INDEX; Schema: public; Owner: mooseical
--

CREATE UNIQUE INDEX music_youtube_link_key ON public.music USING btree (youtube_link);


--
-- Name: musician_apple_link_key; Type: INDEX; Schema: public; Owner: mooseical
--

CREATE UNIQUE INDEX musician_apple_link_key ON public.musician USING btree (apple_link);


--
-- Name: musician_bandcamp_link_key; Type: INDEX; Schema: public; Owner: mooseical
--

CREATE UNIQUE INDEX musician_bandcamp_link_key ON public.musician USING btree (bandcamp_link);


--
-- Name: musician_soundcloud_link_key; Type: INDEX; Schema: public; Owner: mooseical
--

CREATE UNIQUE INDEX musician_soundcloud_link_key ON public.musician USING btree (soundcloud_link);


--
-- Name: musician_spotify_link_key; Type: INDEX; Schema: public; Owner: mooseical
--

CREATE UNIQUE INDEX musician_spotify_link_key ON public.musician USING btree (spotify_link);


--
-- Name: musician_youtube_link_key; Type: INDEX; Schema: public; Owner: mooseical
--

CREATE UNIQUE INDEX musician_youtube_link_key ON public.musician USING btree (youtube_link);


--
-- Name: subgenre_name_key; Type: INDEX; Schema: public; Owner: mooseical
--

CREATE UNIQUE INDEX subgenre_name_key ON public.subgenre USING btree (name);


--
-- Name: music music_subgenre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mooseical
--

ALTER TABLE ONLY public.music
    ADD CONSTRAINT music_subgenre_id_fkey FOREIGN KEY (subgenre_id) REFERENCES public.subgenre(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: musician musician_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mooseical
--

ALTER TABLE ONLY public.musician
    ADD CONSTRAINT musician_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.city(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: musician_music musician_music_music_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mooseical
--

ALTER TABLE ONLY public.musician_music
    ADD CONSTRAINT musician_music_music_id_fkey FOREIGN KEY (music_id) REFERENCES public.music(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: musician_music musician_music_musician_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mooseical
--

ALTER TABLE ONLY public.musician_music
    ADD CONSTRAINT musician_music_musician_id_fkey FOREIGN KEY (musician_id) REFERENCES public.musician(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

