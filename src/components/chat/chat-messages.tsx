"use client";

import { Member } from "@prisma/client";
import React from "react";
import ChatWelcome from "./chat-welcome";
import useChatQuery from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { MessageWithMemberWithProfile } from "@/types";
import ChatItem from "./chat-item";
import { format } from "date-fns";

type ChatMessagesProps = {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
};

const DATE_FORMAT = "d MMM yyyy, HH:mm";

const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue });

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="w-7 h-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex-1"></div>
      <ChatWelcome name={name} type={type} />
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((page, i) => (
          <React.Fragment key={i}>
            {page.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                content={message.content}
                id={message.id}
                member={message.member}
                fileUrl={message.fileUrl}
                timestamp={format(new Date(member.createdAt), DATE_FORMAT)}
                isUpdated={message.createdAt !== message.updatedAt}
                currentMember={member}
                deleted={message.deleted}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
