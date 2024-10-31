"use client";

import { Notion } from "@notionpresso/react";

export const NotionRenderer = ({
  blocks,
  title,
  cover,
}: {
  blocks: any[];
  title: string;
  cover?: string;
}) => {
  return (
    <Notion>
      <Notion.Cover src={cover} />
      <Notion.Body>
        <Notion.Title title={title} />
        <Notion.Blocks blocks={blocks} />
      </Notion.Body>
    </Notion>
  );
};
