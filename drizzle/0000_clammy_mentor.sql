CREATE TABLE `brand_overrides` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`value` text NOT NULL,
	`type` text NOT NULL,
	`description` text,
	`theme` text DEFAULT 'light' NOT NULL,
	`brand` text NOT NULL,
	`layer` text DEFAULT 'semantic' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE INDEX `override_brand_idx` ON `brand_overrides` (`brand`);--> statement-breakpoint
CREATE INDEX `override_name_brand_idx` ON `brand_overrides` (`name`,`brand`);--> statement-breakpoint
CREATE TABLE `component_tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`value` text NOT NULL,
	`type` text NOT NULL,
	`description` text,
	`theme` text DEFAULT 'light' NOT NULL,
	`brand` text DEFAULT 'default' NOT NULL,
	`component` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE INDEX `component_brand_idx` ON `component_tokens` (`brand`);--> statement-breakpoint
CREATE INDEX `component_name_idx` ON `component_tokens` (`component`);--> statement-breakpoint
CREATE INDEX `component_brand_theme_idx` ON `component_tokens` (`brand`,`theme`);--> statement-breakpoint
CREATE TABLE `primitive_tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`value` text NOT NULL,
	`type` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE TABLE `semantic_tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`value` text NOT NULL,
	`type` text NOT NULL,
	`description` text,
	`theme` text DEFAULT 'light' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE INDEX `semantic_theme_idx` ON `semantic_tokens` (`theme`);--> statement-breakpoint
CREATE INDEX `semantic_name_idx` ON `semantic_tokens` (`name`);--> statement-breakpoint
CREATE TABLE `workspaces` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`brands` text DEFAULT '["default"]' NOT NULL,
	`themes` text DEFAULT '["light","dark"]' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch())
);
