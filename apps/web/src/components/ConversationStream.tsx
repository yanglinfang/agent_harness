import type { RunMessage } from "@agent-harness/protocol";
import type { ModeOption } from "./ModeSwitcher";

interface ConversationStreamProps {
  mode: ModeOption;
  messages: RunMessage[];
}

const MODE_PROMPTS: Record<ModeOption, string> = {
  General: "Continue the task, attach @context, or run /skill...",
  Coding: "Describe a change, attach @file, or run /skill review...",
  Research: "Ask a research question, attach @source, or run /skill cluster...",
  Automation: "Describe a flow, attach @app, or run /skill automate...",
};

export function ConversationStream({ mode, messages }: ConversationStreamProps) {
  return (
    <>
      <section className="conversation">
        {messages.length === 0 ? (
          <p className="conversation-empty">No messages yet.</p>
        ) : (
          messages.map((message) => (
            <article
              key={message.id}
              className={`message ${message.role}`}
            >
              <span>
                {message.role === "user" ? "you" : `agent · ${mode.toLowerCase()} mode`}
                {" · "}
                {message.at}
              </span>
              <p>{message.text}</p>
              {message.steps && message.steps.length > 0 && (
                <ol>
                  {message.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              )}
            </article>
          ))
        )}
      </section>

      <form className="composer" onSubmit={(event) => event.preventDefault()}>
        <input placeholder={MODE_PROMPTS[mode]} />
        <button type="button">@ context</button>
        <button type="button">/ skill</button>
        <button type="button">+ tool</button>
        <button type="submit">Send</button>
      </form>
    </>
  );
}
