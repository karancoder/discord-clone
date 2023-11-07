"use client";

import React from "react";
import qs from "query-string";
import { Video, VideoOff } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ChatVideoButtonProps = {};

const ChatVideoButton = (props: ChatVideoButtonProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();
  const isVideo = searchParams?.get("video");

  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "End video call" : "Start video";

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
      <button onClick={onClick} className="hover:opacity-75 mr-4 transition">
        <Icon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  );
};

export default ChatVideoButton;
