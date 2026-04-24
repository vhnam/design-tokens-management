ALTER TABLE `primitive_tokens` ADD `workspace_id` text NOT NULL;--> statement-breakpoint
CREATE INDEX `primitive_workspace_idx` ON `primitive_tokens` (`workspace_id`);