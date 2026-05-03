import type { ModeOption } from "./ModeSwitcher";

interface ConversationStreamProps {
  mode: ModeOption;
}

const MODE_PROMPTS: Record<ModeOption, string> = {
  General: "Continue the task, attach @context, or run /skill...",
  Coding: "Describe a change, attach @file, or run /skill review...",
  Research: "Ask a research question, attach @source, or run /skill cluster...",
  Automation: "Describe a flow, attach @app, or run /skill automate...",
};

export function ConversationStream({ mode }: ConversationStreamProps) {
  return (
    <>
      <section className="conversation">
        <article className="message user">
          <span>you · 10:42</span>
          <p>
            Pull the last 3 months of customer research interviews, find recurring
            onboarding complaints, and write a 1-page engineering brief with direct
            quotes.
          </p>
        </article>
        <article className="message agent">
          <span>agent · {mode.toLowerCase()} mode · safe sandbox</span>
          <p>
            Plan generated. Retrieval and clustering stay local; synthesis can route
            to cloud reasoning. No writes outside the session workspace without
            approval.
          </p>
          <ol>
            <li>Index connected docs through MCP.</li>
            <li>Read interview notes from workspace files.</li>
            <li>Cluster recurring complaints with a skill.</li>
            <li>Draft the brief and request permission before sharing.</li>
          </ol>
        </article>
        <article className="permission-card">
          <strong>Permission requested · net.fetch</strong>
          <p>
            External link found in a transcript. Network is default-deny, so the
            agent needs approval before fetching it.
          </p>
          <div>
            <button type="button">Allow once</button>
            <button type="button">Allow + remember</button>
            <button type="button" className="danger">Deny</button>
          </div>
        </article>
      </section>

      <form
        className="composer"
        onSubmit={(event) => event.preventDefault()}
      >
        <input placeholder={MODE_PROMPTS[mode]} />
        <button type="button">@ context</button>
        <button type="button">/ skill</button>
        <button type="button">+ tool</button>
        <button type="submit">Send</button>
      </form>
    </>
  );
}
