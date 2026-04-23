DROP INDEX `semantic_theme_idx`;--> statement-breakpoint
DROP INDEX `semantic_name_idx`;--> statement-breakpoint
ALTER TABLE `semantic_tokens` ADD `group` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `semantic_theme_group_name_uniq` ON `semantic_tokens` (`theme`,`group`,`name`);--> statement-breakpoint
CREATE INDEX `semantic_theme_group_idx` ON `semantic_tokens` (`theme`,`group`);