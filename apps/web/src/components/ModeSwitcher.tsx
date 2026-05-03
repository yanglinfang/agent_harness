export const MODES = ["General", "Coding", "Research", "Automation"] as const;
export type ModeOption = (typeof MODES)[number];

interface ModeSwitcherProps {
  mode: ModeOption;
  onSelect: (mode: ModeOption) => void;
}

export function ModeSwitcher({ mode, onSelect }: ModeSwitcherProps) {
  return (
    <div className="mode-switcher" role="tablist" aria-label="Agent mode">
      {MODES.map((option) => (
        <button
          key={option}
          type="button"
          role="tab"
          aria-selected={option === mode}
          className={option === mode ? "active" : ""}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
